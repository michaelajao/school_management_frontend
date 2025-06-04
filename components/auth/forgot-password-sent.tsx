"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { CheckCircle } from "lucide-react";

export function ForgotPasswordSent() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">Check Your Email</h1>
          <p className="text-gray-600">
            We've sent a password reset link to your email address. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => router.push("/auth/signin")}
            className="w-full bg-teal-600 hover:bg-teal-700"
          >
            Back to Sign In
          </Button>
          
          <p className="text-sm text-gray-600">
            Didn't receive the email?{" "}
            <button
              onClick={() => router.push("/auth/forgot-password")}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Try again
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
