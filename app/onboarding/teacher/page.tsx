"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function TeacherOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if this is coming from an email token
    const token = searchParams.get("token");
    
    if (token) {
      // Redirect to the proper teacher setup flow
      router.replace(`/auth/teacher-setup?token=${token}`);
    } else {
      // Check for legacy invite ID parameter
      const inviteId = searchParams.get("inviteId");
      const email = searchParams.get("email");
      
      if (inviteId || email) {
        // This appears to be an old-style invite
        // Redirect to general signin with message
        router.replace(`/auth/signin?message=${encodeURIComponent("Please contact your administrator for the latest invite link")}`);
      } else {
        // No parameters, redirect to signin
        router.replace("/auth/signin");
      }
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center p-6">
          <AlertCircle className="h-12 w-12 text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting...</h2>
          <p className="text-gray-600 text-center">
            Taking you to the teacher account setup page...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}