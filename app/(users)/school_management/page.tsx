"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, Users, GraduationCap, DollarSign, 
  TrendingUp, Bell, Settings, BarChart3, 
  FileText, Calendar, MessageSquare, UserPlus 
} from "lucide-react";

const SchoolManagementDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  const dashboardMetrics = [
    {
      icon: Users,
      value: 1250,
      label: 'Total Students',
      change: '+5.2%',
      primaryColor: '#008080',
      secondaryColor: '#BDFAFF4D',
    },
    {
      icon: GraduationCap,
      value: 78,
      label: "Total Staff",
      change: '+2.1%',
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33",
    },
    {
      icon: DollarSign,
      value: '$125K',
      label: "Monthly Revenue",
      change: '+8.3%',
      primaryColor: "#28C76F",
      secondaryColor: "#28C76F33"
    },
    {
      icon: TrendingUp,
      value: '94.5%',
      label: "Satisfaction Rate",
      change: '+1.2%',
      primaryColor: "#6366F1",
      secondaryColor: "#6366F133"
    }
  ];

  const departmentPerformance = [
    { name: "Academic Affairs", performance: 92, budget: "$45K", staff: 24, color: "#008080" },
    { name: "Student Services", performance: 88, budget: "$32K", staff: 18, color: "#28C76F" },
    { name: "Finance", performance: 95, budget: "$28K", staff: 12, color: "#FF9F43" },
    { name: "IT & Technology", performance: 90, budget: "$38K", staff: 15, color: "#6366F1" },
    { name: "Administration", performance: 87, budget: "$42K", staff: 20, color: "#EC4899" },
  ];

  const recentActivities = [
    { 
      type: "enrollment", 
      message: "25 new student applications received for next semester", 
      time: "2 hours ago",
      priority: "high"
    },
    { 
      type: "finance", 
      message: "Monthly financial report generated - Revenue up 8.3%", 
      time: "4 hours ago",
      priority: "medium"
    },
    { 
      type: "staff", 
      message: "New Mathematics teacher hired - Ms. Sarah Wilson", 
      time: "6 hours ago",
      priority: "medium"
    },
    { 
      type: "system", 
      message: "School management system backup completed successfully", 
      time: "8 hours ago",
      priority: "low"
    },
  ];

  const upcomingTasks = [
    { task: "Board Meeting Preparation", deadline: "Jan 20, 2024", priority: "high", department: "Administration" },
    { task: "Quarterly Budget Review", deadline: "Jan 22, 2024", priority: "high", department: "Finance" },
    { task: "Staff Performance Evaluations", deadline: "Jan 25, 2024", priority: "medium", department: "HR" },
    { task: "Infrastructure Maintenance", deadline: "Jan 28, 2024", priority: "medium", department: "Operations" },
  ];

  const monthlyStats = [
    { metric: "Student Enrollment", current: 1250, target: 1300, percentage: 96 },
    { metric: "Staff Retention", current: 94, target: 95, percentage: 99 },
    { metric: "Revenue Target", current: 125000, target: 130000, percentage: 96 },
    { metric: "Parent Satisfaction", current: 4.7, target: 4.8, percentage: 98 },
  ];

  const schoolOverview = {
    totalCapacity: 1500,
    currentEnrollment: 1250,
    totalClassrooms: 45,
    activeProgrammes: 12,
    averageClassSize: 28,
    teacherStudentRatio: "1:16"
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment': return <UserPlus className="w-4 h-4" />;
      case 'finance': return <DollarSign className="w-4 h-4" />;
      case 'staff': return <Users className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Management Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive overview of school operations and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            School Settings
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
                  <p className="text-sm text-green-600 font-medium">{metric.change} from last month</p>
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
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* School Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  School Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Capacity</p>
                    <p className="text-xl font-bold">{schoolOverview.totalCapacity}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Current Enrollment</p>
                    <p className="text-xl font-bold text-blue-700">{schoolOverview.currentEnrollment}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Active Classrooms</p>
                    <p className="text-xl font-bold text-green-700">{schoolOverview.totalClassrooms}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">Programmes</p>
                    <p className="text-xl font-bold text-purple-700">{schoolOverview.activeProgrammes}</p>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Enrollment Rate</span>
                    <span className="text-sm font-medium">83.3%</span>
                  </div>
                  <Progress value={83.3} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
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

          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Metrics</CardTitle>
              <CardDescription>Current performance against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.metric}</span>
                      <span className="text-sm text-gray-600">{stat.percentage}%</span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Current: {typeof stat.current === 'number' && stat.current > 1000 ? `$${(stat.current/1000)}K` : stat.current}</span>
                      <span>Target: {typeof stat.target === 'number' && stat.target > 1000 ? `$${(stat.target/1000)}K` : stat.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Overview of all school departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-lg">{dept.name}</h3>
                      <Badge style={{ backgroundColor: dept.color, color: 'white' }}>
                        {dept.performance}% Performance
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Budget</p>
                        <p className="text-xl font-bold" style={{ color: dept.color }}>{dept.budget}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Staff</p>
                        <p className="text-xl font-bold" style={{ color: dept.color }}>{dept.staff}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Performance</p>
                        <Progress value={dept.performance} className="mt-1 h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-700">$125,000</p>
                    <p className="text-sm text-green-600">+8.3% from last month</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Operating Expenses</p>
                    <p className="text-2xl font-bold text-blue-700">$95,000</p>
                    <p className="text-sm text-blue-600">-2.1% from last month</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">Net Profit</p>
                    <p className="text-2xl font-bold text-purple-700">$30,000</p>
                    <p className="text-sm text-purple-600">+24% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600">Average Grade</p>
                    <p className="text-2xl font-bold text-yellow-700">85.4%</p>
                    <p className="text-sm text-yellow-600">+2.3% from last term</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">Graduation Rate</p>
                    <p className="text-2xl font-bold text-red-700">96.8%</p>
                    <p className="text-sm text-red-600">+1.5% from last year</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600">College Acceptance</p>
                    <p className="text-2xl font-bold text-indigo-700">92.3%</p>
                    <p className="text-sm text-indigo-600">+3.2% from last year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks & Deadlines</CardTitle>
              <CardDescription>Important tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-gray-600">Department: {task.department}</p>
                      <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Reports</CardTitle>
              <CardDescription>Create comprehensive reports for school management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <FileText className="w-8 h-8" />
                  <span>Financial Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <BarChart3 className="w-8 h-8" />
                  <span>Academic Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Users className="w-8 h-8" />
                  <span>Staff Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <GraduationCap className="w-8 h-8" />
                  <span>Student Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <Calendar className="w-8 h-8" />
                  <span>Attendance Report</span>
                </Button>
                <Button className="h-24 flex flex-col space-y-2" variant="outline">
                  <TrendingUp className="w-8 h-8" />
                  <span>Performance Report</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolManagementDashboard;
