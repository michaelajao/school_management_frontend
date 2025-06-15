"use client";

import { useState, useEffect, useMemo } from "react";
import { TrendingUp, TrendingDown, Award, AlertCircle, Users, BookOpen } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLiveQuery } from "dexie-react-hooks";
import { offlineDB } from "@/lib/offline/database";

interface GradeStats {
  totalGrades: number;
  averageGrade: number;
  highestGrade: number;
  lowestGrade: number;
  passingRate: number;
  excellentRate: number;
  subjectBreakdown: {
    subject: string;
    average: number;
    count: number;
  }[];
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  recentTrend: 'up' | 'down' | 'stable';
}

interface GradebookStatsProps {
  classId?: string;
  subjectId?: string;
  studentId?: string;
  timeframe?: 'week' | 'month' | 'semester' | 'all';
}

export default function GradebookStats({
  classId,
  subjectId,
  studentId,
  timeframe = 'all'
}: GradebookStatsProps) {
  const [stats, setStats] = useState<GradeStats>({
    totalGrades: 0,
    averageGrade: 0,
    highestGrade: 0,
    lowestGrade: 0,
    passingRate: 0,
    excellentRate: 0,
    subjectBreakdown: [],
    gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
    recentTrend: 'stable'
  });

  // Fetch grades from offline database
  const offlineGrades = useLiveQuery(() => offlineDB.grades.toArray()) || [];
  const offlineStudents = useLiveQuery(() => offlineDB.students.toArray()) || [];

  // Filter grades based on props
  const filteredGrades = useMemo(() => {
    let filtered = offlineGrades;

    if (classId) {
      filtered = filtered.filter(grade => grade.classId === classId);
    }

    if (subjectId) {
      filtered = filtered.filter(grade => grade.subject === subjectId);
    }

    if (studentId) {
      filtered = filtered.filter(grade => grade.studentId === studentId);
    }

    // Apply timeframe filter
    if (timeframe !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (timeframe) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'semester':
          cutoffDate.setMonth(now.getMonth() - 6);
          break;
      }

      filtered = filtered.filter(grade => 
        new Date(grade.date) >= cutoffDate
      );
    }

    return filtered;
  }, [offlineGrades, classId, subjectId, studentId, timeframe]);

  useEffect(() => {
    if (filteredGrades.length > 0) {
      calculateStats();
    }
  }, [filteredGrades]);

  const calculateStats = () => {
    const totalGrades = filteredGrades.length;
    
    if (totalGrades === 0) {
      setStats({
        totalGrades: 0,
        averageGrade: 0,
        highestGrade: 0,
        lowestGrade: 0,
        passingRate: 0,
        excellentRate: 0,
        subjectBreakdown: [],
        gradeDistribution: { A: 0, B: 0, C: 0, D: 0, F: 0 },
        recentTrend: 'stable'
      });
      return;
    }

    // Calculate percentages
    const percentages = filteredGrades.map(grade => (grade.grade / grade.maxGrade) * 100);
    
    const averageGrade = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    const highestGrade = Math.max(...percentages);
    const lowestGrade = Math.min(...percentages);
    
    // Calculate rates
    const passingGrades = percentages.filter(p => p >= 60).length;
    const excellentGrades = percentages.filter(p => p >= 90).length;
    const passingRate = (passingGrades / totalGrades) * 100;
    const excellentRate = (excellentGrades / totalGrades) * 100;

    // Grade distribution
    const gradeDistribution = {
      A: percentages.filter(p => p >= 90).length,
      B: percentages.filter(p => p >= 80 && p < 90).length,
      C: percentages.filter(p => p >= 70 && p < 80).length,
      D: percentages.filter(p => p >= 60 && p < 70).length,
      F: percentages.filter(p => p < 60).length,
    };

    // Subject breakdown
    const subjectMap = new Map<string, { total: number; count: number }>();
    
    filteredGrades.forEach(grade => {
      const percentage = (grade.grade / grade.maxGrade) * 100;
      const current = subjectMap.get(grade.subject) || { total: 0, count: 0 };
      subjectMap.set(grade.subject, {
        total: current.total + percentage,
        count: current.count + 1
      });
    });

    const subjectBreakdown = Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      average: data.total / data.count,
      count: data.count
    })).sort((a, b) => b.average - a.average);

    // Calculate trend (simplified - compares last 30% of grades with first 30%)
    let recentTrend: 'up' | 'down' | 'stable' = 'stable';
    if (totalGrades >= 6) {
      const sortedByDate = [...filteredGrades].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const splitPoint = Math.floor(totalGrades * 0.3);
      const earlyGrades = sortedByDate.slice(0, splitPoint);
      const recentGrades = sortedByDate.slice(-splitPoint);
      
      const earlyAvg = earlyGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / earlyGrades.length;
      const recentAvg = recentGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade) * 100, 0) / recentGrades.length;
      
      const diff = recentAvg - earlyAvg;
      if (diff > 2) recentTrend = 'up';
      else if (diff < -2) recentTrend = 'down';
    }

    setStats({
      totalGrades,
      averageGrade,
      highestGrade,
      lowestGrade,
      passingRate,
      excellentRate,
      subjectBreakdown,
      gradeDistribution,
      recentTrend
    });
  };

  const getGradeColor = (average: number) => {
    if (average >= 90) return 'text-green-600';
    if (average >= 80) return 'text-blue-600';
    if (average >= 70) return 'text-yellow-600';
    if (average >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (stats.totalGrades === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No grades available</h3>
          <p className="text-muted-foreground text-center">
            Grades will appear here once they are added to the system.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overview Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
              <p className={`text-2xl font-bold ${getGradeColor(stats.averageGrade)}`}>
                {stats.averageGrade.toFixed(1)}%
              </p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTrendColor(stats.recentTrend)}`}>
              {getTrendIcon(stats.recentTrend)}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Progress value={stats.averageGrade} className="flex-1" />
            <span className="text-xs text-muted-foreground">
              {stats.totalGrades} grades
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Passing Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.passingRate.toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Progress value={stats.passingRate} className="flex-1" />
            <span className="text-xs text-muted-foreground">
              60%+ grades
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Excellence Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.excellentRate.toFixed(1)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Progress value={stats.excellentRate} className="flex-1" />
            <span className="text-xs text-muted-foreground">
              90%+ grades
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Grade Range</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">
                  {stats.highestGrade.toFixed(0)}%
                </span>
                <span className="text-sm text-muted-foreground">-</span>
                <span className="text-lg font-bold text-red-600">
                  {stats.lowestGrade.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {(stats.highestGrade - stats.lowestGrade).toFixed(0)}% spread
          </p>
        </CardContent>
      </Card>

      {/* Grade Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h3 className="font-semibold">Grade Distribution</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(stats.gradeDistribution).map(([letter, count]) => {
              const percentage = stats.totalGrades > 0 ? (count / stats.totalGrades) * 100 : 0;
              const gradeColor = letter === 'A' ? 'bg-green-500' :
                               letter === 'B' ? 'bg-blue-500' :
                               letter === 'C' ? 'bg-yellow-500' :
                               letter === 'D' ? 'bg-orange-500' : 'bg-red-500';
              
              return (
                <div key={letter} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 w-16">
                    <span className="font-medium text-sm">{letter}:</span>
                    <span className="text-sm text-muted-foreground">{count}</span>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${gradeColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h3 className="font-semibold">Subject Performance</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.subjectBreakdown.slice(0, 5).map((subject, index) => (
              <div key={subject.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-6 rounded text-xs font-bold flex items-center justify-center text-white ${
                    index === 0 ? 'bg-green-500' :
                    index === 1 ? 'bg-blue-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-orange-500' : 'bg-red-500'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{subject.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {subject.count} grade{subject.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getGradeColor(subject.average)}`}>
                    {subject.average.toFixed(1)}%
                  </p>
                  <Progress value={subject.average} className="w-16 h-1 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}