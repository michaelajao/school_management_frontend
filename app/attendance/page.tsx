"use client";

import { useState } from "react";
import { Calendar, History, BarChart3, Users, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AttendanceMarker from "@/components/attendance/AttendanceMarker";
import AttendanceHistory from "@/components/attendance/AttendanceHistory";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

export default function AttendancePage() {
  const [selectedTab, setSelectedTab] = useState("mark");

  // Get today's attendance data for summary
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = useLiveQuery(() => 
    offlineDB.attendance.where('date').equals(today).toArray()
  ) || [];

  const totalStudents = useLiveQuery(() => 
    offlineDB.students.where('status').equals('ACTIVE').count()
  ) || 0;

  // Calculate summary stats
  const markedToday = todayAttendance.length;
  const presentToday = todayAttendance.filter(a => a.status === 'PRESENT').length;
  const absentToday = todayAttendance.filter(a => a.status === 'ABSENT').length;
  const lateToday = todayAttendance.filter(a => a.status === 'LATE').length;

  const completionRate = totalStudents > 0 ? (markedToday / totalStudents) * 100 : 0;
  const attendanceRate = markedToday > 0 ? (presentToday / markedToday) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
              <p className="text-gray-600 mt-1">
                Mark daily attendance and track student attendance patterns
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date().toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students Marked</p>
                  <p className="text-2xl font-bold">{markedToday}/{totalStudents}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Completion</span>
                  <span>{completionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-green-600">{presentToday}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {attendanceRate.toFixed(1)}% attendance rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Absent Today</p>
                  <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              </div>
              {lateToday > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  +{lateToday} late arrivals
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Status</p>
                  <p className={`text-lg font-bold ${
                    completionRate === 100 ? 'text-green-600' :
                    completionRate >= 80 ? 'text-blue-600' :
                    completionRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {completionRate === 100 ? 'Complete' :
                     completionRate >= 80 ? 'Good' :
                     completionRate >= 50 ? 'Partial' : 'Started'}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  completionRate === 100 ? 'bg-green-100' :
                  completionRate >= 80 ? 'bg-blue-100' :
                  completionRate >= 50 ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <BarChart3 className={`w-5 h-5 ${
                    completionRate === 100 ? 'text-green-600' :
                    completionRate >= 80 ? 'text-blue-600' :
                    completionRate >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalStudents - markedToday} students remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="mark" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark Today
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mark" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Today's Attendance</h3>
                    <p className="text-sm text-muted-foreground">
                      Mark attendance for {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  {completionRate < 100 && (
                    <Badge variant="outline" className="text-orange-600 border-orange-200">
                      {(100 - completionRate).toFixed(0)}% Remaining
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <AttendanceMarker 
                  date={today}
                  showQuickActions={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <AttendanceHistory showDetailedView={true} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Overview */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Weekly Overview</h3>
                </CardHeader>
                <CardContent>
                  <AttendanceHistory 
                    showDetailedView={false}
                  />
                </CardContent>
              </Card>

              {/* Attendance Insights */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Attendance Insights</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Excellent Attendance</span>
                      </div>
                      <p className="text-sm text-green-700">
                        {Math.round((presentToday / (markedToday || 1)) * 100)}% of students are present today.
                      </p>
                    </div>

                    {absentToday > 5 && (
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium text-red-800">High Absences</span>
                        </div>
                        <p className="text-sm text-red-700">
                          {absentToday} students are absent today. Consider follow-up.
                        </p>
                      </div>
                    )}

                    {completionRate < 80 && (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm font-medium text-yellow-800">Incomplete Marking</span>
                        </div>
                        <p className="text-sm text-yellow-700">
                          {totalStudents - markedToday} students haven't been marked yet.
                        </p>
                      </div>
                    )}

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-800">Quick Stats</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                        <div>Present: {presentToday}</div>
                        <div>Absent: {absentToday}</div>
                        <div>Late: {lateToday}</div>
                        <div>Total: {markedToday}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Detailed Analytics</h3>
              </CardHeader>
              <CardContent>
                <AttendanceHistory showDetailedView={true} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}