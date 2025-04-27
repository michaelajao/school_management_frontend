"use client";

import { useAuth } from "@/contexts/auth-context";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { EventsAndAnnouncements } from "@/components/dashboard/EventsAndAnnouncements";
import { FinanceSummary } from "@/components/dashboard/FinanceSummary";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { PlusCircle, Settings, Users, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("Good day");
  
  // Set appropriate greeting based on time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good morning");
    else if (currentHour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  // Show admin-specific dashboard links
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {greeting}, {user?.name || "Admin"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your school today.
        </p>
      </section>

      {/* Admin Navigation Shortcuts (Only for admins) */}
      {isAdmin && (
        <section className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Admin Controls</CardTitle>
              <CardDescription>Quick access to administrative functions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard/admin">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" /> Admin Dashboard
                  </Button>
                </Link>
                <Link href="/dashboard/admin?tab=users">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> User Management
                  </Button>
                </Link>
                <Link href="/dashboard/admin?tab=classes">
                  <Button variant="outline" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> Class Management
                  </Button>
                </Link>
                <Link href="/dashboard/admin?tab=academics">
                  <Button variant="outline" className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" /> Academic Management
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Key Metrics */}
      <section className="space-y-2">
        <DashboardMetrics />
      </section>

      {/* Quick Actions */}
      <section className="space-y-2 pt-4">
        <QuickActions />
      </section>

      {/* Communication & Events */}
      <section className="space-y-2 pt-4">
        <EventsAndAnnouncements />
      </section>

      {/* Finance Summary */}
      <section className="space-y-2 pt-4">
        <FinanceSummary />
      </section>

      {/* Analytics Dashboard */}
      <section className="space-y-2 pt-4">
        <AnalyticsDashboard />
      </section>
    </div>
  );
}
