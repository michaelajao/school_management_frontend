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

export default function StudentOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gradeLevel: "",
    studentId: "",
    contactEmail: user?.email || "",
    contactPhone: "",
    address: "",
    guardianName: "",
    guardianContact: "",
    emergencyContact: "",
    medicalInfo: "",
    subjects: "",
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
      localStorage.setItem("studentOnboardingData", JSON.stringify(formData));
      
      toast.success("Profile setup completed!");
      router.push("/dashboard/student");
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
        <h1 className="text-3xl font-bold">Student Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your student profile information
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
              Your basic personal details
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="studentId">Student ID (if assigned)</Label>
                  <Input
                    id="studentId"
                    name="studentId"
                    placeholder="S-12345"
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gradeLevel">Grade Level</Label>
                <Input
                  id="gradeLevel"
                  name="gradeLevel"
                  placeholder="e.g. 9th Grade"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="jane.doe@example.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    placeholder="+1 123 456 7890"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Additional Information</h2>
            <p className="text-sm text-muted-foreground">
              Additional details for your school record
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="address">Home Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, State, Zip"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="guardianName">Parent/Guardian Name</Label>
                  <Input
                    id="guardianName"
                    name="guardianName"
                    placeholder="John Doe"
                    value={formData.guardianName}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="guardianContact">Parent/Guardian Contact</Label>
                  <Input
                    id="guardianContact"
                    name="guardianContact"
                    placeholder="+1 234 567 8901"
                    value={formData.guardianContact}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergencyContact">Emergency Contact Information</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  placeholder="Name: Jane Doe, Phone: +1 234 567 8901, Relationship: Mother"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="medicalInfo">
                  Medical Information (allergies, conditions, etc.)
                </Label>
                <Input
                  id="medicalInfo"
                  name="medicalInfo"
                  placeholder="Optional: List any medical conditions or allergies"
                  value={formData.medicalInfo}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subjects">Subjects/Interests</Label>
                <Input
                  id="subjects"
                  name="subjects"
                  placeholder="Math, Science, Art, etc."
                  value={formData.subjects}
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