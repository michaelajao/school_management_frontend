"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  BookOpenCheck,
  DollarSign,
  Megaphone,
  CalendarDays,
  Settings,
  ChevronDown,
  ChevronRight,
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
} from "lucide-react";
import { useState, useEffect } from "react"; // Add hooks
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // Assuming you have Collapsible

// Define navigation items structure
type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[];
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    href: "#", // Parent item, no direct link
    label: "User Management",
    icon: Users,
    subItems: [
      { href: "/dashboard/users/admins", label: "Admins", icon: UserCog },
      { href: "/dashboard/users/teachers", label: "Teachers", icon: UserCheck },
      { href: "/dashboard/users/students", label: "Students", icon: User },
    ],
  },
  {
    href: "#",
    label: "Academic & Class",
    icon: BookOpenCheck,
    subItems: [
      { href: "/dashboard/academics/classes", label: "Classes", icon: BookMarked }, // Added Classes
      { href: "/dashboard/academics/timetable", label: "Timetable", icon: CalendarClock },
      { href: "/dashboard/academics/attendance", label: "Attendance", icon: ClipboardCheck },
      { href: "/dashboard/academics/assignments", label: "Assignments", icon: BookMarked },
    ],
  },
  {
    href: "#",
    label: "Finance & Admin",
    icon: DollarSign,
    subItems: [
      { href: "/dashboard/finance/fees", label: "Fee Management", icon: CreditCard },
      { href: "/dashboard/finance/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    href: "#",
    label: "Communication",
    icon: Megaphone,
    subItems: [
      { href: "/dashboard/communication/announcements", label: "Announcements", icon: Megaphone },
      { href: "/dashboard/communication/notifications", label: "Notifications", icon: Bell },
    ],
  },
  {
    href: "#",
    label: "Events & Scheduling",
    icon: CalendarDays,
    subItems: [
      { href: "/dashboard/events/upcoming", label: "Upcoming Events", icon: CalendarDays },
      { href: "/dashboard/events/create", label: "Create Event", icon: CalendarPlus },
    ],
  },
  {
    href: "#",
    label: "Settings",
    icon: Settings,
    subItems: [
      { href: "/dashboard/settings/system", label: "System Preferences", icon: Cog },
      { href: "/dashboard/settings/security", label: "Security", icon: ShieldCheck },
    ],
  },
];

// Helper component for individual navigation links
const NavLink = ({ item, isSubItem = false }: { item: NavItem; isSubItem?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <Link href={item.href} className="w-full"> {/* Removed legacyBehavior and passHref */}
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start",
          isSubItem ? "pl-10 pr-2 h-9" : "pl-4 pr-2 h-10" // Indent sub-items
        )}
      >
        <item.icon className={cn("mr-2", isSubItem ? "h-4 w-4" : "h-5 w-5")} />
        {item.label}
      </Button>
    </Link>
  );
};

// Helper component for collapsible navigation groups
const NavGroup = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  // Determine if any sub-item is active to keep the group open/highlighted
  const isGroupActive = item.subItems?.some(sub => pathname.startsWith(sub.href));
  const [isOpen, setIsOpen] = useState(isGroupActive); // Default open if active

  if (!item.subItems || item.subItems.length === 0) {
    return <NavLink item={item} />;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant={isGroupActive ? "secondary" : "ghost"}
          className="w-full justify-between pl-4 pr-2 h-10"
        >
          <div className="flex items-center">
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </div>
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-1 space-y-1">
        {item.subItems.map((subItem) => (
          <NavLink key={subItem.href} item={subItem} isSubItem={true} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export function AppSidebar() {
  // School branding state
  const [primaryColor, setPrimaryColor] = useState("#1B5B5E");
  const [schoolLogo, setSchoolLogo] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState("Your School");

  useEffect(() => {
    // Load school config from localStorage (set during onboarding)
    try {
      const configStr = localStorage.getItem("schoolConfig");
      if (configStr) {
        const config = JSON.parse(configStr);
        if (config.primaryColor) setPrimaryColor(config.primaryColor);
        if (config.logoUrl) setSchoolLogo(config.logoUrl);
        if (config.schoolName) setSchoolName(config.schoolName);
      }
    } catch (e) {
      console.error("Failed to load school config", e);
    }
  }, []);

  return (
    <aside
      className="block w-64 border-r p-4 fixed top-0 left-0 h-full pt-16"
      style={{ borderColor: primaryColor }}
    >
      {/* School branding */}
      <div className="flex items-center mb-6">
        <div
          className="w-10 h-10 rounded-full overflow-hidden bg-gray-100"
          style={{ border: `2px solid ${primaryColor}` }}
        >
          {schoolLogo ? (
            <img
              src={schoolLogo}
              alt="School Logo"
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>
        <span
          className="ml-3 text-lg font-bold"
          style={{ color: primaryColor }} // School name in primary color
        >
          {schoolName}
        </span>
      </div>
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) =>
          item.subItems ? <NavGroup key={item.label} item={item} /> : <NavLink key={item.href} item={item} />
        )}
      </nav>
    </aside>
  );
}

// Optional: Mobile Sidebar using Sheet component (if needed)
// You might need to adapt this based on your Sheet implementation
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileSidebar() {
   return (
     <Sheet>
       <SheetTrigger asChild>
         <Button variant="ghost" size="icon" className="lg:hidden">
           <Menu className="h-6 w-6" />
           <span className="sr-only">Toggle Menu</span>
         </Button>
       </SheetTrigger>
       <SheetContent side="left" className="w-64 p-4 pt-16"> {/* Adjust pt */}
         <nav className="flex flex-col space-y-1">
           {navItems.map((item) => (
             item.subItems ? <NavGroup key={item.label} item={item} /> : <NavLink key={item.href} item={item} />
           ))}
         </nav>
       </SheetContent>
     </Sheet>
   );
}
