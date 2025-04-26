"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users, Book, Calendar, Upload, FileText, CheckCircle, ChevronRight,
  BarChart2, TrendingUp, Target, BookOpen, ClipboardList, PlusCircle,
  Layers, BookMarked, Lightbulb, Database, Award, Radio, CircleDollarSign,
  Clock, AlertTriangle, Bell, Pencil, Download, PieChart, GraduationCap, Trash
} from "lucide-react";
import { ClassTable, ClassData } from '@/components/admin/ClassTable'; // Use the correct import
import { AttendanceManagement } from '@/components/admin/AttendanceManagement';
import { TimetableManagement } from '@/components/admin/TimetableManagement';
import { UserFormDialog } from '@/components/admin/UserFormDialog';
import { ClassFormDialog } from '@/components/admin/ClassFormDialog';

// Define interfaces for mock data (adjust as needed based on actual API)
interface SchoolSummary {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceRate: number;
}

interface StudentDistribution {
  grade: string;
  count: number;
}

interface RecentActivity {
  id: string;
  name: string; // Can be student or teacher name
  subject?: string; // For teachers
  status?: string; // e.g., 'online', 'active', 'inactive'
  description: string;
  time: string;
}

// Mock Data (Replace with actual data fetching)
const schoolData: SchoolSummary = {
  totalStudents: 1250,
  totalTeachers: 85,
  totalClasses: 45,
  attendanceRate: 92.5,
};

const studentDistribution: StudentDistribution[] = [
  { grade: "Grade 1", count: 150 },
  { grade: "Grade 2", count: 165 },
  { grade: "Grade 3", count: 140 },
  { grade: "Grade 4", count: 155 },
  { grade: "Grade 5", count: 160 },
  { grade: "Grade 6", count: 145 },
  { grade: "Grade 7", count: 170 },
  { grade: "Grade 8", count: 165 },
];

// Corrected mock data structure to match ClassData type from ClassTable.tsx
const classesMockData: ClassData[] = [
  { id: 'cls-1', name: 'Grade 5A', teacher: 'Sarah Johnson', studentCount: 28 },
  { id: 'cls-2', name: 'Grade 4B', teacher: 'David Chen', studentCount: 25 },
  { id: 'cls-3', name: 'Grade 6A', teacher: 'Emma Williams', studentCount: 30 },
];

