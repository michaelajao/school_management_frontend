"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, ArrowRight } from "lucide-react";

interface ScheduleItem {
  time: string;
  subject: string;
  current: boolean;
}

interface UpcomingItem {
  subject: string;
  class: string;
  time: string;
  status: string;
}

interface ScheduleManagerProps {
  scheduleData?: ScheduleItem[];
  upcomingSchedule?: UpcomingItem[];
}

export const ScheduleManager = ({ 
  scheduleData = [], 
  upcomingSchedule = [] 
}: ScheduleManagerProps) => {
  const defaultScheduleData: ScheduleItem[] = [
    { time: "8:30 AM - 9:30 AM", subject: "Mathematics | Year 7 | Room 5", current: false },
    { time: "9:30 AM - 10:30 AM", subject: "Mathematics | Year 8 | Room 6", current: true },
    { time: "10:30 AM - 11:30 AM", subject: "Physics | Year 9 | Physics Lab", current: false },
    { time: "12:30 PM - 1:30 PM", subject: "Mathematics | Year 7 | Room 5", current: false },
    { time: "1:30 PM - 2:30 PM", subject: "Mathematics | Year 7 | Room 5", current: false },
  ];

  const defaultUpcomingSchedule: UpcomingItem[] = [
    { subject: "Mathematics", class: "10A", time: "9:00 AM - 10:00 AM", status: "tomorrow" },
    { subject: "Physics Lab", class: "9B", time: "11:00 AM - 12:00 PM", status: "tomorrow" },
    { subject: "Chemistry", class: "11C", time: "2:00 PM - 3:00 PM", status: "tomorrow" },
  ];

  const schedule = scheduleData.length > 0 ? scheduleData : defaultScheduleData;
  const upcoming = upcomingSchedule.length > 0 ? upcomingSchedule : defaultUpcomingSchedule;

  const completedClasses = schedule.filter(item => !item.current).length;
  const totalClasses = schedule.length;
  const progressValue = (completedClasses / totalClasses) * 100;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Detailed Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Tomorrow
                  </Button>
                  <Button variant="outline" size="sm">Weekly View</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                    item.current ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-16 rounded ${
                        item.current ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div>
                        <p className="font-medium text-lg">{item.time}</p>
                        <p className="text-gray-600">{item.subject}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {item.current && (
                        <>
                          <Button size="sm">Join Class</Button>
                          <Button size="sm" variant="outline">Take Attendance</Button>
                        </>
                      )}
                      {!item.current && (
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
              <CardTitle className="text-lg">Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Classes</span>
                <span className="font-semibold">{totalClasses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold text-green-600">{completedClasses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Remaining</span>
                <span className="font-semibold text-blue-600">{totalClasses - completedClasses}</span>
              </div>
              <div className="pt-2">
                <Progress value={progressValue} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">{Math.round(progressValue)}% of day completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcoming.slice(0, 3).map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-sm">{item.subject}</p>
                  <p className="text-xs text-gray-600">Class {item.class} • {item.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};