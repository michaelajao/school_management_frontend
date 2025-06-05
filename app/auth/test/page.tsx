"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AuthApiService } from "@/lib/api/auth";

export default function AuthenticationTester() {
  const [testResults, setTestResults] = useState<Array<{name: string, status: 'success' | 'failure', message: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const runAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    // Test admin login
    await testLogin('admin@school.com', 'Password123!', 'ADMIN');
    
    // Test teacher login
    await testLogin('teacher@school.com', 'Password123!', 'TEACHER');
    
    // Test student login
    await testLogin('student@school.com', 'Password123!', 'STUDENT');
    
    // Test parent login
    await testLogin('parent@school.com', 'Password123!', 'PARENT');
    
    setIsLoading(false);
  };
  
  const testLogin = async (identifier: string, password: string, role: any) => {
    try {
      const result = await AuthApiService.login({
        identifier,
        password,
        role
      });
      
      setTestResults(prev => [
        ...prev,
        {
          name: `${role} Login Test`,
          status: 'success',
          message: `Successfully logged in as ${result.user.firstName} ${result.user.lastName}`
        }
      ]);
      
      // Log out to prepare for next test
      await AuthApiService.logout();
      
    } catch (error: any) {
      setTestResults(prev => [
        ...prev,
        {
          name: `${role} Login Test`,
          status: 'failure',
          message: error?.response?.data?.message || error?.message || 'Unknown error'
        }
      ]);
    }
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Authentication Flow Tester</h1>
      
      <Button 
        onClick={runAllTests}
        disabled={isLoading}
        className="mb-6"
      >
        {isLoading ? "Running Tests..." : "Run Authentication Tests"}
      </Button>
      
      <div className="space-y-4">
        {testResults.map((result, index) => (
          <Card key={index} className={`p-4 ${result.status === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
            <h3 className="font-semibold">{result.name}</h3>
            <p className={`${result.status === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {result.message}
            </p>
          </Card>
        ))}
        
        {!isLoading && testResults.length === 0 && (
          <p className="text-gray-500 italic">No tests run yet</p>
        )}
      </div>
    </div>
  );
}
