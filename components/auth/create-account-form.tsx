"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Consolidated imports for form validation and API
import { useFormErrors } from "@/hooks/useFormErrors";
import { validateForm, FormValidators } from "@/lib/form-validators";
import { apiMethods, handleApiError } from "@/lib/api-utils";



// Only countries with education systems available in the backend
const countryCodes = [
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+1-CA", country: "Canada", flag: "🇨🇦", display: "+1" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+1-US", country: "United States", flag: "🇺🇸", display: "+1" }
];

export function CreateAccountForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+234");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });
  
  // Use centralized error management
  const { errors, setError, clearError, clearAllErrors, hasErrors, setMultipleErrors } = useFormErrors();

  // Load school data from localStorage if available
  useEffect(() => {
    const schoolData = localStorage.getItem("schoolData");
    if (!schoolData) {
      toast.error("Please complete school registration first");
      router.push("/auth/school-signup");
    }
  }, [router]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing - using centralized error management
    clearError(name);
  };

  const validateFormData = () => {
    // Use centralized validation
    const userValidationErrors = validateForm(formData, FormValidators.user);
    
    // Add terms validation
    const allErrors = { ...userValidationErrors };
    if (!agreeToTerms) {
      allErrors.terms = "You must agree to the Terms of Service and Privacy Policy";
    }
    
    setMultipleErrors(allErrors);
    return !hasErrors();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateFormData()) {
      toast.error("Please fix the errors before proceeding");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get school data from localStorage
      const schoolDataString = localStorage.getItem("schoolData");
      const schoolData = schoolDataString ? JSON.parse(schoolDataString) : null;
      
      if (!schoolData || !schoolData.name || !schoolData.alias) {
        throw new Error("School data not found. Please complete school registration first.");
      }
      
      // Prepare registration data
      const processedPhone = `${selectedCountryCode.replace(/-[A-Z]{2}$/, '')}${formData.phone.trim()}`;
      
      const registrationData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: processedPhone,
        password: formData.password,
        schoolName: schoolData.name.trim(),
        schoolAlias: schoolData.alias.trim(),
        country: schoolData.country,
        website: schoolData.website || undefined
      };
      
      // Use centralized API method
      const response = await apiMethods.createSchoolAdmin(registrationData);
      
      if (response.success) {
        // Clear school data from localStorage after successful registration
        localStorage.removeItem("schoolData");
        toast.success("School and admin account created successfully! You can now login.");
        router.push("/auth/signin");
      }
      
    } catch (error) {
      console.error("Create account error:", error);
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Create Account Form */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create your admin account</h1>
            <p className="text-sm text-gray-600 mt-2">You will be the school administrator</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                disabled={isLoading}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </Label>
              <div className="flex space-x-2">
                <Select
                  value={selectedCountryCode}
                  onValueChange={setSelectedCountryCode}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[100px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countryCodes.map((country, index) => (
                      <SelectItem key={`${country.code}-${country.country}-${index}`} value={country.code}>
                        {country.flag} {country.display || country.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
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

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                  I agree to all{" "}
                  <Link href="/terms" className="text-teal-600 hover:text-teal-700 font-medium">
                    Terms of Service
                  </Link>
                  {" "}& {" "}
                  <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-500">{errors.terms}</p>
              )}
            </div>

            {/* Register Button */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? "Creating school and admin account..." : "Create School & Admin Account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
