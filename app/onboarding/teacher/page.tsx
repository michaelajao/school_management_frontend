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

export default function TeacherOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    teacherId: "",
    contactEmail: user?.email || "",
    contactPhone: "",
    address: "",
    emergencyContact: "",
    subjects: "",
    education: "",
    experience: "",
    department: "",
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
      localStorage.setItem("teacherOnboardingData", JSON.stringify(formData));
      
      toast.success("Profile setup completed!");
      router.push("/dashboard/teacher");
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
        <h1 className="text-3xl font-bold">Teacher Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your teacher profile information
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
              Your basic contact and personal details
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
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
                    placeholder="john.doe@example.com"
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
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, City, State, Zip"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  placeholder="Name: Jane Doe, Phone: +1 234 567 8901, Relationship: Spouse"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-xl">Professional Information</h2>
            <p className="text-sm text-muted-foreground">
              Your teaching qualifications and expertise
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="teacherId">Teacher ID (if assigned)</Label>
                  <Input
                    id="teacherId"
                    name="teacherId"
                    placeholder="T-12345"
                    value={formData.teacherId}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g. Mathematics, Science, English"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subjects">Subjects You Teach</Label>
                <Input
                  id="subjects"
                  name="subjects"
                  placeholder="e.g. Algebra, Geometry, Calculus"
                  value={formData.subjects}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="education">Education Background</Label>
                <Input
                  id="education"
                  name="education"
                  placeholder="e.g. M.Ed. in Mathematics Education, University of Example"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  placeholder="e.g. 5 years teaching high school mathematics"
                  value={formData.experience}
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