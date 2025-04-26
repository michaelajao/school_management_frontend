/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Image from "next/image";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useAuth } from "@/contexts/auth-context"; // Import useAuth
import { useFormValidation } from "@/hooks/useFormValidation";

const adminRoles = ["Principal", "Proprietor", "Head Teacher"];

export default function AdminOnboardingView() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Use auth context
  // const { userEmail } = usePricingStore(); // Remove usePricingStore usage
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
    website: "",
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
    
    // Clear error when user starts typing
    clearError(name as keyof typeof formData);

    if (type === "file" && files) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setLogoPreview(reader.result as string);
        reader.readAsDataURL(file);
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
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem("superAdminOnboardingData", JSON.stringify(formData));
      toast.success("Setup completed!");
      router.push("/dashboard/admin");
    } catch (error) {
      toast.error("Setup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while auth context is resolving
  if (authLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6"> {/* Adjusted max-width to reduce whitespace */}
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Superadmin School Setup</h1>
        <p className="text-gray-600">Complete your profile and school information to onboard your school.</p>
      </header>

      <Card className="p-6 shadow-sm">
        <form onSubmit={submitOnboarding} className="space-y-8">
          {/* Personal Information Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">First Name *</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-red-500 text-sm">Required field</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Last Name *</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-red-500 text-sm">Required field</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            <div className="space-y-2">
              <Label className="text-gray-700">Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={value => handleRadioChange("gender", value)}
                className={`flex gap-4 p-2 ${errors.gender ? "border border-red-500 rounded-lg" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-red-500 text-sm">Required field</p>}

              
            </div>
            <div className="space-y-2">
                <Label className="text-gray-700">Your Role *</Label>
                <Select
                  value={formData.role}
                  onValueChange={value => handleSelectChange("role", value)}
                >
                  <SelectTrigger className={errors.role ? "border-red-500 rounded-lg" : ""}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {adminRoles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-sm">Required field</p>}
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Email *</Label>
                <Input
                  name="email"
                  value={formData.email} // Value now comes from state updated by useEffect
                  className="bg-gray-100"
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Phone *</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && <p className="text-red-500 text-sm">Required field</p>}
              </div>
            </div>
          </section>

          {/* School Information Section */}
            <section className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">School Information</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
              <Label className="text-gray-700">School Name *</Label>
              <Input
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className={errors.schoolName ? "border-red-500" : ""}
              />
              {errors.schoolName && <p className="text-red-500 text-sm">Required field</p>}
              </div>

              <div className="space-y-2">
              <Label className="text-gray-700">School Alias</Label>
              <Input
                name="schoolAlias"
                value={formData.schoolAlias}
                onChange={handleChange}
              />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
              <Label className="text-gray-700">Address *</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "border-red-500" : ""}
                placeholder="Enter school address"
              />
              {errors.address && <p className="text-red-500 text-sm">Required field</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
              <Label className="text-gray-700">Country *</Label>
              <CountryDropdown
                defaultOptionLabel="Select Country"
                value={formData.country}
                onChange={(val: string) => {
                  setFormData(prev => ({ ...prev, country: val, state: "" }));
                  clearError("country");
                  clearError("state");
                }}
                className="w-full border rounded px-3 py-2"
              />
              {errors.country && <p className="text-red-500 text-sm">Required field</p>}
              </div>
              <div className="space-y-2">
              <Label className="text-gray-700">State *</Label>
              <RegionDropdown
                blankOptionLabel="Select State"
                defaultOptionLabel="Select State"
                country={formData.country}
                value={formData.state}
                onChange={(val: string) => {
                  setFormData(prev => ({ ...prev, state: val }));
                  clearError("state");
                }}
                className="w-full border rounded px-3 py-2"
              />
              {errors.state && <p className="text-red-500 text-sm">Required field</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
              <Label className="text-gray-700">School Logo</Label>
              <div className="flex flex-col gap-2">
                <Input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="cursor-pointer"
                />
                {logoPreview && (
                <div className="relative w-20 h-20">
                  <Image
                  src={logoPreview}
                  alt="School logo preview"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain rounded-md"
                  />
                </div>
                )}
              </div>
              </div>
             
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700">Primary Brand Color *</Label>
              <div className={`flex items-center gap-2 p-2 rounded-lg ${errors.primaryColor ? "border border-red-500" : ""}`}>
              <Input
                type="color"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleChange}
                className="w-12 h-12 p-1 rounded-md cursor-pointer"
              />
              <span className="font-mono">{formData.primaryColor}</span>
              </div>
            </div>
            </section>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !user} // Disable if no user
          >
            {isSubmitting ? "Saving..." : "Complete Setup"}
          </Button>
        </form>
      </Card>
    </div>
  );
}