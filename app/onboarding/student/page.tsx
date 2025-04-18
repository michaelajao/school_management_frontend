"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function StudentOnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get email from query parameter on component mount
  useEffect(() => {
    const emailFromQuery = searchParams.get("email");
    // Potentially get pre-filled name/ID from query too if backend sends them
    // const firstNameFromQuery = searchParams.get("firstName"); 
    // const lastNameFromQuery = searchParams.get("lastName");
    // const studentIdFromQuery = searchParams.get("studentId");

    if (emailFromQuery) {
      setFormData((prev) => ({
         ...prev, 
         email: emailFromQuery,
         // firstName: firstNameFromQuery || "",
         // lastName: lastNameFromQuery || "",
         // studentId: studentIdFromQuery || "",
      }));
    } else {
      // Handle case where email is missing
      toast.error("Invalid onboarding link: Email missing.");
      // Optionally redirect back or to an error page
      // router.push("/auth/signup"); 
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitOnboarding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Validate required fields (Student ID might be optional)
      const requiredFields: (keyof typeof formData)[] = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }
      
      // Validate password strength (basic example)
      if (formData.password.length < 6) { // Example: Minimum 6 characters
          toast.error("Password must be at least 6 characters long.");
          setIsSubmitting(false);
          return;
      }

      // When API is ready, connect here
      // Send data excluding confirmPassword
      const { confirmPassword, ...submissionData } = formData; 
      console.log("Submitting Student Onboarding Data:", submissionData);
      
      // For now, simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Account setup successful! Please log in.");
      router.push("/auth/signin"); // Redirect to login page as per requirements
    } catch (error) {
      toast.error("Failed to complete setup. Please try again.");
      console.error("Onboarding error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Student Account Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your profile to access the student portal.
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
              <Label htmlFor="studentId">Student ID (Optional)</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="Enter your student ID (if known)"
                value={formData.studentId}
                onChange={handleChange}
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