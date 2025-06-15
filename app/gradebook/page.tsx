"use client";

import { useState } from "react";
import { BookOpen, BarChart3, Filter, Download, Plus } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import GradebookTable from "@/components/gradebook/GradebookTable";
import GradebookStats from "@/components/gradebook/GradebookStats";

export default function GradebookPage() {
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'semester' | 'all'>('all');

  // Mock data for filters - in real app, this would come from API/database
  const classes = [
    { id: "10A", name: "Class 10A" },
    { id: "10B", name: "Class 10B" },
    { id: "11A", name: "Class 11A" },
    { id: "12A", name: "Class 12A" }
  ];

  const subjects = [
    { id: "Mathematics", name: "Mathematics" },
    { id: "English", name: "English" },
    { id: "Science", name: "Science" },
    { id: "History", name: "History" },
    { id: "Geography", name: "Geography" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gradebook</h1>
              <p className="text-gray-600 mt-1">
                Track student performance, manage grades, and analyze academic progress
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Grades
              </Button>
              <Button className="bg-[#1B5B5E] hover:bg-[#134345]">
                <Plus className="w-4 h-4 mr-2" />
                Add Grade
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timeframe} onValueChange={(value: 'week' | 'month' | 'semester' | 'all') => setTimeframe(value)}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                </SelectContent>
              </Select>

              {(selectedClass !== "all" || selectedSubject !== "all" || timeframe !== "all") && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedClass("all");
                    setSelectedSubject("all");
                    setTimeframe("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Grades
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
              <GradebookStats 
                classId={selectedClass !== "all" ? selectedClass : undefined}
                subjectId={selectedSubject !== "all" ? selectedSubject : undefined}
                timeframe={timeframe}
              />
            </div>

            {/* Recent Grades */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Recent Grades</h3>
                    <p className="text-sm text-muted-foreground">
                      Latest grades added to the system
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <GradebookTable 
                  classId={selectedClass !== "all" ? selectedClass : undefined}
                  subjectId={selectedSubject !== "all" ? selectedSubject : undefined}
                  compactView={true}
                  showActions={false}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">All Grades</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete gradebook with search and filtering
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <GradebookTable 
                  classId={selectedClass !== "all" ? selectedClass : undefined}
                  subjectId={selectedSubject !== "all" ? selectedSubject : undefined}
                  showActions={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Detailed Analytics */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Detailed Analytics</h2>
              <GradebookStats 
                classId={selectedClass !== "all" ? selectedClass : undefined}
                subjectId={selectedSubject !== "all" ? selectedSubject : undefined}
                timeframe={timeframe}
              />
            </div>

            {/* Performance Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Performance Insights</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Strong Performance</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Mathematics and Science show consistently high grades across all students.
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-800">Areas for Improvement</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        History assignments show lower average scores. Consider additional support.
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-blue-800">Trend Analysis</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Overall grades trending upward over the past month. Great progress!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Recommendations</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#1B5B5E] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-sm font-medium">Focus on Struggling Subjects</p>
                        <p className="text-xs text-muted-foreground">
                          Provide additional resources for subjects with lower average grades.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#1B5B5E] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-sm font-medium">Celebrate High Performers</p>
                        <p className="text-xs text-muted-foreground">
                          Recognize students with excellent grades to maintain motivation.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#1B5B5E] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-sm font-medium">Monitor Grade Trends</p>
                        <p className="text-xs text-muted-foreground">
                          Keep tracking grade trends to identify patterns early.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#1B5B5E] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div>
                        <p className="text-sm font-medium">Parent Communication</p>
                        <p className="text-xs text-muted-foreground">
                          Share progress reports with parents for students below 70%.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}