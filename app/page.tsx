"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthApiService } from '@/lib/api/auth';
import { getDashboardPath } from '@/contexts/auth-context';

type UserRole = "admin" | "teacher" | "student" | "parent" | "superadmin" | "school_management";

export default function Home() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check if user is already authenticated
        const storedToken = AuthApiService.getStoredToken();
        const storedUser = AuthApiService.getStoredUser();

        if (storedToken && storedUser) {
          // Verify token is still valid
          try {
            await AuthApiService.getProfile();
            // Token is valid, redirect to appropriate dashboard
            const dashboardPath = getDashboardPath(storedUser.role as UserRole);
            router.replace(dashboardPath);
            return;
          } catch {
            // Token is invalid, clear storage and continue to auth
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            localStorage.removeItem('refresh_token');
          }
        }

        // No valid authentication, redirect to role selection
        router.replace('/auth/signin');
      } catch (error) {
        console.error('Auth check failed:', error);
        // Fallback to auth page
        router.replace('/auth/signin');
      } finally {
        setChecking(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // This should not be reached due to redirects above, but just in case
  return null;
}
