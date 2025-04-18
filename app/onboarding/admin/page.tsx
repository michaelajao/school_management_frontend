"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Import RadioGroup components
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

// Assuming countries list is available or fetched
const countries = [{ code: "NG", name: "Nigeria" }, { code: "GH", name: "Ghana" }, { code: "US", name: "United States" }]; 
const adminRoles = ["Principal", "Proprietor", "Head Teacher"];

export default function AdminOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "", // Added
    lastName: "", // Added
    gender: "", // Added
    email: user?.email || "",
    phone: "", // Kept
    schoolName: "", // Kept
    schoolAlias: "", // Added
    country: "NG", // Added, default NG
    role: "", // Added (Principal, Proprietor, Head Teacher)
    website: "", // Kept (optional)
  });
  // Removed multi-step state: currentStep, totalSteps
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for Select components
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for RadioGroup
  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitOnboarding = async (e: React.FormEvent<HTMLFormElement>) => { // Added form event
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    try {
      // Validate required fields (basic example)
      const requiredFields: (keyof typeof formData)[] = ['firstName', 'lastName', 'gender', 'email', 'phone', 'schoolName', 'country', 'role'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }
      
      // When API is ready, connect here
      console.log("Submitting Super Admin Data:", formData);
      // For now, simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store onboarding data in localStorage for now
      localStorage.setItem("superAdminOnboardingData", JSON.stringify(formData));
      
      toast.success("School profile setup completed!");
      router.push("/dashboard/admin"); // Assuming admin dashboard route
    } catch (error) {
      toast.error("Failed to complete setup. Please try again.");
      console.error("Onboarding error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Super Administrator & School Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your profile and initial school information.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submitOnboarding} className="space-y-6"> 
          {/* Personal Information Section */}
          <div>
            <h2 className="font-semibold text-xl">Your Information</h2>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                 <Label>Gender *</Label>
                 <RadioGroup
                   name="gender"
                   value={formData.gender}
                   onValueChange={(value) => handleRadioChange("gender", value)}
                   className="flex space-x-4"
                 >
                   <div className="flex items-center space-x-2">
                     <RadioGroupItem value="male" id="male" />
                     <Label htmlFor="male">Male</Label>
                   </div>
                   <div className="flex items-center space-x-2">
                     <RadioGroupItem value="female" id="female" />
                     <Label htmlFor="female">Female</Label>
                   </div>
                   <div className="flex items-center space-x-2">
                     <RadioGroupItem value="other" id="other" />
                     <Label htmlFor="other">Other</Label>
                   </div>
                 </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled // Assuming email comes from auth context and shouldn't be changed here
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 123 456 7890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
               <div className="grid gap-2">
                 <Label htmlFor="role">Your Role *</Label>
                 <Select name="role" value={formData.role} onValueChange={(value) => handleSelectChange("role", value)} required>
                   <SelectTrigger>
                     <SelectValue placeholder="Select your role" />
                   </SelectTrigger>
                   <SelectContent>
                     {adminRoles.map((role) => (
                       <SelectItem key={role} value={role}>
                         {role}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
            </div>
          </div>

          {/* School Information Section */}
          <div className="pt-6">
            <h2 className="font-semibold text-xl">School Information</h2>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label htmlFor="schoolName">School Name *</Label>
                   <Input
                     id="schoolName"
                     name="schoolName"
                     placeholder="e.g. Greenfield High School"
                     value={formData.schoolName}
                     onChange={handleChange}
                     required
                   />
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="schoolAlias">School Alias</Label>
                   <Input
                     id="schoolAlias"
                     name="schoolAlias"
                     placeholder="e.g. GHS"
                     value={formData.schoolAlias}
                     onChange={handleChange}
                     // Assuming alias is optional based on requirements text, but making required based on table structure
                     // required 
                   />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="grid gap-2">
                   <Label htmlFor="country">Country *</Label>
                   <Select name="country" value={formData.country} onValueChange={(value) => handleSelectChange("country", value)} required>
                     <SelectTrigger>
                       <SelectValue placeholder="Select country" />
                     </SelectTrigger>
                     <SelectContent>
                       {countries.map((country) => (
                         <SelectItem key={country.code} value={country.code}>
                           {country.name}
                         </SelectItem>
                       ))}
                     </SelectContent>
                   </Select>
                 </div>
                 <div className="grid gap-2">
                   <Label htmlFor="website">School Website (Optional)</Label>
                   <Input
                     id="website"
                     name="website"
                     type="url"
                     placeholder="https://yourschool.edu"
                     value={formData.website}
                     onChange={handleChange}
                   />
                 </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8"> 
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Setup"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}