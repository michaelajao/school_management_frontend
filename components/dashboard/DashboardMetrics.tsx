// CONSOLIDATED: Use shared DashboardMetrics component
// This file consolidates dashboard metrics functionality

"use client";

import { DashboardMetrics as SharedDashboardMetrics } from "@/components/shared/DashboardMetrics";
import { Users, Building2, CreditCard, ClipboardCheck } from "lucide-react";

// Default dashboard metrics for admin overview
export function DashboardMetrics() {
  const defaultMetrics = [
    {
      icon: <Users className="w-5 h-5" />,
      value: "1,250",
      label: "Total Students",
      primaryColor: "bg-blue-500",
      secondaryColor: "bg-blue-50"
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      value: "45",
      label: "Classes",
      primaryColor: "bg-green-500", 
      secondaryColor: "bg-green-50"
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      value: "89%",
      label: "Attendance",
      primaryColor: "bg-purple-500",
      secondaryColor: "bg-purple-50"
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      value: "₦2.4M",
      label: "Revenue",
      primaryColor: "bg-yellow-500",
      secondaryColor: "bg-yellow-50"
    }
  
  return <SharedDashboardMetrics metrics={defaultMetrics} />;
}