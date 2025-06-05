"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersApiService } from "@/lib/api/users";
import { toast } from "sonner";

export default function TestEndpointsPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const testEndpoint = async (endpointName: string, testFunction: () => Promise<any>) => {
    setLoading(true);
    try {
      const result = await testFunction();
      setResults({ endpoint: endpointName, success: true, data: result });
      toast.success(`${endpointName} test successful`);
    } catch (error) {
      console.error(`${endpointName} test failed:`, error);
      setResults({ endpoint: endpointName, success: false, error: error.message });
      toast.error(`${endpointName} test failed`);
    } finally {
      setLoading(false);
    }
  };

  const testCreateStudent = () => testEndpoint("Create Student", () => 
    UsersApiService.createStudentUser({
      email: `student${Date.now()}@test.com`,
      password: "password123",
      firstName: "Test",
      lastName: "Student",
      role: "STUDENT",
      studentId: `STU${Date.now()}`,
      phoneNumber: "1234567890",
    })
  );

  const testCreateParent = () => testEndpoint("Create Parent", () =>
    UsersApiService.createParentUser({
      email: `parent${Date.now()}@test.com`,
      password: "password123",
      firstName: "Test",
      lastName: "Parent",
      role: "PARENT",
      relationshipToStudent: "Father",
      phoneNumber: "1234567890",
    })
  );

  const testCreateTeacher = () => testEndpoint("Create Teacher", () =>
    UsersApiService.createUser({
      email: `teacher${Date.now()}@test.com`,
      password: "password123",
      firstName: "Test",
      lastName: "Teacher",
      role: "TEACHER",
      phoneNumber: "1234567890",
    })
  );

  const testGetStudents = () => testEndpoint("Get Students", () =>
    UsersApiService.getStudents(1, 5)
  );

  const testGetParents = () => testEndpoint("Get Parents", () =>
    UsersApiService.getParents(1, 5)
  );

  const testGetAllUsers = () => testEndpoint("Get All Users", () =>
    UsersApiService.getUsers({ page: 1, limit: 5 })
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Role-Specific Endpoints Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Users</CardTitle>
            <CardDescription>Test role-specific user creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testCreateStudent} disabled={loading} className="w-full">
              Create Student
            </Button>
            <Button onClick={testCreateParent} disabled={loading} className="w-full">
              Create Parent
            </Button>
            <Button onClick={testCreateTeacher} disabled={loading} className="w-full">
              Create Teacher
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Users by Role</CardTitle>
            <CardDescription>Test role-specific user retrieval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={testGetStudents} disabled={loading} className="w-full">
              Get Students
            </Button>
            <Button onClick={testGetParents} disabled={loading} className="w-full">
              Get Parents
            </Button>
            <Button onClick={testGetAllUsers} disabled={loading} className="w-full">
              Get All Users
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Latest test result</CardDescription>
          </CardHeader>
          <CardContent>
            {loading && <p>Testing...</p>}
            {results && (
              <div className={`p-3 rounded ${results.success ? 'bg-green-100' : 'bg-red-100'}`}>
                <h4 className="font-semibold">{results.endpoint}</h4>
                <p className={results.success ? 'text-green-700' : 'text-red-700'}>
                  {results.success ? 'Success' : 'Failed'}
                </p>
                {results.error && (
                  <p className="text-red-600 text-sm mt-1">{results.error}</p>
                )}
                {results.data && (
                  <pre className="text-xs mt-2 overflow-auto max-h-32">
                    {JSON.stringify(results.data, null, 2)}
                  </pre>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service URLs</CardTitle>
          <CardDescription>Access your running services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="http://localhost:3000" target="_blank" className="text-blue-600 hover:underline">
              Frontend (3000)
            </a>
            <a href="http://localhost:4000" target="_blank" className="text-blue-600 hover:underline">
              Backend API (4000)
            </a>
            <a href="http://localhost:8080" target="_blank" className="text-blue-600 hover:underline">
              Database Admin (8080)
            </a>
            <a href="http://localhost:8081" target="_blank" className="text-blue-600 hover:underline">
              Redis Commander (8081)
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 