"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Download, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Info } from "lucide-react";

// Data templates for different entity types
const DATA_TEMPLATES = {
  students: [
    "First Name,Last Name,Gender,Date of Birth,Class,Parent Email,Student ID,Address",
    "John,Doe,Male,2010-05-15,JSS 1,parent1@example.com,STU001,123 Main St",
    "Jane,Smith,Female,2011-03-10,JSS 1,parent2@example.com,STU002,456 Oak Ave",
  ].join('\n'),
  
  teachers: [
    "First Name,Last Name,Gender,Email,Phone,Subjects,Qualifications,Staff ID",
    "Michael,Johnson,Male,mjohnson@example.com,+1234567890,Mathematics,MSc Mathematics,TCH001",
    "Sarah,Williams,Female,swilliams@example.com,+0987654321,English,BA English Literature,TCH002",
  ].join('\n'),
  
  classes: [
    "Class Name,Class Code,Class Teacher,Maximum Students,Description",
    "Junior Secondary School 1A,JSS1A,Michael Johnson,30,First junior secondary class",
    "Junior Secondary School 1B,JSS1B,Sarah Williams,30,Second junior secondary class",
  ].join('\n'),
  
  parents: [
    "First Name,Last Name,Email,Phone,Occupation,Address",
    "Robert,Doe,rdoe@example.com,+1122334455,Engineer,123 Main St",
    "Mary,Smith,msmith@example.com,+5566778899,Doctor,456 Oak Ave",
  ].join('\n'),
  
  subjects: [
    "Subject Name,Subject Code,Description",
    "Mathematics,MATH101,Basic mathematics curriculum",
    "English Language,ENG101,English language and literature",
    "Basic Science,SCI101,Introduction to science concepts",
  ].join('\n'),
};

type EntityType = keyof typeof DATA_TEMPLATES;

export function DataImport() {
  const [activeTab, setActiveTab] = useState<EntityType>("students");
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error" | "processing">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [importSummary, setImportSummary] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);

  // Download sample template for the current entity type
  const downloadTemplate = () => {
    const template = DATA_TEMPLATES[activeTab];
    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} template downloaded successfully.`);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus("idle");
      setErrorMessage("");
      setImportSummary(null);
    }
  };

  // Process file upload
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploadStatus("processing");
    
    try {
      // Simulate file processing with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes, simulate successful import with random data
      const total = Math.floor(Math.random() * 50) + 10;
      const success = Math.floor(Math.random() * total);
      const failed = total - success;
      
      setImportSummary({
        total,
        success,
        failed
      });
      
      if (failed > 0) {
        setUploadStatus("error");
        setErrorMessage(`${failed} records couldn't be processed. Please check your data format.`);
      } else {
        setUploadStatus("success");
      }
      
      // Success toast message
      toast.success(`Processed ${total} ${activeTab} records. ${success} imported successfully.`);
      
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("error");
      setErrorMessage("An error occurred while processing your file. Please try again.");
      toast.error("Upload failed. Please try again.");
    }
  };

  // Reset the upload state
  const resetUpload = () => {
    setFile(null);
    setUploadStatus("idle");
    setErrorMessage("");
    setImportSummary(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Data Import</CardTitle>
        <CardDescription>
          Import multiple records at once by uploading CSV files. Download our templates for the correct format.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="students" onValueChange={(value) => setActiveTab(value as EntityType)}>
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
          </TabsList>
          
          {/* All tabs share similar content but with different entity-specific instructions */}
          {(["students", "teachers", "classes", "parents", "subjects"] as const).map((entityType) => (
            <TabsContent key={entityType} value={entityType} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Import {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with your {entityType} data
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={downloadTemplate}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
              
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Important Instructions</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Use the template to ensure your data is formatted correctly</li>
                    <li>Required fields must not be empty</li>
                    <li>Save your spreadsheet as a CSV file before uploading</li>
                    <li>Maximum file size: 10MB</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <Separator className="my-4" />
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`${entityType}-file`}>Upload CSV File</Label>
                  <Input
                    id={`${entityType}-file`}
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                    disabled={uploadStatus === "processing"}
                  />
                  <p className="text-xs text-muted-foreground">
                    Accepted format: CSV (Comma-Separated Values)
                  </p>
                </div>
                
                {file && (
                  <div className="flex items-center gap-2 text-sm">
                    <FileSpreadsheet className="h-4 w-4 text-green-500" />
                    <span>Selected file: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
                
                {uploadStatus === "processing" && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                      <AlertTitle>Processing your data...</AlertTitle>
                    </div>
                    <AlertDescription>
                      This might take a moment depending on the file size.
                    </AlertDescription>
                  </Alert>
                )}
                
                {uploadStatus === "success" && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Import Successful!</AlertTitle>
                    <AlertDescription>
                      {importSummary && (
                        <p>Successfully imported {importSummary.success} out of {importSummary.total} records.</p>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
                
                {uploadStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Import Error</AlertTitle>
                    <AlertDescription>
                      {errorMessage}
                      {importSummary && importSummary.success > 0 && (
                        <p className="mt-1">Successfully imported {importSummary.success} out of {importSummary.total} records.</p>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleUpload} 
                    disabled={!file || uploadStatus === "processing"}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload and Process
                  </Button>
                  {(uploadStatus === "success" || uploadStatus === "error") && (
                    <Button variant="outline" onClick={resetUpload}>
                      Reset
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <p>
            When importing large datasets, please be patient as processing may take some time. 
            For any issues with your import, contact technical support or try our 
            <a href="#" className="text-primary font-medium ml-1">data validation tool</a>.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}