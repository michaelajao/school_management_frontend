"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface RoleLoginFormProps {
  role: "super_admin" | "principal" | "head_teacher" | "restricted_admin" | "teacher" | "student" | "parent" | "general";
}

const roleConfig = {
  super_admin: {
    title: "Super Admin Login",
    description: "Access your administrative dashboard",
    backendRole: "SCHOOL_MANAGEMENT",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  principal: {
    title: "Principal Login",
    description: "Access school operations dashboard",
    backendRole: "PRINCIPAL",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  head_teacher: {
    title: "Head Teacher Login",
    description: "Access academic oversight dashboard",
    backendRole: "HEAD_TEACHER",
    identifierType: "email",
    identifierLabel: "Email Address", 
    identifierPlaceholder: "Enter your email address"
  },
  restricted_admin: {
    title: "Admin Login",
    description: "Access limited administrative functions",
    backendRole: "RESTRICTED_ADMIN",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  teacher: {
    title: "Teacher Login", 
    description: "Access your teaching dashboard",
    backendRole: "TEACHER",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  student: {
    title: "Student Login",
    description: "Access your student portal",
    backendRole: "STUDENT",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  parent: {
    title: "Parent Login",
    description: "Monitor your child's progress",
    backendRole: "PARENT",
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  },
  general: {
    title: "Login",
    description: "Access your account",
    backendRole: null,
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter email address"
  }
};

export function RoleLoginForm({ role }: RoleLoginFormProps) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const config = roleConfig[role];
  const roleDisplayNames = {
    super_admin: "Super Administrator",
    principal: "Principal", 
    head_teacher: "Head Teacher",
    restricted_admin: "Administrator",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent",
    general: "User"
  };

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
    
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.identifier.trim())) {
      newErrors.identifier = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before proceeding");
      return;
    }
    
    setIsLoading(true);
      try {
      // Use simplified email-based login for all users
        await login(formData.identifier, formData.password);
      
      toast.success("Welcome back!");
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Invalid email or password. Please try again.";
      
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      
      setErrors({
        form: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-gray-800 font-bold text-xl">Logoipsum</span>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
        {errors.form && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
            {errors.form}
          </div>
        )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
          <div className="space-y-2">
              <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                {config.identifierLabel}
              </Label>
            <Input
              id="identifier"
                type={config.identifierType === "email" ? "email" : "text"}
                placeholder={config.identifierPlaceholder}
              value={formData.identifier}
              onChange={(e) => handleChange("identifier", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isLoading}
            />
            {errors.identifier && (
                <p className="text-sm text-red-500">{errors.identifier}</p>
            )}
          </div>

            {/* Password */}
          <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
            <PasswordInput
              id="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={isLoading}
            />
            {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
            )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Checkbox
                id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>
            <Link 
              href="/auth/forgot-password"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Forgot password?
            </Link>
          </div>

            {/* Login Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
          <Link
                  href="/auth/create-account" 
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Contact your school administrator
          </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
