"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";

interface InviteValidationProps {
  children: (inviteData: InviteData) => React.ReactNode;
  tokenParam?: string;
  emailParam?: string;
}

interface InviteData {
  email: string;
  role: string;
  token: string;
  schoolName?: string;
  isValid: boolean;
}

export function InviteValidation({ children, tokenParam = "token", emailParam = "email" }: InviteValidationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get(tokenParam);
    const email = searchParams.get(emailParam);

    if (!token) {
      setError("Invalid invite link. Missing token.");
      setLoading(false);
      return;
    }

    validateInviteToken(token, email);
  }, [searchParams, tokenParam, emailParam]);

  const validateInviteToken = async (token: string, email?: string | null) => {
    try {
      const response = await AuthApiService.validateInviteToken(token);
      
      if (!response.valid || !response.invite) {
        throw new Error("Invalid or expired invite token");
      }

      // If email is provided in URL, verify it matches the invite
      if (email && response.invite.email !== email) {
        throw new Error("Email does not match the invite");
      }

      setInviteData({
        email: response.invite.email,
        role: response.invite.role,
        token: token,
        schoolName: response.invite.schoolId, // You might want to fetch school name separately
        isValid: true
      });

      toast.success("Invite verified! Please complete your account setup.");
    } catch (error: any) {
      console.error('Token validation error:', error);
      const errorMessage = error?.response?.data?.message || error?.message || "Invalid or expired invite link.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <Loader2 className="h-12 w-12 text-teal-600 animate-spin mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Validating Invite</h2>
            <p className="text-gray-600 text-center">
              Please wait while we verify your invitation...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Invite</h2>
            <p className="text-gray-600 text-center mb-6">
              {error || "This invitation link is invalid or has expired. Please contact your school administrator for a new invitation."}
            </p>
            <div className="flex gap-3 w-full">
              <Button 
                onClick={() => router.push("/auth/signin")}
                variant="outline"
                className="flex-1"
              >
                Back to Login
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                className="flex-1 bg-teal-600 hover:bg-teal-700"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Invitation Verified</h1>
            </div>
            <p className="text-gray-600">
              Welcome! You've been invited to join as a <span className="font-semibold capitalize">{inviteData.role.toLowerCase()}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Email: {inviteData.email}
            </p>
          </div>
          
          {children(inviteData)}
        </div>
      </div>
    </div>
  );
}
