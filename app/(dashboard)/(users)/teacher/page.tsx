"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TeacherOverview,
  ScheduleManager,
  AssignmentManager,
  StudentManager,
  AnalyticsManager,
  NotificationsManager
} from "@/components/teacher-dashboard";

const TeacherDashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "assignment", message: "5 assignments pending review", read: false },
    { id: 2, type: "meeting", message: "Parent-teacher conference at 2:00 PM", read: false },
    { id: 3, type: "system", message: "Grade submission deadline tomorrow", read: true },
  ]);

  const handleNotificationRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs">
                {notifications.filter(n => !n.read).length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <TeacherOverview />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <ScheduleManager />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <AssignmentManager />
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <StudentManager />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsManager />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <NotificationsManager 
            notifications={notifications as any}
            onNotificationRead={handleNotificationRead}
            onMarkAllRead={handleMarkAllRead}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;