"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";

interface ClassItem {
  name: string;
  subject: string;
  students: number;
}

interface StudentProgress {
  name: string;
  class: string;
  overallScore: number;
  attendance: number;
  lastActivity: string;
}

interface Assignment {
  class: string;
  subject: string;
  title: string;
  dueDate: string;
  submitted: string;
  pendingReview: number;
  status: string;
}

interface AnalyticsManagerProps {
  myClasses?: ClassItem[];
  studentProgressData?: StudentProgress[];
  assignmentsData?: Assignment[];
}

export const AnalyticsManager = ({
  myClasses = [],
  studentProgressData = [],
  assignmentsData = []
}: AnalyticsManagerProps) => {
  const defaultClasses: ClassItem[] = [
    { name: "Class 10A", subject: "Mathematics", students: 32 },
    { name: "Class 9B", subject: "Physics", students: 28 },
    { name: "Class 11C", subject: "Chemistry", students: 25 },
  ];

  const defaultStudentProgress: StudentProgress[] = [
    { name: "Adebayo Oluwatobi", class: "Year 7B", overallScore: 85, attendance: 95, lastActivity: "Submitted Algebra Homework" },
    { name: "Chidinma Okoro", class: "Year 8C", overallScore: 78, attendance: 92, lastActivity: "Viewed Newton's Laws lesson" },
    { name: "Musa Ibrahim", class: "Year 9A", overallScore: 92, attendance: 98, lastActivity: "Scored 95% on Periodic Table Quiz" },
    { name: "Fatima Hassan", class: "Year 7B", overallScore: 65, attendance: 78, lastActivity: "Missed Chemistry Lab" },
  ];

  const defaultAssignments: Assignment[] = [
    { class: "Year 7B", subject: "Mathematics", title: "Algebra Homework", dueDate: "28 March 2025", submitted: "28 / 30", pendingReview: 4, status: "Graded" },
    { class: "Year 8C", subject: "Physics", title: "Newton's Laws Worksheet", dueDate: "30 March 2025", submitted: "25 / 25", pendingReview: 0, status: "Graded" },
    { class: "Year 9A", subject: "Chemistry", title: "Periodic Table Quiz", dueDate: "02 April 2025", submitted: "20 / 22", pendingReview: 22, status: "Pending Grade" },
  ];

  const classes = myClasses.length > 0 ? myClasses : defaultClasses;
  const students = studentProgressData.length > 0 ? studentProgressData : defaultStudentProgress;
  const assignments = assignmentsData.length > 0 ? assignmentsData : defaultAssignments;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Class Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classes.map((classItem, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium">{classItem.name}</p>
                      <p className="text-sm text-gray-600">{classItem.subject}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {85 + Math.floor(Math.random() * 15)}% Avg
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="font-medium text-blue-600">{classItem.students}</p>
                      <p className="text-xs text-gray-600">Students</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="font-medium text-green-600">{Math.floor(Math.random() * 5) + 3}</p>
                      <p className="text-xs text-gray-600">Assignments</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <p className="font-medium text-purple-600">95%</p>
                      <p className="text-xs text-gray-600">Attendance</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Student Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {students.filter(s => s.overallScore >= 85).length}
                  </p>
                  <p className="text-sm text-green-600">Excellent</p>
                  <p className="text-xs text-gray-500">≥85%</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">
                    {students.filter(s => s.overallScore >= 70 && s.overallScore < 85).length}
                  </p>
                  <p className="text-sm text-yellow-600">Good</p>
                  <p className="text-xs text-gray-500">70-84%</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">
                    {students.filter(s => s.overallScore < 70).length}
                  </p>
                  <p className="text-sm text-red-600">Needs Help</p>
                  <p className="text-xs text-gray-500">&lt;70%</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Students Requiring Attention</h4>
                <div className="space-y-2">
                  {students
                    .filter(s => s.overallScore < 75 || s.attendance < 85)
                    .map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <div>
                          <p className="font-medium text-sm">{student.name}</p>
                          <p className="text-xs text-gray-600">
                            Score: {student.overallScore}% | Attendance: {student.attendance}%
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assignment Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Submission Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-gray-600">{assignment.class}</p>
                  </div>
                  <Badge variant={assignment.status === "Graded" ? "secondary" : "outline"}>
                    {assignment.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Submitted:</span>
                    <span className="font-medium">{assignment.submitted}</span>
                  </div>
                  <Progress 
                    value={parseInt(assignment.submitted.split(' / ')[0]) / parseInt(assignment.submitted.split(' / ')[1]) * 100} 
                    className="h-2" 
                  />
                  {assignment.pendingReview > 0 && (
                    <p className="text-sm text-orange-600">
                      {assignment.pendingReview} pending review
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};