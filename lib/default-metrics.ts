import React from "react";
import { Users, Building2, CreditCard, ClipboardCheck, BookOpen, Clipboard, Award, UserCheck } from "lucide-react";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  primaryColor: string;
  secondaryColor: string;
}

// Default metrics for admin dashboard
export const getAdminDefaultMetrics = (): MetricCardProps[] => [
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
];

// Default metrics for teacher dashboard
export const getTeacherDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: <Users className="w-5 h-5" />,
    value: "156",
    label: "Total Students",
    primaryColor: "bg-teal-500",
    secondaryColor: "bg-teal-50"
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    value: "8",
    label: "My Subjects",
    primaryColor: "bg-orange-500",
    secondaryColor: "bg-orange-50"
  },
  {
    icon: <Clipboard className="w-5 h-5" />,
    value: "12",
    label: "Pending Assignments",
    primaryColor: "bg-red-500",
    secondaryColor: "bg-red-50"
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: "94%",
    label: "Average Class Score",
    primaryColor: "bg-green-500",
    secondaryColor: "bg-green-50"
  }
];

// Default metrics for student dashboard
export const getStudentDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: <BookOpen className="w-5 h-5" />,
    value: "8",
    label: "Subjects",
    primaryColor: "bg-blue-500",
    secondaryColor: "bg-blue-50"
  },
  {
    icon: <Clipboard className="w-5 h-5" />,
    value: "5",
    label: "Pending Assignments",
    primaryColor: "bg-orange-500",
    secondaryColor: "bg-orange-50"
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    value: "92%",
    label: "Attendance",
    primaryColor: "bg-green-500",
    secondaryColor: "bg-green-50"
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: "85%",
    label: "Average Grade",
    primaryColor: "bg-purple-500",
    secondaryColor: "bg-purple-50"
  }
];

// Default metrics for parent dashboard
export const getParentDefaultMetrics = (): MetricCardProps[] => [
  {
    icon: <Users className="w-5 h-5" />,
    value: "2",
    label: "Children",
    primaryColor: "bg-blue-500",
    secondaryColor: "bg-blue-50"
  },
  {
    icon: <ClipboardCheck className="w-5 h-5" />,
    value: "94%",
    label: "Average Attendance",
    primaryColor: "bg-green-500",
    secondaryColor: "bg-green-50"
  },
  {
    icon: <Award className="w-5 h-5" />,
    value: "87%",
    label: "Average Grade",
    primaryColor: "bg-purple-500",
    secondaryColor: "bg-purple-50"
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    value: "₦45,000",
    label: "Outstanding Fees",
    primaryColor: "bg-yellow-500",
    secondaryColor: "bg-yellow-50"
  }
];