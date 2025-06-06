"use client";

import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Clock } from "lucide-react";

export function PasswordResetSentForm() {
  const handleGoToEmail = () => {
    // Open default email client
    window.location.href = "mailto:";
  };

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center">
            <Clock className="w-8 h-8 text-white" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reset password</h1>
          <p className="text-gray-600 mt-2">
            A link has been sent to you email to reset the password.
          </p>
        </div>

        <Button 
          onClick={handleGoToEmail}
          className="w-full"
        >
          Go to Email
        </Button>
      </div>
    </AuthLayout>
  );
} 