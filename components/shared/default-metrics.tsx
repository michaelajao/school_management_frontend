import React from "react";
import { Users, Building2, CreditCard, ClipboardCheck, BookOpen, Clipboard, Award, UserCheck } from "lucide-react";
import { MetricCardProps } from "./MetricCard";

// Default metrics for admin dashboard
export const getAdminDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: Users,
    value: "1,250",
    label: "Total Students",
    primaryColor: "#3B82F6",
    secondaryColor: "#EFF6FF"
  },
  {
    icon: Building2,
    value: "45",
    label: "Classes",
    primaryColor: "#10B981", 
    secondaryColor: "#F0FDF4"
  },
  {
    icon: ClipboardCheck,
    value: "89%",
    label: "Attendance",
    primaryColor: "#8B5CF6",
    secondaryColor: "#FAF5FF"
  },
  {
    icon: CreditCard,
    value: "₦2.4M",
    label: "Revenue",
    primaryColor: "#F59E0B",
    secondaryColor: "#FFFBEB"
  }
];

// Default metrics for teacher dashboard
export const getTeacherDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: Users,
    value: "156",
    label: "Total Students",
    primaryColor: "#14B8A6",
    secondaryColor: "#F0FDFA"
  },
  {
    icon: BookOpen,
    value: "8",
    label: "My Subjects",
    primaryColor: "#F97316",
    secondaryColor: "#FFF7ED"
  },
  {
    icon: Clipboard,
    value: "12",
    label: "Pending Assignments",
    primaryColor: "#EF4444",
    secondaryColor: "#FEF2F2"
  },
  {
    icon: Award,
    value: "94%",
    label: "Average Class Score",
    primaryColor: "#10B981",
    secondaryColor: "#F0FDF4"
  }
];

// Default metrics for student dashboard
export const getStudentDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: BookOpen,
    value: "8",
    label: "Subjects",
    primaryColor: "#3B82F6",
    secondaryColor: "#EFF6FF"
  },
  {
    icon: Clipboard,
    value: "5",
    label: "Pending Assignments",
    primaryColor: "#F97316",
    secondaryColor: "#FFF7ED"
  },
  {
    icon: UserCheck,
    value: "92%",
    label: "Attendance",
    primaryColor: "#10B981",
    secondaryColor: "#F0FDF4"
  },
  {
    icon: Award,
    value: "85%",
    label: "Average Grade",
    primaryColor: "#8B5CF6",
    secondaryColor: "#FAF5FF"
  }
];

// Default metrics for parent dashboard
export const getParentDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: Users,
    value: "2",
    label: "Children",
    primaryColor: "#3B82F6",
    secondaryColor: "#EFF6FF"
  },
  {
    icon: ClipboardCheck,
    value: "94%",
    label: "Average Attendance",
    primaryColor: "#10B981",
    secondaryColor: "#F0FDF4"
  },
  {
    icon: Award,
    value: "87%",
    label: "Average Grade",
    primaryColor: "#8B5CF6",
    secondaryColor: "#FAF5FF"
  },
  {
    icon: CreditCard,
    value: "₦45,000",
    label: "Outstanding Fees",
    primaryColor: "#F59E0B",
    secondaryColor: "#FFFBEB"
  }
];
