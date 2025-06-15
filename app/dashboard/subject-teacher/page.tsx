"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Users, BarChart3, Calendar, 
  ClipboardCheck, FileText, MessageSquare,
  Bell, Clock, Target, CheckCircle, TrendingUp
} from "lucide-react";

const SubjectTeacherDashboard = () => {
  const { user } = useAuth();
  const [selectedSubject] = useState("Mathematics"); // Mock selected subject

  // Mock data - replace with actual API calls
  const subjectMetrics = [
    {
      icon: Users,
      value: 156,
      label: 'Total Students',
      change: 'Across 5 classes',
      primaryColor: '#1B5B5E',
      secondaryColor: '#1B5B5E20',
    },
    {
      icon: BookOpen,
      value: 5,
      label: "Classes Teaching",
      change: 'Grade 9-12',
      primaryColor: "#2A9D8F",
      secondaryColor: "#2A9D8F20",
    },
    {
      icon: Target,
      value: '87.2%',
      label: "Average Performance",
      change: '+2.8% this term',
      primaryColor: "#E9C46A",
      secondaryColor: "#E9C46A20"
    },
    {
      icon: CheckCircle,
      value: '92%',
      label: "Assignment Completion",
      change: '+5% from last month',
      primaryColor: "#F4A261",
      secondaryColor: "#F4A26120"
    }
  ];

  const todaysLessons = [
    { time: "08:00 - 08:45", class: "Grade 10-A", topic: "Quadratic Equations", room: "Room 201", status: "completed" },
    { time: "09:00 - 09:45", class: "Grade 11-B", topic: "Calculus Basics", room: "Room 201", status: "completed" },
    { time: "10:00 - 10:45", class: "Grade 9-C", topic: "Algebra Review", room: "Room 201", status: "current" },
    { time: "11:00 - 11:45", class: "Grade 12-A", topic: "Statistics", room: "Room 201", status: "upcoming" },
    { time: "14:00 - 14:45", class: "Grade 10-B", topic: "Geometry", room: "Room 201", status: "upcoming" },
  ];

  const classPerformance = [
    { class: "Grade 9-C", students: 28, average: 82, trend: "up", lastAssignment: "85%" },
    { class: "Grade 10-A", students: 32, average: 88, trend: "up", lastAssignment: "91%" },
    { class: "Grade 10-B", students: 30, average: 85, trend: "stable", lastAssignment: "87%" },
    { class: "Grade 11-B", students: 34, average: 90, trend: "up", lastAssignment: "94%" },
    { class: "Grade 12-A", students: 32, average: 92, trend: "stable", lastAssignment: "89%" },
  ];

  const recentActivities = [
    { 
      type: "grading", 
      message: "Graded 34 assignments from Grade 11-B", 
      time: "1 hour ago",
      priority: "medium"
    },
    { 
      type: "lesson", 
      message: "Created lesson plan for Statistics unit", 
      time: "2 hours ago",
      priority: "low"
    },
    { 
      type: "assignment", 
      message: "Posted new assignment for Grade 10 classes", 
      time: "4 hours ago",
      priority: "medium"
    },
    { 
      type: "feedback", 
      message: "Provided feedback to 12 students", 
      time: "6 hours ago",
      priority: "high"
    },
  ];

  const upcomingDeadlines = [
    { task: "Grade 12-A Statistics Exam papers", deadline: "Tomorrow", priority: "high" },
    { task: "Submit Grade 10 progress reports", deadline: "Friday", priority: "high" },
    { task: "Prepare Calculus unit test", deadline: "Next Monday", priority: "medium" },
    { task: "Parent-teacher conference prep", deadline: "Next Week", priority: "medium" },
  ];

  const subjectInsights = [
    { metric: "Most Challenging Topic", value: "Calculus Integration", detail: "Based on assignment scores" },
    { metric: "Best Performing Class", value: "Grade 12-A", detail: "92% average score" },
    { metric: "Improvement Needed", value: "Grade 9-C Algebra", detail: "Below 85% target" },
    { metric: "Success Rate", value: "87% Pass Rate", detail: "Above school average" },
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
      case 'grading': return <BarChart3 className="w-4 h-4" />;
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'assignment': return <FileText className="w-4 h-4" />;
      case 'feedback': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      case 'stable': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subject Teacher Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}! Teaching {selectedSubject}</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
            <FileText className="w-4 h-4 mr-2" />
            Create Assignment
          </Button>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Grade Papers
          </Button>
        </div>
      </div>

      {/* Subject Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjectMetrics.map((metric, index) => (
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
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Lessons */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today&apos;s Lessons
                </CardTitle>
                <CardDescription>Your teaching schedule for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {todaysLessons.map((lesson, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${getScheduleStatusColor(lesson.status)}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{lesson.class}</p>
                        <p className="text-sm text-gray-600">{lesson.topic}</p>
                        <p className="text-xs text-gray-500">{lesson.time} • {lesson.room}</p>
                      </div>
                      <Badge variant="outline" className={getScheduleStatusColor(lesson.status)}>
                        {lesson.status}
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
                <CardDescription>Your latest teaching activities</CardDescription>
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

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Important tasks and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{deadline.task}</p>
                      <p className="text-xs text-gray-600">Due: {deadline.deadline}</p>
                    </div>
                    <Badge className={getPriorityColor(deadline.priority)}>
                      {deadline.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Teaching Schedule</CardTitle>
              <CardDescription>Your complete {selectedSubject} teaching schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Today - {new Date().toLocaleDateString()}</h3>
                  <div className="space-y-2">
                    {todaysLessons.map((lesson, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                        <div>
                          <span className="font-medium">{lesson.class}</span>
                          <span className="text-sm text-gray-600 ml-2">- {lesson.topic}</span>
                        </div>
                        <span className="text-sm">{lesson.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>Performance across all your {selectedSubject} classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classPerformance.map((classData, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-medium">{classData.class}</h3>
                        <p className="text-sm text-gray-600">{classData.students} students</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(classData.trend)}
                        <Badge variant={classData.average >= 85 ? 'default' : 'secondary'}>
                          {classData.average}% avg
                        </Badge>
                      </div>
                    </div>
                    <Progress value={classData.average} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Class Average: {classData.average}%</span>
                      <span>Last Assignment: {classData.lastAssignment}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignment Management</CardTitle>
                <CardDescription>Create and manage assignments for your classes</CardDescription>
              </div>
              <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
                <FileText className="w-4 h-4 mr-2" />
                New Assignment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-blue-700">12</p>
                  <p className="text-sm text-blue-600">Active Assignments</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <ClipboardCheck className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <p className="text-2xl font-bold text-yellow-700">47</p>
                  <p className="text-sm text-yellow-600">Pending Reviews</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-700">92%</p>
                  <p className="text-sm text-green-600">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Management</CardTitle>
              <CardDescription>Review and manage student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Grade Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>A (90-100%)</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                    <div className="flex justify-between">
                      <span>B (80-89%)</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between">
                      <span>C (70-79%)</span>
                      <span>18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <div className="flex justify-between">
                      <span>Below 70%</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Grade Assignments
                    </Button>
                    <Button className="w-full" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report Cards
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Progress Updates
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Insights</CardTitle>
              <CardDescription>Data-driven insights about your {selectedSubject} teaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectInsights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm text-gray-600">{insight.metric}</h3>
                    <p className="text-lg font-bold mt-1">{insight.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{insight.detail}</p>
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

export default SubjectTeacherDashboard;