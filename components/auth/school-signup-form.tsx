"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

// Only countries with education systems available in the backend
const countries = [
  "Australia",
  "Canada", 
  "Ghana",
  "Kenya",
  "Nigeria",
  "South Africa",
  "United Kingdom",
  "United States"
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
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = "School name must be at least 2 characters";
    }
    
    if (!formData.shortName.trim()) {
      newErrors.shortName = "Short name is required";
    } else if (formData.shortName.trim().length < 2) {
      newErrors.shortName = "Short name must be at least 2 characters";
    } else if (formData.shortName.trim().length > 10) {
      newErrors.shortName = "Short name must be 10 characters or less";
    }
    
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }
    
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
      
      // Store school data with consistent field names for the next step
      const schoolDataForStorage = {
        name: formData.schoolName.trim(),
        alias: formData.shortName.trim(),
        country: formData.country,
        website: formData.website?.trim() || undefined
      };
      localStorage.setItem("schoolData", JSON.stringify(schoolDataForStorage));
      
      toast.success("School information saved! Now create your administrator account.");
      
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

        {/* School Signup Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Register Your School</h1>
            <p className="text-sm text-gray-600 mt-2">Get started with your school management system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* School Name */}
            <div className="space-y-2">
              <Label htmlFor="schoolName" className="text-sm font-medium text-gray-700">
                School Name
              </Label>
              <Input
                id="schoolName"
                name="schoolName"
                type="text"
                placeholder="Enter your school's full name"
                value={formData.schoolName}
                onChange={(e) => handleChange("schoolName", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.schoolName && (
                <p className="text-sm text-red-500">{errors.schoolName}</p>
              )}
            </div>

            {/* School Short Name */}
            <div className="space-y-2">
              <Label htmlFor="shortName" className="text-sm font-medium text-gray-700">
                School Alias
              </Label>
              <Input
                id="shortName"
                name="shortName"
                type="text"
                placeholder="Enter short name (e.g., lincoln-high)"
                value={formData.shortName}
                onChange={(e) => handleChange("shortName", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <p className="text-sm text-teal-600">Used for your school's unique identifier</p>
              {errors.shortName && (
                <p className="text-sm text-red-500">{errors.shortName}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                Country
              </Label>
              <Select onValueChange={(value) => handleChange("country", value)} disabled={isLoading}>
                <SelectTrigger className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country}</p>
              )}
            </div>

            {/* School Website */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                School Website (Optional)
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://www.yourschool.com"
                value={formData.website}
                onChange={(e) => handleChange("website", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.website && (
                <p className="text-sm text-red-500">{errors.website}</p>
              )}
            </div>

            {/* Next Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Setting up..." : "Continue to Admin Setup"}
            </Button>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/auth/signin"
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
