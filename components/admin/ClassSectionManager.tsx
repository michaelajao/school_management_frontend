'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Users, BookOpen, GraduationCap, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ClassesApiService, ClassSection, CreateClassData } from '@/lib/api/classes';

interface ClassSectionFormData {
  name: string;
  section: string;
  academicYear: string;
  description: string;
  stream: string;
  track: string;
  capacity: number;
  teacherId: string;
}

const COMMON_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SECONDARY_STREAMS = ['Science', 'Arts', 'Commercial', 'Technical'];
const PERFORMANCE_TRACKS = ['Advanced', 'Regular', 'Remedial', 'Honors'];

export function ClassSectionManager() {
  const [classSections, setClassSections] = useState<ClassSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedClassName, setSelectedClassName] = useState('');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2024/2025');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isMultiSectionDialogOpen, setIsMultiSectionDialogOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);

  const [formData, setFormData] = useState<ClassSectionFormData>({
    name: '',
    section: '',
    academicYear: '2024/2025',
    description: '',
    stream: '',
    track: '',
    capacity: 30,
    teacherId: '',
  });

  useEffect(() => {
    loadClassSections();
  }, [selectedClassName, selectedAcademicYear]);

  const loadClassSections = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Call real backend API
      const response = await ClassesApiService.getClasses({
        search: selectedClassName || undefined,
        academicYearId: selectedAcademicYear || undefined,
        page: 1,
        limit: 100, // Get all for now
      });
      
      setClassSections(response.data);
    } catch (err) {
      console.error('Failed to load class sections:', err);
      setError('Failed to load class sections');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async () => {
    try {
      // Call real backend API
      const classData: CreateClassData = {
        name: formData.name,
        section: formData.section,
        academicYear: formData.academicYear,
        description: formData.description,
        stream: formData.stream,
        track: formData.track,
        capacity: formData.capacity,
        teacherId: formData.teacherId || undefined,
      };

      const newSection = await ClassesApiService.createClass(classData);
      
      // Refresh the list
      await loadClassSections();
      
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Failed to create class section:', err);
      setError('Failed to create class section');
    }
  };

  const handleCreateMultipleSections = async () => {
    try {
      // Create multiple sections by calling API for each section
      const createPromises = selectedSections.map(section => {
        const classData: CreateClassData = {
          name: formData.name,
          section: section,
          academicYear: formData.academicYear,
          description: formData.description,
          stream: formData.stream,
          track: formData.track,
          capacity: formData.capacity,
          teacherId: formData.teacherId || undefined,
        };
        return ClassesApiService.createClass(classData);
      });

      await Promise.all(createPromises);
      
      // Refresh the list
      await loadClassSections();
      
      setIsMultiSectionDialogOpen(false);
      resetForm();
      setSelectedSections([]);
    } catch (err) {
      console.error('Failed to create multiple sections:', err);
      setError('Failed to create multiple sections');
    }
  };

  const generateDisplayName = (name: string, section?: string, stream?: string, track?: string): string => {
    let displayName = name;

    if (section) {
      displayName += section;
    }

    if (stream) {
      const streamAbbr = {
        'Science': 'Sci',
        'Arts': 'Arts',
        'Commercial': 'Com',
        'Technical': 'Tech'
      }[stream] || stream.substring(0, 3);
      displayName += `-${streamAbbr}`;
    }

    if (track) {
      const trackAbbr = {
        'Advanced': 'Adv',
        'Regular': 'Reg',
        'Remedial': 'Rem',
        'Honors': 'Hon'
      }[track] || track.substring(0, 3);
      displayName += `-${trackAbbr}`;
    }

    return displayName;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      section: '',
      academicYear: '2024/2025',
      description: '',
      stream: '',
      track: '',
      capacity: 30,
      teacherId: '',
    });
  };

  const getEnrollmentStatus = (current: number, capacity?: number) => {
    if (!capacity) return 'bg-gray-100 text-gray-800';
    const percentage = (current / capacity) * 100;
    if (percentage >= 95) return 'bg-red-100 text-red-800';
    if (percentage >= 80) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Class Section Management</h2>
          <p className="text-gray-600">Manage multiple sections for each class level</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Class Section</DialogTitle>
              </DialogHeader>
              <CreateSectionForm 
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateSection}
                onCancel={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isMultiSectionDialogOpen} onOpenChange={setIsMultiSectionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Create Multiple
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Multiple Sections</DialogTitle>
              </DialogHeader>
              <MultiSectionForm 
                formData={formData}
                setFormData={setFormData}
                selectedSections={selectedSections}
                setSelectedSections={setSelectedSections}
                onSubmit={handleCreateMultipleSections}
                onCancel={() => setIsMultiSectionDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="className">Filter by Class</Label>
              <Select value={selectedClassName} onValueChange={setSelectedClassName}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  <SelectItem value="Primary 1">Primary 1</SelectItem>
                  <SelectItem value="Primary 2">Primary 2</SelectItem>
                  <SelectItem value="JSS 1">JSS 1</SelectItem>
                  <SelectItem value="JSS 2">JSS 2</SelectItem>
                  <SelectItem value="SSS 1">SSS 1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Select value={selectedAcademicYear} onValueChange={setSelectedAcademicYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024/2025">2024/2025</SelectItem>
                  <SelectItem value="2023/2024">2023/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={loadClassSections} variant="outline" className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Load Sections
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Class Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))
        ) : classSections.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <GraduationCap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No class sections found</h3>
            <p className="text-gray-500 mb-4">Create your first class section to get started</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Section
            </Button>
          </div>
        ) : (
          classSections.map((section) => (
            <Card key={section.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{section.displayName}</CardTitle>
                    <p className="text-sm text-gray-600">{section.academicYear}</p>
                  </div>
                  <Badge variant="outline">{section.section || 'Main'}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Enrollment Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Enrollment:</span>
                  <Badge className={getEnrollmentStatus(section.currentEnrollment, section.capacity)}>
                    {section.currentEnrollment}{section.capacity ? `/${section.capacity}` : ''}
                  </Badge>
                </div>

                {/* Stream and Track */}
                {(section.stream || section.track) && (
                  <div className="flex gap-2 flex-wrap">
                    {section.stream && (
                      <Badge variant="secondary" className="text-xs">
                        {section.stream}
                      </Badge>
                    )}
                    {section.track && (
                      <Badge variant="outline" className="text-xs">
                        {section.track}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Teacher */}
                {section.teacher && (
                  <div className="text-sm text-gray-600">
                    <strong>Teacher:</strong> {section.teacher.firstName} {section.teacher.lastName}
                  </div>
                )}

                {/* Description */}
                {section.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{section.description}</p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Users className="h-3 w-3 mr-1" />
                    Manage
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <BookOpen className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function CreateSectionForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel 
}: {
  formData: ClassSectionFormData;
  setFormData: (data: ClassSectionFormData) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Class Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Primary 1"
          />
        </div>
        <div>
          <Label htmlFor="section">Section</Label>
          <Select value={formData.section} onValueChange={(value) => setFormData({ ...formData, section: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {COMMON_SECTIONS.map(section => (
                <SelectItem key={section} value={section}>{section}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          id="capacity"
          type="number"
          min="1"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 30 })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stream">Stream (Optional)</Label>
          <Select value={formData.stream} onValueChange={(value) => setFormData({ ...formData, stream: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Stream</SelectItem>
              {SECONDARY_STREAMS.map(stream => (
                <SelectItem key={stream} value={stream}>{stream}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="track">Track (Optional)</Label>
          <Select value={formData.track} onValueChange={(value) => setFormData({ ...formData, track: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Track</SelectItem>
              {PERFORMANCE_TRACKS.map(track => (
                <SelectItem key={track} value={track}>{track}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Additional notes about this section"
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button onClick={onSubmit} className="flex-1">Create Section</Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
      </div>
    </div>
  );
}

function MultiSectionForm({ 
  formData, 
  setFormData, 
  selectedSections,
  setSelectedSections,
  onSubmit, 
  onCancel 
}: {
  formData: ClassSectionFormData;
  setFormData: (data: ClassSectionFormData) => void;
  selectedSections: string[];
  setSelectedSections: (sections: string[]) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const toggleSection = (section: string) => {
    (setSelectedSections as any)((prev: any) => 
      prev.includes(section) 
        ? prev.filter((s: any) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Class Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Primary 1"
        />
      </div>

      <div>
        <Label>Select Sections to Create</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {COMMON_SECTIONS.map(section => (
            <button
              key={section}
              type="button"
              onClick={() => toggleSection(section)}
              className={`p-2 text-sm border rounded ${
                selectedSections.includes(section)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="capacity">Capacity per Section</Label>
        <Input
          id="capacity"
          type="number"
          min="1"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 30 })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="stream">Stream (Optional)</Label>
          <Select value={formData.stream} onValueChange={(value) => setFormData({ ...formData, stream: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Stream</SelectItem>
              {SECONDARY_STREAMS.map(stream => (
                <SelectItem key={stream} value={stream}>{stream}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="track">Track (Optional)</Label>
          <Select value={formData.track} onValueChange={(value) => setFormData({ ...formData, track: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Track</SelectItem>
              {PERFORMANCE_TRACKS.map(track => (
                <SelectItem key={track} value={track}>{track}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedSections.length > 0 && (
        <div>
          <Label>Preview Sections ({selectedSections.length})</Label>
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedSections.map(section => (
              <Badge key={section} variant="secondary" className="text-xs">
                {formData.name}{section}
                <button
                  onClick={() => toggleSection(section)}
                  className="ml-1 hover:bg-red-200 rounded-full p-0.5"
                >
                  <X className="h-2 w-2" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={onSubmit} 
          className="flex-1"
          disabled={selectedSections.length === 0}
        >
          Create {selectedSections.length} Sections
        </Button>
        <Button onClick={onCancel} variant="outline" className="flex-1">Cancel</Button>
      </div>
    </div>
  );
}