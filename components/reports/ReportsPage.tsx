"use client";

import { useState, useEffect } from "react";
import { Calendar, FileText, Users, BookOpen, BarChart3, Download, Filter, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import ExportDialog from "./ExportDialog";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";
import { addDays, subDays, format } from "date-fns";

interface ReportFilters {
  dateRange: {
    from?: Date;
    to?: Date;
  };
  classId: string;
  subject: string;
  reportType: 'summary' | 'detailed';
}

export default function ReportsPage() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date()
    },
    classId: 'all',
    subject: 'all',
    reportType: 'summary'
  });

  // Offline data
  const allStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];
  const allAttendance = useLiveQuery(() => offlineDB.attendance.toArray()) || [];
  const allGrades = useLiveQuery(() => offlineDB.grades.toArray()) || [];

  // Filter data based on current filters
  const filteredStudents = allStudents.filter(student => 
    filters.classId === 'all' || student.class === filters.classId
  );

  const filteredAttendance = allAttendance.filter(record => {
    const recordDate = new Date(record.date);
    const withinDateRange = (filters.dateRange.from ? recordDate >= filters.dateRange.from : true) && 
                            (filters.dateRange.to ? recordDate <= filters.dateRange.to : true);
    const matchesClass = filters.classId === 'all' || record.classId === filters.classId;
    const matchesSubject = filters.subject === 'all' || record.subject === filters.subject;
    
    return withinDateRange && matchesClass && matchesSubject;
  });

  const filteredGrades = allGrades.filter(grade => {
    const gradeDate = new Date(grade.date);
    const withinDateRange = (filters.dateRange.from ? gradeDate >= filters.dateRange.from : true) && 
                            (filters.dateRange.to ? gradeDate <= filters.dateRange.to : true);
    const matchesClass = filters.classId === 'all' || grade.classId === filters.classId;
    const matchesSubject = filters.subject === 'all' || grade.subject === filters.subject;
    
    return withinDateRange && matchesClass && matchesSubject;
  });

  // Get unique values for filters
  const uniqueClasses: string[] = [...new Set(allStudents.map(s => s.class).filter((cls): cls is string => Boolean(cls)))];
  const uniqueSubjects: string[] = [...new Set([
    ...allAttendance.map(a => a.subject).filter((s): s is string => Boolean(s)),
    ...allGrades.map(g => g.subject)
  ])];

  // Calculate report statistics
  const reportStats = {
    totalStudents: filteredStudents.length,
    totalAttendanceRecords: filteredAttendance.length,
    totalGradeRecords: filteredGrades.length,
    averageAttendance: filteredAttendance.length > 0 
      ? (filteredAttendance.filter(a => a.status === 'PRESENT').length / filteredAttendance.length) * 100 
      : 0,
    averageGrade: filteredGrades.length > 0
      ? filteredGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / filteredGrades.length
      : 0
  };

  // Prepare export data
  const getStudentExportData = () => {
    return filteredStudents.map(student => {
      const studentAttendance = filteredAttendance.filter(a => a.studentId === student.id);
      const studentGrades = filteredGrades.filter(g => g.studentId === student.id);
      
      const attendanceRate = studentAttendance.length > 0 
        ? (studentAttendance.filter(a => a.status === 'PRESENT').length / studentAttendance.length) * 100 
        : 0;
      
      const averageGrade = studentGrades.length > 0
        ? studentGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / studentGrades.length
        : 0;

      return {
        studentId: student.studentId,
        name: `${student.firstName} ${student.lastName}`,
        class: student.class,
        grade: student.grade,
        attendanceRate,
        averageGrade,
        status: student.status,
        totalAttendanceRecords: studentAttendance.length,
        totalGradeRecords: studentGrades.length
      };
    });
  };

  const getAttendanceExportData = () => {
    return filteredAttendance.map(record => {
      const student = allStudents.find(s => s.id === record.studentId);
      return {
        date: record.date,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
        studentId: student?.studentId || 'Unknown',
        class: record.classId,
        status: record.status,
        subject: record.subject || 'General',
        notes: record.notes || ''
      };
    });
  };

  const getGradeExportData = () => {
    return filteredGrades.map(grade => {
      const student = allStudents.find(s => s.id === grade.studentId);
      return {
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown',
        studentId: student?.studentId || 'Unknown',
        subject: grade.subject,
        assignment: grade.assignment,
        grade: grade.grade,
        maxGrade: grade.maxGrade,
        percentage: (grade.grade / grade.maxGrade) * 100,
        type: grade.type,
        date: grade.date,
        class: grade.classId
      };
    });
  };

  const ReportCard = ({ 
    title, 
    icon, 
    value, 
    subtitle, 
    color = "blue",
    exportData,
    reportType 
  }: {
    title: string;
    icon: React.ReactNode;
    value: string | number;
    subtitle: string;
    color?: string;
    exportData: any[];
    reportType: 'students' | 'attendance' | 'grades';
  }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                {icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
            <div className="flex items-end gap-4">
              <span className="text-3xl font-bold">{value}</span>
              <Badge variant="outline" className="mb-1">
                {exportData.length} records
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ExportDialog
              reportType={reportType}
              data={exportData}
              title={title}
              trigger={
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">
                Generate comprehensive reports and export data for analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <h3 className="font-semibold">Report Filters</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <DatePickerWithRange
                  date={filters.dateRange as any}
                  onDateChange={(range) => 
                    range && setFilters(prev => ({ ...prev, dateRange: range }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                <Select 
                  value={filters.classId} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, classId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {uniqueClasses.map(cls => (
                      <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Select 
                  value={filters.subject} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {uniqueSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select 
                  value={filters.reportType} 
                  onValueChange={(value: 'summary' | 'detailed') => setFilters(prev => ({ ...prev, reportType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
              <span>Period: {filters.dateRange.from ? format(filters.dateRange.from, 'MMM dd') : 'Start'} - {filters.dateRange.to ? format(filters.dateRange.to, 'MMM dd, yyyy') : 'End'}</span>
              <span>•</span>
              <span>{filters.classId === 'all' ? 'All Classes' : `Class ${filters.classId}`}</span>
              <span>•</span>
              <span>{filters.subject === 'all' ? 'All Subjects' : filters.subject}</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{reportStats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reportStats.averageAttendance.toFixed(1)}%
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Grade</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {reportStats.averageGrade.toFixed(1)}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {reportStats.totalAttendanceRecords + reportStats.totalGradeRecords}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <ReportCard
            title="Student Report"
            icon={<Users className="w-5 h-5 text-blue-600" />}
            value={filteredStudents.length}
            subtitle="Complete student profiles with performance metrics"
            color="blue"
            exportData={getStudentExportData()}
            reportType="students"
          />

          <ReportCard
            title="Attendance Report"
            icon={<Calendar className="w-5 h-5 text-green-600" />}
            value={`${reportStats.averageAttendance.toFixed(1)}%`}
            subtitle="Detailed attendance tracking and patterns"
            color="green"
            exportData={getAttendanceExportData()}
            reportType="attendance"
          />

          <ReportCard
            title="Grade Report"
            icon={<BookOpen className="w-5 h-5 text-purple-600" />}
            value={`${reportStats.averageGrade.toFixed(1)}%`}
            subtitle="Academic performance and grade analysis"
            color="purple"
            exportData={getGradeExportData()}
            reportType="grades"
          />
        </div>

        {/* Additional Report Options */}
        <Card className="mt-6">
          <CardHeader>
            <h3 className="font-semibold">Additional Export Options</h3>
            <p className="text-sm text-muted-foreground">
              Generate custom reports with specific data combinations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium">Performance Summary</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Combined student performance with attendance and grade metrics
                </p>
                <ExportDialog
                  reportType="custom"
                  data={getStudentExportData()}
                  title="Performance Summary Report"
                  trigger={
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Performance Report
                    </Button>
                  }
                />
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium">Class Analytics</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Class-wise breakdown of attendance and performance data
                </p>
                <ExportDialog
                  reportType="custom"
                  data={[...getAttendanceExportData(), ...getGradeExportData()]}
                  title="Class Analytics Report"
                  trigger={
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analytics Report
                    </Button>
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export All Data */}
        <div className="flex justify-center mt-8">
          <ExportDialog
            reportType="custom"
            data={[
              ...getStudentExportData(),
              ...getAttendanceExportData(),
              ...getGradeExportData()
            ]}
            title="Complete School Management Report"
            trigger={
              <Button size="lg" className="bg-[#1B5B5E] hover:bg-[#134345]">
                <Download className="w-5 h-5 mr-2" />
                Export All Data
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}