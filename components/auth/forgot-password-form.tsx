"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call real API
      await AuthApiService.requestPasswordReset(email.trim());
      
      toast.success("Password reset link sent to your email!");
      
      // Store email for confirmation page
      if (typeof window !== 'undefined') {
        localStorage.setItem("resetEmail", email.trim());
      }
      
      // Redirect to sent page
      router.push("/auth/forgot-password/sent");
      
    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      // Handle specific error cases
      if (error?.response?.status === 429) {
        toast.error("Too many attempts. Please try again later.");
      } else if (error?.response?.status === 404) {
        toast.error("No account found with this email address.");
      } else {
        // Extract meaningful error message
        const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to send reset email. Please try again.";
        
        toast.error(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            Please provide the email address associated with your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: "" }));
                }
              }}
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Proceed"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
