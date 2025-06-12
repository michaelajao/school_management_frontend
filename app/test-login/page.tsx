"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@school.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testUsers = [
    { email: 'admin@school.com', role: 'SCHOOL_ADMIN', name: 'John Admin' },
    { email: 'teacher@school.com', role: 'CLASS_TEACHER', name: 'Sarah Johnson' },
    { email: 'assistant@school.com', role: 'ASSISTANT_ADMIN', name: 'Mike Assistant' },
    { email: 'student@school.com', role: 'STUDENT', name: 'Alex Student' },
    { email: 'parent@school.com', role: 'PARENT', name: 'Jane Parent' },
  ];

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Testing login with:', { email, password: '***' });

      // Test mock authentication
      const response = await fetch('/api/mock-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login response:', data);

      // Test setting the cookie for auth
      await fetch('/api/auth/set-cookie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'auth_token',
          value: data.accessToken,
          options: { maxAge: 60 * 60 * 2 }
        }),
        credentials: 'include'
      });

      // Test getting profile with cookie
      const profileResponse = await fetch('/api/mock-auth/profile', {
        method: 'GET',
        credentials: 'include'
      });

      let profileData = null;
      if (profileResponse.ok) {
        profileData = await profileResponse.json();
        console.log('Profile response:', profileData);
      }

      setResult({
        login: data,
        profile: profileData,
        cookieSet: true
      });

    } catch (err) {
      console.error('Login test error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleTestCookies = async () => {
    try {
      // Test getting token from cookie
      const tokenResponse = await fetch('/api/auth/get-token', {
        method: 'GET',
        credentials: 'include'
      });

      const tokenData = await tokenResponse.json();
      console.log('Token from cookie:', tokenData);

      setResult(prev => ({
        ...prev,
        cookieTest: tokenData
      }));
    } catch (err) {
      console.error('Cookie test error:', err);
      setError('Cookie test failed');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Authentication Flow Test</CardTitle>
            <CardDescription>
              Test the frontend authentication system with mock backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleLogin} disabled={loading}>
                {loading ? 'Testing...' : 'Test Login'}
              </Button>
              <Button onClick={handleTestCookies} variant="outline">
                Test Cookies
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                ❌ {error}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👥 Test Users</CardTitle>
            <CardDescription>Quick select test users (any password works)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {testUsers.map((user) => (
                <Button
                  key={user.email}
                  variant="outline"
                  className="text-left h-auto p-3"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword('test123');
                  }}
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <Badge variant="secondary" className="text-xs">
                      {user.role}
                    </Badge>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>📊 Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.login && (
                  <div>
                    <h4 className="font-medium text-green-600">✅ Login Successful</h4>
                    <div className="mt-2 p-3 bg-green-50 rounded text-sm">
                      <div><strong>User:</strong> {result.login.user.firstName} {result.login.user.lastName}</div>
                      <div><strong>Role:</strong> {result.login.user.role}</div>
                      <div><strong>Email:</strong> {result.login.user.email}</div>
                      <div><strong>Token:</strong> {result.login.accessToken.substring(0, 30)}...</div>
                    </div>
                  </div>
                )}

                {result.profile && (
                  <div>
                    <h4 className="font-medium text-blue-600">✅ Profile Retrieved</h4>
                    <div className="mt-2 p-3 bg-blue-50 rounded text-sm">
                      <div><strong>Profile ID:</strong> {result.profile.id}</div>
                      <div><strong>Email Verified:</strong> {result.profile.emailVerified ? 'Yes' : 'No'}</div>
                      <div><strong>Active:</strong> {result.profile.isActive ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                )}

                {result.cookieSet && (
                  <div>
                    <h4 className="font-medium text-purple-600">✅ Authentication Cookie Set</h4>
                    <div className="mt-2 p-3 bg-purple-50 rounded text-sm">
                      HttpOnly cookie has been set for secure authentication
                    </div>
                  </div>
                )}

                {result.cookieTest && (
                  <div>
                    <h4 className="font-medium text-orange-600">✅ Cookie Retrieval Test</h4>
                    <div className="mt-2 p-3 bg-orange-50 rounded text-sm">
                      <pre>{JSON.stringify(result.cookieTest, null, 2)}</pre>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}