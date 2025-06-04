"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { CheckCircle } from "lucide-react";

export function ResetPasswordSuccess() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Password Reset Successfully</h1>
          <p className="text-gray-600">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
        </div>

        <Button 
          onClick={() => router.push("/auth/signin")}
          className="w-full bg-teal-600 hover:bg-teal-700"
        >
          Continue to Sign In
        </Button>
      </div>
    </AuthLayout>
  );
}
