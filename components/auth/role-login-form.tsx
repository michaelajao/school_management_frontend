"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { AuthLayout } from "@/components/auth/auth-layout";
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
    identifierType: "staffId",
    identifierLabel: "Staff ID",
    identifierPlaceholder: "Enter your staff ID"
  },
  student: {
    title: "Student Login",
    description: "Access your student portal",
    backendRole: "STUDENT",
    identifierType: "studentId",
    identifierLabel: "Student ID",
    identifierPlaceholder: "Enter your student ID"
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
    title: "General Login",
    description: "Access your account",
    backendRole: null,
    identifierType: "email",
    identifierLabel: "Email Address",
    identifierPlaceholder: "Enter your email address"
  }
};

export function RoleLoginForm({ role }: RoleLoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Identifier validation based on role
    if (!formData.identifier.trim()) {
      newErrors.identifier = `${config.identifierLabel} is required`;
    } else if (config.identifierType === "email" && !/^\S+@\S+\.\S+$/.test(formData.identifier.trim())) {
      newErrors.identifier = "Please enter a valid email address";
    } else if ((config.identifierType === "studentId" || config.identifierType === "staffId") && formData.identifier.trim().length < 3) {
      newErrors.identifier = `${config.identifierLabel} must be at least 3 characters`;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before proceeding");
      return;
    }
    
    setIsLoading(true);
      try {
      // Use the role from props to ensure consistent authentication
      if (role === "general") {
        // For general login, we need to determine the role from the backend
        await login(formData.identifier, formData.password);
      } else {
        await login(formData.identifier, formData.password, role);
      }
      
      // Show role-specific welcome message
      toast.success(`Welcome back, ${roleDisplayNames[role]}!`);
      
      // Redirect will be handled by the auth context based on returned user role
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Provide more specific error messages when available
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
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        </div>

        {errors.form && (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="identifier"
              name="identifier"
              type="email"
              placeholder="Enter email address"
              value={formData.identifier}
              onChange={(e) => handleChange("identifier", e.target.value)}
              disabled={isLoading}
              className={errors.identifier ? "border-red-500" : ""}
            />
            {errors.identifier && (
              <p className="text-xs text-red-500">{errors.identifier}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              disabled={isLoading}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <Label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </Label>
            </div>

            <Link 
              href="/auth/forgot-password"
              className="text-sm text-teal-600 hover:text-teal-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Login"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/school-signup"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Contact your school administrator
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
