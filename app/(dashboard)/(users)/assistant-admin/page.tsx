"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, UserPlus, MessageSquare, BarChart3, 
  ClipboardCheck, Calendar, Bell, Settings,
  GraduationCap, UserCheck, TrendingUp, AlertCircle
} from "lucide-react";
import Link from "next/link";

const AssistantAdminDashboard = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState("This Week");

  // Mock data - replace with actual API calls
  const dashboardMetrics = [
    {
      icon: Users,
      value: 1250,
      label: 'Students Managed',
      change: '+12 this week',
      primaryColor: '#1B5B5E',
      secondaryColor: '#1B5B5E20',
    },
    {
      icon: UserCheck,
      value: 245,
      label: "Parents Engaged",
      change: '+8 new contacts',
      primaryColor: "#2A9D8F",
      secondaryColor: "#2A9D8F20",
    },
    {
      icon: ClipboardCheck,
      value: '96.5%',
      label: "Attendance Rate",
      change: '+2.1% this week',
      primaryColor: "#E9C46A",
      secondaryColor: "#E9C46A20"
    },
    {
      icon: MessageSquare,
      value: 47,
      label: "Messages Sent",
      change: '+15 today',
      primaryColor: "#F4A261",
      secondaryColor: "#F4A26120"
    }
  ];

  const recentActivities = [
    { 
      type: "student", 
      message: "Registered 3 new students for Grade 9-A", 
      time: "1 hour ago",
      priority: "medium"
    },
    { 
      type: "parent", 
      message: "Sent attendance reports to 25 parents", 
      time: "2 hours ago",
      priority: "low"
    },
    { 
      type: "attendance", 
      message: "Recorded attendance for 8 classes", 
      time: "3 hours ago",
      priority: "medium"
    },
    { 
      type: "message", 
      message: "Responded to 12 parent inquiries", 
      time: "4 hours ago",
      priority: "high"
    },
  ];

  const todaysTasks = [
    { task: "Complete attendance verification for all classes", status: "pending", priority: "high" },
    { task: "Follow up with parents of absent students", status: "in_progress", priority: "high" },
    { task: "Prepare weekly attendance report", status: "pending", priority: "medium" },
    { task: "Update student contact information", status: "completed", priority: "medium" },
    { task: "Schedule parent-teacher meetings", status: "pending", priority: "low" },
  ];

  const weeklyStats = [
    { metric: "Students Contacted", current: 180, target: 200, percentage: 90 },
    { metric: "Parent Meetings", current: 15, target: 20, percentage: 75 },
    { metric: "Attendance Reports", current: 5, target: 5, percentage: 100 },
    { metric: "Issue Resolution", current: 28, target: 30, percentage: 93 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'student': return <UserPlus className="w-4 h-4" />;
      case 'parent': return <Users className="w-4 h-4" />;
      case 'attendance': return <ClipboardCheck className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assistant Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Here's your daily overview.</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="parents">Parents</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ClipboardCheck className="w-5 h-5 mr-2" />
                  Today's Tasks
                </CardTitle>
                <CardDescription>Your daily responsibilities and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.task}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    {task.status === 'completed' ? (
                      <AlertCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Button size="sm" variant="outline">Mark Done</Button>
                    )}
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
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((activity, index) => (
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

          {/* Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Metrics</CardTitle>
              <CardDescription>Your performance against weekly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.metric}</span>
                      <span className="text-sm text-gray-600">{stat.percentage}%</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Current: {stat.current}</span>
                      <span>Target: {stat.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>Manage student records and information</CardDescription>
                </div>
                <Link href="/admin/manage/students">
                  <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Manage Students
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <GraduationCap className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-700">1,250</p>
                    <p className="text-sm text-blue-600">Total Students</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <UserPlus className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-700">12</p>
                    <p className="text-sm text-green-600">New This Week</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg text-center">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                    <p className="text-2xl font-bold text-yellow-700">3</p>
                    <p className="text-sm text-yellow-600">Pending Actions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parents" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Parent Communication</CardTitle>
                  <CardDescription>Manage parent relationships and communication</CardDescription>
                </div>
                <Link href="/admin/manage/parents">
                  <Button className="bg-[#2A9D8F] hover:bg-[#238072]">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Manage Parents
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-2xl font-bold text-purple-700">845</p>
                    <p className="text-sm text-purple-600">Active Parents</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-2xl font-bold text-blue-700">47</p>
                    <p className="text-sm text-blue-600">Messages This Week</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <p className="text-2xl font-bold text-green-700">15</p>
                    <p className="text-sm text-green-600">Meetings Scheduled</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Management</CardTitle>
                <CardDescription>Monitor and manage student attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Today's Attendance</h3>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Attendance</span>
                        <span className="text-sm font-medium">96.5%</span>
                      </div>
                      <Progress value={96.5} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded text-center">
                        <p className="text-lg font-bold text-blue-700">1,207</p>
                        <p className="text-xs text-blue-600">Present</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded text-center">
                        <p className="text-lg font-bold text-red-700">43</p>
                        <p className="text-xs text-red-600">Absent</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        Record Attendance
                      </Button>
                      <Button className="w-full" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Absent Parents
                      </Button>
                      <Button className="w-full" variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create reports for your administrative responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Users className="w-8 h-8" />
                  <span>Student Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <MessageSquare className="w-8 h-8" />
                  <span>Parent Communication</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <ClipboardCheck className="w-8 h-8" />
                  <span>Attendance Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <TrendingUp className="w-8 h-8" />
                  <span>Weekly Summary</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Calendar className="w-8 h-8" />
                  <span>Activity Log</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <BarChart3 className="w-8 h-8" />
                  <span>Performance Metrics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssistantAdminDashboard;