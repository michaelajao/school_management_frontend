"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2, Mail } from "lucide-react";
import { AuthApiService } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";

type VerificationState = "verifying" | "success" | "error" | "resending";

export function EmailVerificationForm() {
  const [state, setState] = useState<VerificationState>("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const token = searchParams.get("token");

  const verifyEmail = async (verificationToken: string) => {
    try {
      setState("verifying");
      await AuthApiService.verifyEmail(verificationToken);
      setState("success");
      toast({
        title: "Email verified successfully!",
        description: "You can now sign in to your account.",
        variant: "default",
      });
      
      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/auth/signin");
      }, 3000);
    } catch (error: any) {
      setState("error");
      setErrorMessage(
        error.response?.data?.message || 
        "Failed to verify email. The link may be invalid or expired."
      );
    }
  };

  const resendVerification = () => {
    router.push("/auth/resend-verification");
  };

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setState("error");
      setErrorMessage("No verification token provided.");
    }
  }, [token]);

  const getStateContent = () => {
    switch (state) {
      case "verifying":
        return {
          icon: <Loader2 className="h-16 w-16 text-teal-600 animate-spin" />,
          title: "Verifying your email...",
          description: "Please wait while we verify your email address.",
          showActions: false,
        };
      
      case "success":
        return {
          icon: <CheckCircle className="h-16 w-16 text-green-600" />,
          title: "Email verified successfully!",
          description: "Your account is now active. You will be redirected to the sign-in page shortly.",
          showActions: true,
          actions: (
            <Button onClick={() => router.push("/auth/signin")} className="bg-teal-600 hover:bg-teal-700">
              Go to Sign In
            </Button>
          ),
        };
      
      case "error":
        return {
          icon: <AlertCircle className="h-16 w-16 text-red-600" />,
          title: "Verification failed",
          description: errorMessage,
          showActions: true,
          actions: (
            <div className="space-y-2">
              <Button 
                onClick={resendVerification}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                <Mail className="mr-2 h-4 w-4" />
                Request New Verification Email
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/auth/signin")}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </div>
          ),
        };
      
      case "resending":
        return {
          icon: <Loader2 className="h-16 w-16 text-teal-600 animate-spin" />,
          title: "Sending verification email...",
          description: "Please wait while we send you a new verification email.",
          showActions: false,
        };
      
      default:
        return {
          icon: <AlertCircle className="h-16 w-16 text-red-600" />,
          title: "Something went wrong",
          description: "An unexpected error occurred.",
          showActions: false,
        };
    }
  };

  const content = getStateContent();

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Email Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            School Management System
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              {content.icon}
              <CardTitle className="text-center">{content.title}</CardTitle>
              <CardDescription className="text-center">
                {content.description}
              </CardDescription>
            </div>
          </CardHeader>
          
          {content.showActions && (
            <CardContent>
              {content.actions}
            </CardContent>
          )}
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a
              href="mailto:support@school.com"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}