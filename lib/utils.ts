import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Icons
import {
  LayoutDashboard,
  Users,
  BookOpenCheck,
  DollarSign,
  Megaphone,
  CalendarDays,
  Settings,
  UserCog,
  UserCheck,
  User,
  CalendarClock,
  ClipboardCheck,
  BookMarked,
  CreditCard,
  FileText,
  Bell,
  CalendarPlus,
  Cog,
  ShieldCheck,
  CircleUser,
  HandCoins,
  BookText,
  LineChart,
  ListChecks
} from "lucide-react";

export type UserRole = 'student' | 'staff' | 'admin' | 'superadmin' | 'parent';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inviteLinks: Record<string, UserRole> = {
  'abc123xyz': 'student',
  'def456uvw': 'staff',
  'ghi789rst': 'admin',
};

// --- Navigation Types
// href  -> Route to the new page on click
// label -> Title of the item asssociated with the href (route)
// icon  -> Icon associated with the NavItem type
export type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

// --- Navigation Section
// label -> Title of the Section
// iconn -> Icon associated with the section
// items -> An array of NavItems for the section
export type NavSection = {
  label: string;
  icon: React.ElementType; // <--- ADDED HERE
  items: NavItem[];
};

// --- Common Sections (Everyone sees these regardless of role)
const commonSections: NavSection[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Academics",
    icon: BookOpenCheck,
    items: [
      { href: "/dashboard/academics/classes", label: "Classes", icon: BookMarked },
      { href: "/dashboard/academics/timetable", label: "Timetable", icon: CalendarClock },
      { href: "/dashboard/academics/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/dashboard/academics/assignments", label: "Assignments", icon: BookMarked },
    ],
  },
  {
    label: "Communication",
    icon: Megaphone,
    items: [
      { href: "/dashboard/communication/announcements", label: "Announcements", icon: Megaphone },
      { href: "/dashboard/communication/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Events & Scheduling",
    icon: CalendarDays,
    items: [
      { href: "/dashboard/events/upcoming", label: "Upcoming Events", icon: CalendarDays },
      { href: "/dashboard/events/create", label: "Create Event", icon: CalendarPlus },
    ],
  },
];

// --- Super Admin Specific Sections
const superAdminSections: NavSection[] = [
  {
    label: "User Management",
    icon: Users,
    items: [
      { href: "/dashboard/users/admins", label: "Admins", icon: UserCog },
      { href: "/dashboard/users/staff", label: "Staff", icon: UserCheck },
      { href: "/dashboard/users/students", label: "Students", icon: User },
      { href: "/dashboard/users/parents", label: "Parents", icon: CircleUser },
    ],
  },
  {
    label: "Finance & Admin",
    icon: DollarSign,
    items: [
      { href: "/dashboard/finance/fees", label: "Fee Management", icon: CreditCard },
      { href: "/dashboard/finance/reports", label: "Finance Reports", icon: FileText },
    ],
  },
  {
    label: "Reports & Analytics",
    icon: LineChart,
    items: [
      { href: "/dashboard/reports/academic", label: "Academic Reports", icon: BookMarked },
      { href: "/dashboard/reports/performance", label: "Performance Analytics", icon: CalendarClock },
      { href: "/dashboard/reports/predictive", label: "Predictive Analytics", icon: ShieldCheck },
    ],
  },
  {
    label: "Results",
    icon: BookText,
    items: [
      { href: "/dashboard/results/check", label: "Check Results", icon: BookText },
      { href: "/dashboard/results/download", label: "Download Results", icon: FileText },
    ],
  },
  {
    label: "Audit Logs",
    icon: ListChecks,
    items: [
      { href: "/dashboard/audit/logs", label: "System Logs", icon: ListChecks },
    ],
  },
];

// --- Admin Specific Sections
const adminSections: NavSection[] = [
  {
    label: "User Management",
    icon: Users,
    items: [
      { href: "/dashboard/users/staff", label: "Staff", icon: UserCheck },
      { href: "/dashboard/users/students", label: "Students", icon: User },
      { href: "/dashboard/users/parents", label: "Parents", icon: CircleUser },
    ],
  },
  {
    label: "Finance",
    icon: DollarSign,
    items: [
      { href: "/dashboard/finance/fees", label: "Fee Management", icon: CreditCard },
    ],
  },
];

// --- staff Specific Sections
const staffSections: NavSection[] = [
  {
    label: "My Classes",
    icon: BookOpenCheck,
    items: [
      { href: "/dashboard/academics/my-classes", label: "My Classes", icon: BookMarked },
      { href: "/dashboard/academics/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/dashboard/academics/assignments", label: "Assignments", icon: BookMarked },
    ],
  },
];

// --- Student Specific Sections
const studentSections: NavSection[] = [
  {
    label: "My Learning",
    icon: BookOpenCheck,
    items: [
      { href: "/dashboard/classes", label: "Classes", icon: BookMarked },
      { href: "/dashboard/assignments", label: "Assignments", icon: BookMarked },
      { href: "/dashboard/attendance", label: "Attendance", icon: CalendarClock },
      { href: "/dashboard/results", label: "Results", icon: BookText },
    ],
  },
];

// --- Parent Specific Sections
const parentSections: NavSection[] = [
  {
    label: "My Children",
    icon: Users,
    items: [
      { href: "/dashboard/children", label: "View Children", icon: User },
      { href: "/dashboard/children/attendance", label: "Attendance", icon: CalendarClock },
      { href: "/dashboard/children/results", label: "Results", icon: BookText },
    ],
  },
];

// --- Dynamic Settings Section
const getSettingsSection = (role: UserRole): NavSection => {
  // Get NavItems for the 'Settings' section depending on the role.
  // All users have a settings section but the items may differ
  switch (role) {
    case 'superadmin':
      return {
        label: "Settings",
        icon: Settings,
        items: [
          { href: "/dashboard/settings/system", label: "System Preferences", icon: Cog },
          { href: "/dashboard/settings/security", label: "Security", icon: ShieldCheck },
          { href: "/dashboard/settings/permissions", label: "Permission Management", icon: HandCoins },
        ],
      };
    case 'admin':
      return {
        label: "Settings",
        icon: Settings,
        items: [
          { href: "/dashboard/settings/profile", label: "Profile Settings", icon: Cog },
          { href: "/dashboard/settings/permissions", label: "Permission Management", icon: HandCoins },
        ],
      };
    case 'staff':
      return {
        label: "Settings",
        icon: Settings,
        items: [
          { href: "/dashboard/settings/profile", label: "Profile Settings", icon: Cog },
          { href: "/dashboard/settings/class-settings", label: "Class Settings", icon: BookOpenCheck },
        ],
      };
    case 'student':
    case 'parent':
      return {
        label: "Settings",
        icon: Settings,
        items: [
          { href: "/dashboard/settings/profile", label: "Profile Settings", icon: Cog },
        ],
      };
    default:
      return {
        label: "Settings",
        icon: Settings,
        items: [],
      };
  }
};

// --- FINAL: Get Full Nav Structure for a Role
// Return the common and role-specific options in an array
// Ordered so the common sections appear first, followed by the role-specific sections and lastly the settings section
export const getNavSectionsForRole = (role: UserRole): NavSection[] => {
  switch (role) {
    case "superadmin":
      return [...commonSections, ...superAdminSections, getSettingsSection(role)];
    case "admin":
      return [...commonSections, ...adminSections, getSettingsSection(role)];
    case "staff":
      return [...commonSections, ...staffSections, getSettingsSection(role)];
    case "student":
      return [...commonSections, ...studentSections, getSettingsSection(role)];
    case "parent":
      return [...commonSections, ...parentSections, getSettingsSection(role)];
    default:
      return [...commonSections, getSettingsSection(role)];
  }
};
