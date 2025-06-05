"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/auth-layout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AuthApiService } from "@/lib/api/auth";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);
    setIsLoading(true);
    
    try {
      await AuthApiService.requestPasswordReset(formData.email.trim());
      
      // Store email for confirmation page
      if (typeof window !== 'undefined') {
        localStorage.setItem("resetEmail", formData.email.trim());
      }
      
      toast.success("Password reset email sent! Please check your inbox.");
      
      // Redirect to confirmation page
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
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout showBackButton>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isLoading}
              className={`${errors.email ? "border-red-500" : ""} transition-colors`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="text-xs text-red-500" id="email-error">{errors.email}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700 transition-colors" 
            disabled={isLoading || isSubmitting}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <button
            onClick={() => router.push("/auth/signin")}
            className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
            disabled={isLoading}
          >
            Back to sign in
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
