"use client";

import { useState, useEffect } from "react";
import { Plus, Users, TrendingUp, Calendar, Award } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StudentList from "@/components/students/StudentList";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface StudentStats {
  total: number;
  active: number;
  inactive: number;
  graduated: number;
  transferred: number;
  averageAttendance: number;
  averageGrade: number;
}

export default function StudentsPage() {
  const [stats, setStats] = useState<StudentStats>({
    total: 0,
    active: 0,
    inactive: 0,
    graduated: 0,
    transferred: 0,
    averageAttendance: 0,
    averageGrade: 0
  });

  // Fetch students from offline database
  const students = useLiveQuery(() => offlineDB.students.toArray()) || [];

  useEffect(() => {
    if (students.length > 0) {
      calculateStats();
    } else {
      // Seed with mock data if no students exist
      seedMockData();
    }
  }, [students]);

  const calculateStats = () => {
    const total = students.length;
    const active = students.filter(s => s.status === 'ACTIVE').length;
    const inactive = students.filter(s => s.status === 'INACTIVE').length;
    const graduated = students.filter(s => s.status === 'GRADUATED').length;
    const transferred = students.filter(s => s.status === 'TRANSFERRED').length;
    
    const totalAttendance = students.reduce((sum, s) => sum + (s.attendanceRate || 0), 0);
    const totalGrades = students.reduce((sum, s) => sum + (s.averageGrade || 0), 0);
    
    setStats({
      total,
      active,
      inactive,
      graduated,
      transferred,
      averageAttendance: total > 0 ? totalAttendance / total : 0,
      averageGrade: total > 0 ? totalGrades / total : 0
    });
  };

  const seedMockData = async () => {
    const mockStudents = [
      {
        id: "1",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@school.com",
        studentId: "STU001",
        class: "10A",
        grade: "10",
        status: "ACTIVE" as const,
        dateOfBirth: "2008-03-15",
        gender: "Female",
        address: "123 Oak Street",
        city: "Springfield",
        guardianName: "Mary Johnson",
        guardianPhone: "+1234567890",
        guardianEmail: "mary.johnson@email.com",
        emergencyContact: "Robert Johnson",
        emergencyPhone: "+1234567891",
        enrollmentDate: "2023-09-01",
        attendanceRate: 96.5,
        averageGrade: 89.2,
        totalCredits: 48,
        synced: false,
        lastSync: Date.now()
      },
      {
        id: "2",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob.smith@school.com",
        studentId: "STU002",
        class: "10B",
        grade: "10",
        status: "ACTIVE" as const,
        dateOfBirth: "2008-07-22",
        gender: "Male",
        address: "456 Pine Avenue",
        city: "Springfield",
        guardianName: "Sarah Smith",
        guardianPhone: "+1234567892",
        guardianEmail: "sarah.smith@email.com",
        emergencyContact: "David Smith",
        emergencyPhone: "+1234567893",
        enrollmentDate: "2023-09-01",
        attendanceRate: 92.3,
        averageGrade: 85.7,
        totalCredits: 45,
        synced: false,
        lastSync: Date.now()
      },
      {
        id: "3",
        firstName: "Carol",
        lastName: "Brown",
        email: "carol.brown@school.com",
        studentId: "STU003",
        class: "11A",
        grade: "11",
        status: "ACTIVE" as const,
        dateOfBirth: "2007-11-08",
        gender: "Female",
        address: "789 Maple Drive",
        city: "Springfield",
        guardianName: "Linda Brown",
        guardianPhone: "+1234567894",
        guardianEmail: "linda.brown@email.com",
        emergencyContact: "Michael Brown",
        emergencyPhone: "+1234567895",
        enrollmentDate: "2022-09-01",
        attendanceRate: 98.1,
        averageGrade: 93.4,
        totalCredits: 52,
        synced: false,
        lastSync: Date.now()
      },
      {
        id: "4",
        firstName: "David",
        lastName: "Wilson",
        email: "david.wilson@school.com",
        studentId: "STU004",
        class: "12A",
        grade: "12",
        status: "ACTIVE" as const,
        dateOfBirth: "2006-12-12",
        gender: "Male",
        address: "321 Elm Street",
        city: "Springfield",
        guardianName: "Jennifer Wilson",
        guardianPhone: "+1234567896",
        guardianEmail: "jennifer.wilson@email.com",
        emergencyContact: "Thomas Wilson",
        emergencyPhone: "+1234567897",
        enrollmentDate: "2021-09-01",
        attendanceRate: 94.7,
        averageGrade: 88.9,
        totalCredits: 56,
        synced: false,
        lastSync: Date.now()
      },
      {
        id: "5",
        firstName: "Emma",
        lastName: "Davis",
        email: "emma.davis@school.com",
        studentId: "STU005",
        class: "9A",
        grade: "9",
        status: "ACTIVE" as const,
        dateOfBirth: "2009-04-30",
        gender: "Female",
        address: "654 Cedar Lane",
        city: "Springfield",
        guardianName: "Patricia Davis",
        guardianPhone: "+1234567898",
        guardianEmail: "patricia.davis@email.com",
        emergencyContact: "James Davis",
        emergencyPhone: "+1234567899",
        enrollmentDate: "2024-09-01",
        attendanceRate: 97.2,
        averageGrade: 91.6,
        totalCredits: 42,
        synced: false,
        lastSync: Date.now()
      }
    ];

    try {
      await offlineDB.students.bulkAdd(mockStudents);
    } catch (error) {
      console.error('Failed to seed mock data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'graduated': return 'bg-blue-100 text-blue-800';
      case 'transferred': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Students</h1>
              <p className="text-gray-600 mt-1">
                Manage student profiles, track attendance, and monitor academic progress
              </p>
            </div>
            <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge className={getStatusColor('active')}>
                  {stats.active} Active
                </Badge>
                {stats.inactive > 0 && (
                  <Badge className={getStatusColor('inactive')}>
                    {stats.inactive} Inactive
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                  <p className="text-2xl font-bold">{stats.averageAttendance.toFixed(1)}%</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all active students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Grade</p>
                  <p className="text-2xl font-bold">{stats.averageGrade.toFixed(1)}</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                School-wide average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Performance</p>
                  <p className="text-2xl font-bold">
                    {stats.averageGrade >= 90 ? "A" : 
                     stats.averageGrade >= 80 ? "B" : 
                     stats.averageGrade >= 70 ? "C" : 
                     stats.averageGrade >= 60 ? "D" : "F"}
                  </p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {stats.graduated > 0 && (
                  <Badge className={getStatusColor('graduated')}>
                    {stats.graduated} Graduated
                  </Badge>
                )}
                {stats.transferred > 0 && (
                  <Badge className={getStatusColor('transferred')}>
                    {stats.transferred} Transferred
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">All Students</h2>
                <p className="text-sm text-muted-foreground">
                  Search, filter, and manage student profiles
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <StudentList 
              initialStudents={students}
              showActions={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}