"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardMetrics } from "@/components/shared/DashboardMetrics";
import { getTeacherDefaultMetrics } from "@/components/shared/default-metrics";
import { CanTakeAttendance, CanCreateAssignments, CanManageGrades } from "@/components/auth/PermissionWrapper";
import { 
  CalendarDays, BookOpen, CheckCircle, MessageSquare,
  Users, Clipboard, Award, Bell, Clock, Calendar, 
  GraduationCap, FileText, TrendingUp
} from "lucide-react";

interface UpcomingScheduleItem {
  subject: string;
  class: string;
  time: string;
  status: "today" | "tomorrow";
}

interface RecentActivity {
  type: string;
  message: string;
  time: string;
}

interface TeacherOverviewProps {
  upcomingSchedule?: UpcomingScheduleItem[];
  recentActivities?: RecentActivity[];
}

export const TeacherOverview = ({ 
  upcomingSchedule = [], 
  recentActivities = [] 
}: TeacherOverviewProps) => {
  const defaultUpcomingSchedule: UpcomingScheduleItem[] = [
    { subject: "Mathematics", class: "10A", time: "9:00 AM - 10:00 AM", status: "today" },
    { subject: "Physics Lab", class: "9B", time: "11:00 AM - 12:00 PM", status: "today" },
    { subject: "Chemistry", class: "11C", time: "2:00 PM - 3:00 PM", status: "today" },
    { subject: "Mathematics", class: "10B", time: "9:00 AM - 10:00 AM", status: "tomorrow" },
  ];

  const defaultRecentActivities: RecentActivity[] = [
    { type: "grade", message: "Graded Mathematics Assignment for Class 10A", time: "2 hours ago" },
    { type: "attendance", message: "Marked attendance for Physics Class 9B", time: "4 hours ago" },
    { type: "message", message: "New message from Parent - John Doe", time: "6 hours ago" },
    { type: "assignment", message: "Created new Chemistry Assignment for Class 11C", time: "1 day ago" },
  ];

  const schedule = upcomingSchedule.length > 0 ? upcomingSchedule : defaultUpcomingSchedule;
  const activities = recentActivities.length > 0 ? recentActivities : defaultRecentActivities;

  return (
    <div className="space-y-6">
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
      <DashboardMetrics metrics={getTeacherDefaultMetrics()} />

      {/* Today's Schedule and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2" />
                Today's Schedule
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Full Calendar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {schedule.filter(item => item.status === 'today').map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                index === 1 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 1 ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium">{item.subject}</p>
                    <p className="text-sm text-gray-600">Class {item.class}</p>
                  </div>
                </div>
                <div className="text-right">
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
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <CanTakeAttendance>
                <Button className="flex flex-col items-center p-4 h-auto">
                  <Clipboard className="w-6 h-6 mb-2" />
                  <span className="text-sm">Take Attendance</span>
                </Button>
              </CanTakeAttendance>
              <CanCreateAssignments>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="text-sm">Create Assignment</span>
                </Button>
              </CanCreateAssignments>
              <CanManageGrades>
                <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                  <Award className="w-6 h-6 mb-2" />
                  <span className="text-sm">Grade Papers</span>
                </Button>
              </CanManageGrades>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <MessageSquare className="w-6 h-6 mb-2" />
                <span className="text-sm">Contact Parents</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Recent Activities
            </div>
            <Button variant="link" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">{activity.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};