"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function StudentInviteRegistrationForm({ inviteToken }: { inviteToken: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
    phone: "",
    class: "",
    gender: "",
    address: "",
    birthdate: "",
    inviteToken
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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const isoString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      handleChange('birthdate', isoString);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Student ID validation
    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Class validation
    if (!formData.class.trim()) {
      newErrors.class = "Class is required";
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
      // Complete student invite registration
      await AuthApiService.completeStudentInviteRegistration({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        studentId: formData.studentId,
        password: formData.password,
        phone: formData.phone || undefined,
        class: formData.class,
        gender: formData.gender || undefined,
        address: formData.address || undefined,
        birthdate: formData.birthdate || undefined,
        inviteToken: formData.inviteToken
      });
      
      toast.success("Student registration completed successfully!");
      
      // Redirect to student dashboard
      router.push("/(users)/student");
      
    } catch (error: any) {
      console.error("Student registration error:", error);
      
      let errorMessage = "Failed to complete registration. Please try again.";
      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
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
          <h1 className="text-2xl font-bold text-gray-900">Complete Student Registration</h1>
          <p className="text-gray-600 mt-2">
            Please provide your information to complete the registration process
          </p>
        </div>

        {errors.form && (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
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
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                disabled={isLoading}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
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
            <Label htmlFor="studentId">Student ID *</Label>
            <Input
              id="studentId"
              name="studentId"
              placeholder="Enter your student ID"
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              disabled={isLoading}
              className={errors.studentId ? "border-red-500" : ""}
            />
            {errors.studentId && (
              <p className="text-xs text-red-500">{errors.studentId}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                disabled={isLoading}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                disabled={isLoading}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="class">Class/Grade *</Label>
            <Input
              id="class"
              name="class"
              placeholder="Enter your class/grade"
              value={formData.class}
              onChange={(e) => handleChange("class", e.target.value)}
              disabled={isLoading}
              className={errors.class ? "border-red-500" : ""}
            />
            {errors.class && (
              <p className="text-xs text-red-500">{errors.class}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={formData.gender} 
                onValueChange={(value) => handleChange("gender", value)} 
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthdate">Date of Birth</Label>
              <DatePicker 
                disabled={isLoading}
                onChange={handleDateChange} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Complete Registration"}
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
