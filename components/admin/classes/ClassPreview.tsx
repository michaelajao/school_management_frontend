"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  School, 
  Users, 
  BookOpen, 
  MapPin, 
  Calendar, 
  Settings, 
  Edit3,
  CheckCircle,
  AlertCircle,
  UserCheck
} from 'lucide-react';

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

interface ClassPreviewProps {
  data: ClassFormData;
  onEdit: (step: number) => void;
}

// Mock teacher data - in a real app, this would come from API or props
const mockTeachers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@school.edu' },
  { id: '2', name: 'Michael Chen', email: 'michael.chen@school.edu' },
  { id: '3', name: 'Dr. Emily Rodriguez', email: 'emily.rodriguez@school.edu' },
  { id: '4', name: 'David Thompson', email: 'david.thompson@school.edu' },
  { id: '5', name: 'Lisa Anderson', email: 'lisa.anderson@school.edu' },
  { id: '6', name: 'Robert Kim', email: 'robert.kim@school.edu' },
  { id: '7', name: 'Maria Garcia', email: 'maria.garcia@school.edu' },
  { id: '8', name: 'James Wilson', email: 'james.wilson@school.edu' }
];

export default function ClassPreview({ data, onEdit }: ClassPreviewProps) {
  const getTeacherById = (id: string) => mockTeachers.find(t => t.id === id);
  
  const getTeacherInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const classTeacher = data.classTeacher ? getTeacherById(data.classTeacher) : null;

  const validateData = () => {
    const issues = [];
    
    if (!data.name.trim()) issues.push('Class name is required');
    if (!data.grade.trim()) issues.push('Grade level is required');
    if (!data.section.trim()) issues.push('Section is required');
    if (data.subjects.length === 0) issues.push('At least one subject must be selected');
    if (data.capacity < 1 || data.capacity > 100) issues.push('Capacity must be between 1 and 100');
    
    const unassignedSubjects = data.subjects.filter(
      subjectId => !data.subjectTeachers.find(st => st.subjectId === subjectId)
    );
    if (unassignedSubjects.length > 0) {
      issues.push(`${unassignedSubjects.length} subjects need teachers assigned`);
    }

    return issues;
  };

  const validationIssues = validateData();
  const isValid = validationIssues.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <CheckCircle className="w-5 h-5" />
        Review & Create Class
      </div>

      {/* Validation Status */}
      <Card className={isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            {isValid ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className={`font-medium ${isValid ? 'text-green-800' : 'text-red-800'}`}>
                {isValid ? 'Ready to Create' : 'Issues Found'}
              </h3>
              <p className={`text-sm ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                {isValid 
                  ? 'All required information has been provided. The class is ready to be created.'
                  : 'Please resolve the following issues before creating the class:'
                }
              </p>
              {!isValid && (
                <ul className="mt-2 space-y-1 text-sm text-red-700">
                  {validationIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-600 rounded-full" />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <School className="w-4 h-4" />
              Basic Information
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(0)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Class Name</p>
              <p className="text-sm">{data.name || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Grade & Section</p>
              <p className="text-sm">
                {data.grade && data.section ? `Grade ${data.grade}, Section ${data.section}` : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Academic Year</p>
              <p className="text-sm">{data.academicYear}-{parseInt(data.academicYear) + 1}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <Badge variant={data.isActive ? 'default' : 'secondary'}>
                {data.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </div>
          
          {data.description && (
            <div>
              <p className="text-sm font-medium text-gray-600">Description</p>
              <p className="text-sm text-gray-800">{data.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subjects */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              Subjects ({data.subjects.length})
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          {data.subjects.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.subjects.map((subject) => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No subjects selected</p>
          )}
        </CardContent>
      </Card>

      {/* Teachers */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              Teacher Assignments
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Class Teacher */}
          {classTeacher && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Class Teacher</p>
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Avatar>
                  <AvatarImage src={classTeacher.avatar} />
                  <AvatarFallback>
                    {getTeacherInitials(classTeacher.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">{classTeacher.name}</p>
                  <p className="text-sm text-blue-700">{classTeacher.email}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  Class Teacher
                </Badge>
              </div>
            </div>
          )}

          {/* Subject Teachers */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Subject Teachers</p>
            {data.subjectTeachers.length > 0 ? (
              <div className="space-y-2">
                {data.subjectTeachers.map((assignment) => {
                  const teacher = getTeacherById(assignment.teacherId);
                  return teacher ? (
                    <div key={`${assignment.subjectId}-${assignment.teacherId}`} 
                         className="flex items-center gap-3 p-2 border rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback className="text-xs">
                          {getTeacherInitials(teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{assignment.subjectId}</p>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No subject teachers assigned</p>
            )}

            {/* Unassigned Subjects */}
            {data.subjects.length > data.subjectTeachers.length && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">Unassigned Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.subjects
                    .filter(subject => !data.subjectTeachers.find(st => st.subjectId === subject))
                    .map(subject => (
                      <Badge key={subject} variant="outline" className="text-yellow-700 border-yellow-300">
                        {subject}
                      </Badge>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Settings className="w-4 h-4" />
              Class Settings
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Capacity</p>
              <p className="text-sm">{data.capacity} students</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Room</p>
              <p className="text-sm">{data.room || 'Not assigned'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Class Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-[#1B5B5E]">{data.subjects.length}</p>
              <p className="text-xs text-gray-600">Subjects</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B5B5E]">{data.subjectTeachers.length}</p>
              <p className="text-xs text-gray-600">Teachers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B5B5E]">{data.capacity}</p>
              <p className="text-xs text-gray-600">Max Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1B5B5E]">
                {classTeacher ? '1' : '0'}
              </p>
              <p className="text-xs text-gray-600">Class Teacher</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}