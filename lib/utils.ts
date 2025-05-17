import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Icons
import {
  LayoutDashboard,
  UserPlus,
  FolderKanban,
  PencilRuler,
  BookMinus,
  CalendarDays,
  FolderOpen,
  MessageSquareMore,
  BookOpen,
  UserCog,
  LogOut,
} from "lucide-react";
import React from "react";

export type UserRole = 'student' | 'staff' | 'admin' | 'superadmin' | 'parent';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inviteLinks: Record<string, UserRole> = {
  'abc123xyz': 'student',
  'def456uvw': 'staff',
  'ghi789rst': 'admin',
};



// --- Sidebar Refactor:
export type SideBarType = {
  href: string;
  label: string;
  icon: React.ElementType;
}

// -- Universal Sections
export const sideBarSettings: SideBarType[] = [
  {
    href: '/settings',
    label: 'Settings & Configuration',
    icon: UserCog 
  },
  {
    href: '/logout',
    label: 'Logout',
    icon: LogOut
  }

]

// --- Admin 
export const adminSideBar: SideBarType[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/dashboard/users/parents',
    label: 'Parent Management',
    icon: UserPlus 
  },
  {
    href: '/dashboard/users/students',
    label: 'Student Management',
    icon: FolderKanban
  },
  {
    href: '/dashboard/users/staff',
    label: 'Staff Management',
    icon: PencilRuler
  },
  {
    href: '/dashboard/academics/classes',
    label: 'Academic Management',
    icon: BookMinus 
  },
  {
    href: '/dashboard/timetable-and-attendance',
    label: 'Timetable & Attendance',
    icon:  CalendarDays,
  },
  {
    href: '/dashboard/finance',
    label: 'Finance & Fee Management',
    icon: FolderOpen 
  },
  {
    href: '/dashboard/communication',
    label: 'Communications',
    icon: MessageSquareMore 
  },
  {
    href: '/dashboard/reports',
    label: 'Reports & Analysis',
    icon: BookOpen 
  },
];

// Add the rest sidebars here
// --- Students 
// --- Staff 
// --- Teachers 
// --- Parents


export type Student = {
  name: string;
  class: string;
  studentId: string;
  outstandingFees: number;
};

export type Parent = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: 'active' | 'pending';
  gender: string;
  address: string;
  relationship: string;
  occupation: string;
  lastLogin: string | null;
  linkedStudents: Student[];
};

export type ParentGroup = {
  active: Parent[];
  pending: Parent[];
};


export function getParents(parents: Parent[]): ParentGroup {
  return parents.reduce(
    (acc: ParentGroup, parent) => {
      if (parent.status === 'active') {
        acc.active.push(parent);
      } else if (parent.status === 'pending') {
        acc.pending.push(parent);
      }
      return acc;
    },
    { active: [], pending: [] }
  );
}

export function formatDateTime(isoString: string): string {
  /*

  USAGE: 
    const formatted = formatDateTime("2025-05-01T08:15:00Z");
    console.log(formatted); // "May 1, 2025 - 8:15 AM"
  */
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = date.toLocaleString('en-US', options);

  return formatted.replace(',', ' -');
}
