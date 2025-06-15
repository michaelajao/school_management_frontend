"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Download, Plus, Edit2, Trash2, MoreVertical } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface GradeEntry {
  id?: number;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  subject: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  percentage: number;
  date: string;
  type: 'QUIZ' | 'EXAM' | 'ASSIGNMENT' | 'PROJECT' | 'PARTICIPATION';
  classId: string;
  teacherId?: string;
  notes?: string;
  synced: boolean;
}

interface GradebookTableProps {
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  showActions?: boolean;
  compactView?: boolean;
}

export default function GradebookTable({
  classId,
  subjectId,
  teacherId,
  showActions = true,
  compactView = false
}: GradebookTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [sortBy, setSortBy] = useState<'date' | 'student' | 'grade'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Offline-first data fetching
  const offlineGrades = useLiveQuery(() => offlineDB.grades.toArray()) || [];
  const offlineStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];
  
  const [grades, setGrades] = useState<GradeEntry[]>([]);

  useEffect(() => {
    if (offlineGrades.length === 0) {
      seedMockGrades();
    } else {
      processGrades();
    }
  }, [offlineGrades, offlineStudents]);

  const processGrades = () => {
    const processedGrades = offlineGrades.map(grade => {
      const student = offlineStudents.find(s => s.id === grade.studentId);
      return {
        ...grade,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Unknown Student',
        studentAvatar: student?.avatar,
        percentage: (grade.grade / grade.maxGrade) * 100
      };
    });
    setGrades(processedGrades);
  };

  const seedMockGrades = async () => {
    const mockGrades = [
      {
        studentId: "1",
        subject: "Mathematics",
        assignment: "Algebra Test",
        grade: 85,
        maxGrade: 100,
        date: "2024-06-10",
        type: "EXAM" as const,
        classId: "10A",
        teacherId: "teacher1",
        notes: "Good understanding of concepts",
        synced: false,
        lastSync: Date.now()
      },
      {
        studentId: "2",
        subject: "Mathematics",
        assignment: "Algebra Test",
        grade: 78,
        maxGrade: 100,
        date: "2024-06-10",
        type: "EXAM" as const,
        classId: "10A",
        teacherId: "teacher1",
        synced: false,
        lastSync: Date.now()
      },
      {
        studentId: "1",
        subject: "English",
        assignment: "Essay Assignment",
        grade: 92,
        maxGrade: 100,
        date: "2024-06-12",
        type: "ASSIGNMENT" as const,
        classId: "10A",
        teacherId: "teacher2",
        notes: "Excellent writing skills",
        synced: false,
        lastSync: Date.now()
      },
      {
        studentId: "3",
        subject: "Science",
        assignment: "Chemistry Quiz",
        grade: 88,
        maxGrade: 100,
        date: "2024-06-11",
        type: "QUIZ" as const,
        classId: "11A",
        teacherId: "teacher3",
        synced: false,
        lastSync: Date.now()
      },
      {
        studentId: "4",
        subject: "History",
        assignment: "Research Project",
        grade: 95,
        maxGrade: 100,
        date: "2024-06-13",
        type: "PROJECT" as const,
        classId: "12A",
        teacherId: "teacher4",
        notes: "Outstanding research and presentation",
        synced: false,
        lastSync: Date.now()
      }
    ];

    try {
      await offlineDB.grades.bulkAdd(mockGrades);
    } catch (error) {
      console.error('Failed to seed mock grades:', error);
    }
  };

  // Filtered and sorted grades
  const filteredGrades = useMemo(() => {
    const filtered = grades.filter(grade => {
      const matchesSearch = 
        grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.assignment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grade.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubject = subjectFilter === "all" || grade.subject === subjectFilter;
      const matchesType = typeFilter === "all" || grade.type === typeFilter;
      
      let matchesDate = true;
      if (dateFilter !== "all") {
        const gradeDate = new Date(grade.date);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - gradeDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case "today":
            matchesDate = daysDiff === 0;
            break;
          case "week":
            matchesDate = daysDiff <= 7;
            break;
          case "month":
            matchesDate = daysDiff <= 30;
            break;
        }
      }

      return matchesSearch && matchesSubject && matchesType && matchesDate;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'student':
          comparison = a.studentName.localeCompare(b.studentName);
          break;
        case 'grade':
          comparison = a.percentage - b.percentage;
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [grades, searchTerm, subjectFilter, typeFilter, dateFilter, sortBy, sortOrder]);

  // Get unique values for filters
  const uniqueSubjects = [...new Set(grades.map(g => g.subject))];

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 80) return 'text-blue-600 bg-blue-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EXAM': return 'bg-red-100 text-red-800';
      case 'QUIZ': return 'bg-blue-100 text-blue-800';
      case 'ASSIGNMENT': return 'bg-green-100 text-green-800';
      case 'PROJECT': return 'bg-purple-100 text-purple-800';
      case 'PARTICIPATION': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSort = (column: 'date' | 'student' | 'grade') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const GradeCard = ({ grade }: { grade: GradeEntry }) => (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={grade.studentAvatar} alt={grade.studentName} />
              <AvatarFallback className="bg-[#1B5B5E] text-white text-sm">
                {grade.studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{grade.studentName}</h3>
              <p className="text-xs text-muted-foreground">{grade.subject}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-2 py-1 rounded text-sm font-bold ${getGradeColor(grade.percentage)}`}>
              {grade.grade}/{grade.maxGrade}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {grade.percentage.toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{grade.assignment}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(grade.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getTypeColor(grade.type)}>
              {grade.type}
            </Badge>
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Grade
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {grade.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-muted-foreground">
            {grade.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Search and Filter Header */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by student, assignment, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {uniqueSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="EXAM">Exams</SelectItem>
                <SelectItem value="QUIZ">Quizzes</SelectItem>
                <SelectItem value="ASSIGNMENT">Assignments</SelectItem>
                <SelectItem value="PROJECT">Projects</SelectItem>
                <SelectItem value="PARTICIPATION">Participation</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            {showActions && (
              <>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-[#1B5B5E] hover:bg-[#134345]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Grade
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filteredGrades.length} of {grades.length} grades
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <Select value={sortBy} onValueChange={(value: 'date' | 'student' | 'grade') => setSortBy(value)}>
              <SelectTrigger className="w-24 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="grade">Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Gradebook Content */}
      {filteredGrades.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No grades found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? `No grades match your search "${searchTerm}"`
                : "No grades available with the selected filters"
              }
            </p>
          </CardContent>
        </Card>
      ) : compactView || viewMode === 'cards' ? (
        <div className="space-y-2">
          {filteredGrades.map(grade => (
            <GradeCard key={grade.id} grade={grade} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('student')}
                    >
                      Student {sortBy === 'student' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('grade')}
                    >
                      Grade {sortBy === 'grade' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('date')}
                    >
                      Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </TableHead>
                    {showActions && <TableHead className="w-12"></TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={grade.studentAvatar} alt={grade.studentName} />
                            <AvatarFallback className="bg-[#1B5B5E] text-white text-xs">
                              {grade.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{grade.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{grade.subject}</TableCell>
                      <TableCell className="text-sm">{grade.assignment}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(grade.type)}>
                          {grade.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded text-sm font-bold ${getGradeColor(grade.percentage)}`}>
                            {grade.grade}/{grade.maxGrade}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({grade.percentage.toFixed(1)}%)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(grade.date).toLocaleDateString()}
                      </TableCell>
                      {showActions && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Grade
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}