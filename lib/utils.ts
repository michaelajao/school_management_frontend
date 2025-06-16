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

export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inviteLinks: Record<string, UserRole> = {
  'abc123xyz': 'student',
  'def456uvw': 'teacher',
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
    href: '/admin/settings',
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
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    href: '/admin/manage/parents',
    label: 'Parent Management',
    icon: UserPlus 
  },
  {
    href: '/admin/manage/students',
    label: 'Student Management',
    icon: FolderKanban
  },
  {
    href: '/admin/manage/staff',
    label: 'Staff Management',
    icon: PencilRuler
  },
  {
    href: '/admin/manage/academics/classes',
    label: 'Academic Management',
    icon: BookMinus 
  },
  {
    href: '/admin/manage/timetable-and-attendace',
    label: 'Timetable & Attendance',
    icon:  CalendarDays,
  },
  {
    href: '/admin/finance',
    label: 'Finance & Fee Management',
    icon: FolderOpen 
  },
  {
    href: '/admin/communications',
    label: 'Communications',
    icon: MessageSquareMore 
  },
  {
    href: '/admin/reports',
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

export type Class = {
  id: string;
  class: string;
  teacher: string;
  assistant: string;
  count: number;
  type: string;
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
