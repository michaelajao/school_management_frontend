"use client";

import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  // Check if user is admin
  if (user?.role !== "admin") {
    redirect("/dashboard");
  }

  const features = [
    {
      title: "Student Management",
      description: "Register and manage student records",
      icon: "👨‍🎓",
      link: "/dashboard/admin/students"
    },
    {
      title: "Teacher Management",
      description: "Manage teacher records and assignments",
      icon: "👨‍🏫",
      link: "/dashboard/admin/teachers"
    },
    {
      title: "Class Management",
      description: "Organize classes and schedules",
      icon: "📚",
      link: "/dashboard/admin/classes"
    },
    {
      title: "Reports",
      description: "Access and generate reports",
      icon: "📊",
      link: "/dashboard/admin/reports"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.name}! Manage your school from here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <Link href={feature.link} key={feature.title}>
            <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-medium text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{feature.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
