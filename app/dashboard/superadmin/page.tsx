"use client";

import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts";
import { Users, School, DollarSign, CheckCircle, Bell, Calendar, PlusCircle } from "lucide-react";

// Mock Data (Replace with actual API data)
const chartData = [
  { month: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { month: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
};

const attendanceData = [
  { date: "Mon", present: 90, absent: 10 },
  { date: "Tue", present: 95, absent: 5 },
  { date: "Wed", present: 88, absent: 12 },
  { date: "Thu", present: 92, absent: 8 },
  { date: "Fri", present: 96, absent: 4 },
];

const attendanceConfig = {
  present: { label: "Present", color: "hsl(var(--chart-2))" },
  absent: { label: "Absent", color: "hsl(var(--chart-5))" },
};

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
  const totalStaff = 850;
  const pendingApprovals = 5;
  const feesCollected = 125000;

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's your platform overview for today.</p>
      </section>

      {/* Key Metrics */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchools}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
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
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
             <p className="text-xs text-muted-foreground">+10 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fees Collected (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${feesCollected.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
             <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions & Analytics */}
      <section className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common tasks quickly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New School</Button>
            <Button variant="outline"><Users className="mr-2 h-4 w-4" /> Manage Users</Button>
            <Button variant="outline"><DollarSign className="mr-2 h-4 w-4" /> View Financial Reports</Button>
             <Button variant="outline"><Bell className="mr-2 h-4 w-4" /> Send Announcement</Button>
          </CardContent>
        </Card>

        {/* Analytics Charts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Platform Revenue Overview</CardTitle>
             <CardDescription>Monthly revenue trend</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="h-[250px] w-full">
               <BarChart accessibilityLayer data={chartData}>
                 <CartesianGrid vertical={false} />
                 <XAxis
                   dataKey="month"
                   tickLine={false}
                   tickMargin={10}
                   axisLine={false}
                   tickFormatter={(value) => value.slice(0, 3)}
                 />
                 <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                 <ChartTooltip
                   cursor={false}
                   content={<ChartTooltipContent hideLabel />}
                 />
                 <Bar dataKey="total" fill="var(--color-total)" radius={8} />
               </BarChart>
             </ChartContainer>
          </CardContent>
        </Card>
      </section>

       {/* More Analytics */}
       <section className="grid gap-6 md:grid-cols-2">
           <Card>
             <CardHeader>
               <CardTitle>Overall Attendance Trend (Last Week)</CardTitle>
               <CardDescription>Across all schools</CardDescription>
             </CardHeader>
             <CardContent>
               <ChartContainer config={attendanceConfig} className="h-[200px] w-full">
                 <LineChart
                   data={attendanceData}
                   margin={{ left: 12, right: 12 }}
                 >
                   <CartesianGrid vertical={false} />
                   <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                   <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                   <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                   <Line dataKey="present" type="monotone" stroke="var(--color-present)" strokeWidth={2} dot={false} />
                   <Line dataKey="absent" type="monotone" stroke="var(--color-absent)" strokeWidth={2} dot={false} />
                 </LineChart>
               </ChartContainer>
             </CardContent>
           </Card>
           {/* Placeholder for another chart or info */}
           <Card>
             <CardHeader>
               <CardTitle>System Health</CardTitle>
                <CardDescription>Current operational status</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col items-center justify-center h-[200px]">
                <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
                <p className="text-lg font-medium">All Systems Operational</p>
                <p className="text-sm text-muted-foreground">No issues reported.</p>
             </CardContent>
           </Card>
       </section>

      {/* Announcements & Events */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Announcements</CardTitle>
             <Button variant="link" className="text-xs -mt-1 -mr-2 float-right">View All</Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Bell className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span><span className="font-medium">New Feature Update:</span> Enhanced reporting module now live.</span>
              </li>
              <li className="flex items-start gap-2">
                 <Bell className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span><span className="font-medium">Maintenance Notice:</span> Scheduled downtime on Sunday 2 AM GMT.</span>
              </li>
               <li className="flex items-start gap-2">
                 <Bell className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span><span className="font-medium">Tip:</span> Remember to backup school data regularly via Settings.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
             <Button variant="link" className="text-xs -mt-1 -mr-2 float-right">View Calendar</Button>
          </CardHeader>
          <CardContent>
             <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><span className="font-medium">May 1st:</span> Webinar: Maximizing Parent Engagement.</span>
              </li>
              <li className="flex items-start gap-2">
                 <Calendar className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><span className="font-medium">May 15th:</span> Q2 Admin Training Session.</span>
              </li>
               <li className="flex items-start gap-2">
                 <Calendar className="h-4 w-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span><span className="font-medium">June 1st:</span> Platform V3 Feature Preview.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
