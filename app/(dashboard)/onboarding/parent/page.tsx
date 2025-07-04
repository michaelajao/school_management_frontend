"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AuthApiService } from "@/lib/api/auth";

export default function ParentOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    relationshipToStudent: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);

  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    const tokenFromQuery = searchParams.get("token");

    if (emailFromQuery && tokenFromQuery) {
      setFormData((prev) => ({ ...prev, email: emailFromQuery }));
      setInviteToken(tokenFromQuery);
    } else {
      toast.error("Invalid onboarding link. Please contact your school administrator.");
      router.push("/auth/signin");
    }
  }, [searchParams, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const requiredFields: (keyof typeof formData)[] = ['firstName', 'lastName', 'email', 'relationshipToStudent', 'password', 'confirmPassword'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      
      if (formData.password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return;
      }

      if (!inviteToken) {
        toast.error("Invalid invitation token.");
        return;
      }

      // Submit parent registration with proper API call
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        inviteToken: inviteToken,
        relationshipToStudent: formData.relationshipToStudent
      };

      await AuthApiService.completeParentInviteRegistration(registrationData);
      
      toast.success("Account setup successful! Please log in.");
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Parent onboarding error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to complete setup. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Parent/Guardian Account Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your profile to access the school portal.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={submitOnboarding} className="space-y-6"> 
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
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                disabled
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="relationshipToStudent">Relationship to Student *</Label>
              <Input
                id="relationshipToStudent"
                name="relationshipToStudent"
                placeholder="e.g. Father, Mother, Guardian"
                value={formData.relationshipToStudent}
                onChange={handleChange}
                required
              />
            </div>
            
            <Separator className="my-4" />
            <h2 className="font-semibold text-xl">Set Your Password</h2>
            
             <div className="grid gap-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
             <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
          </div>

          <div className="flex justify-end mt-8"> 
            <Button type="submit" disabled={isSubmitting || !formData.email}>
              {isSubmitting ? "Processing..." : "Complete Account Setup"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}