"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserCog, CreditCard, Calendar, Upload } from "lucide-react";
import Link from "next/link";

type ActionCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color?: string;
};

const ActionCard = ({ title, description, icon, href, color = "#4f46e5" }: ActionCardProps) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <CardHeader className="p-4 pb-0">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}20` }} // Use color with opacity
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-2">
      <CardDescription>{description}</CardDescription>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Link href={href} className="w-full">
        <Button variant="outline" className="w-full text-xs" size="sm">
          <span>Start Now</span>
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

export function QuickActions() {
  // Action cards with different accent colors
  const actions = [
    {
      title: "Add New User",
      description: "Onboard students, teachers or staff",
      icon: <PlusCircle className="w-6 h-6" />,
      href: "/dashboard/add",
      color: "#4f46e5" // Indigo
    },
    {
      title: "Assign Class Teacher",
      description: "Manage class assignments & schedules",
      icon: <UserCog className="w-6 h-6" />,
      href: "/dashboard/academics/classes",
      color: "#0891b2" // Cyan
    },
    {
      title: "Update Payment Record",
      description: "Record & manage student fee payments",
      icon: <CreditCard className="w-6 h-6" />,
      href: "/dashboard/finance/fees",
      color: "#16a34a" // Green
    },
    {
      title: "Import School Data",
      description: "Upload students, teachers and classes",
      icon: <Upload className="w-6 h-6" />,
      href: "/dashboard/admin/data-upload",
      color: "#9333ea" // Purple
    },
    {
      title: "Timetable & Attendance",
      description: "Manage schedules and record attendance",
      icon: <Calendar className="w-6 h-6" />,
      href: "/dashboard/academics/timetable",
      color: "#db2777" // Pink
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
}