const recentActivitiesMock: RecentActivity[] = [
    { id: 'act-1', name: 'John Doe', description: 'submitted Assignment 3.', time: '2 hours ago', status: 'active' },
    { id: 'act-2', name: 'Jane Smith', description: 'marked present.', time: '3 hours ago', status: 'active' },
    { id: 'act-3', name: 'Mr. Davis', subject: 'Math', description: 'posted a new announcement.', time: '1 day ago', status: 'online' },
    { id: 'act-4', name: 'Emily White', description: 'enrolled in Grade 5.', time: '2 days ago', status: 'active' },
];
// End Mock Data

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const [activeView, setActiveView] = useState('overview');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showClassForm, setShowClassForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null); // Replace 'any' with actual User type
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [userFormMode, setUserFormMode] = useState<'add' | 'edit'>('add');
  const [classFormMode, setClassFormMode] = useState<'add' | 'edit'>('add');
  const [userRoleToAdd, setUserRoleToAdd] = useState<'student' | 'teacher' | 'admin'>('student'); // Default role for adding

  // Redirect if not admin or loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (user?.role !== "admin") {
    // Redirect to their appropriate dashboard or login
    redirect(user?.role ? `/dashboard/${user.role}` : "/auth/signin");
    return null; // Prevent rendering during redirect
  }

  const handleAddUserClick = (role: 'student' | 'teacher' | 'admin') => {
    setUserRoleToAdd(role);
    setUserFormMode('add');
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (userData: any) => { // Replace 'any' with actual User type
    setSelectedUser(userData);
    setUserFormMode('edit');
    setShowUserForm(true);
    console.log("Edit user:", userData);
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Delete user:", userId);
    // Add deletion logic here (e.g., API call, update state)
    // Example: setUsers(users.filter(u => u.id !== userId));
    alert(`User ${userId} deleted (mock)`);
  };

  const handleAddClassClick = () => {
    setClassFormMode('add');
    setSelectedClass(null);
    setShowClassForm(true);
  };

  const handleEditClass = (classData: ClassData) => {
    setSelectedClass(classData);
    setClassFormMode('edit');
    setShowClassForm(true);
    console.log("Edit class:", classData);
  };

  const handleDeleteClass = (classId: string) => {
    console.log("Delete class:", classId);
    // Add deletion logic here (e.g., API call, update state)
    // Example: setClasses(classes.filter(c => c.id !== classId));
    alert(`Class ${classId} deleted (mock)`);
  };

  // Handler for saving user (called from UserFormDialog)
  const handleUserSaved = (savedUserData: any) => {
      console.log("User saved:", savedUserData);
      // TODO: Update local state or refetch data
      setShowUserForm(false); // Close dialog
  };

  // Handler for saving class (called from ClassFormDialog)
  const handleClassSaved = (savedClassData: any) => {
      console.log("Class saved:", savedClassData);
      // TODO: Update local state or refetch data
      setShowClassForm(false); // Close dialog
  };


  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        {/* Add any header actions if needed */}
        <Button onClick={() => alert('Settings clicked!')} variant="outline" size="sm">Settings</Button>
      </div>

      {/* School Summary Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalStudents}</div>
            <p className="text-xs text-muted-foreground">+20 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">+5 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.totalClasses}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schoolData.attendanceRate}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
      </section>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveView} value={activeView}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
             {/* Quick Actions Card */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleAddUserClick('student')}><PlusCircle className="h-4 w-4 mr-1" /> Add Student</Button>
                <Button variant="outline" size="sm" onClick={() => handleAddUserClick('teacher')}><PlusCircle className="h-4 w-4 mr-1" /> Add Teacher</Button>
                <Button variant="outline" size="sm" onClick={handleAddClassClick}><Layers className="h-4 w-4 mr-1" /> Add Class</Button>
                <Button variant="outline" size="sm"><BookOpen className="h-4 w-4 mr-1" /> Add Subject</Button>
                <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-1" /> Add Event</Button>
                <Button variant="outline" size="sm"><ClipboardList className="h-4 w-4 mr-1" /> Log Attendance</Button>
                <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1" /> Upload Document</Button>
                <Button variant="outline" size="sm" onClick={() => handleAddUserClick('admin')}><PlusCircle className="h-4 w-4 mr-1" /> Add Admin</Button>
              </CardContent>
            </Card>
            {/* Recent Activity Card */}
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {recentActivitiesMock.slice(0, 4).map(activity => ( // Limit to 4 items
                            <li key={activity.id} className="flex items-center justify-between text-sm">
                                <span>{activity.name} {activity.description}</span>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant="link" size="sm" className="ml-auto">View All</Button>
                </CardFooter>
            </Card>
            {/* Placeholder for another card */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">No new notifications.</p>
                    {/* Add notification list here */}
                </CardContent>
            </Card>
          </div>
          {/* Add more overview components like charts if needed */}
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Student Directory</CardTitle>
                  <Button onClick={() => handleAddUserClick('student')}>
                    <PlusCircle className="h-4 w-4 mr-2" /> Add Student
                  </Button>
                </div>
                 <CardDescription>Manage student records.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Map through actual student data - Placeholder */}
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Grade 5</TableCell>
                      <TableCell><Badge variant="default">Active</Badge></TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser({ id: 'user-1', name: 'John Doe', email: 'john@example.com', role: 'student'})}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser('user-1')}><Trash className="h-4 w-4 text-destructive" /></Button> {/* Added Delete */}
                      </TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Grade 4</TableCell>
                      <TableCell><Badge variant="secondary">Inactive</Badge></TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser({ id: 'user-2', name: 'Jane Smith', email: 'jane@example.com', role: 'student'})}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser('user-2')}><Trash className="h-4 w-4 text-destructive" /></Button> {/* Added Delete */}
                      </TableCell>
                    </TableRow>
                    {/* Add more rows based on actual data */}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
                <CardDescription>Number of students per grade</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-3"> {/* Increased spacing */}
                  {studentDistribution.map(grade => (
                    <div key={grade.grade} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{grade.grade}</span>
                        <span className="text-muted-foreground">{grade.count} students</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${schoolData.totalStudents > 0 ? (grade.count / schoolData.totalStudents) * 100 : 0}%` }} // Added check for totalStudents > 0
                        ></div>
                      </div>
                    </div>
                  ))}
                </div> {/* Closing div for space-y-3 */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Classes Tab */}
        <TabsContent value="classes">
           <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Class Management</CardTitle>
                        <Button onClick={handleAddClassClick}>
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Class
                        </Button>
                    </div>
                    <CardDescription>View, edit, or delete classes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ClassTable
                        classes={classesMockData} // Use mock data for now
                        onEdit={handleEditClass}
                        onDelete={handleDeleteClass}
                    />
                </CardContent>
            </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <AttendanceManagement />
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable">
          <TimetableManagement />
        </TabsContent>

        {/* Teachers Tab */}
        <TabsContent value="teachers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Teacher Directory</CardTitle>
                <Button onClick={() => handleAddUserClick('teacher')}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Teacher
                </Button>
              </div>
               <CardDescription>Manage teacher records.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Map through actual teacher data - Using recentActivitiesMock as placeholder */}
                  {recentActivitiesMock.filter(t => t.subject).map(teacher => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>
                        <Badge variant={teacher.status === 'online' ? 'default' : 'secondary'}>
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEditUser({ ...teacher, role: 'teacher', email: `${teacher.name.toLowerCase().replace(' ', '.')}@example.com` })}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(teacher.id)}><Trash className="h-4 w-4 text-destructive" /></Button> {/* Added Delete */}
                      </TableCell>
                    </TableRow>
                  ))}
                   {/* Add more rows based on actual data */}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Finances Tab */}
        <TabsContent value="finances">
            <Card>
                <CardHeader>
                    <CardTitle>Financial Overview</CardTitle>
                    <CardDescription>Placeholder for financial data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Financial details will be displayed here.</p>
                    {/* Add charts, summaries, etc. */}
                </CardContent>
            </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
            <Card>
                <CardHeader>
                    <CardTitle>School Calendar</CardTitle>
                    <CardDescription>Placeholder for calendar component.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Calendar events will be displayed here.</p>
                    {/* Integrate a Calendar component */}
                </CardContent>
            </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
            <Card>
                <CardHeader>
                    <CardTitle>Resource Management</CardTitle>
                    <CardDescription>Placeholder for resource management.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Resource links, documents, etc., will be managed here.</p>
                    {/* Add resource management UI */}
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>

      {/* Modals - Use correct props based on component definitions */}
      <UserFormDialog
        mode={userFormMode}
        roleToAddOrEdit={userRoleToAdd} // Pass the role determined by the button click
        initialData={selectedUser}
        isOpen={showUserForm}
        onOpenChange={setShowUserForm} // Use onOpenChange
        onUserSaved={handleUserSaved} // Add handler for when user is saved
      />
      <ClassFormDialog
        mode={classFormMode}
        initialData={selectedClass}
        isOpen={showClassForm}
        onOpenChange={setShowClassForm} // Use onOpenChange
        onClassSaved={handleClassSaved} // Add handler for when class is saved
      />
    </div>
  );
}
