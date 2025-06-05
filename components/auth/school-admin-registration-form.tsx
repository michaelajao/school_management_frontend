"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthLayout } from "@/components/auth/auth-layout";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { AuthApiService } from "@/lib/api/auth";

const countries = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "South Africa",
  "Uganda",
  "Tanzania",
  "Ethiopia",
  "Rwanda",
  "Zambia",
  "Zimbabwe",
  "Other"
];

export function SchoolAdminRegistrationForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    schoolAlias: "",
    country: "",
    website: "",
    phone: "",
    adminRole: "Principal"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

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

  const validateSchoolInfo = () => {
    const newErrors: Record<string, string> = {};
    
    // School name validation
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = "School name must be at least 2 characters";
    }
    
    // School alias validation
    if (!formData.schoolAlias.trim()) {
      newErrors.schoolAlias = "School alias is required";
    } else if (formData.schoolAlias.trim().length < 2) {
      newErrors.schoolAlias = "School alias must be at least 2 characters";
    } else if (formData.schoolAlias.trim().length > 10) {
      newErrors.schoolAlias = "School alias must be 10 characters or less";
    }
    
    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }
    
    // Website validation (optional but must be valid if provided)
    if (formData.website && formData.website.trim()) {
      const websitePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!websitePattern.test(formData.website.trim())) {
        newErrors.website = "Please enter a valid website URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAdminInfo = () => {
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
    
    // Phone validation (optional but must be valid if provided)
    if (formData.phone && formData.phone.trim()) {
      const phonePattern = /^\+?[0-9]{10,15}$/;
      if (!phonePattern.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateSchoolInfo()) {
      setCurrentStep(2);
    } else {
      toast.error("Please fix the errors before proceeding");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }
    
    if (!validateAdminInfo()) {
      toast.error("Please fix the errors before proceeding");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Call API to create school and admin
      const response = await AuthApiService.createSchoolAndAdmin({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        schoolName: formData.schoolName,
        schoolAlias: formData.schoolAlias,
        country: formData.country,
        website: formData.website || undefined,
        phone: formData.phone || undefined,
        adminRole: formData.adminRole || undefined
      });
      
      toast.success("School and admin account created successfully!");
      
      // Auto-login with the new credentials
      if (response && response.accessToken) {
        // Redirect to admin dashboard
        router.push("/(users)/admin");
      } else {
        // Redirect to login page
        router.push("/auth/signin");
      }
      
    } catch (error: any) {
      console.error("School admin registration error:", error);
      
      let errorMessage = "Failed to create school and admin account. Please try again.";
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
    <AuthLayout showBackButton backHref={currentStep === 1 ? "/auth/signin" : undefined} 
      onBackClick={currentStep === 2 ? handlePreviousStep : undefined}>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentStep === 1 ? "School Registration" : "Admin Account Setup"}
          </h1>
          <p className="text-gray-600 mt-2">
            {currentStep === 1 
              ? "Register your school to get started" 
              : "Create your admin account to manage your school"
            }
          </p>
        </div>

        {errors.form && (
          <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg border border-red-200">
            {errors.form}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 ? (
            // Step 1: School Information
            <>
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  placeholder="Enter your school name"
                  value={formData.schoolName}
                  onChange={(e) => handleChange("schoolName", e.target.value)}
                  disabled={isLoading}
                  className={errors.schoolName ? "border-red-500" : ""}
                />
                {errors.schoolName && (
                  <p className="text-xs text-red-500">{errors.schoolName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolAlias">School Alias/Abbreviation *</Label>
                <Input
                  id="schoolAlias"
                  name="schoolAlias"
                  type="text"
                  placeholder="E.g., NHS for National High School"
                  value={formData.schoolAlias}
                  onChange={(e) => handleChange("schoolAlias", e.target.value)}
                  disabled={isLoading}
                  className={errors.schoolAlias ? "border-red-500" : ""}
                />
                {errors.schoolAlias && (
                  <p className="text-xs text-red-500">{errors.schoolAlias}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select 
                  value={formData.country} 
                  onValueChange={(value) => handleChange("country", value)} 
                  disabled={isLoading}
                >
                  <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">School Website (Optional)</Label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="https://yourschool.com"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  disabled={isLoading}
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-xs text-red-500">{errors.website}</p>
                )}
              </div>
            </>
          ) : (
            // Step 2: Admin Information
            <>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
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
                  type="text"
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

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
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
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
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

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 123 456 7890"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={isLoading}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminRole">Your Role at School (Optional)</Label>
                <Input
                  id="adminRole"
                  name="adminRole"
                  type="text"
                  placeholder="Principal, Director, etc."
                  value={formData.adminRole}
                  onChange={(e) => handleChange("adminRole", e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </>
          )}

          <Button 
            type={currentStep === 1 ? "button" : "submit"}
            onClick={currentStep === 1 ? handleNextStep : undefined}
            className="w-full bg-teal-600 hover:bg-teal-700" 
            disabled={isLoading}
          >
            {isLoading 
              ? "Processing..." 
              : currentStep === 1 
                ? "Continue" 
                : "Complete Registration"
            }
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
