"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, UserCog, TrendingUp, TrendingDown } from "lucide-react";

export function AnalyticsDashboard() {
  // Mock data for attendance trends
  const attendanceData = {
    months: ["Jan", "Feb", "Mar", "Apr"],
    attendance: [92, 94, 91, 95], // Percentage attendance by month
    classes: [
      { name: "JSS 1", attendance: 96 },
      { name: "JSS 2", attendance: 94 },
      { name: "JSS 3", attendance: 91 },
      { name: "SSS 1", attendance: 93 },
      { name: "SSS 2", attendance: 90 },
      { name: "SSS 3", attendance: 97 },
    ]
  };

  // Mock data for staff reports
  const staffReportData = {
    totalStaff: 78,
    presentToday: 73,
    absentToday: 5,
    performance: [
      { name: "Lesson Plan Submissions", score: 87, trend: "up" },
      { name: "Assessment Completion", score: 92, trend: "up" },
      { name: "Professional Development", score: 78, trend: "down" },
      { name: "Parent Communication", score: 84, trend: "up" },
    ]
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Interactive Analytics</CardTitle>
        <CardDescription>
          School performance metrics and trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="attendance">Student Attendance</TabsTrigger>
            <TabsTrigger value="staff">Staff Reports</TabsTrigger>
          </TabsList>
          
          {/* Attendance Tab Content */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Monthly Trend */}
              <div>
                <h3 className="text-sm font-medium mb-4">Monthly Attendance Trend</h3>
                <div className="h-40 flex items-end space-x-2">
                  {attendanceData.months.map((month, index) => (
                    <div key={month} className="flex flex-col items-center flex-1">
                      <span className="text-xs mb-1">{attendanceData.attendance[index]}%</span>
                      <div 
                        className="w-full rounded-t bg-green-500"
                        style={{ 
                          height: `${attendanceData.attendance[index]}%`, 
                          opacity: 0.6 + (0.4 * (index / attendanceData.months.length))
                        }}
                      ></div>
                      <span className="text-xs mt-1">{month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class-wise Attendance */}
              <div>
                <h3 className="text-sm font-medium mb-4">Attendance by Class</h3>
                <div className="space-y-3">
                  {attendanceData.classes.map((classData) => (
                    <div key={classData.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{classData.name}</span>
                        <span className="font-medium">{classData.attendance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            classData.attendance >= 95 ? "bg-green-500" : 
                            classData.attendance >= 90 ? "bg-green-400" : "bg-orange-400"
                          }`}
                          style={{ width: `${classData.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Staff Reports Tab Content */}
          <TabsContent value="staff">
            <div className="grid gap-4 md:grid-cols-3">
              {/* Current Staff Metrics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Present Today</p>
                    <p className="text-2xl font-bold">{staffReportData.presentToday} <span className="text-sm font-normal text-muted-foreground">of {staffReportData.totalStaff}</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <UserCog className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Absent Today</p>
                    <p className="text-2xl font-bold">{staffReportData.absentToday}</p>
                  </div>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-4">Staff Performance Indicators</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {staffReportData.performance.map((item) => (
                    <Card key={item.name} className="p-3">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{item.name}</p>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-xl font-bold mt-1">{item.score}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className={item.trend === "up" ? "bg-green-500 h-1.5 rounded-full" : "bg-red-500 h-1.5 rounded-full"}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}