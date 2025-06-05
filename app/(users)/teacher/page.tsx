"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, ArrowRight, BookOpenText, CheckCircle, MessageSquare, PieChart, User2 } from "lucide-react";

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("Class 10A");

  const dashboardMetrics = [
    {
      icon: Users,
      value: 156,
      label: 'Total Students',
      primaryColor: '#008080',
      secondaryColor: '#BDFAFF4D',
    },
    {
      icon: BookOpen,
      value: 8,
      label: "My Subjects",
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33",
    },
    {
      icon: ClipboardList,
      value: 12,
      label: "Pending Assignments",
      primaryColor: "#EF1A36",
      secondaryColor: "#FFDDDE80"
    },
    {
      icon: Award,
      value: 94,
      label: "Average Class Score (%)",
      primaryColor: "#28C76F",
      secondaryColor: "#28C76F33"
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Ms. Johnson!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your classes today</p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CalendarDays className="w-4 h-4 mr-2" />
            View Schedule
          </Button>
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">My Classes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSchedule.filter(item => item.status === 'today').map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{item.subject}</p>
                      <p className="text-sm text-gray-600">Class {item.class}</p>
                    </div>
                    <Badge variant="outline">{item.time}</Badge>
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
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.slice(0, 4).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myClasses.map((classItem, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{classItem.name}</CardTitle>
                  <CardDescription>{classItem.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Students:</span>
                      <span className="font-medium">{classItem.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Next Class:</span>
                      <span className="font-medium text-blue-600">{classItem.nextClass}</span>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">View Class</Button>
                      <Button size="sm" variant="outline" className="flex-1">Take Attendance</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Your complete teaching schedule for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                  <div key={day} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-medium text-lg">{day}</h3>
                    <div className="space-y-2 mt-2">
                      {upcomingSchedule.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">{item.subject}</span>
                            <span className="text-gray-600 ml-2">- Class {item.class}</span>
                          </div>
                          <span className="text-sm text-gray-600">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Activities</CardTitle>
              <CardDescription>Complete history of your teaching activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Pending Assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Assignments
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">&lt; March 2025 &gt;</Button>
                <Button variant="link" size="sm" className="text-sm">See all assignments <ArrowRight className="h-3 w-3 ml-1"/></Button>
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
                        {assignment.status === "Graded" && <CheckCircle className="h-3 w-3 mr-1"/>}
                        {assignment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="text-blue-600">View Details</Button>
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
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.overallScore} className="w-24 h-2" />
                      <span>{student.overallScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                      <Progress value={student.attendance} className="w-24 h-2" indicatorClassName={student.attendance < 80 ? "bg-red-500" : "bg-green-500"} />
                      <span>{student.attendance}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{student.lastActivity}</TableCell>
                  <TableCell>
                    <Button variant="link" size="sm" className="text-blue-600">View Profile</Button>
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
