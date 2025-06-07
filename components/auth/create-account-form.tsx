"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { AuthApiService } from "@/lib/api/auth";
import { cn } from "@/lib/utils";

export function CreateAccountForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation (optional for admin)
    if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
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
      // Get school data from previous step
      const schoolData = localStorage.getItem("schoolData");
      if (!schoolData) {
        toast.error("School information missing. Please complete school registration first.");
        router.push("/auth/school-signup");
        return;
      }      // Parse school data and combine with admin form data
      const schoolInfo = JSON.parse(schoolData);
      
      // Call backend API for school admin creation using the correct endpoint
      const createSchoolAdminData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
        schoolName: schoolInfo.name,
        schoolAlias: schoolInfo.alias,
        country: schoolInfo.country,
        website: schoolInfo.website,
        phone: formData.phone?.trim() || undefined,
        adminRole: 'Principal' // Default admin role
      };

      const response = await AuthApiService.createSchoolAndAdmin(createSchoolAdminData);
      
      toast.success("School administrator account created successfully!");
      
      // Clear school data
      localStorage.removeItem("schoolData");
      
      // Redirect to login page
      router.push("/auth/signin");
      
    } catch (error: any) {
      console.error("Account creation error:", error);
      
      // Handle specific API errors
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to create account. Please try again.";
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Administrator Account</h1>
          <p className="text-gray-600 mt-2">
            Set up your school administrator account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={isLoading}
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter full name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={isLoading}
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone (Optional)</Label>
            <PhoneInput
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="Enter phone number"
              disabled={isLoading}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone}</p>
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
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              aria-label="I agree to all Terms of Service & Privacy Policy"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to all{" "}
              <Link href="/terms" className="text-teal-600 hover:text-teal-700">
                Terms of Service
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-teal-600 hover:text-teal-700">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
{isLoading ? "Creating..." : "Create Administrator Account"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an administrator account?{" "}
          <button
            onClick={() => router.push("/auth/signin")}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign in
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
