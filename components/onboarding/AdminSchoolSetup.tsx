"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Image from "next/image";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAuth } from "@/contexts/auth-context";
import { useFormValidation } from "@/hooks/useFormValidation";
import { Loader2 } from "lucide-react";

const adminRoles = ["Principal", "Proprietor", "Head Teacher"];

export default function AdminOnboardingView() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Use auth context
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "", // Initialize email as empty
    phone: "",
    schoolName: "",
    schoolAlias: "",
    country: "",
    state: "",
    role: "",
    website: "", // Added website field
    logo: null as File | null,
    primaryColor: "#1B5B5E",
    address: "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation using custom hook
  const requiredFields: Array<keyof typeof formData> = [
    "firstName","lastName","gender","phone","schoolName","role","primaryColor","address","country","state",
  ];
  const { errors, validate, clearError } = useFormValidation(formData, requiredFields);

  // Set email from auth context once loaded
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Redirect if not authenticated or loading
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign up or log in first.");
      router.push('/auth/signup');
    }
  }, [authLoading, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    clearError(name as keyof typeof formData);

    if (type === "file" && files) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setLogoPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setLogoPreview(null); // Clear preview if no file selected
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    clearError(name as keyof typeof formData);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    clearError(name as keyof typeof formData);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay      // In a real app, you would send formData (including the logo file) to your backend here
      console.log("Submitting data:", formData);
      localStorage.setItem("superAdminOnboardingData", JSON.stringify({ ...formData, logo: logoPreview })); // Store preview URL for demo
      toast.success("Setup completed successfully!");
      
      // Use the getDashboardPath helper function
      const { getDashboardPath } = require("@/contexts/auth-context");
      router.push(getDashboardPath("admin"));
    } catch (error) {
      console.error("Setup failed:", error);
      toast.error("Setup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Basic check if user exists, redirect handled by useEffect
  if (!user && !authLoading) {
     return null; // Avoid rendering the form if redirecting
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold tracking-tight sm:text-3xl">Superadmin & School Setup</CardTitle>
          <CardDescription>Complete your profile and school information to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitOnboarding} className="space-y-8">
            {/* Personal Information Section */}
            <section className="space-y-6 rounded-lg border p-4 md:p-6">
              <h2 className="text-lg font-semibold text-foreground">Personal Information</h2>
              <Separator />
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-destructive" : ""}
                    aria-invalid={!!errors.firstName}
                    aria-describedby="firstName-error"
                  />
                  {errors.firstName && <p id="firstName-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-destructive" : ""}
                    aria-invalid={!!errors.lastName}
                    aria-describedby="lastName-error"
                  />
                  {errors.lastName && <p id="lastName-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={value => handleRadioChange("gender", value)}
                    className={`flex gap-4 rounded-md border p-2 ${errors.gender ? "border-destructive" : ""}`}
                    aria-invalid={!!errors.gender}
                    aria-describedby="gender-error"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="font-normal">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="font-normal">Female</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && <p id="gender-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="role">Your Role *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={value => handleSelectChange("role", value)}
                    name="role"
                  >
                    <SelectTrigger id="role" className={errors.role ? "border-destructive" : ""} aria-invalid={!!errors.role} aria-describedby="role-error">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.role && <p id="role-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    className="bg-muted text-muted-foreground"
                    readOnly
                    aria-label="Email address (read-only)"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-destructive" : ""}
                    aria-invalid={!!errors.phone}
                    aria-describedby="phone-error"
                  />
                  {errors.phone && <p id="phone-error" className="text-sm text-destructive">Required field</p>}
                </div>
              </div>
            </section>

            {/* School Information Section */}
            <section className="space-y-6 rounded-lg border p-4 md:p-6">
              <h2 className="text-lg font-semibold text-foreground">School Information</h2>
              <Separator />
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="schoolName">School Name *</Label>
                  <Input
                    id="schoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    className={errors.schoolName ? "border-destructive" : ""}
                    aria-invalid={!!errors.schoolName}
                    aria-describedby="schoolName-error"
                  />
                  {errors.schoolName && <p id="schoolName-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="schoolAlias">School Alias</Label>
                  <Input
                    id="schoolAlias"
                    name="schoolAlias"
                    value={formData.schoolAlias}
                    onChange={handleChange}
                    placeholder="Optional short name or code"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "border-destructive" : ""}
                  placeholder="Enter full school address"
                  aria-invalid={!!errors.address}
                  aria-describedby="address-error"
                />
                {errors.address && <p id="address-error" className="text-sm text-destructive">Required field</p>}
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country *</Label>
                  <div className="bg-accent rounded-md p-0.5">
                    <CountryDropdown
                      value={formData.country}
                      onChange={(val: string) => {
                        handleSelectChange("country", val);
                        handleSelectChange("state", ""); // Reset state when country changes
                      }}
                      className={`w-full rounded-md border ${errors.country ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                      defaultOptionLabel="Select Country"
                      name="country" // Add name for potential form libraries
                      aria-label="Select Country"
                      aria-invalid={!!errors.country}
                      aria-describedby="country-error"
                    />
                  </div>
                  {errors.country && <p id="country-error" className="text-sm text-destructive">Required field</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State/Region *</Label>
                  <div className="bg-accent rounded-md p-0.5">
                    <RegionDropdown
                      country={formData.country}
                      value={formData.state}
                      onChange={(val: string) => handleSelectChange("state", val)}
                      className={`w-full rounded-md border ${errors.state ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                      blankOptionLabel="Select State/Region"
                      defaultOptionLabel="Select State/Region"
                      disabled={!formData.country} // Disable if no country selected
                      name="state" // Add name
                      aria-label="Select State/Region"
                      aria-invalid={!!errors.state}
                      aria-describedby="state-error"
                    />
                  </div>
                  {errors.state && <p id="state-error" className="text-sm text-destructive">Required field</p>}
                </div>
              </div>
               <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                 <div className="space-y-1.5">
                    <Label htmlFor="website">School Website</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.yourschool.com"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <Label htmlFor="logo">School Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      name="logo"
                      accept="image/png, image/jpeg, image/gif, image/webp" // Be more specific
                      onChange={handleChange}
                      className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      aria-describedby="logo-preview"
                    />
                    {logoPreview && (
                      <div id="logo-preview" className="mt-2">
                        <p className="text-sm text-muted-foreground mb-1">Logo Preview:</p>
                        <Image
                          src={logoPreview}
                          alt="School logo preview"
                          width={80}
                          height={80}
                          className="h-20 w-20 rounded-md border object-contain"
                        />
                      </div>
                    )}
                 </div>
               </div>
              <div className="space-y-1.5">
                <Label htmlFor="primaryColor">Primary Brand Color *</Label>
                <div className={`flex items-center gap-3 rounded-md border p-2 ${errors.primaryColor ? "border-destructive" : ""}`}>
                  <Input
                    id="primaryColor"
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleChange}
                    className="h-10 w-10 cursor-pointer rounded-md border-0 bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0"
                    aria-label="Select primary brand color"
                    aria-invalid={!!errors.primaryColor}
                    aria-describedby="primaryColor-error"
                  />
                  <span className="font-mono text-sm">{formData.primaryColor}</span>
                </div>
                 {errors.primaryColor && <p id="primaryColor-error" className="text-sm text-destructive">Required field</p>}
              </div>
            </section>

            <Button
              type="submit"
              className="w-full sm:w-auto" // Adjust width for different screens
              disabled={isSubmitting || !user}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Complete Setup"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}