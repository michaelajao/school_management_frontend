"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, GraduationCap, Calendar, MessageSquare, 
  Bell, DollarSign, BookOpen, Clock,
  AlertCircle, CheckCircle, Star,
  FileText, Users, Award, TrendingUp
} from "lucide-react";

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState("Emma Johnson");
  const [notifications, setNotifications] = useState([
    { id: 1, type: "assignment", title: "Math homework due tomorrow", message: "Emma has a math homework assignment due tomorrow", child: "Emma Johnson", read: false, date: "2025-06-06" },
    { id: 2, type: "fee", title: "School fee payment due", message: "Monthly fee payment due in 3 days", child: "all", read: false, date: "2025-06-08" },
    { id: 3, type: "announcement", title: "Parent-teacher conference", message: "Conference scheduled for next week", child: "James Johnson", read: true, date: "2025-06-12" },
    { id: 4, type: "event", title: "Science Fair next Friday", message: "Annual science fair event", child: "all", read: false, date: "2025-06-14" },
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const children = [
    { 
      name: "Emma Johnson", 
      class: "Grade 10A", 
      studentId: "ST001", 
      profileImage: "/api/placeholder/40/40",
      recentGrade: "A-",
      attendance: 96,
      subjects: ["Mathematics", "Physics", "Chemistry", "English", "Biology"],
      upcomingAssignments: 3,
      unreadMessages: 2,
      upcomingEvents: 4,
      pendingFees: 0,
      achievements: ["Honor Roll", "Science Fair Winner"],
      behaviorScore: 95
    },
    { 
      name: "James Johnson", 
      class: "Grade 7B", 
      studentId: "ST002", 
      profileImage: "/api/placeholder/40/40",
      recentGrade: "B+",
      attendance: 94,
      subjects: ["Mathematics", "English", "Science", "History", "Art"],
      upcomingAssignments: 1,
      unreadMessages: 0,
      upcomingEvents: 3,
      pendingFees: 50,
      achievements: ["Perfect Attendance", "Art Competition"],
      behaviorScore: 92
    }
  ];

  const selectedChildData = children.find(child => child.name === selectedChild) || children[0];

  const dashboardMetrics = [
    {
      icon: TrendingUp,
      value: selectedChildData.recentGrade,
      label: 'Recent Grade Average',
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
    },
    {
      icon: Calendar,
      value: `${selectedChildData.attendance}%`,
      label: "Attendance Rate",
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-700',
      iconColor: 'text-teal-600',
    },
    {
      icon: BookOpen,
      value: selectedChildData.upcomingAssignments,
      label: "Upcoming Assignments",
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      icon: DollarSign,
      value: selectedChildData.pendingFees > 0 ? `$${selectedChildData.pendingFees}` : "$0",
      label: "Outstanding Fees",
      bgColor: selectedChildData.pendingFees > 0 ? 'bg-red-100' : 'bg-green-100',
      textColor: selectedChildData.pendingFees > 0 ? 'text-red-700' : 'text-green-700',
      iconColor: selectedChildData.pendingFees > 0 ? 'text-red-600' : 'text-green-600',
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
          <p className="text-gray-600 mt-1">Monitor your children&apos;s academic progress and school activities</p>
        </div>        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700 relative">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Teachers
            {selectedChildData.unreadMessages > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center p-0">
                {selectedChildData.unreadMessages}
              </Badge>
            )}
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            School Calendar
          </Button>
          <Button variant="outline" className="relative">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center p-0">
                {unreadNotifications}
              </Badge>
            )}
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
              >                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-sm text-gray-600">{child.class}</p>
                    <div className="flex space-x-2 mt-1">
                      {child.achievements.slice(0, 1).map((achievement, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto flex flex-col items-end space-y-1">
                    <div className="flex space-x-1">
                      {child.upcomingAssignments > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {child.upcomingAssignments} tasks
                        </Badge>
                      )}
                      {child.pendingFees > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          Fee due
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Grade: {child.recentGrade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>      </Card>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className={`border-l-4 border-l-${metric.iconColor.split('-')[1]}-500`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.textColor}`}>
                    {metric.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${metric.bgColor}`}>
                  <metric.icon 
                    className={`w-6 h-6 ${metric.iconColor}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notifications
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-4 h-4 rounded-full flex items-center justify-center p-0">
                {unreadNotifications}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Academic Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recent Grades
                  </span>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentGrades.slice(0, 4).map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">{grade.subject}</Badge>
                        <p className="font-medium">{grade.assignment}</p>
                      </div>
                      <p className="text-sm text-gray-600">{grade.teacher}</p>
                      <p className="text-xs text-gray-500">{grade.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">{grade.grade}%</p>
                      <Badge className={grade.grade >= 90 ? 'bg-green-100 text-green-800' : 
                                      grade.grade >= 80 ? 'bg-blue-100 text-blue-800' : 
                                      'bg-yellow-100 text-yellow-800'}>
                        {grade.grade >= 90 ? 'A' : grade.grade >= 80 ? 'B' : 'C'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events & Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Upcoming Events
                  </span>
                  <Button variant="ghost" size="sm">View Calendar</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`p-2 rounded ${
                      event.type === 'exam' ? 'bg-red-100' :
                      event.type === 'meeting' ? 'bg-blue-100' :
                      event.type === 'event' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Subject Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Subject Performance Overview</span>
                <Badge variant="outline">Current Semester</Badge>
              </CardTitle>
              <CardDescription>Academic performance across all subjects for {selectedChild}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{subject.name}</span>
                      <Badge style={{ backgroundColor: subject.color, color: 'white' }}>
                        {subject.grade}
                      </Badge>
                    </div>
                    <Progress value={subject.progress} className="h-2 mb-2" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{subject.progress}%</span>
                      <span className={`font-medium ${
                        subject.progress >= 90 ? 'text-green-600' :
                        subject.progress >= 80 ? 'text-blue-600' :
                        subject.progress >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {subject.progress >= 90 ? 'Excellent' :
                         subject.progress >= 80 ? 'Good' :
                         subject.progress >= 70 ? 'Fair' : 'Needs Work'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedChildData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Award className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">{achievement}</p>
                        <p className="text-sm text-yellow-600">Awarded this semester</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Schedule Parent-Teacher Conference
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Academic Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    View School Calendar
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Pay School Fees
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent><TabsContent value="grades" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Academic Performance - {selectedChild}</h3>
              <p className="text-gray-600">Detailed grade report and subject analysis</p>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {selectedChildData.subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase()}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Overall GPA</p>
                    <p className="text-2xl font-bold text-green-600">3.7</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Class Rank</p>
                    <p className="text-2xl font-bold text-blue-600">12/150</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Behavior Score</p>
                    <p className="text-2xl font-bold text-yellow-600">{selectedChildData.behaviorScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Grades & Assignments</CardTitle>
              <CardDescription>Latest academic performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge variant="outline">{grade.subject}</Badge>
                        <p className="font-medium">{grade.assignment}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <p>Teacher: {grade.teacher}</p>
                        <p>Date: {grade.date}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-3xl font-bold text-blue-600">{grade.grade}%</p>
                      <Badge className={grade.grade >= 90 ? 'bg-green-100 text-green-800' : 
                                      grade.grade >= 80 ? 'bg-blue-100 text-blue-800' : 
                                      grade.grade >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'}>
                        {grade.grade >= 90 ? 'Excellent' : 
                         grade.grade >= 80 ? 'Good' : 
                         grade.grade >= 70 ? 'Satisfactory' :
                         'Needs Improvement'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Attendance Record - {selectedChild}</h3>
              <p className="text-gray-600">Comprehensive attendance tracking and analysis</p>
            </div>
            <Select defaultValue="current">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-600">Present Days</p>
                        <p className="text-2xl font-bold text-green-700">23</p>
                        <p className="text-xs text-green-600">Out of 24 days</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-600">Attendance Rate</p>
                        <p className="text-2xl font-bold text-blue-700">96%</p>
                        <p className="text-xs text-blue-600">Above average</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm text-yellow-600">Absences</p>
                        <p className="text-2xl font-bold text-yellow-700">1</p>
                        <p className="text-xs text-yellow-600">Excused</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-purple-600">Late Arrivals</p>
                        <p className="text-2xl font-bold text-purple-700">2</p>
                        <p className="text-xs text-purple-600">This month</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Monthly Attendance Breakdown</h4>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Target: 95%
                    </Badge>
                  </div>
                  {attendanceData.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium w-12">{month.month}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={month.attendance} className="w-32 h-2" />
                          <span className="text-sm font-medium w-10">{month.attendance}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {month.attendance >= 95 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : month.attendance >= 90 ? (
                          <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Attendance Records */}
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Attendance Records</h4>
                  <div className="space-y-2">
                    {['Mon 6/3', 'Tue 6/4', 'Wed 6/5', 'Thu 6/6', 'Fri 6/7'].map((date, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <span className="font-medium">{date}</span>
                        <div className="flex items-center space-x-2">
                          {index === 2 ? (
                            <>
                              <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>
                              <span className="text-sm text-gray-600">Arrived 8:15 AM</span>
                            </>
                          ) : index === 4 ? (
                            <>
                              <Badge className="bg-red-100 text-red-800">Absent</Badge>
                              <span className="text-sm text-gray-600">Medical leave</span>
                            </>
                          ) : (
                            <>
                              <Badge className="bg-green-100 text-green-800">Present</Badge>
                              <span className="text-sm text-gray-600">On time</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value="messages" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Messages & Communications</h3>
              <p className="text-gray-600">Messages from teachers and school administration regarding {selectedChild}</p>
            </div>
            <div className="flex space-x-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="reminder">Reminders</SelectItem>
                  <SelectItem value="concern">Concerns</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total Messages</p>
                    <p className="text-2xl font-bold text-blue-600">{recentMessages.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Unread</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedChildData.unreadMessages}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Positive Notes</p>
                    <p className="text-2xl font-bold text-green-600">
                      {recentMessages.filter(m => m.type === 'positive').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest communications from teachers and staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-4 border-l-4 rounded-lg ${getMessageTypeColor(message.type)}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-gray-900">{message.from}</p>
                        <Badge variant="outline" className={
                          message.type === 'positive' ? 'border-green-500 text-green-700' :
                          message.type === 'reminder' ? 'border-blue-500 text-blue-700' :
                          'border-yellow-500 text-yellow-700'
                        }>
                          {message.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{message.time}</p>
                    </div>
                    <p className="text-gray-700 mb-3">{message.message}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="w-3 h-3 mr-1" />
                          Save
                        </Button>
                      </div>
                      <Button size="sm" variant="ghost" className="text-gray-500">
                        Mark as Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent><TabsContent value="events" className="space-y-4">
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

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Notifications & Alerts</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                >
                  Mark All as Read
                </Button>
              </CardTitle>
              <CardDescription>Important updates about your children&apos;s education</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      !notification.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'assignment' ? 'bg-blue-100' :
                          notification.type === 'fee' ? 'bg-red-100' :
                          notification.type === 'announcement' ? 'bg-green-100' :
                          'bg-purple-100'
                        }`}>
                          {notification.type === 'assignment' && <BookOpen className="w-4 h-4" />}
                          {notification.type === 'fee' && <DollarSign className="w-4 h-4" />}
                          {notification.type === 'announcement' && <MessageSquare className="w-4 h-4" />}
                          {notification.type === 'event' && <Calendar className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{notification.title}</p>
                            {!notification.read && (
                              <Badge className="bg-blue-500 text-white text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <p className="text-xs text-gray-500">
                              Child: {notification.child === 'all' ? 'All Children' : notification.child}
                            </p>
                            <p className="text-xs text-gray-500">Date: {notification.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setNotifications(notifications.map(n => 
                              n.id === notification.id ? { ...n, read: true } : n
                            ))}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
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
