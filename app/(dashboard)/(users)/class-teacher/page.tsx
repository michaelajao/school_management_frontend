"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, GraduationCap, ClipboardCheck, MessageSquare, 
  BarChart3, Calendar, BookOpen, Award, Bell, Settings,
  TrendingUp, UserCheck, AlertCircle, FileText, CheckCircle
} from "lucide-react";

const ClassTeacherDashboard = () => {
  const { user } = useAuth();
  const [selectedClass] = useState("Grade 10-A"); // Mock selected class

  // Mock data - replace with actual API calls
  const classMetrics = [
    {
      icon: Users,
      value: 32,
      label: 'Total Students',
      change: '+2 this term',
      primaryColor: '#1B5B5E',
      secondaryColor: '#1B5B5E20',
    },
    {
      icon: ClipboardCheck,
      value: '94.5%',
      label: "Attendance Rate",
      change: '+1.2% this week',
      primaryColor: "#2A9D8F",
      secondaryColor: "#2A9D8F20",
    },
    {
      icon: BookOpen,
      value: 8,
      label: "Subjects Taught",
      change: 'All up to date',
      primaryColor: "#E9C46A",
      secondaryColor: "#E9C46A20"
    },
    {
      icon: Award,
      value: '82.3%',
      label: "Class Average",
      change: '+3.1% from last term',
      primaryColor: "#F4A261",
      secondaryColor: "#F4A26120"
    }
  ];

  const todaysSchedule = [
    { time: "08:00 - 08:45", subject: "Mathematics", room: "Room 101", status: "completed" },
    { time: "08:45 - 09:30", subject: "English", room: "Room 101", status: "completed" },
    { time: "09:45 - 10:30", subject: "Science", room: "Room 101", status: "current" },
    { time: "10:30 - 11:15", subject: "History", room: "Room 101", status: "upcoming" },
    { time: "11:30 - 12:15", subject: "Physical Education", room: "Gymnasium", status: "upcoming" },
    { time: "12:15 - 13:00", subject: "Art", room: "Art Room", status: "upcoming" },
  ];

  const classActivities = [
    { 
      type: "attendance", 
      message: "Marked attendance for morning session", 
      time: "30 minutes ago",
      priority: "low"
    },
    { 
      type: "assignment", 
      message: "Graded mathematics assignments - 28/32 completed", 
      time: "1 hour ago",
      priority: "medium"
    },
    { 
      type: "behavior", 
      message: "Updated behavior notes for 3 students", 
      time: "2 hours ago",
      priority: "medium"
    },
    { 
      type: "parent", 
      message: "Parent meeting scheduled with Sarah Johnson's family", 
      time: "3 hours ago",
      priority: "high"
    },
  ];

  const studentHighlights = [
    { name: "Alex Thompson", issue: "Excellent improvement in Mathematics", type: "positive" },
    { name: "Maria Rodriguez", issue: "Missing homework submissions", type: "concern" },
    { name: "John Smith", issue: "Perfect attendance this month", type: "positive" },
    { name: "Emma Wilson", issue: "Needs extra support in Science", type: "action_needed" },
  ];

  const classPerformance = [
    { subject: "Mathematics", average: 85, trend: "up", totalStudents: 32, submissions: 30 },
    { subject: "English", average: 78, trend: "stable", totalStudents: 32, submissions: 32 },
    { subject: "Science", average: 82, trend: "up", totalStudents: 32, submissions: 28 },
    { subject: "History", average: 76, trend: "down", totalStudents: 32, submissions: 31 },
    { subject: "Physical Education", average: 92, trend: "up", totalStudents: 32, submissions: 32 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'current': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'upcoming': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'attendance': return <ClipboardCheck className="w-4 h-4" />;
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'behavior': return <UserCheck className="w-4 h-4" />;
      case 'parent': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getHighlightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-l-green-500 bg-green-50';
      case 'concern': return 'border-l-yellow-500 bg-yellow-50';
      case 'action_needed': return 'border-l-red-500 bg-red-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Managing {selectedClass}</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
            <ClipboardCheck className="w-4 h-4 mr-2" />
            Take Attendance
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Parents
          </Button>
        </div>
      </div>

      {/* Class Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: metric.primaryColor }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold" style={{ color: metric.primaryColor }}>
                    {metric.value}
                  </p>
                  <p className="text-sm text-green-600 font-medium">{metric.change}</p>
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
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>Your class schedule for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaysSchedule.map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${getScheduleStatusColor(item.status)}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.subject}</p>
                        <p className="text-sm text-gray-600">{item.time} • {item.room}</p>
                      </div>
                      <Badge variant="outline" className={getScheduleStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Your latest classroom activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {classActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Student Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Student Highlights</CardTitle>
              <CardDescription>Important updates about your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentHighlights.map((highlight, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${getHighlightColor(highlight.type)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{highlight.name}</p>
                        <p className="text-sm text-gray-600 mt-1">{highlight.issue}</p>
                      </div>
                      {highlight.type === 'positive' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {highlight.type === 'concern' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                      {highlight.type === 'action_needed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Class Schedule</CardTitle>
              <CardDescription>Complete schedule for {selectedClass}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {/* Today's expanded schedule */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Today - {new Date().toLocaleDateString()}</h3>
                  <div className="space-y-2">
                    {todaysSchedule.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                        <div>
                          <span className="font-medium">{item.subject}</span>
                          <span className="text-sm text-gray-600 ml-2">({item.room})</span>
                        </div>
                        <span className="text-sm">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Class Roster - {selectedClass}</CardTitle>
                <CardDescription>Manage your students and track their progress</CardDescription>
              </div>
              <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
                <Users className="w-4 h-4 mr-2" />
                View All Students
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-700">32</p>
                  <p className="text-sm text-blue-600">Total Students</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <UserCheck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-700">30</p>
                  <p className="text-sm text-green-600">Present Today</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold text-yellow-700">5</p>
                  <p className="text-sm text-yellow-600">Honor Roll Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Overview</CardTitle>
              <CardDescription>Track class performance across all subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPerformance.map((subject, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{subject.subject}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {subject.submissions}/{subject.totalStudents} submitted
                        </span>
                        <Badge variant={subject.trend === 'up' ? 'default' : subject.trend === 'down' ? 'destructive' : 'secondary'}>
                          {subject.trend === 'up' ? '↑' : subject.trend === 'down' ? '↓' : '→'} {subject.average}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={subject.average} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Class Average: {subject.average}%</span>
                      <span>Submission Rate: {Math.round((subject.submissions / subject.totalStudents) * 100)}%</span>
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
              <CardTitle>Attendance Management</CardTitle>
              <CardDescription>Track and manage class attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Today's Attendance</h3>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Present</span>
                      <span className="text-sm font-medium">30/32 (94%)</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded text-center">
                      <p className="text-lg font-bold text-green-700">30</p>
                      <p className="text-xs text-green-600">Present</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded text-center">
                      <p className="text-lg font-bold text-red-700">2</p>
                      <p className="text-xs text-red-600">Absent</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Mark Attendance
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Notify Absent Parents
                    </Button>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Attendance Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Reports</CardTitle>
              <CardDescription>Generate reports for your class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <ClipboardCheck className="w-8 h-8" />
                  <span>Attendance Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <BarChart3 className="w-8 h-8" />
                  <span>Performance Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Users className="w-8 h-8" />
                  <span>Student Progress</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <MessageSquare className="w-8 h-8" />
                  <span>Parent Communication</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Award className="w-8 h-8" />
                  <span>Behavior Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <FileText className="w-8 h-8" />
                  <span>Class Summary</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassTeacherDashboard;