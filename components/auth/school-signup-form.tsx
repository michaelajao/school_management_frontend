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

export function SchoolSignupForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: "",
    shortName: "",
    country: "",
    website: ""
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
    
    // School name validation
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = "School name must be at least 2 characters";
    }
    
    // Short name validation
    if (!formData.shortName.trim()) {
      newErrors.shortName = "Short name is required";
    } else if (formData.shortName.trim().length < 2) {
      newErrors.shortName = "Short name must be at least 2 characters";
    } else if (formData.shortName.trim().length > 10) {
      newErrors.shortName = "Short name must be 10 characters or less";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before proceeding");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store school data (in real app, this would be sent to API)
      localStorage.setItem("schoolData", JSON.stringify(formData));
      
      toast.success("School registered successfully!");
      
      // Redirect to create account page
      router.push("/auth/create-account");
      
    } catch (error) {
      console.error("School signup error:", error);
      toast.error("Failed to register school. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">School Sign Up</h1>
          <p className="text-gray-600 mt-2">
            Register your school to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="shortName">Short Name *</Label>
            <Input
              id="shortName"
              name="shortName"
              type="text"
              placeholder="Enter school short name/abbreviation"
              value={formData.shortName}
              onChange={(e) => handleChange("shortName", e.target.value)}
              disabled={isLoading}
              className={errors.shortName ? "border-red-500" : ""}
            />
            {errors.shortName && (
              <p className="text-xs text-red-500">{errors.shortName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select onValueChange={(value) => handleChange("country", value)} disabled={isLoading}>
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
            <Label htmlFor="website">Website (Optional)</Label>
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

          <Button 
            type="submit" 
            className="w-full bg-teal-600 hover:bg-teal-700" 
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Continue"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have a school account?{" "}
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
