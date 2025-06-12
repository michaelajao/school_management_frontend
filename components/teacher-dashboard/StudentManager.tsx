"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, Clipboard, TrendingUp } from "lucide-react";

interface ClassItem {
  name: string;
  subject: string;
  students: number;
  nextClass: string;
}

interface StudentProgress {
  name: string;
  class: string;
  overallScore: number;
  attendance: number;
  lastActivity: string;
}

interface StudentManagerProps {
  myClasses?: ClassItem[];
  studentProgressData?: StudentProgress[];
}

export const StudentManager = ({
  myClasses = [],
  studentProgressData = []
}: StudentManagerProps) => {
  const [selectedClass, setSelectedClass] = useState("Class 10A");

  const defaultClasses: ClassItem[] = [
    { name: "Class 10A", subject: "Mathematics", students: 32, nextClass: "Today 9:00 AM" },
    { name: "Class 9B", subject: "Physics", students: 28, nextClass: "Tomorrow 10:30 AM" },
    { name: "Class 11C", subject: "Chemistry", students: 25, nextClass: "Today 2:00 PM" },
  ];

  const defaultStudentProgress: StudentProgress[] = [
    { name: "Adebayo Oluwatobi", class: "Year 7B", overallScore: 85, attendance: 95, lastActivity: "Submitted Algebra Homework" },
    { name: "Chidinma Okoro", class: "Year 8C", overallScore: 78, attendance: 92, lastActivity: "Viewed Newton's Laws lesson" },
    { name: "Musa Ibrahim", class: "Year 9A", overallScore: 92, attendance: 98, lastActivity: "Scored 95% on Periodic Table Quiz" },
  ];

  const classes = myClasses.length > 0 ? myClasses : defaultClasses;
  const students = studentProgressData.length > 0 ? studentProgressData : defaultStudentProgress;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Class Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Class</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {classes.map((classItem, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg cursor-pointer border transition-all ${
                  selectedClass === classItem.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedClass(classItem.name)}
              >
                <p className="font-medium">{classItem.name}</p>
                <p className="text-sm text-gray-600">{classItem.subject}</p>
                <p className="text-xs text-gray-500">{classItem.students} students</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Students in {selectedClass}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Clipboard className="w-4 h-4 mr-2" />
                    Take Attendance
                  </Button>
                  <Button variant="outline" size="sm">Export List</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Overall Score</TableHead>
                    <TableHead>Attendance</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Performance Trend</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.class}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={student.overallScore} className="w-24 h-2" />
                          <span className="font-medium">{student.overallScore}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={student.attendance} className="w-24 h-2" />
                          <span className={student.attendance < 80 ? "text-red-500" : "text-green-500"}>
                            {student.attendance}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {student.lastActivity}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <TrendingUp className={`w-4 h-4 ${
                            student.overallScore > 85 ? 'text-green-500' : 
                            student.overallScore > 70 ? 'text-yellow-500' : 'text-red-500'
                          }`} />
                          <span className={`text-sm ml-1 ${
                            student.overallScore > 85 ? 'text-green-500' : 
                            student.overallScore > 70 ? 'text-yellow-500' : 'text-red-500'
                          }`}>
                            {student.overallScore > 85 ? 'Improving' : 
                             student.overallScore > 70 ? 'Stable' : 'Needs Attention'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">View Profile</Button>
                          <Button variant="ghost" size="sm">Contact Parent</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};