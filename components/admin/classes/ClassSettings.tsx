"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Settings, Users, MapPin, Clock, AlertCircle } from 'lucide-react';

interface ClassSettingsData {
  capacity: number;
  room?: string;
  isActive: boolean;
}

interface ClassSettingsProps {
  data: ClassSettingsData;
  onChange: (data: Partial<ClassSettingsData>) => void;
  errors: Record<string, string[]>;
}

export default function ClassSettings({ data, onChange, errors }: ClassSettingsProps) {
  const rooms = [
    'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105',
    'Room 201', 'Room 202', 'Room 203', 'Room 204', 'Room 205',
    'Science Lab A', 'Science Lab B', 'Computer Lab', 'Art Room',
    'Music Room', 'Library', 'Gymnasium', 'Auditorium'
  ];

  const scheduleOptions = [
    'Morning Shift (8:00 AM - 12:00 PM)',
    'Afternoon Shift (1:00 PM - 5:00 PM)',
    'Full Day (8:00 AM - 3:00 PM)',
    'Extended Day (7:00 AM - 6:00 PM)'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
        <Settings className="w-5 h-5" />
        Class Settings
      </div>

      {/* Capacity and Room */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4" />
            Capacity & Location
          </CardTitle>
          <CardDescription>
            Set the maximum capacity and assign a room for this class
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class Capacity */}
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-sm font-medium">
                Class Capacity *
              </Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="100"
                value={data.capacity}
                onChange={(e) => onChange({ capacity: parseInt(e.target.value) || 30 })}
                className={errors.capacity ? 'border-red-500' : ''}
              />
              {errors.capacity && (
                <p className="text-sm text-red-600">{errors.capacity[0]}</p>
              )}
              <p className="text-xs text-gray-500">
                Maximum number of students (1-100)
              </p>
            </div>

            {/* Room Assignment */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Room Assignment
              </Label>
              <Select
                value={data.room || ''}
                onValueChange={(value) => onChange({ room: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a room (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No room assigned</SelectItem>
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Assign a specific room for this class
              </p>
            </div>
          </div>

          {/* Capacity Warning */}
          {data.capacity > 35 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium">Large Class Size</p>
                  <p>Classes with more than 35 students may require additional attention for effective management.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4" />
            Schedule Information
          </CardTitle>
          <CardDescription>
            Configure class timing and schedule preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Preferred Schedule</Label>
            <Select defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="Select preferred schedule (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No preference</SelectItem>
                {scheduleOptions.map((schedule) => (
                  <SelectItem key={schedule} value={schedule}>
                    {schedule}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              This helps with scheduling but doesn't set fixed times
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Class Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Class Status</CardTitle>
          <CardDescription>
            Control whether this class is active and available for enrollment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Active Class</Label>
              <p className="text-xs text-gray-500">
                {data.isActive 
                  ? 'Class is active and available for student enrollment' 
                  : 'Class is inactive and not available for enrollment'
                }
              </p>
            </div>
            <Switch
              checked={data.isActive}
              onCheckedChange={(checked) => onChange({ isActive: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Additional Settings</CardTitle>
          <CardDescription>
            Optional settings for class management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Allow Waitlist</Label>
              <p className="text-xs text-gray-500">
                Allow students to join a waitlist when class is full
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Auto-Enrollment</Label>
              <p className="text-xs text-gray-500">
                Automatically enroll qualified students
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Parent Notifications</Label>
              <p className="text-xs text-gray-500">
                Send notifications to parents about class activities
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Settings Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-sm">Settings Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Capacity:</span> {data.capacity} students</p>
            <p><span className="font-medium">Room:</span> {data.room || 'Not assigned'}</p>
            <p><span className="font-medium">Status:</span> {data.isActive ? 'Active' : 'Inactive'}</p>
            {data.capacity <= 15 && (
              <p className="text-green-600">✓ Small class size - ideal for personalized attention</p>
            )}
            {data.capacity > 15 && data.capacity <= 25 && (
              <p className="text-blue-600">✓ Medium class size - good balance of interaction and management</p>
            )}
            {data.capacity > 25 && data.capacity <= 35 && (
              <p className="text-yellow-600">⚠ Large class size - may need additional support</p>
            )}
            {data.capacity > 35 && (
              <p className="text-red-600">⚠ Very large class size - requires careful management</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}