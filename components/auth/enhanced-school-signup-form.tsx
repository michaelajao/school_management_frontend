"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building, 
  Globe, 
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Clock
} from "lucide-react";
import { toast } from "sonner";

import EducationSystemSelector from "@/components/onboarding/EducationSystemSelector";
import EducationSystemOverview from "@/components/onboarding/EducationSystemOverview";
import { EducationSystem, educationSystemsApi } from "@/lib/api/education-systems";

// Only countries with education systems available in the backend
const countries = [
  "Australia",
  "Canada", 
  "Ghana",
  "Kenya",
  "Nigeria",
  "South Africa",
  "United Kingdom",
  "United States"
];

enum SignupStep {
  SCHOOL_INFO = 0,
  EDUCATION_SYSTEM = 1,
  CONFIRMATION = 2
}

interface SchoolFormData {
  schoolName: string;
  shortName: string;
  country: string;
  website: string;
  educationSystemId?: string;
}

export function EnhancedSchoolSignupForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<SignupStep>(SignupStep.SCHOOL_INFO);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SchoolFormData>({
    schoolName: "",
    shortName: "",
    country: "",
    website: "",
    educationSystemId: undefined
  });
  const [selectedEducationSystem, setSelectedEducationSystem] = useState<EducationSystem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { 
      step: SignupStep.SCHOOL_INFO, 
      title: "School Information", 
      description: "Basic details about your school",
      icon: Building 
    },
    { 
      step: SignupStep.EDUCATION_SYSTEM, 
      title: "Education System", 
      description: "Choose your curriculum and grading system",
      icon: GraduationCap 
    },
    { 
      step: SignupStep.CONFIRMATION, 
      title: "Confirmation", 
      description: "Review and confirm your settings",
      icon: CheckCircle2 
    }
  ];

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateSchoolInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School name is required";
    } else if (formData.schoolName.trim().length < 2) {
      newErrors.schoolName = "School name must be at least 2 characters";
    }
    
    if (!formData.shortName.trim()) {
      newErrors.shortName = "Short name is required";
    } else if (formData.shortName.trim().length < 2) {
      newErrors.shortName = "Short name must be at least 2 characters";
    } else if (formData.shortName.trim().length > 10) {
      newErrors.shortName = "Short name must be 10 characters or less";
    }
    
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }
    
    if (formData.website && formData.website.trim()) {
      const websitePattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!websitePattern.test(formData.website.trim())) {
        newErrors.website = "Please enter a valid website URL";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEducationSystem = () => {
    // Education system selection is now optional
    // If systems failed to load, users can proceed without selection
    return true;
  };

  const handleNext = () => {
    switch (currentStep) {
      case SignupStep.SCHOOL_INFO:
        if (validateSchoolInfo()) {
          setCurrentStep(SignupStep.EDUCATION_SYSTEM);
        } else {
          toast.error("Please fix the errors before proceeding");
        }
        break;
      case SignupStep.EDUCATION_SYSTEM:
        if (validateEducationSystem()) {
          setFormData(prev => ({ ...prev, educationSystemId: selectedEducationSystem?.id }));
          setCurrentStep(SignupStep.CONFIRMATION);
        }
        break;
      case SignupStep.CONFIRMATION:
        handleSubmit();
        break;
    }
  };

  const handleBack = () => {
    if (currentStep > SignupStep.SCHOOL_INFO) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEducationSystemSelect = (system: EducationSystem) => {
    setSelectedEducationSystem(system);
    // Auto-populate country if not selected
    if (!formData.country && system.country) {
      setFormData(prev => ({ ...prev, country: system.country }));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store complete school data with education system (if selected)
      const schoolDataForStorage = {
        name: formData.schoolName.trim(),
        alias: formData.shortName.trim(),
        country: formData.country,
        website: formData.website?.trim() || undefined,
        ...(selectedEducationSystem && {
          educationSystemId: selectedEducationSystem.id,
          educationSystemName: selectedEducationSystem.name,
          educationSystemCode: selectedEducationSystem.code
        })
      };
      
      localStorage.setItem("schoolData", JSON.stringify(schoolDataForStorage));
      
      toast.success("School setup completed! Now create your administrator account.");
      
      // Redirect to create account page
      router.push("/auth/create-account");
      
    } catch (error) {
      console.error("School signup error:", error);
      toast.error("Failed to complete school setup. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">School Setup</CardTitle>
            <CardDescription>
              Set up your school with the appropriate education system and curriculum
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between mt-2">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.step;
                  const isCompleted = currentStep > step.step;
                  
                  return (
                    <div key={step.step} className="flex flex-col items-center">
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors
                        ${isCompleted ? 'bg-primary border-primary text-white' : 
                          isActive ? 'border-primary text-primary' : 
                          'border-gray-300 text-gray-300'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className={`text-xs mt-1 ${isActive ? 'font-medium' : 'text-gray-500'}`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: School Information */}
            {currentStep === SignupStep.SCHOOL_INFO && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Tell us about your school</h3>
                  <p className="text-muted-foreground">We'll use this information to set up your school profile</p>
                </div>

                <div className="space-y-4">
                  {/* School Name */}
                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="text-sm font-medium">
                      School Name *
                    </Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      placeholder="Enter your school's full name"
                      value={formData.schoolName}
                      onChange={(e) => handleChange("schoolName", e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                    {errors.schoolName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.schoolName}
                      </p>
                    )}
                  </div>

                  {/* School Short Name */}
                  <div className="space-y-2">
                    <Label htmlFor="shortName" className="text-sm font-medium">
                      School Alias/Short Name *
                    </Label>
                    <Input
                      id="shortName"
                      name="shortName"
                      type="text"
                      placeholder="Enter a short identifier (max 10 characters)"
                      value={formData.shortName}
                      onChange={(e) => handleChange("shortName", e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                      maxLength={10}
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be used in URLs and system identifiers
                    </p>
                    {errors.shortName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.shortName}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country *
                    </Label>
                    <Select onValueChange={(value) => handleChange("country", value)} disabled={isLoading} value={formData.country}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.country}
                      </p>
                    )}
                  </div>

                  {/* School Website */}
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-sm font-medium">
                      School Website (Optional)
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      placeholder="https://www.yourschool.com"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      disabled={isLoading}
                      className="h-11"
                    />
                    {errors.website && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.website}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education System Selection */}
            {currentStep === SignupStep.EDUCATION_SYSTEM && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Choose Your Education System</h3>
                  <p className="text-muted-foreground">
                    Select the education system that matches your school's curriculum and assessment structure
                  </p>
                </div>

                <EducationSystemSelector
                  selectedSystem={selectedEducationSystem}
                  onSystemSelect={handleEducationSystemSelect}
                  showNextButton={false}
                />
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === SignupStep.CONFIRMATION && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Review Your School Setup</h3>
                  <p className="text-muted-foreground">
                    Please review your school information and education system selection
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* School Information Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building className="h-5 w-5" />
                        School Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">School Name</Label>
                        <p className="text-sm font-medium">{formData.schoolName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">School Alias</Label>
                        <p className="text-sm font-medium">{formData.shortName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Country</Label>
                        <p className="text-sm font-medium">{formData.country}</p>
                      </div>
                      {formData.website && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Website</Label>
                          <p className="text-sm font-medium">{formData.website}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Education System Summary */}
                  {selectedEducationSystem && (
                    <EducationSystemOverview 
                      system={selectedEducationSystem} 
                      showDetails={false}
                    />
                  )}
                </div>

                {selectedEducationSystem && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                      Your school will be configured with the <strong>{selectedEducationSystem.name}</strong> education system, 
                      including {selectedEducationSystem.gradeLevels?.length || 0} grade levels, 
                      {selectedEducationSystem.subjectAreas?.length || 0} subject areas, and 
                      {selectedEducationSystem.termsPerYear} terms per academic year.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === SignupStep.SCHOOL_INFO || isLoading}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                {isLoading ? (
                  "Processing..."
                ) : currentStep === SignupStep.CONFIRMATION ? (
                  "Complete Setup"
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}