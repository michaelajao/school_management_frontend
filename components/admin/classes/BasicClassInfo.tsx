"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { School } from 'lucide-react';

interface BasicClassInfoProps {
  data: {
    name: string;
    grade: string;
    section: string;
    description?: string;
    academicYear: string;
  };
  onChange: (data: any) => void;
  errors: Record<string, string[]>;
}

export default function BasicClassInfo({ data, onChange, errors }: BasicClassInfoProps) {
  const currentYear = new Date().getFullYear();
  const academicYears = [
    `${currentYear}`,
    `${currentYear + 1}`,
    `${currentYear - 1}`,
  ];

  const gradeLevels = [
    'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  const sections = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <School className="w-5 h-5" />
        Basic Class Information
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Name */}
        <div className="space-y-2">
          <Label htmlFor="class-name" className="text-sm font-medium">
            Class Name *
          </Label>
          <Input
            id="class-name"
            placeholder="e.g., Mathematics A, Science Lab"
            value={data.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name[0]}</p>
          )}
          <p className="text-xs text-gray-500">
            Enter a descriptive name for the class
          </p>
        </div>

        {/* Grade Level */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Grade Level *
          </Label>
          <Select
            value={data.grade}
            onValueChange={(value) => onChange({ grade: value })}
          >
            <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select grade level" />
            </SelectTrigger>
            <SelectContent>
              {gradeLevels.map((grade) => (
                <SelectItem key={grade} value={grade}>
                  Grade {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-sm text-red-600">{errors.grade[0]}</p>
          )}
          <p className="text-xs text-gray-500">
            Select the grade level for this class
          </p>
        </div>

        {/* Section */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Section *
          </Label>
          <Select
            value={data.section}
            onValueChange={(value) => onChange({ section: value })}
          >
            <SelectTrigger className={errors.section ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {sections.map((section) => (
                <SelectItem key={section} value={section}>
                  Section {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.section && (
            <p className="text-sm text-red-600">{errors.section[0]}</p>
          )}
          <p className="text-xs text-gray-500">
            Choose a section identifier
          </p>
        </div>

        {/* Academic Year */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Academic Year
          </Label>
          <Select
            value={data.academicYear}
            onValueChange={(value) => onChange({ academicYear: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {academicYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}-{parseInt(year) + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Academic year for this class
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description (Optional)
        </Label>
        <Textarea
          id="description"
          placeholder="Enter a brief description of the class..."
          rows={3}
          value={data.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
        />
        <p className="text-xs text-gray-500">
          Provide additional details about the class (optional)
        </p>
      </div>

      {/* Preview Card */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Full Class Name:</span> {data.name || 'Not specified'}</p>
            <p><span className="font-medium">Grade & Section:</span> {data.grade && data.section ? `Grade ${data.grade}, Section ${data.section}` : 'Not specified'}</p>
            <p><span className="font-medium">Academic Year:</span> {data.academicYear}-{parseInt(data.academicYear) + 1}</p>
            {data.description && (
              <p><span className="font-medium">Description:</span> {data.description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}