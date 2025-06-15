"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Phone, Mail, Calendar, MapPin, Download, Share2, MoreVertical } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TouchCard } from "@/components/ui/touch-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface StudentProfileProps {
  studentId: string;
  onBack?: () => void;
  showActions?: boolean;
}

interface StudentDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  class: string;
  grade: string;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED';
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatar?: string;
  enrollmentDate: string;
  attendanceRate: number;
  averageGrade: number;
  totalCredits: number;
  medicalInfo?: string;
  notes?: string;
}

interface AttendanceRecord {
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'SICK';
  subject?: string;
}

interface GradeRecord {
  subject: string;
  assignment: string;
  grade: number;
  maxGrade: number;
  date: string;
  type: 'QUIZ' | 'EXAM' | 'ASSIGNMENT' | 'PROJECT';
}

export default function StudentProfile({ studentId, onBack, showActions = true }: StudentProfileProps) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Offline-first data fetching
  const offlineStudent = useLiveQuery(() => 
    offlineDB.students.where('id').equals(studentId).first()
  );

  const offlineAttendance = useLiveQuery(() => 
    offlineDB.attendance.where('studentId').equals(studentId).toArray()
  ) || [];

  const offlineGrades = useLiveQuery(() => 
    offlineDB.grades.where('studentId').equals(studentId).toArray()
  ) || [];

  useEffect(() => {
    if (offlineStudent) {
      setStudent(offlineStudent as StudentDetails);
      setIsLoading(false);
    } else {
      // Fallback to API if no offline data
      fetchStudentData();
    }
  }, [offlineStudent, studentId]);

  const fetchStudentData = async () => {
    try {
      // This would normally fetch from API
      // For now, we'll simulate data
      const mockStudent: StudentDetails = {
        id: studentId,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@school.com",
        studentId: "STU001",
        class: "10A",
        grade: "10",
        status: "ACTIVE",
        dateOfBirth: "2008-05-15",
        gender: "Male",
        address: "123 Main Street",
        city: "Anytown",
        guardianName: "Jane Doe",
        guardianPhone: "+1234567890",
        guardianEmail: "jane.doe@email.com",
        emergencyContact: "John Doe Sr.",
        emergencyPhone: "+1234567891",
        enrollmentDate: "2023-09-01",
        attendanceRate: 95.5,
        averageGrade: 87.3,
        totalCredits: 45,
        medicalInfo: "No known allergies",
        notes: "Excellent student, very engaged in class"
      };
      
      setStudent(mockStudent);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch student:', error);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'GRADUATED': return 'bg-blue-100 text-blue-800';
      case 'TRANSFERRED': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendanceStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800';
      case 'ABSENT': return 'bg-red-100 text-red-800';
      case 'LATE': return 'bg-yellow-100 text-yellow-800';
      case 'EXCUSED': return 'bg-blue-100 text-blue-800';
      case 'SICK': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#1B5B5E] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">😔</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Student not found</h3>
            <p className="text-muted-foreground text-center mb-4">
              The student profile could not be loaded.
            </p>
            <Button onClick={handleBack}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Student Profile</h1>
                <p className="text-sm text-muted-foreground">
                  {student.firstName} {student.lastName}
                </p>
              </div>
            </div>
            
            {showActions && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col items-center sm:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={student.avatar} alt={student.firstName} />
                  <AvatarFallback className="bg-[#1B5B5E] text-white text-2xl">
                    {student.firstName[0]}{student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Badge className={getStatusColor(student.status)}>
                  {student.status}
                </Badge>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {student.firstName} {student.lastName}
                  </h2>
                  <p className="text-muted-foreground">
                    Student ID: {student.studentId} • Grade {student.grade} • Class {student.class}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Attendance Rate</p>
                    <p className="text-2xl font-bold text-green-700">{student.attendanceRate}%</p>
                    <Progress value={student.attendanceRate} className="mt-2" />
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Average Grade</p>
                    <p className="text-2xl font-bold text-blue-700">{student.averageGrade}</p>
                    <Progress value={student.averageGrade} className="mt-2" />
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Total Credits</p>
                    <p className="text-2xl font-bold text-purple-700">{student.totalCredits}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Personal Information</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Born: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Gender: {student.gender}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.address}, {student.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Academic Summary</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Grade:</span>
                    <span className="text-sm font-medium">Grade {student.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Class:</span>
                    <span className="text-sm font-medium">{student.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Credits:</span>
                    <span className="text-sm font-medium">{student.totalCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Average Grade:</span>
                    <span className={`text-sm font-medium ${getGradeColor(student.averageGrade)}`}>
                      {student.averageGrade}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {student.notes && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Notes</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{student.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Recent Attendance</h3>
                <p className="text-sm text-muted-foreground">
                  Current attendance rate: {student.attendanceRate}%
                </p>
              </CardHeader>
              <CardContent>
                {offlineAttendance.length > 0 ? (
                  <div className="space-y-2">
                    {offlineAttendance.slice(0, 10).map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                          {record.subject && (
                            <span className="text-sm text-muted-foreground">
                              {record.subject}
                            </span>
                          )}
                        </div>
                        <Badge className={getAttendanceStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No attendance records available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Recent Grades</h3>
                <p className="text-sm text-muted-foreground">
                  Current average: {student.averageGrade}%
                </p>
              </CardHeader>
              <CardContent>
                {offlineGrades.length > 0 ? (
                  <div className="space-y-2">
                    {offlineGrades.slice(0, 10).map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{grade.subject}</p>
                          <p className="text-xs text-muted-foreground">
                            {grade.assignment} • {new Date(grade.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${getGradeColor((grade.grade / grade.maxGrade) * 100)}`}>
                            {grade.grade}/{grade.maxGrade}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {((grade.grade / grade.maxGrade) * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No grade records available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Guardian Information</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">{student.guardianName}</p>
                    <p className="text-xs text-muted-foreground">Primary Guardian</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.guardianPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.guardianEmail}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Emergency Contact</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">{student.emergencyContact}</p>
                    <p className="text-xs text-muted-foreground">Emergency Contact</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{student.emergencyPhone}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {student.medicalInfo && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Medical Information</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{student.medicalInfo}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}