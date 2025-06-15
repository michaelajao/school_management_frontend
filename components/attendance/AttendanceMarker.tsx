"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Calendar, Users, CheckCircle, XCircle, Clock, UserX, Heart, Save, RefreshCw, AlertCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB, OfflineAttendance } from "@/lib/offline/database";
import { toast } from "sonner";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  class?: string;
  avatar?: string;
  lastAttendance?: string;
  attendanceRate?: number;
}

interface AttendanceRecord {
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'SICK';
  notes?: string;
}

interface AttendanceMarkerProps {
  classId?: string;
  subject?: string;
  date?: string;
  showQuickActions?: boolean;
}

export default function AttendanceMarker({
  classId,
  subject,
  date = new Date().toISOString().split('T')[0],
  showQuickActions = true
}: AttendanceMarkerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(classId || "all");
  const [selectedDate, setSelectedDate] = useState(date);
  const [attendanceRecords, setAttendanceRecords] = useState<Map<string, AttendanceRecord>>(new Map());
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSaving, setIsSaving] = useState(false);

  // Offline-first data fetching
  const offlineStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];
  const existingAttendance = useLiveQuery(() => 
    offlineDB.attendance
      .where('date')
      .equals(selectedDate)
      .and(record => selectedClass === "all" || record.classId === selectedClass)
      .toArray()
  ) || [];

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (offlineStudents.length === 0) {
      seedMockStudents();
    } else {
      processStudents();
    }
  }, [offlineStudents, selectedClass]);

  useEffect(() => {
    // Load existing attendance for the selected date
    const attendanceMap = new Map<string, AttendanceRecord>();
    existingAttendance.forEach(record => {
      attendanceMap.set(record.studentId, {
        studentId: record.studentId,
        status: record.status,
        notes: record.notes
      });
    });
    setAttendanceRecords(attendanceMap);
    setUnsavedChanges(false);
  }, [existingAttendance, selectedDate]);

  const processStudents = () => {
    let filtered = offlineStudents;
    
    if (selectedClass !== "all") {
      filtered = filtered.filter(student => student.class === selectedClass);
    }
    
    setStudents(filtered);
  };

  const seedMockStudents = async () => {
    // This would normally not be needed as students should already exist
    // But included for completeness
    const mockStudents = [
      {
        id: "1",
        firstName: "Alice",
        lastName: "Johnson",
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
      }
      // Add more mock students as needed
    ];

    try {
      await offlineDB.students.bulkAdd(mockStudents);
    } catch (error) {
      console.error('Failed to seed mock students:', error);
    }
  };

  // Filtered students based on search
  const filteredStudents = useMemo(() => {
    return students.filter(student => 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.studentId || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Get unique classes for filter
  const uniqueClasses: string[] = [...new Set(offlineStudents.map(s => s.class).filter((cls): cls is string => Boolean(cls)))];

  const markAttendance = (studentId: string, status: AttendanceRecord['status'], notes?: string) => {
    const newRecord: AttendanceRecord = { studentId, status, notes };
    const updatedRecords = new Map(attendanceRecords);
    updatedRecords.set(studentId, newRecord);
    setAttendanceRecords(updatedRecords);
    setUnsavedChanges(true);
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'PRESENT': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'ABSENT': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'LATE': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'EXCUSED': return <UserX className="w-5 h-5 text-blue-600" />;
      case 'SICK': return <Heart className="w-5 h-5 text-purple-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'PRESENT': return 'bg-green-100 text-green-800 border-green-200';
      case 'ABSENT': return 'bg-red-100 text-red-800 border-red-200';
      case 'LATE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'EXCUSED': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SICK': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const saveAttendance = async () => {
    if (!unsavedChanges) return;
    
    setIsSaving(true);
    const attendanceData: OfflineAttendance[] = [];
    
    attendanceRecords.forEach(record => {
      attendanceData.push({
        studentId: record.studentId,
        classId: selectedClass !== "all" ? selectedClass : students.find(s => s.id === record.studentId)?.class || "",
        date: selectedDate,
        present: record.status === 'PRESENT',
        status: record.status,
        subject: subject,
        notes: record.notes,
        synced: false,
        lastSync: Date.now()
      });
    });

    try {
      // Save to offline database
      await offlineDB.transaction('rw', offlineDB.attendance, async () => {
        // Delete existing records for this date and class
        await offlineDB.attendance
          .where('date')
          .equals(selectedDate)
          .and(record => selectedClass === "all" || record.classId === selectedClass)
          .delete();
        
        // Add new records
        await offlineDB.attendance.bulkAdd(attendanceData);
      });
      
      setUnsavedChanges(false);
      toast.success(isOnline ? "Attendance saved and synced!" : "Attendance saved offline. Will sync when online.");
      
      // TODO: Trigger background sync if online
      if (isOnline) {
        // Trigger sync with backend
      }
    } catch (error) {
      console.error('Failed to save attendance:', error);
      toast.error("Failed to save attendance. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const markAllPresent = () => {
    const updatedRecords = new Map(attendanceRecords);
    filteredStudents.forEach(student => {
      updatedRecords.set(student.id, { studentId: student.id, status: 'PRESENT' });
    });
    setAttendanceRecords(updatedRecords);
    setUnsavedChanges(true);
  };

  const markAllAbsent = () => {
    const updatedRecords = new Map(attendanceRecords);
    filteredStudents.forEach(student => {
      updatedRecords.set(student.id, { studentId: student.id, status: 'ABSENT' });
    });
    setAttendanceRecords(updatedRecords);
    setUnsavedChanges(true);
  };

  const clearAll = () => {
    setAttendanceRecords(new Map());
    setUnsavedChanges(true);
  };

  // Calculate summary stats
  const summary = useMemo(() => {
    const total = filteredStudents.length;
    const marked = attendanceRecords.size;
    const present = Array.from(attendanceRecords.values()).filter(r => r.status === 'PRESENT').length;
    const absent = Array.from(attendanceRecords.values()).filter(r => r.status === 'ABSENT').length;
    const late = Array.from(attendanceRecords.values()).filter(r => r.status === 'LATE').length;
    const excused = Array.from(attendanceRecords.values()).filter(r => r.status === 'EXCUSED').length;
    const sick = Array.from(attendanceRecords.values()).filter(r => r.status === 'SICK').length;
    
    return { total, marked, present, absent, late, excused, sick };
  }, [filteredStudents, attendanceRecords]);

  const StudentAttendanceCard = ({ student }: { student: Student }) => {
    const record = attendanceRecords.get(student.id);
    
    return (
      <Card className="relative">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={student.avatar} alt={student.firstName} />
              <AvatarFallback className="bg-[#1B5B5E] text-white">
                {student.firstName[0]}{student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{student.firstName} {student.lastName}</h3>
              <p className="text-sm text-muted-foreground">
                {student.studentId || 'N/A'} • {student.class || 'N/A'}
              </p>
            </div>
            {record && (
              <div className="absolute top-2 right-2">
                {getStatusIcon(record.status)}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant={record?.status === 'PRESENT' ? 'default' : 'outline'}
              className={record?.status === 'PRESENT' ? 'bg-green-600 hover:bg-green-700' : ''}
              onClick={() => markAttendance(student.id, 'PRESENT')}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Present
            </Button>
            
            <Button
              size="sm"
              variant={record?.status === 'ABSENT' ? 'default' : 'outline'}
              className={record?.status === 'ABSENT' ? 'bg-red-600 hover:bg-red-700' : ''}
              onClick={() => markAttendance(student.id, 'ABSENT')}
            >
              <XCircle className="w-4 h-4 mr-1" />
              Absent
            </Button>
            
            <Button
              size="sm"
              variant={record?.status === 'LATE' ? 'default' : 'outline'}
              className={record?.status === 'LATE' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
              onClick={() => markAttendance(student.id, 'LATE')}
            >
              <Clock className="w-4 h-4 mr-1" />
              Late
            </Button>
            
            <Select
              value={record?.status === 'EXCUSED' || record?.status === 'SICK' ? record.status : ''}
              onValueChange={(value: string) => {
                if (value === 'EXCUSED' || value === 'SICK') {
                  markAttendance(student.id, value as AttendanceRecord['status']);
                }
              }}
            >
              <SelectTrigger className={`h-8 ${
                record?.status === 'EXCUSED' || record?.status === 'SICK' 
                  ? getStatusColor(record.status) 
                  : ''
              }`}>
                <SelectValue placeholder="More" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXCUSED">Excused</SelectItem>
                <SelectItem value="SICK">Sick</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Mark Attendance</h2>
            <p className="text-sm text-muted-foreground">
              {selectedDate} • {selectedClass !== "all" ? `Class ${selectedClass}` : "All Classes"}
              {!isOnline && (
                <Badge variant="outline" className="ml-2 text-orange-600 border-orange-200">
                  📱 Offline Mode
                </Badge>
              )}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={saveAttendance}
              disabled={!unsavedChanges || isSaving}
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-60">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
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
          
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {unsavedChanges && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            You have unsaved changes. Don't forget to save your attendance records.
          </AlertDescription>
        </Alert>
      )}

      {/* Summary and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">
                    {summary.marked}/{summary.total} students marked
                  </span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    {summary.present} Present
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    {summary.absent} Absent
                  </span>
                  {summary.late > 0 && (
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      {summary.late} Late
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#1B5B5E] h-2 rounded-full transition-all duration-300"
                style={{ width: `${summary.total > 0 ? (summary.marked / summary.total) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {showQuickActions && (
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-sm font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={markAllPresent}
              >
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Mark All Present
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={markAllAbsent}
              >
                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                Mark All Absent
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full justify-start"
                onClick={clearAll}
              >
                Clear All
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Students Grid */}
      {filteredStudents.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No students found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? `No students match your search "${searchTerm}"`
                : "No students available for the selected class"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.map(student => (
            <StudentAttendanceCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
}