"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
// Import specific chart components from recharts
import { 
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, 
  Tooltip, LineChart, Line, BarChart, Bar 
} from "recharts"; 
import { 
  Search, Building, Users, TrendingUp, CreditCard, 
  PlusCircle, DollarSign, ArrowUp, ArrowDown, 
  Download, AlertTriangle, Bell, CheckCircle, Eye, ArrowRight, 
  Globe, Settings, School, Layers, Link as LinkIcon, Calendar
} from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock Data (Replace with actual API data)
const revenueData = [
  { month: "Jan", total: 82500, projected: 80000 },
  { month: "Feb", total: 87500, projected: 82000 },
  { month: "Mar", total: 92000, projected: 85000 },
  { month: "Apr", total: 95000, projected: 87000 },
  { month: "May", total: 99500, projected: 90000 },
  { month: "Jun", total: 102000, projected: 92000 },
];

const revenueConfig = {
  total: {
    label: "Actual Revenue",
    color: "hsl(var(--chart-1))",
  },
  projected: {
    label: "Projected Revenue",
    color: "hsl(var(--chart-3))",
  }
};

const schoolGrowthData = [
  { month: "Jan", schools: 12 },
  { month: "Feb", schools: 13 },
  { month: "Mar", schools: 13 },
  { month: "Apr", schools: 14 },
  { month: "May", schools: 15 },
  { month: "Jun", schools: 15 },
];

const growthConfig = {
  schools: {
    label: "Schools",
    color: "hsl(var(--chart-2))"
  }
};

const countryData = [
  { name: "Kenya", value: 8, color: "#1B5B5E" },
  { name: "Nigeria", value: 4, color: "#2A9D8F" },
  { name: "Ghana", value: 2, color: "#E9C46A" },
  { name: "Uganda", value: 1, color: "#F4A261" },
];

const subscriptionData = [
  { name: "Premium", value: 5, color: "#1B5B5E" },
  { name: "Standard", value: 8, color: "#2A9D8F" },
  { name: "Freemium", value: 2, color: "#E9C46A" },
];

const schoolsList = [
  { id: "school-1", name: "Nairobi International Academy", country: "Kenya", students: 750, subscription: "Premium", status: "active" },
  { id: "school-2", name: "Lagos Preparatory School", country: "Nigeria", students: 620, subscription: "Standard", status: "active" },
  { id: "school-3", name: "Accra Model School", country: "Ghana", students: 550, subscription: "Standard", status: "active" },
  { id: "school-4", name: "Mountain View Academy", country: "Kenya", students: 480, subscription: "Standard", status: "active" },
  { id: "school-5", name: "Kampala International School", country: "Uganda", students: 680, subscription: "Premium", status: "active" },
];

const pendingApprovalsList = [
  { id: "pending-1", name: "Sunrise Academy", country: "Kenya", requestDate: "2025-04-22", plan: "Standard" },
  { id: "pending-2", name: "Eagle Heights School", country: "Nigeria", requestDate: "2025-04-23", plan: "Premium" },
  { id: "pending-3", name: "Green Valley Primary", country: "Ghana", requestDate: "2025-04-24", plan: "Freemium" },
];

const systemAlerts = [
  { id: "alert-1", type: "warning", message: "Database storage reaching 80% capacity", time: "2 hours ago" },
  { id: "alert-2", type: "info", message: "System backup completed successfully", time: "6 hours ago" },
  { id: "alert-3", type: "success", message: "New version deployment completed", time: "1 day ago" },
];

