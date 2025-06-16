"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react';
import type { NotificationSettings } from '@/lib/api/settings';

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onChange: (settings: NotificationSettings) => void;
}

export default function NotificationSettings({ settings, onChange }: NotificationSettingsProps) {
  const handleSettingChange = (field: keyof NotificationSettings, value: any) => {
    onChange({
      ...settings,
      [field]: value,
    });
  };

  const handleParentNotificationChange = (field: keyof NotificationSettings['parentNotifications'], value: boolean) => {
    onChange({
      ...settings,
      parentNotifications: {
        ...settings.parentNotifications,
        [field]: value,
      },
    });
  };

  const handleTeacherNotificationChange = (field: keyof NotificationSettings['teacherNotifications'], value: boolean) => {
    onChange({
      ...settings,
      teacherNotifications: {
        ...settings.teacherNotifications,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Global Notification Settings
          </CardTitle>
          <CardDescription>
            Enable or disable notification channels for your school
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via email</p>
              </div>
            </div>
            <Switch
              checked={settings.emailEnabled}
              onCheckedChange={(checked) => handleSettingChange('emailEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send notifications via text message</p>
              </div>
            </div>
            <Switch
              checked={settings.smsEnabled}
              onCheckedChange={(checked) => handleSettingChange('smsEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-500" />
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">Send push notifications to mobile app</p>
              </div>
            </div>
            <Switch
              checked={settings.pushEnabled}
              onCheckedChange={(checked) => handleSettingChange('pushEnabled', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Parent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Parent Notifications</CardTitle>
          <CardDescription>
            Configure what notifications parents receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Attendance Updates</Label>
              <p className="text-sm text-gray-500">Notify when child is marked absent or late</p>
            </div>
            <Switch
              checked={settings.parentNotifications.attendance}
              onCheckedChange={(checked) => handleParentNotificationChange('attendance', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Grade Reports</Label>
              <p className="text-sm text-gray-500">Notify when new grades are posted</p>
            </div>
            <Switch
              checked={settings.parentNotifications.grades}
              onCheckedChange={(checked) => handleParentNotificationChange('grades', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Assignment Updates</Label>
              <p className="text-sm text-gray-500">Notify about new assignments and due dates</p>
            </div>
            <Switch
              checked={settings.parentNotifications.assignments}
              onCheckedChange={(checked) => handleParentNotificationChange('assignments', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>School Events</Label>
              <p className="text-sm text-gray-500">Notify about school events and announcements</p>
            </div>
            <Switch
              checked={settings.parentNotifications.events}
              onCheckedChange={(checked) => handleParentNotificationChange('events', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Teacher Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Notifications</CardTitle>
          <CardDescription>
            Configure what notifications teachers receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>New Students</Label>
              <p className="text-sm text-gray-500">Notify when new students are assigned to classes</p>
            </div>
            <Switch
              checked={settings.teacherNotifications.newStudents}
              onCheckedChange={(checked) => handleTeacherNotificationChange('newStudents', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>Parent Messages</Label>
              <p className="text-sm text-gray-500">Notify when parents send messages</p>
            </div>
            <Switch
              checked={settings.teacherNotifications.parentMessages}
              onCheckedChange={(checked) => handleTeacherNotificationChange('parentMessages', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label>System Updates</Label>
              <p className="text-sm text-gray-500">Notify about system updates and announcements</p>
            </div>
            <Switch
              checked={settings.teacherNotifications.systemUpdates}
              onCheckedChange={(checked) => handleTeacherNotificationChange('systemUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}