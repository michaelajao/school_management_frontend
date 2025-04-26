"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Database, Upload, Users, Book, Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserFormDialog } from "@/components/admin/UserFormDialog";
import { ClassTable, ClassData } from "@/components/admin/ClassTable";
import { ClassFormDialog, ClassFormData } from "@/components/admin/ClassFormDialog";
import { TimetableManagement } from "@/components/admin/TimetableManagement"; 
import { AttendanceManagement } from "@/components/admin/AttendanceManagement"; 
import { AssignmentsManagement } from "@/components/admin/AssignmentsManagement"; 
import { toast } from "sonner";
import Link from "next/link";

// Define UserData type matching the dialog's output (id can be undefined initially)
interface UserData {
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  id?: string;
  class?: string;
  subject?: string;
}

// UserDataWithId ensures we have an ID
interface UserDataWithId extends UserData {
  id: string;
}

// Mock data for initial state
const mockAdmins: UserDataWithId[] = [
  { id: 'admin-1', name: 'John Smith', email: 'john@example.com', role: 'admin' },
  { id: 'admin-2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'admin' },
];

const mockTeachers: UserDataWithId[] = [
  { id: 'teacher-1', name: 'Michael Brown', email: 'michael@example.com', role: 'teacher', subject: 'Mathematics' },
  { id: 'teacher-2', name: 'Emily Davis', email: 'emily@example.com', role: 'teacher', subject: 'Science' },
  { id: 'teacher-3', name: 'David Wilson', email: 'david@example.com', role: 'teacher', subject: 'English' },
];

const mockStudents: UserDataWithId[] = [
  { id: 'student-1', name: 'James Johnson', email: 'james@example.com', role: 'student', class: 'Class 10A' },
  { id: 'student-2', name: 'Emma Williams', email: 'emma@example.com', role: 'student', class: 'Class 9B' },
  { id: 'student-3', name: 'Olivia Brown', email: 'olivia@example.com', role: 'student', class: 'Class 10A' },
  { id: 'student-4', name: 'William Jones', email: 'william@example.com', role: 'student', class: 'Class 9B' },
];

const mockClasses: ClassData[] = [
  { id: 'class-1', name: 'Class 10A', teacher: 'Michael Brown', studentCount: 25 },
  { id: 'class-2', name: 'Class 9B', teacher: 'Emily Davis', studentCount: 22 },
  { id: 'class-3', name: 'Class 8C', teacher: 'David Wilson', studentCount: 20 },
];

// UserTable component that was missing but used in the page
const UserTable = ({ users, onEdit }: { users: UserDataWithId[], onEdit: (user: UserDataWithId) => void }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          {users[0]?.role === 'teacher' && <TableHead>Subject</TableHead>}
          {users[0]?.role === 'student' && <TableHead>Class</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">No users found</TableCell>
          </TableRow>
        ) : (
          users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              {user.role === 'teacher' && <TableCell>{user.subject || 'N/A'}</TableCell>}
              {user.role === 'student' && <TableCell>{user.class || 'N/A'}</TableCell>}
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();

  // User Management State
  const [admins, setAdmins] = useState<UserDataWithId[]>(mockAdmins);
  const [teachers, setTeachers] = useState<UserDataWithId[]>(mockTeachers);
  const [students, setStudents] = useState<UserDataWithId[]>(mockStudents);
  const [editingUser, setEditingUser] = useState<UserDataWithId | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Class Management State
  const [classes, setClasses] = useState<ClassData[]>(mockClasses);
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);
  const [isClassEditDialogOpen, setIsClassEditDialogOpen] = useState(false);

  // Combined handler accepts UserData (id might be undefined)
  const handleUserSaved = (savedUser: UserData) => {
    const updateUserList = (list: UserDataWithId[], setList: React.Dispatch<React.SetStateAction<UserDataWithId[]>>) => {
      if (savedUser.id) {
        // Editing existing user
        const existingUserIndex = list.findIndex(u => u.id === savedUser.id);
        if (existingUserIndex > -1) {
          const updatedList = [...list];
          // Ensure the saved user conforms to UserDataWithId before updating state
          updatedList[existingUserIndex] = { ...list[existingUserIndex], ...savedUser, id: savedUser.id };
          setList(updatedList);
        } else {
          console.warn("User ID provided for edit but not found in list:", savedUser);
        }
      } else {
        // Adding new user - create ID here
        const newUser: UserDataWithId = {
          ...savedUser,
          id: `${savedUser.role}-${Date.now()}` // Assign ID
        };
        setList(prev => [...prev, newUser]);
      }
    };

    if (savedUser.role === 'admin') {
      updateUserList(admins, setAdmins);
    } else if (savedUser.role === 'teacher') {
      updateUserList(teachers, setTeachers);
    } else if (savedUser.role === 'student') {
      updateUserList(students, setStudents);
    }

    // Close edit dialog if it was open
    setEditingUser(null);
    setIsEditDialogOpen(false);
  };

  // Handler to open the dialog in edit mode (expects UserDataWithId)
  const handleEditClick = (userToEdit: UserDataWithId) => {
    console.log("Editing user:", userToEdit);
    setEditingUser(userToEdit);
    setIsEditDialogOpen(true);
  };

  // Handler passed to the controlled dialog's onOpenChange
  const handleEditDialogChange = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      // Reset editing user when dialog closes
      setEditingUser(null);
    }
  };

  // Handler for saving/adding classes
  const handleClassSaved = (savedClassData: ClassFormData) => {
    if (savedClassData.id) {
      // Editing
      setClasses(prevClasses => prevClasses.map(cls =>
        cls.id === savedClassData.id
          ? { ...cls, name: savedClassData.name, teacher: savedClassData.teacher || undefined } // Update teacher, ensure undefined if empty
          : cls
      ));
    } else {
      // Adding
      const newClass: ClassData = {
        name: savedClassData.name,
        teacher: savedClassData.teacher || undefined, // Ensure undefined if empty
        id: `class-${Date.now()}`, // Generate mock ID
        studentCount: 0, // New classes start with 0 students
      };
      setClasses(prevClasses => [...prevClasses, newClass]);
    }
    setEditingClass(null);
    setIsClassEditDialogOpen(false);
  };

  // Handler for clicking edit on a class
  const handleClassEditClick = (classToEdit: ClassData) => {
    setEditingClass(classToEdit);
    setIsClassEditDialogOpen(true);
  };

  // Handler for controlling the class edit dialog
  const handleClassDialogChange = (open: boolean) => {
    setIsClassEditDialogOpen(open);
    if (!open) {
      setEditingClass(null);
    }
  };

   // Handler for deleting a class (mock implementation)
  const handleClassDelete = (classId: string) => {
    // TODO: Add confirmation dialog before deleting
    console.log("Deleting class:", classId);
    // --- TODO: Replace with actual API call ---
    setClasses(prevClasses => prevClasses.filter(cls => cls.id !== classId));
    toast.success("Class deleted successfully!");
    // --- End TODO ---
  };

  // Redirect if not admin or loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (user?.role !== "admin") {
    redirect(user?.role ? `/dashboard/${user.role}` : "/auth/signin");
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground">Manage your school's operations.</p>
      </section>

      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Quickly access common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/admin/data-upload">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Database className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="font-medium text-center">Data Upload</h3>
                  <p className="text-sm text-muted-foreground text-center">Import student, teacher & class data</p>
                </CardContent>
              </Card>
            </Link>
            
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium text-center">Manage Users</h3>
                <p className="text-sm text-muted-foreground text-center">Add or edit user accounts</p>
              </CardContent>
            </Card>
            
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Calendar className="h-8 w-8 mb-2 text-primary" />
                <h3 className="font-medium text-center">Schedule Classes</h3>
                <p className="text-sm text-muted-foreground text-center">Create or modify timetables</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Rest of existing cards */}
      {/* User Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage administrators, teachers, and students for your school.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="admins">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            {/* Add User Dialog Triggers (pass handleUserSaved) */}
            <TabsContent value="admins">
              <div className="flex justify-end mb-4">
                 <UserFormDialog mode="add" roleToAddOrEdit="admin" onUserSaved={handleUserSaved}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Admin
                   </Button>
                 </UserFormDialog>
              </div>
              <UserTable users={admins} onEdit={handleEditClick} />
            </TabsContent>
             <TabsContent value="teachers">
               <div className="flex justify-end mb-4">
                 <UserFormDialog mode="add" roleToAddOrEdit="teacher" onUserSaved={handleUserSaved}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Teacher
                   </Button>
                 </UserFormDialog>
              </div>
              <UserTable users={teachers} onEdit={handleEditClick} />
            </TabsContent>
             <TabsContent value="students">
               <div className="flex justify-end mb-4">
                 <UserFormDialog mode="add" roleToAddOrEdit="student" onUserSaved={handleUserSaved}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                   </Button>
                 </UserFormDialog>
              </div>
              <UserTable users={students} onEdit={handleEditClick} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Class Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>Class Management</CardTitle>
          <CardDescription>Manage classes, assign teachers, and view student enrollment.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex justify-end mb-4">
             <ClassFormDialog mode="add" onClassSaved={handleClassSaved}>
               <Button size="sm">
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Class
               </Button>
             </ClassFormDialog>
           </div>
           <ClassTable
             classes={classes}
             onEdit={handleClassEditClick}
             onDelete={handleClassDelete} // Pass delete handler
            />
        </CardContent>
      </Card>

      {/* Academic Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Management</CardTitle>
          <CardDescription>Manage timetables, attendance, and assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="timetable">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="timetable">Timetable</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            <TabsContent value="timetable">
              <TimetableManagement />
            </TabsContent>
            <TabsContent value="attendance">
              <AttendanceManagement />
            </TabsContent>
            <TabsContent value="assignments">
              <AssignmentsManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit User Dialog (Controlled Mode) */}
      {editingUser && (
        <UserFormDialog
          mode="edit"
          roleToAddOrEdit={editingUser.role}
          initialData={editingUser}
          onUserSaved={handleUserSaved}
          isOpen={isEditDialogOpen}
          onOpenChange={handleEditDialogChange}
        />
      )}

      {/* Edit Class Dialog (Controlled Mode) */}
      {editingClass && (
        <ClassFormDialog
          mode="edit"
          initialData={editingClass}
          onClassSaved={handleClassSaved}
          isOpen={isClassEditDialogOpen}
          onOpenChange={handleClassDialogChange}
        />
      )}
    </div>
  );
}
