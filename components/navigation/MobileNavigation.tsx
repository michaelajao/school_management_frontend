"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { usePWA } from "@/components/providers/PWAProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  X,
  Home,
  Users,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  MessageSquare,
  Settings,
  Bell,
  Download,
  Wifi,
  WifiOff,
  RefreshCw,
  LogOut,
  User,
  FileText,
  BarChart3,
  Calendar,
  Award,
  ChevronRight,
  Smartphone
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
  children?: NavigationItem[];
  roles?: string[];
}

const getNavigationItems = (userRole: string): NavigationItem[] => {
  const baseItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/dashboard',
      roles: ['super_admin', 'school_admin', 'assistant_admin', 'class_teacher', 'subject_teacher', 'student', 'parent'],
    },
  ];

  // Role-specific navigation items
  const roleSpecificItems: Record<string, NavigationItem[]> = {
    school_admin: [
      {
        id: 'manage',
        label: 'Management',
        icon: Users,
        href: '/admin/manage',
        children: [
          { id: 'students', label: 'Students', icon: GraduationCap, href: '/admin/manage/students' },
          { id: 'staff', label: 'Staff', icon: Users, href: '/admin/manage/staff' },
          { id: 'parents', label: 'Parents', icon: User, href: '/admin/manage/parents' },
          { id: 'classes', label: 'Classes', icon: BookOpen, href: '/admin/manage/academics/classes' },
        ]
      },
      {
        id: 'communications',
        label: 'Communications',
        icon: MessageSquare,
        href: '/admin/communications',
        children: [
          { id: 'announcements', label: 'Announcements', icon: Bell, href: '/admin/communications/announcement' },
          { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/admin/communications/message' },
        ]
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: BarChart3,
        href: '/admin/reports',
      },
    ],
    assistant_admin: [
      {
        id: 'students',
        label: 'Students',
        icon: GraduationCap,
        href: '/admin/manage/students',
      },
      {
        id: 'parents',
        label: 'Parents',
        icon: Users,
        href: '/admin/manage/parents',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        href: '/dashboard/attendance',
      },
    ],
    class_teacher: [
      {
        id: 'students',
        label: 'My Students',
        icon: GraduationCap,
        href: '/dashboard/students',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        href: '/dashboard/attendance',
      },
      {
        id: 'grades',
        label: 'Grades',
        icon: Award,
        href: '/dashboard/grades',
      },
      {
        id: 'schedule',
        label: 'Schedule',
        icon: Calendar,
        href: '/dashboard/schedule',
      },
    ],
    subject_teacher: [
      {
        id: 'classes',
        label: 'My Classes',
        icon: BookOpen,
        href: '/dashboard/classes',
      },
      {
        id: 'grades',
        label: 'Grades',
        icon: Award,
        href: '/dashboard/grades',
      },
      {
        id: 'assignments',
        label: 'Assignments',
        icon: FileText,
        href: '/dashboard/assignments',
      },
    ],
    student: [
      {
        id: 'grades',
        label: 'My Grades',
        icon: Award,
        href: '/dashboard/grades',
      },
      {
        id: 'assignments',
        label: 'Assignments',
        icon: FileText,
        href: '/dashboard/assignments',
      },
      {
        id: 'schedule',
        label: 'Schedule',
        icon: Calendar,
        href: '/dashboard/schedule',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        href: '/dashboard/attendance',
      },
    ],
    parent: [
      {
        id: 'children',
        label: 'My Children',
        icon: Users,
        href: '/dashboard/children',
      },
      {
        id: 'grades',
        label: 'Grades',
        icon: Award,
        href: '/dashboard/grades',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        href: '/dashboard/attendance',
      },
      {
        id: 'communications',
        label: 'Messages',
        icon: MessageSquare,
        href: '/dashboard/messages',
      },
    ],
  };

  return [
    ...baseItems,
    ...(roleSpecificItems[userRole] || []),
  ];
};

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { user, logout } = useAuth();
  const { isOnline, syncStatus, isInstallable, promptInstall, triggerSync } = usePWA();
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = user ? getNavigationItems(user.role) : [];

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [pathname]);

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const handleInstallApp = async () => {
    await promptInstall();
    setIsOpen(false);
  };

  const handleSync = async () => {
    await triggerSync();
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = isActiveRoute(item.href);
    const IconComponent = item.icon;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3 h-12 text-left font-normal",
            level > 0 && "ml-4 w-[calc(100%-1rem)]",
            isActive && "bg-[#1B5B5E] text-white hover:bg-[#134345]"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              handleNavigation(item.href);
            }
          }}
        >
          <IconComponent className="h-5 w-5 flex-shrink-0" />
          <span className="flex-1 text-sm">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronRight 
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )} 
            />
          )}
        </Button>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile Navigation Trigger */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Menu className="h-6 w-6" />
              {syncStatus.unsyncedCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {syncStatus.unsyncedCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-80 p-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <SheetHeader className="p-6 pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={(user as any).profilePicture} />
                    <AvatarFallback className="bg-[#1B5B5E] text-white">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-left text-base font-semibold">
                      {user.name}
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground capitalize">
                      {user.role.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </SheetHeader>

              {/* Status Bar */}
              <div className="px-6 py-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isOnline ? (
                      <Wifi className="h-4 w-4 text-green-600" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-xs font-medium">
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {syncStatus.unsyncedCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {syncStatus.unsyncedCount} pending
                      </Badge>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2"
                      onClick={handleSync}
                      disabled={syncStatus.syncInProgress}
                    >
                      <RefreshCw 
                        className={cn(
                          "h-3 w-3",
                          syncStatus.syncInProgress && "animate-spin"
                        )} 
                      />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="space-y-1">
                  {navigationItems.map((item) => renderNavigationItem(item))}
                </nav>

                <Separator className="my-6" />

                {/* PWA Actions */}
                <div className="space-y-1">
                  {isInstallable && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12"
                      onClick={handleInstallApp}
                    >
                      <Smartphone className="h-5 w-5" />
                      <span className="text-sm">Install App</span>
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => handleNavigation('/dashboard/settings')}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="text-sm">Settings</span>
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm">Sign Out</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Bottom Navigation for Mobile (Alternative/Additional option) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.slice(0, 4).map((item) => {
            const IconComponent = item.icon;
            const isActive = isActiveRoute(item.href);
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "h-full rounded-none flex-col gap-1 p-1",
                  isActive && "text-[#1B5B5E] bg-[#1B5B5E]/10"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant="secondary" 
                    className="absolute top-1 right-1 h-4 w-4 rounded-full p-0 text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}