export default function SuperAdminDashboardPage() {
  const { user, loading } = useAuth();

  // Redirect if not superadmin or loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  if (user?.role !== "superadmin") {
    // Redirect to their appropriate dashboard or login
    redirect(user?.role ? `/dashboard/${user.role}` : "/auth/signin");
    return null; // Prevent rendering during redirect
  }

  // Mock Metrics
  const totalSchools = 15;
  const totalStudents = 12500;
  const totalRevenue = 582000;
  const pendingApprovals = 3;
  const activeUsers = 13750;

  return (
    <div className="flex flex-col gap-6">
      {/* Header with platform snapshot */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#1B5B5E]/10 to-[#134345]/5 p-6 rounded-xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#134345]">Welcome, {user?.name}!</h1>
          <p className="text-muted-foreground">Platform administrator dashboard - April 26, 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="bg-white/90 shadow-sm border-none">
            <CardContent className="p-3 flex gap-3 items-center">
              <Globe className="h-5 w-5 text-[#1B5B5E]" />
              <div>
                <p className="text-xs text-muted-foreground">Platform Status</p>
                <p className="text-sm font-medium flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> Operational
                </p>
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="bg-white/90" size="sm">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-[#1B5B5E]/90 to-[#134345] text-white shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchools}</div>
            <p className="text-xs text-white/80">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+155 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% year-over-year</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
            <p className="text-xs text-amber-700">Action required</p>
          </CardContent>
        </Card>
      </section>

      {/* Schools Management & Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Platform Management</CardTitle>
            <CardDescription>Quick access to key functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Link href="/dashboard/superadmin/schools" prefetch={false}>
                <Button className="w-full bg-[#1B5B5E] hover:bg-[#134345]">
                  <School className="mr-2 h-4 w-4" /> Manage Schools
                </Button>
              </Link>
              <Link href="/dashboard/superadmin/subscriptions" prefetch={false}>
                <Button variant="outline" className="w-full">
                  <Layers className="mr-2 h-4 w-4" /> Subscription Plans
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" /> User Management
              </Button>
              <Button variant="outline" className="w-full">
                <DollarSign className="mr-2 h-4 w-4" /> Financial Reports
              </Button>
              <Button variant="outline" className="w-full">
                <Bell className="mr-2 h-4 w-4" /> Platform Announcements
              </Button>
            </div>

            <Card className="bg-muted/50 border-none shadow-none">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" /> 
                  Pending School Approvals
                </h3>
                <ul className="space-y-2 text-sm">
                  {pendingApprovalsList.map(school => (
                    <li key={school.id} className="flex justify-between items-center">
                      <span className="font-medium">{school.name}</span>
                      <Badge variant="outline" className="text-xs bg-white">
                        {school.plan}
                      </Badge>
                    </li>
                  ))}
                </ul>
                <Button size="sm" variant="link" className="mt-2 p-0">
                  View all requests <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Revenue Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Revenue</CardTitle>
            <CardDescription>Monthly revenue vs. projections</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chart">
              <TabsList className="mb-4">
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chart">
                <ChartContainer config={revenueConfig} className="h-[300px] w-full">
                  <BarChart data={revenueData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={80} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="projected" fill="var(--color-projected)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </TabsContent>
              
              <TabsContent value="summary">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Current Month Revenue</h3>
                      <p className="text-2xl font-bold mt-1">${revenueData[revenueData.length - 1].total.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">+7.5% vs. Previous Month</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground">YTD Revenue Growth</h3>
                      <p className="text-2xl font-bold mt-1">+23.5%</p>
                      <p className="text-xs text-muted-foreground mt-1">Compared to same period last year</p>
                    </CardContent>
                  </Card>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Export Financial Report
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Schools Data & Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Schools Growth</span>
              <Badge variant="outline">Monthly</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-[250px]">
              <LineChart data={schoolGrowthData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={40} domain={[0, 'dataMax + 2']} />
                <Tooltip content={<ChartTooltipContent indicator="line" />} />
                <Line 
                  type="monotone" 
                  dataKey="schools" 
                  stroke="var(--color-schools)" 
                  strokeWidth={2}
                  dot={{ stroke: "var(--color-schools)", fill: "white", strokeWidth: 2, r: 4 }}
                  activeDot={{ stroke: "var(--color-schools)", fill: "var(--color-schools)", strokeWidth: 0, r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-6 grid-rows-2">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Schools by country</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} schools`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Distribution by tier</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} schools`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* School List & System Status */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>School Directory</CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" /> View All
              </Button>
            </div>
            <CardDescription>Recently active schools</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schoolsList.map(school => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/superadmin/schools/${school.id}`} className="hover:text-[#1B5B5E] hover:underline">
                        {school.name}
                      </Link>
                    </TableCell>
                    <TableCell>{school.country}</TableCell>
                    <TableCell>{school.students}</TableCell>
                    <TableCell>
                      <Badge variant={school.subscription === "Premium" ? "default" : "outline"} className={
                        school.subscription === "Premium" 
                          ? "bg-[#1B5B5E] hover:bg-[#134345]" 
                          : school.subscription === "Standard"
                            ? "border-[#2A9D8F] text-[#2A9D8F]"
                            : "border-[#E9C46A] text-[#E9C46A]"
                      }>
                        {school.subscription}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                        {school.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Platform operational status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className={
                    alert.type === "warning" ? "text-amber-500 bg-amber-50 p-1.5 rounded-full" :
                    alert.type === "info" ? "text-blue-500 bg-blue-50 p-1.5 rounded-full" :
                    "text-green-500 bg-green-50 p-1.5 rounded-full"
                  }>
                    {alert.type === "warning" ? <AlertTriangle className="h-4 w-4" /> : 
                     alert.type === "info" ? <Bell className="h-4 w-4" /> : 
                     <CheckCircle className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-medium flex items-center">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span> 
                  All Systems Operational
                </p>
                <Button variant="ghost" size="sm" className="text-xs h-8">
                  System Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Upcoming */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-[#1B5B5E]"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm"><span className="font-medium">Lagos Preparatory School</span> added 50 new students</p>
                  <p className="text-xs text-muted-foreground">Today, 10:23 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-[#1B5B5E]"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm"><span className="font-medium">Sunrise Academy</span> registered for Standard plan</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:45 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-[#1B5B5E]"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-border"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm">System maintenance completed</p>
                  <p className="text-xs text-muted-foreground">Apr 24, 2025, 2:00 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-[#1B5B5E]"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm"><span className="font-medium">Nairobi International Academy</span> renewed Premium subscription</p>
                  <p className="text-xs text-muted-foreground">Apr 23, 2025, 9:15 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              View all activity
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-md bg-muted flex flex-col items-center justify-center">
                  <span className="text-xs font-medium">MAY</span>
                  <span className="text-lg font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Admin Training Webinar</h4>
                  <p className="text-xs text-muted-foreground">10:00 AM - 11:30 AM</p>
                  <Badge variant="outline" className="mt-1.5">Online</Badge>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-md bg-muted flex flex-col items-center justify-center">
                  <span className="text-xs font-medium">MAY</span>
                  <span className="text-lg font-bold">15</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Quarterly Platform Review</h4>
                  <p className="text-xs text-muted-foreground">2:00 PM - 4:00 PM</p>
                  <Badge variant="outline" className="mt-1.5">Virtual</Badge>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-md bg-muted flex flex-col items-center justify-center">
                  <span className="text-xs font-medium">JUN</span>
                  <span className="text-lg font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium">New Feature Release</h4>
                  <p className="text-xs text-muted-foreground">Platform update v3.5</p>
                  <Badge variant="outline" className="mt-1.5 bg-green-50 text-green-700 border-green-200">Major Update</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Calendar className="h-4 w-4 mr-2" /> View calendar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
