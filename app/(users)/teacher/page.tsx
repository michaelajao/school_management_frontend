"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  CalendarDays, ArrowRight, BookOpen, CheckCircle, MessageSquare, 
  Users, Clipboard, Award, Bell, Clock, Filter, Search, TrendingUp,
  BarChart3, AlertCircle, Calendar, GraduationCap, FileText
} from "lucide-react";

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("Class 10A");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, type: "assignment", message: "5 assignments pending review", read: false },
    { id: 2, type: "meeting", message: "Parent-teacher conference at 2:00 PM", read: false },
    { id: 3, type: "system", message: "Grade submission deadline tomorrow", read: true },
  ]);

  const dashboardMetrics = [
    {
      icon: Users,
      value: 156,
      label: 'Total Students',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-700',
      iconColor: 'text-teal-600',
    },
    {
      icon: BookOpen,
      value: 8,
      label: "My Subjects",
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600',
    },
    {
      icon: Clipboard,
      value: 12,
      label: "Pending Assignments",
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      iconColor: 'text-red-600',
    },
    {
      icon: Award,
      value: 94,
      label: "Average Class Score (%)",
      bgColor: 'bg-green-100',
      textColor: 'text-green-700',
      iconColor: 'text-green-600',
    }
  ];

  const myClasses = [
    { name: "Class 10A", subject: "Mathematics", students: 32, nextClass: "Today 9:00 AM" },
    { name: "Class 9B", subject: "Physics", students: 28, nextClass: "Tomorrow 10:30 AM" },
    { name: "Class 11C", subject: "Chemistry", students: 25, nextClass: "Today 2:00 PM" },
  ];

  const recentActivities = [
    { type: "grade", message: "Graded Mathematics Assignment for Class 10A", time: "2 hours ago" },
    { type: "attendance", message: "Marked attendance for Physics Class 9B", time: "4 hours ago" },
    { type: "message", message: "New message from Parent - John Doe", time: "6 hours ago" },
    { type: "assignment", message: "Created new Chemistry Assignment for Class 11C", time: "1 day ago" },
  ];

  const upcomingSchedule = [
    { subject: "Mathematics", class: "10A", time: "9:00 AM - 10:00 AM", status: "today" },
    { subject: "Physics Lab", class: "9B", time: "11:00 AM - 12:00 PM", status: "today" },
    { subject: "Chemistry", class: "11C", time: "2:00 PM - 3:00 PM", status: "today" },
    { subject: "Mathematics", class: "10B", time: "9:00 AM - 10:00 AM", status: "tomorrow" },
  ];

  const scheduleData = [
    { time: "8:30 AM - 9:30 AM", subject: "Mathematics | Year 7 | Room 5", current: false },
    { time: "9:30 AM - 10:30 AM", subject: "Mathematics | Year 8 | Room 6", current: true },
    { time: "10:30 AM - 11:30 AM", subject: "Physics | Year 9 | Physics Lab", current: false },
    { time: "12:30 PM - 1:30 PM", subject: "Mathematics | Year 7 | Room 5", current: false },
    { time: "1:30 PM - 2:30 PM", subject: "Mathematics | Year 7 | Room 5", current: false },
  ];

  const assignmentsData = [
    { class: "Year 7B", subject: "Mathematics", title: "Algebra Homework", dueDate: "28 March 2025", submitted: "28 / 30", pendingReview: 4, status: "Graded" },
    { class: "Year 8C", subject: "Physics", title: "Newton\'s Laws Worksheet", dueDate: "30 March 2025", submitted: "25 / 25", pendingReview: 0, status: "Graded" },
    { class: "Year 9A", subject: "Chemistry", title: "Periodic Table Quiz", dueDate: "02 April 2025", submitted: "20 / 22", pendingReview: 22, status: "Pending Grade" },
  ];

  const studentProgressData = [
    { name: "Adebayo Oluwatobi", class: "Year 7B", overallScore: 85, attendance: 95, lastActivity: "Submitted Algebra Homework" },
    { name: "Chidinma Okoro", class: "Year 8C", overallScore: 78, attendance: 92, lastActivity: "Viewed Newton\'s Laws lesson" },
    { name: "Musa Ibrahim", class: "Year 9A", overallScore: 92, attendance: 98, lastActivity: "Scored 95% on Periodic Table Quiz" },
  ];

  const announcementsData = [
      { title: "Cultural Day is this Friday! Don\'t forget to dress accordingly.", time: "07 Jun 2025, 12:33PM", type: "event" },
      { title: "School closes early tomorrow - Check your updated timetable.", time: "07 Jun 2025, 12:33PM", type: "info" },
      { title: "Library hours extended from next week.", time: "07 Jun 2025, 12:33PM", type: "info" },
  ];

  const messagesData = [
      { sender: "Martha Akabue", message: "Hi Mr Samuel, Franklin says he didn\'t get any project this...", time: "07 Jun 2025, 12:33PM", unread: true },
      { sender: "Franklin Akabue", message: "Hi Mr Samuel, my mum wants to speak with you", time: "07 Jun 2025, 12:33PM", unread: false },
      { sender: "Franklin Akabue", message: "Hi Mr Samuel, Ileft my project in school, con I submit it...", time: "07 Jun 2025, 12:33PM", unread: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className=&quot;text-3xl font-bold text-gray-900&quot;>Welcome back, Ms. Johnson!</h1>
          <p className="text-gray-600 mt-1">Here&apos;s what's happening in your classes today</p>
        </div>
        <div className=&quot;flex space-x-2&quot;>
          <Button className=&quot;bg-blue-600 hover:bg-blue-700&quot;>
            <CalendarDays className=&quot;w-4 h-4 mr-2&quot; />
            View Schedule
          </Button>
          <Button variant=&quot;outline&quot;>
            <MessageSquare className=&quot;w-4 h-4 mr-2&quot; />
            Messages
          </Button>
        </div>
      </div>      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <Card key={index} className={`border-l-4 border-l-${metric.iconColor.split('-')[1]}-500`}>
            <CardContent className=&quot;p-6&quot;>
              <div className=&quot;flex items-center justify-between&quot;>
                <div>
                  <p className=&quot;text-sm font-medium text-gray-600&quot;>{metric.label}</p>
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
        <TabsList className=&quot;grid w-full grid-cols-6&quot;>
          <TabsTrigger value=&quot;overview&quot;>Overview</TabsTrigger>
          <TabsTrigger value=&quot;schedule&quot;>Schedule</TabsTrigger>
          <TabsTrigger value=&quot;assignments&quot;>Assignments</TabsTrigger>
          <TabsTrigger value=&quot;students&quot;>Students</TabsTrigger>
          <TabsTrigger value=&quot;analytics&quot;>Analytics</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>        <TabsContent value=&quot;overview&quot; className=&quot;space-y-4&quot;>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center justify-between&quot;>
                  <div className=&quot;flex items-center&quot;>
                    <CalendarDays className="w-5 h-5 mr-2" />
                    Today's Schedule
                  </div>
                  <Button variant=&quot;outline&quot; size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Full Calendar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSchedule.filter(item => item.status === 'today').map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                    index === 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className=&quot;flex items-center space-x-3&quot;>
                      <div className={`w-3 h-3 rounded-full ${
                        index === 1 ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className=&quot;font-medium&quot;>{item.subject}</p>
                        <p className=&quot;text-sm text-gray-600&quot;>Class {item.class}</p>
                      </div>
                    </div>
                    <div className=&quot;text-right&quot;>
                      <Badge variant={index === 1 ? "default" : "outline"}>{item.time}</Badge>
                      {index === 1 && (
                        <p className="text-xs text-blue-600 mt-1">Current Class</p>
                      )}
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-4" variant="outline">
                  <Clock className="w-4 h-4 mr-2" />
                  View Full Day Schedule
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center&quot;>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className=&quot;space-y-3&quot;>
                <div className=&quot;grid grid-cols-2 gap-3&quot;>
                  <Button className=&quot;flex flex-col items-center p-4 h-auto&quot;>
                    <Clipboard className=&quot;w-6 h-6 mb-2&quot; />
                    <span className=&quot;text-sm&quot;>Take Attendance</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                    <FileText className=&quot;w-6 h-6 mb-2&quot; />
                    <span className=&quot;text-sm&quot;>Create Assignment</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                    <Award className=&quot;w-6 h-6 mb-2&quot; />
                    <span className=&quot;text-sm&quot;>Grade Papers</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                    <MessageSquare className=&quot;w-6 h-6 mb-2&quot; />
                    <span className=&quot;text-sm&quot;>Contact Parents</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className=&quot;flex items-center justify-between&quot;>
                <div className=&quot;flex items-center&quot;>
                  <Bell className="w-5 h-5 mr-2" />
                  Recent Activities
                </div>
                <Button variant=&quot;link&quot; size=&quot;sm&quot;>View All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.slice(0, 5).map((activity, index) => (
                  <div key={index} className=&quot;flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50&quot;>
                    <div className=&quot;w-2 h-2 bg-blue-500 rounded-full mt-2&quot;></div>
                    <div className=&quot;flex-1&quot;>
                      <p className=&quot;text-sm&quot;>{activity.message}</p>
                      <p className=&quot;text-xs text-gray-500&quot;>{activity.time}</p>
                    </div>
                    <Badge variant=&quot;outline&quot; className="text-xs">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value=&quot;schedule&quot; className=&quot;space-y-4&quot;>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Detailed Schedule */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className=&quot;flex items-center justify-between&quot;>
                    <div className=&quot;flex items-center&quot;>
                      <Calendar className="w-5 h-5 mr-2" />
                      Today's Schedule
                    </div>
                    <div className=&quot;flex space-x-2&quot;>
                      <Button variant=&quot;outline&quot; size="sm">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Tomorrow
                      </Button>
                      <Button variant=&quot;outline&quot; size="sm">Weekly View</Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduleData.map((schedule, index) => (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                        schedule.current ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}>
                        <div className=&quot;flex items-center space-x-4&quot;>
                          <div className={`w-4 h-16 rounded ${
                            schedule.current ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <p className=&quot;font-medium text-lg&quot;>{schedule.time}</p>
                            <p className=&quot;text-gray-600&quot;>{schedule.subject}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {schedule.current && (
                            <>
                              <Button size=&quot;sm&quot;>Join Class</Button>
                              <Button size=&quot;sm&quot; variant="outline">Take Attendance</Button>
                            </>
                          )}
                          {!schedule.current && (
                            <Button size="sm" variant="outline">View Details</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Schedule Stats */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className=&quot;text-lg&quot;>Today's Summary</CardTitle>
                </CardHeader>
                <CardContent className=&quot;space-y-4&quot;>
                  <div className=&quot;flex justify-between items-center&quot;>
                    <span className=&quot;text-sm text-gray-600&quot;>Total Classes</span>
                    <span className=&quot;font-semibold&quot;>5</span>
                  </div>
                  <div className=&quot;flex justify-between items-center&quot;>
                    <span className=&quot;text-sm text-gray-600&quot;>Completed</span>
                    <span className=&quot;font-semibold text-green-600&quot;>2</span>
                  </div>
                  <div className=&quot;flex justify-between items-center&quot;>
                    <span className=&quot;text-sm text-gray-600&quot;>Remaining</span>
                    <span className=&quot;font-semibold text-blue-600&quot;>3</span>
                  </div>
                  <div className=&quot;pt-2&quot;>
                    <Progress value={40} className="h-2" />
                    <p className=&quot;text-xs text-gray-500 mt-1&quot;>40% of day completed</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className=&quot;text-lg&quot;>Upcoming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingSchedule.filter(item => item.status === 'tomorrow').slice(0, 3).map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className=&quot;font-medium text-sm&quot;>{item.subject}</p>
                      <p className=&quot;text-xs text-gray-600&quot;>Class {item.class} • {item.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>        <TabsContent value=&quot;assignments&quot; className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className=&quot;flex items-center justify-between&quot;>
                <div className=&quot;flex items-center&quot;>
                  <Clipboard className="w-5 h-5 mr-2" />
                  Assignment Management
                </div>
                <div className=&quot;flex items-center space-x-2&quot;>
                  <div className=&quot;flex items-center space-x-2&quot;>
                    <Filter className=&quot;w-4 h-4&quot; />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className=&quot;w-32&quot;>
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=&quot;all&quot;>All</SelectItem>
                        <SelectItem value=&quot;pending&quot;>Pending Review</SelectItem>
                        <SelectItem value=&quot;graded&quot;>Graded</SelectItem>
                        <SelectItem value=&quot;overdue&quot;>Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className=&quot;flex items-center space-x-2&quot;>
                    <Search className=&quot;w-4 h-4&quot; />
                    <Input 
                      placeholder="Search assignments..." 
                      className="w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Pending Review</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignmentsData.map((assignment, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className=&quot;font-medium&quot;>{assignment.class}</TableCell>
                      <TableCell>
                        <Badge variant=&quot;outline&quot;>{assignment.subject}</Badge>
                      </TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>
                        <div className=&quot;flex items-center space-x-2&quot;>
                          <Calendar className=&quot;w-4 h-4 text-gray-400&quot; />
                          <span>{assignment.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className=&quot;flex items-center space-x-2&quot;>
                          <Progress 
                            value={parseInt(assignment.submitted.split(' / ')[0]) / parseInt(assignment.submitted.split(' / ')[1]) * 100} 
                            className="w-16 h-2" 
                          />
                          <span className=&quot;text-sm&quot;>{assignment.submitted}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={assignment.pendingReview > 0 ? "destructive" : "secondary"}>
                          {assignment.pendingReview}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={assignment.status === "Graded" ? "secondary" : "outline"}
                          className={assignment.status === "Graded" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}
                        >
                          {assignment.status === "Graded" && <CheckCircle className="h-3 w-3 mr-1"/>}
                          {assignment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className=&quot;flex space-x-1&quot;>
                          <Button variant=&quot;ghost&quot; size="sm">View</Button>
                          {assignment.pendingReview > 0 && (
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              Grade ({assignment.pendingReview})
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>        <TabsContent value=&quot;students&quot; className=&quot;space-y-4&quot;>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Class Selection */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;text-lg&quot;>Select Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {myClasses.map((classItem, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer border transition-all ${
                      selectedClass === classItem.name 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedClass(classItem.name)}
                  >
                    <p className=&quot;font-medium&quot;>{classItem.name}</p>
                    <p className=&quot;text-sm text-gray-600&quot;>{classItem.subject}</p>
                    <p className=&quot;text-xs text-gray-500&quot;>{classItem.students} students</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Student List */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className=&quot;flex items-center justify-between&quot;>
                    <div className=&quot;flex items-center&quot;>
                      <Users className="w-5 h-5 mr-2" />
                      Students in {selectedClass}
                    </div>
                    <div className=&quot;flex space-x-2&quot;>
                      <Button variant=&quot;outline&quot; size="sm">
                        <Clipboard className="w-4 h-4 mr-2" />
                        Take Attendance
                      </Button>
                      <Button variant=&quot;outline&quot; size="sm">Export List</Button>
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
                      {studentProgressData.map((student, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>
                            <div className=&quot;flex items-center space-x-3&quot;>
                              <div className=&quot;w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center&quot;>
                                <span className="text-sm font-medium text-blue-600">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className=&quot;font-medium&quot;>{student.name}</p>
                                <p className=&quot;text-sm text-gray-500&quot;>{student.class}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className=&quot;flex items-center gap-2&quot;>
                              <Progress value={student.overallScore} className="w-24 h-2" />
                              <span className=&quot;font-medium&quot;>{student.overallScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className=&quot;flex items-center gap-2&quot;>
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
                            <div className=&quot;flex items-center&quot;>
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
                            <div className=&quot;flex space-x-1&quot;>
                              <Button variant=&quot;ghost&quot; size="sm">View Profile</Button>
                              <Button variant=&quot;ghost&quot; size="sm">Contact Parent</Button>
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
        </TabsContent>

        <TabsContent value=&quot;analytics&quot; className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Class Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className=&quot;flex items-center&quot;>
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Class Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myClasses.map((classItem, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className=&quot;flex justify-between items-center mb-2&quot;>
                        <div>
                          <p className=&quot;font-medium&quot;>{classItem.name}</p>
                          <p className=&quot;text-sm text-gray-600&quot;>{classItem.subject}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          {85 + Math.floor(Math.random() * 15)}% Avg
                        </Badge>
                      </div>
                      <div className=&quot;grid grid-cols-3 gap-2 text-sm&quot;>
                        <div className=&quot;text-center p-2 bg-blue-50 rounded&quot;>
                          <p className=&quot;font-medium text-blue-600&quot;>{classItem.students}</p>
                          <p className=&quot;text-xs text-gray-600&quot;>Students</p>
                        </div>
                        <div className=&quot;text-center p-2 bg-green-50 rounded&quot;>
                          <p className=&quot;font-medium text-green-600&quot;>{Math.floor(Math.random() * 5) + 3}</p>
                          <p className=&quot;text-xs text-gray-600&quot;>Assignments</p>
                        </div>
                        <div className=&quot;text-center p-2 bg-purple-50 rounded&quot;>
                          <p className=&quot;font-medium text-purple-600&quot;>95%</p>
                          <p className=&quot;text-xs text-gray-600&quot;>Attendance</p>
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
                <CardTitle className=&quot;flex items-center&quot;>
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Student Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className=&quot;space-y-4&quot;>
                  <div className=&quot;grid grid-cols-3 gap-4 text-center&quot;>
                    <div className=&quot;p-3 bg-green-50 rounded-lg&quot;>
                      <p className="text-2xl font-bold text-green-600">
                        {studentProgressData.filter(s => s.overallScore >= 85).length}
                      </p>
                      <p className=&quot;text-sm text-green-600&quot;>Excellent</p>
                      <p className=&quot;text-xs text-gray-500&quot;>≥85%</p>
                    </div>
                    <div className=&quot;p-3 bg-yellow-50 rounded-lg&quot;>
                      <p className="text-2xl font-bold text-yellow-600">
                        {studentProgressData.filter(s => s.overallScore >= 70 && s.overallScore < 85).length}
                      </p>
                      <p className=&quot;text-sm text-yellow-600&quot;>Good</p>
                      <p className=&quot;text-xs text-gray-500&quot;>70-84%</p>
                    </div>
                    <div className=&quot;p-3 bg-red-50 rounded-lg&quot;>
                      <p className="text-2xl font-bold text-red-600">
                        {studentProgressData.filter(s => s.overallScore < 70).length}
                      </p>
                      <p className=&quot;text-sm text-red-600&quot;>Needs Help</p>
                      <p className=&quot;text-xs text-gray-500&quot;>&lt;70%</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className=&quot;font-medium mb-3&quot;>Students Requiring Attention</h4>
                    <div className="space-y-2">
                      {studentProgressData
                        .filter(s => s.overallScore < 75 || s.attendance < 85)
                        .map((student, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                            <div>
                              <p className=&quot;font-medium text-sm&quot;>{student.name}</p>
                              <p className="text-xs text-gray-600">
                                Score: {student.overallScore}% | Attendance: {student.attendance}%
                              </p>
                            </div>
                            <Button variant=&quot;outline&quot; size="sm">
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
                {assignmentsData.map((assignment, index) => (
                  <div key={index} className=&quot;p-4 border rounded-lg&quot;>
                    <div className=&quot;flex justify-between items-start mb-2&quot;>
                      <div>
                        <p className=&quot;font-medium&quot;>{assignment.title}</p>
                        <p className=&quot;text-sm text-gray-600&quot;>{assignment.class}</p>
                      </div>
                      <Badge variant={assignment.status === "Graded" ? "secondary" : "outline"}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <div className=&quot;space-y-2&quot;>
                      <div className=&quot;flex justify-between text-sm&quot;>
                        <span>Submitted:</span>
                        <span className=&quot;font-medium&quot;>{assignment.submitted}</span>
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
              </div>            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value=&quot;notifications&quot; className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className=&quot;flex items-center justify-between&quot;>
                <div className=&quot;flex items-center&quot;>
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                >
                  Mark All as Read
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className=&quot;flex items-start justify-between&quot;>
                      <div className=&quot;flex items-start space-x-3&quot;>
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          !notification.read ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                        <div className=&quot;flex-1&quot;>
                          <div className="flex items-center space-x-2 mb-1">
                            {notification.type === 'assignment' && <Clipboard className="w-4 h-4 text-orange-500" />}
                            {notification.type === 'meeting' && <Calendar className="w-4 h-4 text-blue-500" />}
                            {notification.type === 'system' && <AlertCircle className="w-4 h-4 text-purple-500" />}
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                          </div>
                          <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNotifications(notifications.map(n => 
                            n.id === notification.id ? { ...n, read: true } : n
                          ));
                        }}
                      >
                        {!notification.read ? 'Mark Read' : 'Read'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Actions from Notifications */}
              <div className="mt-6 pt-4 border-t">
                <h4 className=&quot;font-medium mb-3&quot;>Quick Actions</h4>
                <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-3&quot;>
                  <Button variant=&quot;outline&quot; className="justify-start">
                    <Clipboard className="w-4 h-4 mr-2" />
                    Review Pending Assignments
                  </Button>
                  <Button variant=&quot;outline&quot; className="justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Upcoming Meetings
                  </Button>
                  <Button variant=&quot;outline&quot; className="justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Check Messages
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pending Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className=&quot;flex items-center justify-between&quot;>
            Assignments
            <div className="flex items-center gap-2">
                <Button variant=&quot;ghost&quot; size=&quot;sm&quot;>&lt; March 2025 &gt;</Button>
                <Button variant="link" size=&quot;sm&quot; className="text-sm">See all assignments <ArrowRight className=&quot;h-3 w-3 ml-1&quot;/></Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submission Received</TableHead>
                <TableHead>Pending Submission</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignmentsData.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>{assignment.class}</TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.dueDate}</TableCell>
                  <TableCell>{assignment.submitted}</TableCell>
                  <TableCell>
                    <Badge variant={assignment.pendingReview > 0 ? "destructive" : "default"}>
                      {assignment.pendingReview}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={assignment.status === "Graded" ? "secondary" : "outline"}
                        className={`${assignment.status === "Graded" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
                    >
                        {assignment.status === &quot;Graded&quot; && <CheckCircle className="h-3 w-3 mr-1"/>}
                        {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant=&quot;link&quot; size=&quot;sm&quot; className="text-blue-600">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Student Progress Overview - Simplified, more details can be a separate page */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress Overview</CardTitle>
          <CardDescription>Quick look at student performance metrics.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentProgressData.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className=&quot;font-medium&quot;>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <div className=&quot;flex items-center gap-2&quot;>
                      <Progress value={student.overallScore} className="w-24 h-2" />
                      <span>{student.overallScore}%</span>
                    </div>
                  </TableCell>                  <TableCell>
                     <div className=&quot;flex items-center gap-2&quot;>
                      <Progress value={student.attendance} className="w-24 h-2" />
                      <span className={student.attendance < 80 ? "text-red-500" : "text-green-500"}>
                        {student.attendance}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className=&quot;text-sm text-muted-foreground&quot;>{student.lastActivity}</TableCell>
                  <TableCell>
                    <Button variant=&quot;link&quot; size=&quot;sm&quot; className="text-blue-600">View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
