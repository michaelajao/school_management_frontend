"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Users, Search, UserCheck, BookOpen } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subjects: string[];
  isClassTeacher?: boolean;
}

interface TeacherAssignmentProps {
  subjects: string[];
  classTeacher?: string;
  subjectTeachers: Array<{
    subjectId: string;
    teacherId: string;
  }>;
  onClassTeacherChange: (teacherId: string) => void;
  onSubjectTeachersChange: (assignments: Array<{ subjectId: string; teacherId: string; }>) => void;
  errors: Record<string, string[]>;
}

export default function TeacherAssignment({ 
  subjects, 
  classTeacher, 
  subjectTeachers, 
  onClassTeacherChange, 
  onSubjectTeachersChange, 
  errors 
}: TeacherAssignmentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);

  // Mock teachers data - in a real app, this would come from API
  useEffect(() => {
    const mockTeachers: Teacher[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@school.edu',
        subjects: ['Mathematics', 'Algebra', 'Geometry', 'Statistics'],
        isClassTeacher: true
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'michael.chen@school.edu',
        subjects: ['English Language Arts', 'Literature', 'Writing', 'Reading']
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez',
        email: 'emily.rodriguez@school.edu',
        subjects: ['Science', 'Biology', 'Chemistry', 'Physics']
      },
      {
        id: '4',
        name: 'David Thompson',
        email: 'david.thompson@school.edu',
        subjects: ['Social Studies', 'History', 'Geography']
      },
      {
        id: '5',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@school.edu',
        subjects: ['Art', 'Music', 'Physical Education']
      },
      {
        id: '6',
        name: 'Robert Kim',
        email: 'robert.kim@school.edu',
        subjects: ['Computer Science', 'Mathematics', 'Statistics']
      },
      {
        id: '7',
        name: 'Maria Garcia',
        email: 'maria.garcia@school.edu',
        subjects: ['Foreign Language', 'Literature', 'Writing']
      },
      {
        id: '8',
        name: 'James Wilson',
        email: 'james.wilson@school.edu',
        subjects: ['Physical Education', 'Health'],
        isClassTeacher: true
      }
    ];
    
    setAvailableTeachers(mockTeachers);
  }, []);

  const filteredTeachers = availableTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const classTeacherEligible = availableTeachers.filter(teacher => teacher.isClassTeacher);

  const getTeacherById = (id: string) => availableTeachers.find(t => t.id === id);

  const getTeachersForSubject = (subject: string) => {
    return availableTeachers.filter(teacher => 
      teacher.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase()))
    );
  };

  const handleSubjectTeacherChange = (subjectId: string, teacherId: string) => {
    const newAssignments = subjectTeachers.filter(st => st.subjectId !== subjectId);
    if (teacherId) {
      newAssignments.push({ subjectId, teacherId });
    }
    onSubjectTeachersChange(newAssignments);
  };

  const getAssignedTeacher = (subjectId: string) => {
    const assignment = subjectTeachers.find(st => st.subjectId === subjectId);
    return assignment ? getTeacherById(assignment.teacherId) : null;
  };

  const getTeacherInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <Users className="w-5 h-5" />
        Teacher Assignment
      </div>

      {/* Class Teacher Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <UserCheck className="w-4 h-4" />
            Class Teacher (Optional)
          </CardTitle>
          <CardDescription>
            Select a primary teacher who will be responsible for this class
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select
              value={classTeacher || ''}
              onValueChange={onClassTeacherChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select class teacher (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No class teacher</SelectItem>
                {classTeacherEligible.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback className="text-xs">
                          {getTeacherInitials(teacher.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.email}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {classTeacher && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={getTeacherById(classTeacher)?.avatar} />
                    <AvatarFallback>
                      {getTeacherInitials(getTeacherById(classTeacher)?.name || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">
                      {getTeacherById(classTeacher)?.name}
                    </p>
                    <p className="text-sm text-blue-700">
                      {getTeacherById(classTeacher)?.email}
                    </p>
                  </div>
                  <Badge className="ml-auto bg-blue-100 text-blue-800">
                    Class Teacher
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Subject Teachers */}
      {subjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4" />
              Subject Teachers
            </CardTitle>
            <CardDescription>
              Assign teachers to each subject for this class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map((subject) => {
                const qualifiedTeachers = getTeachersForSubject(subject);
                const assignedTeacher = getAssignedTeacher(subject);
                
                return (
                  <div key={subject} className="space-y-2">
                    <Label className="text-sm font-medium">{subject}</Label>
                    
                    <Select
                      value={assignedTeacher?.id || ''}
                      onValueChange={(teacherId) => handleSubjectTeacherChange(subject, teacherId)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={`Select teacher for ${subject}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No teacher assigned</SelectItem>
                        {qualifiedTeachers.length > 0 ? (
                          qualifiedTeachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id}>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={teacher.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {getTeacherInitials(teacher.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{teacher.name}</p>
                                  <p className="text-xs text-gray-500">
                                    Qualified for: {teacher.subjects.join(', ')}
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="" disabled>
                            No qualified teachers available
                          </SelectItem>
                        )}
                        
                        {/* Show all teachers as fallback */}
                        {qualifiedTeachers.length === 0 && (
                          <>
                            <SelectItem value="" disabled>
                              — All Teachers —
                            </SelectItem>
                            {availableTeachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={teacher.avatar} />
                                    <AvatarFallback className="text-xs">
                                      {getTeacherInitials(teacher.name)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{teacher.name}</p>
                                    <p className="text-xs text-orange-600">
                                      Not specifically qualified for {subject}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>

                    {assignedTeacher && (
                      <div className="p-2 bg-gray-50 rounded border">
                        <div className="flex items-center gap-2 text-sm">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={assignedTeacher.avatar} />
                            <AvatarFallback className="text-xs">
                              {getTeacherInitials(assignedTeacher.name)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{assignedTeacher.name}</span>
                          <span className="text-gray-500">assigned to {subject}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Error Display */}
            {errors.subjectTeachers && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.subjectTeachers[0]}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Assignment Summary */}
      {subjects.length > 0 && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm">Assignment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Total Subjects:</span> {subjects.length}
              </p>
              <p>
                <span className="font-medium">Assigned Teachers:</span> {subjectTeachers.length}
              </p>
              <p>
                <span className="font-medium">Unassigned Subjects:</span> {subjects.length - subjectTeachers.length}
              </p>
              {classTeacher && (
                <p>
                  <span className="font-medium">Class Teacher:</span> {getTeacherById(classTeacher)?.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {subjects.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No subjects selected</p>
              <p className="text-xs mt-1">Please select subjects in the previous step first</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}