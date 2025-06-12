"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { Check } from "lucide-react";

export function PasswordResetSuccessForm() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/auth/signin");
  };

  return (
    <AuthLayout>
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Password Change Successfully</h1>
        </div>

        <Button 
          onClick={handleGoToLogin}
          className="w-full"
        >
          Go to Login
        </Button>
      </div>
    </AuthLayout>
  );
} 