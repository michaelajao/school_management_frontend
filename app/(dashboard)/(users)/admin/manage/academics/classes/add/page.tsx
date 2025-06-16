"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  X, 
  CheckCircle, 
  AlertCircle,
  School,
  Users,
  BookOpen,
  Settings
} from 'lucide-react';

// Import form components
import BasicClassInfo from '@/components/admin/classes/BasicClassInfo';
import SubjectAssignment from '@/components/admin/classes/SubjectAssignment';
import TeacherAssignment from '@/components/admin/classes/TeacherAssignment';
import ClassSettings from '@/components/admin/classes/ClassSettings';
import ClassPreview from '@/components/admin/classes/ClassPreview';

// Import API service
import { ClassesApiService, type CreateClassData } from '@/lib/api/classes';

interface ClassFormData {
  name: string;
  grade: string;
  section: string;
  description?: string;
  capacity: number;
  room?: string;
  subjects: string[];
  classTeacher?: string;
  subjectTeachers: Array<{
    subjectId: string;
    teacherId: string;
  }>;
  academicYear: string;
  isActive: boolean;
}

const steps = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Class name, grade, and section',
    icon: School,
  },
  {
    id: 'subjects',
    title: 'Subject Assignment',
    description: 'Select subjects for this class',
    icon: BookOpen,
  },
  {
    id: 'teachers',
    title: 'Teacher Assignment',
    description: 'Assign class and subject teachers',
    icon: Users,
  },
  {
    id: 'settings',
    title: 'Class Settings',
    description: 'Capacity, room, and other settings',
    icon: Settings,
  },
  {
    id: 'preview',
    title: 'Review & Create',
    description: 'Review information before creating',
    icon: CheckCircle,
  },
];

export default function AddClassPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    grade: '',
    section: '',
    description: '',
    capacity: 30,
    room: '',
    subjects: [],
    classTeacher: '',
    subjectTeachers: [],
    academicYear: new Date().getFullYear().toString(),
    isActive: true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string[]> = {};

    switch (steps[currentStep].id) {
      case 'basic':
        if (!formData.name.trim()) {
          errors.name = ['Class name is required'];
        }
        if (!formData.grade.trim()) {
          errors.grade = ['Grade level is required'];
        }
        if (!formData.section.trim()) {
          errors.section = ['Section is required'];
        }
        break;
      
      case 'subjects':
        if (formData.subjects.length === 0) {
          errors.subjects = ['At least one subject must be selected'];
        }
        break;
      
      case 'teachers':
        // Class teacher is optional, but if subjects are assigned, each should have a teacher
        const unassignedSubjects = formData.subjects.filter(
          subjectId => !formData.subjectTeachers.find(st => st.subjectId === subjectId)
        );
        if (unassignedSubjects.length > 0) {
          errors.subjectTeachers = [`${unassignedSubjects.length} subjects need teachers assigned`];
        }
        break;
      
      case 'settings':
        if (formData.capacity < 1 || formData.capacity > 100) {
          errors.capacity = ['Capacity must be between 1 and 100'];
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormDataChange = (newData: Partial<ClassFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear validation errors for changed fields
    const changedFields = Object.keys(newData);
    setValidationErrors(prev => {
      const updated = { ...prev };
      changedFields.forEach(field => {
        delete updated[field];
      });
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare data for API - match existing CreateClassData interface
      const classData: CreateClassData = {
        name: formData.name,
        section: formData.section,
        academicYear: formData.academicYear,
        description: formData.description,
        capacity: formData.capacity,
        teacherId: formData.classTeacher,
        // Note: The existing API doesn't support subjects and subjectTeachers
        // These would need to be handled separately or the API would need to be extended
      };

      const response = await ClassesApiService.createClass(classData);
      
      toast({
        title: 'Success',
        description: 'Class created successfully!',
      });
      router.push('/admin/manage/academics/classes');
    } catch (error) {
      console.error('Failed to create class:', error);
      toast({
        title: 'Error',
        description: 'Failed to create class. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'basic':
        return (
          <BasicClassInfo
            data={formData}
            onChange={handleFormDataChange}
            errors={validationErrors}
          />
        );
      case 'subjects':
        return (
          <SubjectAssignment
            selectedSubjects={formData.subjects}
            onChange={(subjects) => handleFormDataChange({ subjects })}
            errors={validationErrors}
          />
        );
      case 'teachers':
        return (
          <TeacherAssignment
            subjects={formData.subjects}
            classTeacher={formData.classTeacher}
            subjectTeachers={formData.subjectTeachers}
            onClassTeacherChange={(classTeacher) => handleFormDataChange({ classTeacher })}
            onSubjectTeachersChange={(subjectTeachers) => handleFormDataChange({ subjectTeachers })}
            errors={validationErrors}
          />
        );
      case 'settings':
        return (
          <ClassSettings
            data={formData}
            onChange={handleFormDataChange}
            errors={validationErrors}
          />
        );
      case 'preview':
        return (
          <ClassPreview
            data={formData}
            onEdit={(step) => setCurrentStep(step)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Class</h1>
              <p className="text-gray-600">Add a new class to your school</p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep + 1} of {steps.length}: {currentStepData.title}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(progress)}% complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6 overflow-x-auto">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const hasError = Object.keys(validationErrors).length > 0 && index === currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                        ? hasError
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-[#1B5B5E] border-[#1B5B5E] text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : hasError ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="flex-1 h-px bg-gray-300 mx-4 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <currentStepData.icon className="w-5 h-5" />
              {currentStepData.title}
            </CardTitle>
            <CardDescription>{currentStepData.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => router.back()}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-[#1B5B5E] hover:bg-[#134345]"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-[#1B5B5E] hover:bg-[#134345]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Create Class
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}