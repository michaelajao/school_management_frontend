"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TeacherOnboardingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    teacherId: "",
    department: "",
    subjects: "",
    gradeLevel: "",
    certifications: "",
    experience: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Complete onboarding
      router.push("/dashboard/teacher");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Teacher Profile Setup</h1>
        <p className="text-muted-foreground mt-2">
          Complete your teaching profile to get started
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
            <h2 className="font-semibold text-xl">Personal Details</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about yourself
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="john.doe@school.edu"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
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
            <h2 className="font-semibold text-xl">Teaching Information</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your teaching expertise
            </p>
            <Separator />
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    name="department"
                    placeholder="e.g. Mathematics, Science"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Input
                    id="gradeLevel"
                    name="gradeLevel"
                    placeholder="e.g. 9-12, Elementary"
                    value={formData.gradeLevel}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subjects">Subjects</Label>
                <Input
                  id="subjects"
                  name="subjects"
                  placeholder="e.g. Algebra, Chemistry, English Literature"
                  value={formData.subjects}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="experience">Years of Teaching Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  placeholder="e.g. State Teaching License, Master's in Education"
                  value={formData.certifications}
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
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {currentStep === totalSteps ? "Complete Setup" : "Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
}