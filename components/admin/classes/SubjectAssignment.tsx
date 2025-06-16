"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Plus, Search, X } from 'lucide-react';

interface SubjectAssignmentProps {
  selectedSubjects: string[];
  onChange: (subjects: string[]) => void;
  errors: Record<string, string[]>;
}

export default function SubjectAssignment({ selectedSubjects, onChange, errors }: SubjectAssignmentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState('');

  // Default subjects - in a real app, this would come from API
  const defaultSubjects = [
    'Mathematics',
    'English Language Arts',
    'Science',
    'Social Studies',
    'Physical Education',
    'Art',
    'Music',
    'Computer Science',
    'Foreign Language',
    'Health',
    'Biology',
    'Chemistry',
    'Physics',
    'History',
    'Geography',
    'Literature',
    'Writing',
    'Reading',
    'Algebra',
    'Geometry',
    'Calculus',
    'Statistics'
  ];

  useEffect(() => {
    setAvailableSubjects(defaultSubjects);
  }, []);

  const filteredSubjects = availableSubjects.filter(subject =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      onChange(selectedSubjects.filter(s => s !== subject));
    } else {
      onChange([...selectedSubjects, subject]);
    }
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && 
        !availableSubjects.includes(customSubject.trim()) && 
        !selectedSubjects.includes(customSubject.trim())) {
      const newSubject = customSubject.trim();
      setAvailableSubjects([...availableSubjects, newSubject]);
      onChange([...selectedSubjects, newSubject]);
      setCustomSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    onChange(selectedSubjects.filter(s => s !== subject));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <BookOpen className="w-5 h-5" />
        Subject Assignment
      </div>

      {/* Search and Add Custom Subject */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add custom subject"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSubject()}
          />
          <Button onClick={addCustomSubject} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      {/* Selected Subjects */}
      {selectedSubjects.length > 0 && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-sm text-green-800">
              Selected Subjects ({selectedSubjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSubjects.map((subject) => (
                <Badge key={subject} className="bg-green-100 text-green-800 border-green-300">
                  {subject}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-auto p-0 w-4 h-4 text-green-600 hover:text-green-800"
                    onClick={() => removeSubject(subject)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {errors.subjects && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{errors.subjects[0]}</p>
        </div>
      )}

      {/* Available Subjects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Available Subjects</CardTitle>
          <CardDescription>
            Select subjects that will be taught in this class
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
            {filteredSubjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSubjectToggle(subject)}
              >
                <Checkbox
                  checked={selectedSubjects.includes(subject)}
                  onChange={() => handleSubjectToggle(subject)}
                />
                <label className="text-sm font-medium cursor-pointer flex-1">
                  {subject}
                </label>
              </div>
            ))}
          </div>

          {filteredSubjects.length === 0 && searchTerm && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No subjects found matching "{searchTerm}"</p>
              <p className="text-xs mt-1">Try adding it as a custom subject above</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Select Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Select</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const coreSubjects = ['Mathematics', 'English Language Arts', 'Science', 'Social Studies'];
                const newSubjects = [...new Set([...selectedSubjects, ...coreSubjects])];
                onChange(newSubjects);
              }}
            >
              Core Subjects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const stemSubjects = ['Mathematics', 'Science', 'Computer Science', 'Biology', 'Chemistry', 'Physics'];
                const newSubjects = [...new Set([...selectedSubjects, ...stemSubjects])];
                onChange(newSubjects);
              }}
            >
              STEM Subjects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const artsSubjects = ['Art', 'Music', 'Literature', 'Writing'];
                const newSubjects = [...new Set([...selectedSubjects, ...artsSubjects])];
                onChange(newSubjects);
              }}
            >
              Arts & Humanities
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange([])}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}