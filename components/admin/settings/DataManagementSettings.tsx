"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Database, 
  Download, 
  Upload, 
  RefreshCw, 
  Archive,
  Trash2,
  Shield,
  Calendar,
  FileText
} from 'lucide-react';

interface DataManagementSettingsProps {
  onExport: () => void;
  onImport: () => void;
}

export default function DataManagementSettings({ onExport, onImport }: DataManagementSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Backup & Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Backup & Export
          </CardTitle>
          <CardDescription>
            Manage your school data backups and exports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={onExport} className="h-24 flex flex-col gap-2">
              <Download className="w-6 h-6" />
              <span>Export Settings</span>
              <span className="text-xs opacity-80">Download current configuration</span>
            </Button>

            <Button onClick={onImport} variant="outline" className="h-24 flex flex-col gap-2">
              <Upload className="w-6 h-6" />
              <span>Import Settings</span>
              <span className="text-xs opacity-80">Upload configuration file</span>
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Data Export Options</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Student Data
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Grade Reports
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Attendance Records
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Export Class Information
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5" />
            Data Retention Policy
          </CardTitle>
          <CardDescription>
            Configure how long different types of data are retained
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Student Records</p>
                <p className="text-sm text-gray-500">Academic records and enrollment data</p>
              </div>
              <Badge variant="outline">Permanent</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Attendance Records</p>
                <p className="text-sm text-gray-500">Daily attendance tracking</p>
              </div>
              <Badge variant="outline">7 years</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Grade Reports</p>
                <p className="text-sm text-gray-500">Academic performance data</p>
              </div>
              <Badge variant="outline">Permanent</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">System Logs</p>
                <p className="text-sm text-gray-500">Audit and activity logs</p>
              </div>
              <Badge variant="outline">1 year</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            System Maintenance
          </CardTitle>
          <CardDescription>
            Tools for system maintenance and data cleanup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <RefreshCw className="w-4 h-4 mr-2" />
              Optimize Database
            </Button>
            <Button variant="outline" className="justify-start">
              <Archive className="w-4 h-4 mr-2" />
              Archive Old Records
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Run Security Scan
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Maintenance
            </Button>
          </div>

          <Separator />

          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important Notice</p>
                <p>Regular backups are automatically created daily. Manual maintenance should be performed during off-hours to minimize disruption.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-red-600">
            Irreversible actions that permanently affect your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">
              <Trash2 className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>
            <p className="text-sm text-red-600">
              This will reset all school settings to default values. This action cannot be undone.
            </p>
          </div>

          <Separator className="bg-red-200" />

          <div className="space-y-3">
            <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">
              <Database className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
            <p className="text-sm text-red-600">
              This will permanently delete all school data including students, grades, and attendance records. This action cannot be undone.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}