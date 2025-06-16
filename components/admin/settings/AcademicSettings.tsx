"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, X, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import type { AcademicSettings } from '@/lib/api/settings';

interface AcademicSettingsProps {
  settings: AcademicSettings;
  onChange: (settings: AcademicSettings) => void;
}

export default function AcademicSettings({ settings, onChange }: AcademicSettingsProps) {
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');

  const handleSettingChange = (field: keyof AcademicSettings, value: any) => {
    onChange({
      ...settings,
      [field]: value,
    });
  };

  const addGradeLevel = () => {
    if (newGrade.trim() && !settings.gradeLevels.includes(newGrade.trim())) {
      handleSettingChange('gradeLevels', [...settings.gradeLevels, newGrade.trim()]);
      setNewGrade('');
    }
  };

  const removeGradeLevel = (grade: string) => {
    handleSettingChange('gradeLevels', settings.gradeLevels.filter(g => g !== grade));
  };

  const addSubject = () => {
    if (newSubject.trim() && !settings.subjects.includes(newSubject.trim())) {
      handleSettingChange('subjects', [...settings.subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    handleSettingChange('subjects', settings.subjects.filter(s => s !== subject));
  };

  return (
    <div className="space-y-6">
      {/* Academic Year */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Academic Year Settings
          </CardTitle>
          <CardDescription>
            Configure your school's academic calendar and grading system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="academic-start">Academic Year Start</Label>
              <Input
                id="academic-start"
                type="date"
                value={settings.academicYearStart}
                onChange={(e) => handleSettingChange('academicYearStart', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="academic-end">Academic Year End</Label>
              <Input
                id="academic-end"
                type="date"
                value={settings.academicYearEnd}
                onChange={(e) => handleSettingChange('academicYearEnd', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Term System</Label>
              <Select
                value={settings.termSystem}
                onValueChange={(value) => handleSettingChange('termSystem', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester">Semester (2 terms)</SelectItem>
                  <SelectItem value="trimester">Trimester (3 terms)</SelectItem>
                  <SelectItem value="quarterly">Quarterly (4 terms)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Grading Scale</Label>
              <Select
                value={settings.gradingScale}
                onValueChange={(value) => handleSettingChange('gradingScale', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                  <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                  <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grade Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Grade Levels
          </CardTitle>
          <CardDescription>
            Manage the grade levels available in your school
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add new grade level (e.g., K, 1, 2...)"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGradeLevel()}
            />
            <Button onClick={addGradeLevel}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.gradeLevels.map((grade) => (
              <Badge key={grade} variant="secondary" className="px-3 py-1">
                {grade}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 w-4 h-4"
                  onClick={() => removeGradeLevel(grade)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subjects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Subjects
          </CardTitle>
          <CardDescription>
            Manage the subjects taught in your school
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add new subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSubject()}
            />
            <Button onClick={addSubject}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {settings.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="px-3 py-1">
                {subject}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 w-4 h-4"
                  onClick={() => removeSubject(subject)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Class Settings</CardTitle>
          <CardDescription>
            Default settings for class management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="class-capacity">Default Class Capacity</Label>
            <Input
              id="class-capacity"
              type="number"
              min="1"
              max="100"
              value={settings.defaultClassCapacity}
              onChange={(e) => handleSettingChange('defaultClassCapacity', parseInt(e.target.value) || 30)}
            />
            <p className="text-sm text-gray-500">
              Maximum number of students per class by default
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}