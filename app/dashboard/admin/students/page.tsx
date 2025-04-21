"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import useMobile from "@/hooks/use-mobile";

export default function StudentManagementPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    if (user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  const [registrationType, setRegistrationType] = useState<"single" | "bulk">("single");
  const [studentForm, setStudentForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    parentEmail: "",
    grade: "",
    section: "",
  });
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleFormChange = (field: string, value: string) => {
    setStudentForm(prev => ({ ...prev, [field]: value }));

    // Clear error when user types
    if (formErrors[field]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = ["firstName", "lastName", "email", "grade"];

    requiredFields.forEach(field => {
      if (!studentForm[field as keyof typeof studentForm]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (studentForm.email && !/^\S+@\S+\.\S+$/.test(studentForm.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitStudent = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    // This would be replaced with an actual API call to your NestJS backend
    console.log("Submitting student:", studentForm);
    toast.success("Student registered successfully");

    // Clear the form
    setStudentForm({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      address: "",
      phoneNumber: "",
      parentEmail: "",
      grade: "",
      section: "",
    });
  };

  const handleBulkUpload = () => {
    if (!bulkFile) {
      toast.error("Please select a file to upload");
      return;
    }

    // This would be replaced with an actual API call to your NestJS backend
    console.log("Uploading file:", bulkFile.name);
    toast.success(`File "${bulkFile.name}" uploaded successfully`);
    setBulkFile(null);
  };

  // Render the form field based on the field name
  const renderFormField = (fieldName: string) => {
    return (
      <div className="space-y-2" key={fieldName}>
        <Label htmlFor={fieldName}>
          {fieldName.replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())}
          {["firstName", "lastName", "email", "grade"].includes(fieldName) && " *"}
        </Label>
        <Input
          id={fieldName}
          type={fieldName === "dateOfBirth" ? "date" : "text"}
          value={studentForm[fieldName as keyof typeof studentForm]}
          onChange={(e) => handleFormChange(fieldName, e.target.value)}
          className={formErrors[fieldName] ? "border-red-500" : ""}
        />
        {formErrors[fieldName] && (
          <p className="text-red-500 text-xs">{formErrors[fieldName]}</p>
        )}
      </div>
    );
  };

  // Desktop view: Side-by-side form and preview (Now the default view)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Registration</h1>
        <p className="text-muted-foreground mt-2">Register new students in the system</p>
      </div>

      <Tabs value={registrationType} onValueChange={(value) => setRegistrationType(value as "single" | "bulk")}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="single">Single Student</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Student Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground uppercase mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("firstName")}
                    {renderFormField("lastName")}
                    {renderFormField("dateOfBirth")}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground uppercase mb-3">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("email")}
                    {renderFormField("phoneNumber")}
                    {renderFormField("address")}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground uppercase mb-3">
                    Academic Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderFormField("grade")}
                    {renderFormField("section")}
                    {renderFormField("parentEmail")}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={handleSubmitStudent}>
                    Register Student
                  </Button>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <div>
              <Card className="p-6 lg:sticky top-6">
                <h2 className="text-xl font-medium mb-4">Preview</h2>
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">
                          {studentForm.firstName && studentForm.lastName
                            ? `${studentForm.firstName[0]}${studentForm.lastName[0]}`
                            : "👤"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {studentForm.firstName && studentForm.lastName
                            ? `${studentForm.firstName} ${studentForm.lastName}`
                            : "New Student"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {studentForm.email || "email@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {Object.entries(studentForm).map(([key, value]) => (
                      value && key !== "firstName" && key !== "lastName" && key !== "email" && (
                        <div key={key} className="grid grid-cols-2 text-sm">
                          <span className="font-medium">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                          </span>
                          <span>{value}</span>
                        </div>
                      )
                    ))}

                    {!Object.values(studentForm).some(val => val) && (
                      <p className="text-center text-muted-foreground text-sm py-4">
                        Fill the form to see the preview
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Form Completion</h3>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(Object.values(studentForm).filter(val => val).length * 100) / Object.keys(studentForm).length}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Required fields: First Name, Last Name, Email, Grade
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Area */}
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Bulk Student Upload</h2>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Upload a CSV or Excel file with multiple student records at once.
                </p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                  <input
                    type="file"
                    id="file-upload-desktop"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBulkFile(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-upload-desktop"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="text-5xl mb-4">📁</div>
                    <p className="font-medium text-lg mb-2">
                      {bulkFile ? bulkFile.name : "Drag & Drop File Here"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Or click to select a file
                    </p>
                    <Button variant="outline" size="sm">
                      Browse Files
                    </Button>
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleBulkUpload}
                    disabled={!bulkFile}
                  >
                    Upload Students
                  </Button>
                </div>
              </div>
            </Card>

            {/* Guidelines */}
            <Card className="p-6">
              <h2 className="text-xl font-medium mb-4">Upload Guidelines</h2>
              <div className="space-y-4">
                <p className="text-sm">
                  Please follow these guidelines for your bulk upload file:
                </p>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Required Columns</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Email</li>
                    <li>Grade</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2">Optional Columns</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Date of Birth</li>
                    <li>Phone Number</li>
                    <li>Address</li>
                    <li>Parent Email</li>
                    <li>Section</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium mb-2">Sample Template</h3>
                  <Button variant="outline" size="sm">
                    Download Template
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
