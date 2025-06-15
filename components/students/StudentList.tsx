"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, UserPlus, Grid, List, Download, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TouchCard } from "@/components/ui/touch-card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  studentId?: string;
  class?: string;
  grade?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  dateOfBirth?: string;
  guardianName?: string;
  guardianPhone?: string;
  avatar?: string;
  lastAttendance?: string;
  attendanceRate?: number;
  averageGrade?: number;
}

interface StudentListProps {
  initialStudents?: Student[];
  onStudentSelect?: (student: Student) => void;
  showActions?: boolean;
  compactView?: boolean;
}

export default function StudentList({
  initialStudents = [],
  onStudentSelect,
  showActions = true,
  compactView = false
}: StudentListProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);

  // Offline-first data fetching with Dexie
  const offlineStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];
  const [students, setStudents] = useState<Student[]>(initialStudents);

  useEffect(() => {
    // Merge offline and initial data, prioritizing offline data
    const mergedStudents = offlineStudents.length > 0 ? offlineStudents : initialStudents;
    setStudents(mergedStudents);
  }, [offlineStudents, initialStudents]);

  // Memoized filtering and searching
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.studentId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.email || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesClass = classFilter === "all" || student.class === classFilter;
      const matchesStatus = statusFilter === "all" || student.status === statusFilter;
      const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter;

      return matchesSearch && matchesClass && matchesStatus && matchesGrade;
    });
  }, [students, searchTerm, classFilter, statusFilter, gradeFilter]);

  // Get unique values for filters
  const uniqueClasses = [...new Set(students.map(s => s.class).filter((cls): cls is string => Boolean(cls)))];
  const uniqueGrades = [...new Set(students.map(s => s.grade).filter((grade): grade is string => Boolean(grade)))];

  const handleStudentClick = (student: Student) => {
    if (onStudentSelect) {
      onStudentSelect(student);
    } else {
      router.push(`/students/${student.id}`);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Trigger sync with backend if online
    try {
      // This would normally fetch from API
      // For now, we'll just simulate a refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'GRADUATED': return 'bg-blue-100 text-blue-800';
      case 'TRANSFERRED': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceColor = (rate?: number) => {
    if (!rate) return 'text-gray-500';
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const StudentCard = ({ student }: { student: Student }) => (
    <TouchCard
      key={student.id}
      className="h-full"
      onTap={() => handleStudentClick(student)}
      enableHover={!compactView}
    >
      <CardHeader className={`pb-2 ${compactView ? 'p-3' : ''}`}>
        <div className="flex items-center gap-3">
          <Avatar className={compactView ? "w-8 h-8" : "w-12 h-12"}>
            <AvatarImage src={student.avatar} alt={student.firstName} />
            <AvatarFallback className="bg-[#1B5B5E] text-white">
              {student.firstName[0]}{student.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-semibold truncate ${compactView ? 'text-sm' : 'text-base'}`}>
                {student.firstName} {student.lastName}
              </h3>
              <Badge variant="secondary" className={`text-xs ${getStatusColor(student.status)}`}>
                {student.status || 'ACTIVE'}
              </Badge>
            </div>
            <p className={`text-muted-foreground truncate ${compactView ? 'text-xs' : 'text-sm'}`}>
              {student.studentId || 'N/A'} • {student.class || 'N/A'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      {!compactView && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Grade</p>
              <p className="font-medium">{student.grade || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Attendance</p>
              <p className={`font-medium ${getAttendanceColor(student.attendanceRate)}`}>
                {student.attendanceRate ? `${student.attendanceRate}%` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg Grade</p>
              <p className="font-medium">
                {student.averageGrade ? `${student.averageGrade.toFixed(1)}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Guardian</p>
              <p className="font-medium truncate">{student.guardianName || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      )}
    </TouchCard>
  );

  const StudentListItem = ({ student }: { student: Student }) => (
    <TouchCard
      key={student.id}
      className="mb-2"
      onTap={() => handleStudentClick(student)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <Avatar className="w-10 h-10">
              <AvatarImage src={student.avatar} alt={student.firstName} />
              <AvatarFallback className="bg-[#1B5B5E] text-white">
                {student.firstName[0]}{student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">
                  {student.firstName} {student.lastName}
                </h3>
                <Badge variant="secondary" className={`text-xs ${getStatusColor(student.status)}`}>
                  {student.status || 'ACTIVE'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {student.studentId || 'N/A'} • {student.class || 'N/A'} • Grade {student.grade || 'N/A'}
              </p>
            </div>
          </div>
          <div className="text-right text-sm">
            <p className={`font-medium ${getAttendanceColor(student.attendanceRate)}`}>
              {student.attendanceRate ? `${student.attendanceRate}%` : 'N/A'}
            </p>
            <p className="text-muted-foreground">Attendance</p>
          </div>
        </div>
      </CardContent>
    </TouchCard>
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search students by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {uniqueGrades.map(grade => (
                  <SelectItem key={grade} value={grade}>Grade {grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="GRADUATED">Graduated</SelectItem>
                <SelectItem value="TRANSFERRED">Transferred</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            {showActions && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>

                <Button size="sm" className="bg-[#1B5B5E] hover:bg-[#134345]">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredStudents.length} of {students.length} students
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          {offlineStudents.length > 0 && (
            <Badge variant="outline" className="text-xs">
              📱 Offline Data
            </Badge>
          )}
        </div>
      </div>

      {/* Student Grid/List */}
      {filteredStudents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? `No students match your search "${searchTerm}"`
                : "No students available with the selected filters"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? `grid gap-4 ${compactView 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`
            : 'space-y-2'
        }>
          {filteredStudents.map(student => 
            viewMode === 'grid' 
              ? <StudentCard key={student.id} student={student} />
              : <StudentListItem key={student.id} student={student} />
          )}
        </div>
      )}
    </div>
  );
}