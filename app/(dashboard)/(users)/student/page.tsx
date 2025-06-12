"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Calendar, FileText, Award, 
  Clock, TrendingUp, Target, MessageCircle 
} from "lucide-react";

const StudentDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  const dashboardMetrics = [
    {
      icon: BookOpen,
      value: 7,
      label: 'Active Subjects',
      primaryColor: '#008080',
      secondaryColor: '#BDFAFF4D',
    },
    {
      icon: FileText,
      value: 3,
      label: "Pending Assignments",
      primaryColor: "#EF1A36",
      secondaryColor: "#FFDDDE80"
    },
    {
      icon: Award,
      value: 85,
      label: "Average Grade (%)",
      primaryColor: "#28C76F",
      secondaryColor: "#28C76F33"
    },
    {
      icon: Calendar,
      value: 96,
      label: "Attendance Rate (%)",
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33",
    }
  ];

  const recentGrades = [
    { subject: "Mathematics", assignment: "Algebra Test", grade: 88, date: "2024-01-15", status: "good" },
    { subject: "Physics", assignment: "Lab Report", grade: 92, date: "2024-01-12", status: "excellent" },
    { subject: "Chemistry", assignment: "Organic Chemistry Quiz", grade: 76, date: "2024-01-10", status: "average" },
    { subject: "English", assignment: "Essay Writing", grade: 94, date: "2024-01-08", status: "excellent" },
  ];

  const upcomingAssignments = [
    { subject: "Mathematics", title: "Calculus Problem Set", dueDate: "2024-01-20", status: "due-soon" },
    { subject: "Physics", title: "Motion Analysis Report", dueDate: "2024-01-22", status: "upcoming" },
    { subject: "Chemistry", title: "Chemical Reactions Lab", dueDate: "2024-01-25", status: "upcoming" },
    { subject: "English", title: "Literature Review", dueDate: "2024-01-28", status: "upcoming" },
  ];

  const todaySchedule = [
    { subject: "Mathematics", time: "8:00 AM - 9:00 AM", teacher: "Mr. Smith", room: "Room 101" },
    { subject: "Physics", time: "9:30 AM - 10:30 AM", teacher: "Ms. Johnson", room: "Lab A" },
    { subject: "Break", time: "10:30 AM - 11:00 AM", teacher: "", room: "" },
    { subject: "Chemistry", time: "11:00 AM - 12:00 PM", teacher: "Dr. Wilson", room: "Lab B" },
    { subject: "English", time: "1:00 PM - 2:00 PM", teacher: "Mrs. Brown", room: "Room 205" },
  ];

  const subjectProgress = [
    { name: "Mathematics", progress: 78, grade: "B+", color: "#008080" },
    { name: "Physics", progress: 85, grade: "A-", color: "#28C76F" },
    { name: "Chemistry", progress: 72, grade: "B", color: "#FF9F43" },
    { name: "English", progress: 90, grade: "A", color: "#6366F1" },
    { name: "Biology", progress: 68, grade: "B-", color: "#EC4899" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'average': return 'bg-yellow-100 text-yellow-800';
      case 'due-soon': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className=&quot;text-3xl font-bold text-gray-900&quot;>Welcome back, Alex!</h1>
          <p className="text-gray-600 mt-1">Here&apos;s your academic progress and upcoming tasks</p>
        </div>
        <div className=&quot;flex space-x-2&quot;>
          <Button className=&quot;bg-blue-600 hover:bg-blue-700&quot;>
            <Calendar className=&quot;w-4 h-4 mr-2&quot; />
            View Schedule
          </Button>
          <Button variant=&quot;outline&quot;>
            <MessageCircle className=&quot;w-4 h-4 mr-2&quot; />
            Messages
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: metric.primaryColor }}>
            <CardContent className=&quot;p-6&quot;>
              <div className=&quot;flex items-center justify-between&quot;>
                <div>
                  <p className=&quot;text-sm font-medium text-gray-600&quot;>{metric.label}</p>
                  <p className="text-2xl font-bold" style={{ color: metric.primaryColor }}>
                    {metric.value}
                  </p>
                </div>
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: metric.secondaryColor }}
                >
                  <metric.icon 
                    className="w-6 h-6" 
                    style={{ color: metric.primaryColor }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className=&quot;grid w-full grid-cols-5&quot;>
          <TabsTrigger value=&quot;overview&quot;>Overview</TabsTrigger>
          <TabsTrigger value=&quot;grades&quot;>Grades</TabsTrigger>
          <TabsTrigger value=&quot;assignments&quot;>Assignments</TabsTrigger>
          <TabsTrigger value=&quot;schedule&quot;>Schedule</TabsTrigger>
          <TabsTrigger value=&quot;progress&quot;>Progress</TabsTrigger>
        </TabsList>

        <TabsContent value=&quot;overview&quot; className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center&quot;>
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaySchedule.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                    item.subject === 'Break' ? 'bg-yellow-50' : 'bg-gray-50'
                  }`}>
                    <div>
                      <p className=&quot;font-medium&quot;>{item.subject}</p>
                      {item.teacher && (
                        <p className="text-sm text-gray-600">{item.teacher} • {item.room}</p>
                      )}
                    </div>
                    <Badge variant=&quot;outline&quot;>{item.time}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Assignments */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center&quot;>
                  <FileText className="w-5 h-5 mr-2" />
                  Upcoming Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingAssignments.slice(0, 4).map((assignment, index) => (
                  <div key={index} className=&quot;flex items-center justify-between p-3 bg-gray-50 rounded-lg&quot;>
                    <div>
                      <p className=&quot;font-medium&quot;>{assignment.title}</p>
                      <p className=&quot;text-sm text-gray-600&quot;>{assignment.subject}</p>
                    </div>
                    <div className=&quot;text-right&quot;>
                      <p className=&quot;text-sm font-medium&quot;>{assignment.dueDate}</p>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status === 'due-soon' ? 'Due Soon' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className=&quot;grid grid-cols-2 md:grid-cols-4 gap-4&quot;>
                <Button className=&quot;h-20 flex flex-col space-y-2&quot; variant="outline">
                  <FileText className=&quot;w-6 h-6&quot; />
                  <span>Submit Assignment</span>
                </Button>
                <Button className=&quot;h-20 flex flex-col space-y-2&quot; variant="outline">
                  <Award className=&quot;w-6 h-6&quot; />
                  <span>View Grades</span>
                </Button>
                <Button className=&quot;h-20 flex flex-col space-y-2&quot; variant="outline">
                  <Calendar className=&quot;w-6 h-6&quot; />
                  <span>Class Schedule</span>
                </Button>
                <Button className=&quot;h-20 flex flex-col space-y-2&quot; variant="outline">
                  <MessageCircle className=&quot;w-6 h-6&quot; />
                  <span>Messages</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value=&quot;grades&quot; className=&quot;space-y-4&quot;>
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Your latest assignment and test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className=&quot;flex items-center justify-between p-4 border rounded-lg&quot;>
                    <div className=&quot;flex-1&quot;>
                      <p className=&quot;font-medium&quot;>{grade.assignment}</p>
                      <p className=&quot;text-sm text-gray-600&quot;>{grade.subject}</p>
                      <p className=&quot;text-xs text-gray-500&quot;>{grade.date}</p>
                    </div>
                    <div className=&quot;text-right&quot;>
                      <p className=&quot;text-2xl font-bold text-blue-600&quot;>{grade.grade}%</p>
                      <Badge className={getStatusColor(grade.status)}>
                        {grade.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value=&quot;assignments&quot; className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>Track your pending and upcoming assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className=&quot;flex items-center justify-between p-4 border rounded-lg&quot;>
                    <div className=&quot;flex-1&quot;>
                      <p className=&quot;font-medium&quot;>{assignment.title}</p>
                      <p className=&quot;text-sm text-gray-600&quot;>{assignment.subject}</p>
                    </div>
                    <div className=&quot;text-right space-y-2&quot;>
                      <p className=&quot;text-sm font-medium&quot;>Due: {assignment.dueDate}</p>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status === 'due-soon' ? 'Due Soon' : 'Upcoming'}
                      </Badge>
                    </div>
                    <Button size="sm" className="ml-4">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value=&quot;schedule&quot; className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your complete class schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className=&quot;border-l-4 border-blue-500 pl-4&quot;>
                    <h3 className=&quot;font-medium text-lg&quot;>{day}</h3>
                    <div className="space-y-2 mt-2">
                      {todaySchedule.filter(item => item.subject !== 'Break').map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                          <div>
                            <span className=&quot;font-medium&quot;>{item.subject}</span>
                            <span className=&quot;text-gray-600 ml-2&quot;>- {item.teacher}</span>
                          </div>
                          <div className=&quot;text-right&quot;>
                            <span className=&quot;text-sm text-gray-600&quot;>{item.time}</span>
                            <p className=&quot;text-xs text-gray-500&quot;>{item.room}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value=&quot;progress&quot; className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Track your performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <div key={index} className=&quot;space-y-2&quot;>
                    <div className=&quot;flex justify-between items-center&quot;>
                      <span className=&quot;font-medium&quot;>{subject.name}</span>
                      <Badge style={{ backgroundColor: subject.color, color: 'white' }}>
                        {subject.grade}
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                    <p className=&quot;text-sm text-gray-600&quot;>{subject.progress}% Complete</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
