"use client";

import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { useState } from "react"; // Import useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Import Shadcn Table components
import { AddUserDialog } from "@/components/admin/AddUserDialog"; // Import the new dialog

// Placeholder for User Table component (to be created)
const UserTable = ({ users }: { users: any[] }) => {
  if (!users || users.length === 0) {
    return <p className="text-sm text-muted-foreground">No users found.</p>;
  }
  // Refactored using Shadcn Table components
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="capitalize">{user.role}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">Edit</Button> {/* Placeholder */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Mock Data (Replace with API data later)
const mockAdmins = [
  { id: "admin-1", name: "Alice Admin", email: "alice.admin@school.com", role: "admin" },
  { id: "admin-2", name: "Bob Manager", email: "bob.manager@school.com", role: "admin" },
];

const mockTeachers = [
  { id: "teach-1", name: "Charlie Teacher", email: "charlie.t@school.com", role: "teacher" },
  { id: "teach-2", name: "Diana Professor", email: "diana.p@school.com", role: "teacher" },
];

const mockStudents = [
  { id: "stu-1", name: "Ethan Student", email: "ethan.s@school.com", role: "student" },
  { id: "stu-2", name: "Fiona Learner", email: "fiona.l@school.com", role: "student" },
];

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();

  // --- Replace mock data with state managed by API calls ---
  const [admins, setAdmins] = useState(mockAdmins);
  const [teachers, setTeachers] = useState(mockTeachers);
  const [students, setStudents] = useState(mockStudents);

  // Example handler for adding a user (updates local mock state)
  const handleUserAdded = (newUser: any) => {
    const timestampId = Date.now(); // Simple unique ID for mock
    const userWithId = { ...newUser, id: `${newUser.role}-${timestampId}` };

    if (newUser.role === 'admin') {
      setAdmins(prev => [...prev, userWithId]);
    } else if (newUser.role === 'teacher') {
      setTeachers(prev => [...prev, userWithId]);
    } else if (newUser.role === 'student') {
      setStudents(prev => [...prev, userWithId]);
    }
  };
  // --- End Replace ---

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

      {/* User Management Section */}
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
            <TabsContent value="admins">
              <div className="flex justify-end mb-4">
                 {/* Wrap Button with AddUserDialog */}
                 <AddUserDialog roleToAdd="admin" onUserAdded={handleUserAdded}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Admin
                   </Button>
                 </AddUserDialog>
              </div>
              <UserTable users={admins} /> {/* Use state variable */}
            </TabsContent>
            <TabsContent value="teachers">
               <div className="flex justify-end mb-4">
                 {/* Wrap Button with AddUserDialog */}
                 <AddUserDialog roleToAdd="teacher" onUserAdded={handleUserAdded}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Teacher
                   </Button>
                 </AddUserDialog>
              </div>
              <UserTable users={teachers} /> {/* Use state variable */}
            </TabsContent>
            <TabsContent value="students">
               <div className="flex justify-end mb-4">
                 {/* Wrap Button with AddUserDialog */}
                 <AddUserDialog roleToAdd="student" onUserAdded={handleUserAdded}>
                   <Button size="sm">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Student
                   </Button>
                 </AddUserDialog>
              </div>
              <UserTable users={students} /> {/* Use state variable */}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Placeholder for other dashboard sections */}
      {/* 
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Quick Stats</CardTitle></CardHeader>
          <CardContent><p>Total Students: ...</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent><p>...</p></CardContent>
        </Card>
      </section>
      */}
    </div>
  );
}
