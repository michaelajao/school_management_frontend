"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthApiService } from "@/lib/api/auth";
import { useToast } from "@/hooks/use-toast";

export function ResendVerificationForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await AuthApiService.resendEmailVerification(email);
      setIsSubmitted(true);
      toast({
        title: "Verification email sent!",
        description: "Please check your inbox for the verification link.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send verification email",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              School Management System
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Mail className="h-16 w-16 text-teal-600" />
                <CardTitle className="text-center">Verification email sent!</CardTitle>
                <CardDescription className="text-center">
                  We've sent a verification link to <strong>{email}</strong>. 
                  Please check your inbox and click the link to verify your account.
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Button 
                onClick={() => router.push("/auth/signin")}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Back to Sign In
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                Send to different email
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-medium text-teal-600 hover:text-teal-500"
              >
                try again
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Resend verification email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a new verification link
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email verification</CardTitle>
            <CardDescription>
              We'll send you a new verification link to activate your account.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-teal-600 hover:bg-teal-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Mail className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send verification email
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/auth/signin")}
            className="text-teal-600 hover:text-teal-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Button>
        </div>
      </div>
    </div>
  );
}