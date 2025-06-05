"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, GraduationCap, Calendar, MessageSquare, 
  TrendingUp, Bell, DollarSign, BookOpen, Clock 
} from "lucide-react";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState("Emma Johnson");

  const children = [
    { 
      name: "Emma Johnson", 
      class: "Grade 10A", 
      studentId: "ST001", 
      profileImage: "/api/placeholder/40/40",
      recentGrade: "A-",
      attendance: 96
    },
    { 
      name: "James Johnson", 
      class: "Grade 7B", 
      studentId: "ST002", 
      profileImage: "/api/placeholder/40/40",
      recentGrade: "B+",
      attendance: 94
    }
  ];

  const selectedChildData = children.find(child => child.name === selectedChild) || children[0];

  const dashboardMetrics = [
    {
      icon: TrendingUp,
      value: selectedChildData.recentGrade,
      label: 'Recent Grade Average',
      primaryColor: '#28C76F',
      secondaryColor: '#28C76F33',
    },
    {
      icon: Calendar,
      value: `${selectedChildData.attendance}%`,
      label: "Attendance Rate",
      primaryColor: "#008080",
      secondaryColor: "#BDFAFF4D",
    },
    {
      icon: MessageSquare,
      value: 3,
      label: "Unread Messages",
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33",
    },
    {
      icon: DollarSign,
      value: "$0",
      label: "Outstanding Fees",
      primaryColor: "#28C76F",
      secondaryColor: "#28C76F33"
    }
  ];

  const recentGrades = [
    { subject: "Mathematics", assignment: "Algebra Test", grade: 88, date: "2024-01-15", teacher: "Mr. Smith" },
    { subject: "Physics", assignment: "Lab Report", grade: 92, date: "2024-01-12", teacher: "Ms. Johnson" },
    { subject: "Chemistry", assignment: "Quiz 3", grade: 76, date: "2024-01-10", teacher: "Dr. Wilson" },
    { subject: "English", assignment: "Essay", grade: 94, date: "2024-01-08", teacher: "Mrs. Brown" },
  ];

  const upcomingEvents = [
    { type: "exam", title: "Mathematics Final Exam", date: "2024-01-25", time: "9:00 AM" },
    { type: "meeting", title: "Parent-Teacher Conference", date: "2024-01-22", time: "3:00 PM" },
    { type: "event", title: "Science Fair", date: "2024-01-28", time: "10:00 AM" },
    { type: "assignment", title: "Physics Project Due", date: "2024-01-20", time: "End of Day" },
  ];

  const recentMessages = [
    { 
      from: "Mr. Smith - Mathematics Teacher", 
      message: "Emma did excellent work on the recent algebra test. She shows great problem-solving skills.", 
      time: "2 hours ago",
      type: "positive"
    },
    { 
      from: "School Administration", 
      message: "Reminder: Parent-Teacher Conference scheduled for January 22nd at 3:00 PM.", 
      time: "1 day ago",
      type: "reminder"
    },
    { 
      from: "Ms. Johnson - Physics Teacher", 
      message: "Please ensure Emma brings her lab notebook for tomorrow's experiment.", 
      time: "2 days ago",
      type: "reminder"
    },
  ];

  const attendanceData = [
    { month: "Sep", attendance: 98 },
    { month: "Oct", attendance: 95 },
    { month: "Nov", attendance: 97 },
    { month: "Dec", attendance: 94 },
    { month: "Jan", attendance: 96 },
  ];

  const subjectPerformance = [
    { name: "Mathematics", grade: "A-", progress: 88, color: "#008080" },
    { name: "Physics", progress: 92, grade: "A", color: "#28C76F" },
    { name: "Chemistry", progress: 76, grade: "B", color: "#FF9F43" },
    { name: "English", progress: 94, grade: "A", color: "#6366F1" },
    { name: "Biology", progress: 82, grade: "B+", color: "#EC4899" },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BookOpen className="w-4 h-4" />;
      case 'meeting': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'assignment': return <GraduationCap className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-l-green-500 bg-green-50';
      case 'reminder': return 'border-l-blue-500 bg-blue-50';
      case 'concern': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, Mr. & Mrs. Johnson!</h1>
          <p className="text-gray-600 mt-1">Monitor your children's academic progress and school activities</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Teachers
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            School Calendar
          </Button>
        </div>
      </div>

      {/* Child Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Child</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {children.map((child) => (
              <div
                key={child.studentId}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedChild === child.name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedChild(child.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-600">{child.class}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: metric.primaryColor }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Grades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentGrades.slice(0, 4).map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{grade.subject}</p>
                      <p className="text-sm text-gray-600">{grade.assignment}</p>
                      <p className="text-xs text-gray-500">{grade.teacher}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">{grade.grade}%</p>
                      <p className="text-xs text-gray-500">{grade.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Subject Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Overview</CardTitle>
              <CardDescription>Current performance across all subjects for {selectedChild}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{subject.name}</span>
                      <Badge style={{ backgroundColor: subject.color, color: 'white' }}>
                        {subject.grade}
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                    <p className="text-sm text-gray-600 mt-1">{subject.progress}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Grade Report - {selectedChild}</CardTitle>
              <CardDescription>Complete academic performance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{grade.assignment}</p>
                      <p className="text-sm text-gray-600">{grade.subject}</p>
                      <p className="text-xs text-gray-500">Teacher: {grade.teacher}</p>
                      <p className="text-xs text-gray-500">Date: {grade.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">{grade.grade}%</p>
                      <Badge className={grade.grade >= 90 ? 'bg-green-100 text-green-800' : 
                                      grade.grade >= 80 ? 'bg-blue-100 text-blue-800' : 
                                      'bg-yellow-100 text-yellow-800'}>
                        {grade.grade >= 90 ? 'Excellent' : grade.grade >= 80 ? 'Good' : 'Needs Improvement'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record - {selectedChild}</CardTitle>
              <CardDescription>Monthly attendance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Current Month</p>
                    <p className="text-2xl font-bold text-green-700">96%</p>
                    <p className="text-xs text-green-600">23 of 24 days present</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">This Year</p>
                    <p className="text-2xl font-bold text-blue-700">95.8%</p>
                    <p className="text-xs text-blue-600">115 of 120 days present</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600">Absences</p>
                    <p className="text-2xl font-bold text-yellow-700">5</p>
                    <p className="text-xs text-yellow-600">All excused</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Monthly Breakdown</h4>
                  {attendanceData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={month.attendance} className="w-32 h-2" />
                        <span className="text-sm font-medium">{month.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages from Teachers</CardTitle>
              <CardDescription>Communication regarding {selectedChild}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-4 border-l-4 rounded-lg ${getMessageTypeColor(message.type)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-900">{message.from}</p>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">Reply</Button>
                      <Button size="sm" variant="outline">Mark as Read</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>School Events & Important Dates</CardTitle>
              <CardDescription>Upcoming events and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant="outline">{event.type}</Badge>
                      <div>
                        <Button size="sm">Add to Calendar</Button>
                      </div>
                    </div>
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

export default ParentDashboard;
