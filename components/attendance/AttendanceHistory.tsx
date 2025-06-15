"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar, Filter, Download, TrendingUp, TrendingDown, Users, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TouchCard } from "@/components/ui/touch-card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  excusedDays: number;
  sickDays: number;
  attendanceRate: number;
  trend: 'up' | 'down' | 'stable';
}

interface StudentAttendanceSummary {
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  class?: string;
  stats: AttendanceStats;
  recentPattern: string[];
}

interface AttendanceHistoryProps {
  classId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
  showDetailedView?: boolean;
}

export default function AttendanceHistory({
  classId,
  studentId,
  startDate,
  endDate,
  showDetailedView = true
}: AttendanceHistoryProps) {
  const [selectedClass, setSelectedClass] = useState(classId || "all");
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'semester' | 'custom'>('month');
  const [sortBy, setSortBy] = useState<'name' | 'rate' | 'absences'>('rate');
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');

  // Offline-first data fetching
  const offlineStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];
  const offlineAttendance = useLiveQuery(() => offlineDB.attendance.toArray()) || [];

  const [studentSummaries, setStudentSummaries] = useState<StudentAttendanceSummary[]>([]);

  useEffect(() => {
    processAttendanceData();
  }, [offlineStudents, offlineAttendance, selectedClass, dateRange, studentId]);

  const getDateRange = () => {
    const end = endDate ? new Date(endDate) : new Date();
    let start: Date;

    if (startDate) {
      start = new Date(startDate);
    } else {
      start = new Date();
      switch (dateRange) {
        case 'week':
          start.setDate(end.getDate() - 7);
          break;
        case 'month':
          start.setMonth(end.getMonth() - 1);
          break;
        case 'semester':
          start.setMonth(end.getMonth() - 6);
          break;
      }
    }

    return { start, end };
  };

  const processAttendanceData = () => {
    const { start, end } = getDateRange();
    
    // Filter students
    let filteredStudents = offlineStudents;
    if (selectedClass !== "all") {
      filteredStudents = filteredStudents.filter(s => s.class === selectedClass);
    }
    if (studentId) {
      filteredStudents = filteredStudents.filter(s => s.id === studentId);
    }

    const summaries: StudentAttendanceSummary[] = filteredStudents.map(student => {
      // Get attendance records for this student in the date range
      const studentAttendance = offlineAttendance.filter(record => 
        record.studentId === student.id &&
        new Date(record.date) >= start &&
        new Date(record.date) <= end
      );

      // Calculate stats
      const totalDays = studentAttendance.length;
      const presentDays = studentAttendance.filter(r => r.status === 'PRESENT').length;
      const absentDays = studentAttendance.filter(r => r.status === 'ABSENT').length;
      const lateDays = studentAttendance.filter(r => r.status === 'LATE').length;
      const excusedDays = studentAttendance.filter(r => r.status === 'EXCUSED').length;
      const sickDays = studentAttendance.filter(r => r.status === 'SICK').length;
      
      const attendanceRate = totalDays > 0 ? 
        ((presentDays + lateDays * 0.5) / totalDays) * 100 : 0;

      // Calculate trend (compare first half vs second half of period)
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (totalDays >= 6) {
        const midpoint = Math.floor(totalDays / 2);
        const firstHalf = studentAttendance.slice(0, midpoint);
        const secondHalf = studentAttendance.slice(-midpoint);
        
        const firstRate = firstHalf.length > 0 ? 
          (firstHalf.filter(r => r.status === 'PRESENT').length / firstHalf.length) * 100 : 0;
        const secondRate = secondHalf.length > 0 ?
          (secondHalf.filter(r => r.status === 'PRESENT').length / secondHalf.length) * 100 : 0;
        
        const diff = secondRate - firstRate;
        if (diff > 10) trend = 'up';
        else if (diff < -10) trend = 'down';
      }

      // Get recent pattern (last 7 days)
      const recentAttendance = studentAttendance
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 7);
      const recentPattern = recentAttendance.map(r => r.status.charAt(0)).reverse();

      return {
        studentId: student.id,
        studentName: `${student.firstName} ${student.lastName}`,
        studentAvatar: student.avatar,
        class: student.class || 'N/A',
        stats: {
          totalDays,
          presentDays,
          absentDays,
          lateDays,
          excusedDays,
          sickDays,
          attendanceRate,
          trend
        },
        recentPattern
      };
    });

    // Sort summaries
    summaries.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.studentName.localeCompare(b.studentName);
        case 'rate':
          return b.stats.attendanceRate - a.stats.attendanceRate;
        case 'absences':
          return b.stats.absentDays - a.stats.absentDays;
        default:
          return 0;
      }
    });

    setStudentSummaries(summaries);
  };

  // Get unique classes for filter
  const uniqueClasses: string[] = [...new Set(offlineStudents.map(s => s.class).filter((cls): cls is string => Boolean(cls)))];

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600 bg-green-50';
    if (rate >= 90) return 'text-blue-600 bg-blue-50';
    if (rate >= 80) return 'text-yellow-600 bg-yellow-50';
    if (rate >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'P': return <div className="w-2 h-2 bg-green-500 rounded-full" title="Present" />;
      case 'A': return <div className="w-2 h-2 bg-red-500 rounded-full" title="Absent" />;
      case 'L': return <div className="w-2 h-2 bg-yellow-500 rounded-full" title="Late" />;
      case 'E': return <div className="w-2 h-2 bg-blue-500 rounded-full" title="Excused" />;
      case 'S': return <div className="w-2 h-2 bg-purple-500 rounded-full" title="Sick" />;
      default: return <div className="w-2 h-2 bg-gray-300 rounded-full" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  // Calculate overall stats
  const overallStats = useMemo(() => {
    if (studentSummaries.length === 0) return null;
    
    const totalStudents = studentSummaries.length;
    const averageRate = studentSummaries.reduce((sum, s) => sum + s.stats.attendanceRate, 0) / totalStudents;
    const excellentAttendance = studentSummaries.filter(s => s.stats.attendanceRate >= 95).length;
    const poorAttendance = studentSummaries.filter(s => s.stats.attendanceRate < 80).length;
    
    return {
      totalStudents,
      averageRate,
      excellentAttendance,
      poorAttendance,
      excellentPercentage: (excellentAttendance / totalStudents) * 100,
      poorPercentage: (poorAttendance / totalStudents) * 100
    };
  }, [studentSummaries]);

  const StudentSummaryCard = ({ summary }: { summary: StudentAttendanceSummary }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={summary.studentAvatar} alt={summary.studentName} />
            <AvatarFallback className="bg-[#1B5B5E] text-white text-sm">
              {summary.studentName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{summary.studentName}</h3>
            <p className="text-xs text-muted-foreground">{summary.class}</p>
          </div>
          <div className="text-right">
            <div className={`px-2 py-1 rounded text-xs font-bold ${getAttendanceColor(summary.stats.attendanceRate)}`}>
              {summary.stats.attendanceRate.toFixed(1)}%
            </div>
            {getTrendIcon(summary.stats.trend)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Present: {summary.stats.presentDays}</span>
            <span className="text-muted-foreground">Absent: {summary.stats.absentDays}</span>
          </div>
          <Progress value={summary.stats.attendanceRate} className="h-1" />
          
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-muted-foreground">Recent:</span>
            <div className="flex gap-1">
              {summary.recentPattern.map((status, index) => (
                <div key={index}>
                  {getStatusIcon(status)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Attendance History</h2>
          <p className="text-sm text-muted-foreground">
            View and analyze attendance patterns over time
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map(cls => (
                  <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={(value: 'week' | 'month' | 'semester') => setDateRange(value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="semester">Last Semester</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: 'name' | 'rate' | 'absences') => setSortBy(value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rate">Attendance Rate</SelectItem>
                <SelectItem value="name">Student Name</SelectItem>
                <SelectItem value="absences">Absences</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      {overallStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rate</p>
                  <p className="text-2xl font-bold">{overallStats.averageRate.toFixed(1)}%</p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <Progress value={overallStats.averageRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Excellent (95%+)</p>
                  <p className="text-2xl font-bold text-green-600">{overallStats.excellentAttendance}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                {overallStats.excellentPercentage.toFixed(1)}% of students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">At Risk (&lt;80%)</p>
                  <p className="text-2xl font-bold text-red-600">{overallStats.poorAttendance}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-xs text-muted-foreground">
                {overallStats.poorPercentage.toFixed(1)}% of students
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student Summaries */}
      {studentSummaries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No attendance data</h3>
            <p className="text-muted-foreground text-center">
              No attendance records found for the selected filters.
            </p>
          </CardContent>
        </Card>
      ) : showDetailedView ? (
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Student Attendance Details</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Recent Pattern</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentSummaries.map((summary) => (
                    <TableRow key={summary.studentId}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={summary.studentAvatar} alt={summary.studentName} />
                            <AvatarFallback className="bg-[#1B5B5E] text-white text-xs">
                              {summary.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{summary.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{summary.class}</TableCell>
                      <TableCell>
                        <div className={`px-2 py-1 rounded text-sm font-bold ${getAttendanceColor(summary.stats.attendanceRate)}`}>
                          {summary.stats.attendanceRate.toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell>{summary.stats.presentDays}</TableCell>
                      <TableCell>{summary.stats.absentDays}</TableCell>
                      <TableCell>{summary.stats.lateDays}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {summary.recentPattern.map((status, index) => (
                            <div key={index}>
                              {getStatusIcon(status)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getTrendIcon(summary.stats.trend)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {studentSummaries.map(summary => (
            <StudentSummaryCard key={summary.studentId} summary={summary} />
          ))}
        </div>
      )}
    </div>
  );
}