"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export default function AdminOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    schoolName: "",
    position: "",
    address: "",
    phone: "",
    website: "",
    enrolledStudents: "",
    staffCount: "",
    email: user?.email || ""
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    try {
      // When API is ready, connect here
      // For now, simulate API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Store onboarding data in localStorage for now
      localStorage.setItem("adminOnboardingData", JSON.stringify(formData));
      
      toast.success("School profile setup completed!");
      router.push("/dashboard/admin");
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
        <h1 className="text-3xl font-bold">Administrator Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your profile and school information
        </p>

        <div className="flex items-center gap-2 mt-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i + 1 === currentStep
                    ? "bg-primary text-primary-foreground"
                    : i + 1 < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div className="w-10 h-0.5 bg-muted"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Personal Information</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your role at the school.
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="position">Your Position</Label>
                <Input
                  id="position"
                  name="position"
                  placeholder="Principal / Vice Principal / Administrator"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@school.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+1 123 456 7890"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">School Information</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your school.
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  placeholder="e.g. Greenfield High School"
                  value={formData.schoolName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">School Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Education St, City"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="enrolledStudents">Number of Students</Label>
                  <Input
                    id="enrolledStudents"
                    name="enrolledStudents"
                    type="number"
                    placeholder="e.g. 500"
                    value={formData.enrolledStudents}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="staffCount">Number of Staff</Label>
                  <Input
                    id="staffCount"
                    name="staffCount"
                    type="number"
                    placeholder="e.g. 50"
                    value={formData.staffCount}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">School Website</Label>
                <Input
                  id="website"
                  name="website"
                  placeholder="https://yourschool.edu"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
          >
            Back
          </Button>
          <Button onClick={nextStep} disabled={isSubmitting}>
            {isSubmitting ? (
              "Processing..."
            ) : currentStep === totalSteps ? (
              "Complete Setup"
            ) : (
              "Continue"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}