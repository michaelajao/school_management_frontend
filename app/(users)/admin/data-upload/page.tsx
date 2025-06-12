"use client";

import { DataImport } from "@/components/admin/DataImport";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Upload, FileCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function DataUploadPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">
                <Home className="h-4 w-4 mr-1" />
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/data-upload">
                Data Upload
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-3xl font-bold tracking-tight">Data Upload Center</h1>
        <p className="text-muted-foreground">
          Import your school data efficiently with our data upload tools
        </p>
      </div>

      <Tabs defaultValue="bulk-import">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="bulk-import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Bulk Import
          </TabsTrigger>
          <TabsTrigger value="validation" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Data Validation
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help & Guides
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bulk-import">
          <DataImport />
        </TabsContent>
        
        <TabsContent value="validation">
          <Card>
            <CardHeader>
              <CardTitle>Data Validation</CardTitle>
              <CardDescription>
                Validate your data files before importing to prevent errors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="py-8 px-4 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                  <FileCheck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Data Validation Tool</h3>
                <p className="text-muted-foreground mb-4">
                  Coming soon! Our data validation tool will help you check your data files
                  for errors before importing them into the system.
                </p>
                <Link 
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Sign up for early access
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Help & Guides</CardTitle>
              <CardDescription>
                Learn how to prepare and import your data correctly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Step-by-Step Data Import Guide</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    A complete walkthrough of the data import process from preparation to validation
                  </p>
                  <Link 
                    href="#"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Guide
                  </Link>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Data Format Guidelines</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Learn about the required formats for each data type and field validations
                  </p>
                  <Link 
                    href="#"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Guidelines
                  </Link>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Troubleshooting Common Import Issues</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Solutions to the most common data import problems
                  </p>
                  <Link 
                    href="#"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View Solutions
                  </Link>
                </div>
                
                <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <h3 className="font-medium mb-1">Video Tutorial: Data Import</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Watch a step-by-step video guide on importing school data
                  </p>
                  <Link 
                    href="#"
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Watch Video
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}