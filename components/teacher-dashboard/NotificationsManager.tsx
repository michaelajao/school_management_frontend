"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Clipboard, Calendar, AlertCircle, MessageSquare } from "lucide-react";

interface Notification {
  id: number;
  type: "assignment" | "meeting" | "system";
  message: string;
  read: boolean;
}

interface NotificationsManagerProps {
  notifications?: Notification[];
  onNotificationRead?: (id: number) => void;
  onMarkAllRead?: () => void;
}

export const NotificationsManager = ({
  notifications = [],
  onNotificationRead,
  onMarkAllRead
}: NotificationsManagerProps) => {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    notifications.length > 0 ? notifications : [
      { id: 1, type: "assignment", message: "5 assignments pending review", read: false },
      { id: 2, type: "meeting", message: "Parent-teacher conference at 2:00 PM", read: false },
      { id: 3, type: "system", message: "Grade submission deadline tomorrow", read: true },
      { id: 4, type: "assignment", message: "New submission for Mathematics Quiz", read: false },
      { id: 5, type: "meeting", message: "Faculty meeting rescheduled to Friday", read: true },
      { id: 6, type: "system", message: "System maintenance tonight 11 PM - 1 AM", read: false },
    ]
  );

  const handleMarkRead = (id: number) => {
    setLocalNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    onNotificationRead?.(id);
  };

  const handleMarkAllRead = () => {
    setLocalNotifications(prev => prev.map(n => ({ ...n, read: true })));
    onMarkAllRead?.();
  };

  const unreadCount = localNotifications.filter(n => !n.read).length;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              Mark All as Read
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {localNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      !notification.read ? 'bg-blue-500' : 'bg-gray-400'
                    }`}></div>
                    <div className="flex-1">
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
                    onClick={() => handleMarkRead(notification.id)}
                    disabled={notification.read}
                  >
                    {!notification.read ? 'Mark Read' : 'Read'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick Actions from Notifications */}
          <div className="mt-6 pt-4 border-t">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button variant="outline" className="justify-start">
                <Clipboard className="w-4 h-4 mr-2" />
                Review Pending Assignments
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                View Upcoming Meetings
              </Button>
              <Button variant="outline" className="justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Check Messages
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Assignment Submissions</p>
                <p className="text-sm text-gray-600">Get notified when students submit assignments</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Grade Deadlines</p>
                <p className="text-sm text-gray-600">Reminders for grade submission deadlines</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Parent Messages</p>
                <p className="text-sm text-gray-600">Notifications for new parent communications</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">System Announcements</p>
                <p className="text-sm text-gray-600">Important system updates and maintenance</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};