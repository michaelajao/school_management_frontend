"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { usePWA } from "@/components/providers/PWAProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Plus,
  ClipboardCheck,
  BookOpen,
  Users,
  MessageSquare,
  FileText,
  Award,
  Calendar,
  BarChart3,
  Settings,
  Search,
  Bell,
  Download,
  Upload,
  Scan,
  Camera,
  Phone,
  Mail,
  Share,
  Bookmark,
  Filter,
  ArrowUpDown,
  Zap
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  category: 'primary' | 'secondary' | 'utility';
  href?: string;
  action?: () => void;
  badge?: string;
  description?: string;
  roles?: string[];
}

interface QuickActionsProps {
  userRole?: string;
  className?: string;
}

export default function QuickActions({ userRole = 'student', className }: QuickActionsProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { isOnline, syncStatus } = usePWA();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'primary' | 'secondary' | 'utility'>('all');

  // Define all possible actions based on user role
  const allActions: QuickAction[] = [
    // Primary Actions - Most commonly used
    {
      id: 'mark-attendance',
      label: 'Mark Attendance',
      icon: ClipboardCheck,
      color: 'bg-green-500',
      category: 'primary',
      href: '/attendance',
      description: 'Mark student attendance for today',
      roles: ['teacher', 'admin']
    },
    {
      id: 'view-grades',
      label: 'View Grades',
      icon: BookOpen,
      color: 'bg-blue-500',
      category: 'primary',
      href: '/gradebook',
      description: 'View and manage student grades',
      roles: ['teacher', 'student', 'parent', 'admin']
    },
    {
      id: 'students',
      label: 'Students',
      icon: Users,
      color: 'bg-purple-500',
      category: 'primary',
      href: '/students',
      description: 'Manage student profiles and information',
      roles: ['teacher', 'admin']
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      color: 'bg-orange-500',
      category: 'primary',
      href: '/messages',
      description: 'Send and receive messages',
      roles: ['teacher', 'student', 'parent', 'admin']
    },

    // Secondary Actions - Frequently used
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      color: 'bg-indigo-500',
      category: 'secondary',
      href: '/reports',
      description: 'Generate and export reports',
      roles: ['teacher', 'admin']
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'bg-teal-500',
      category: 'secondary',
      href: '/analytics',
      description: 'View performance analytics',
      roles: ['teacher', 'admin']
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      color: 'bg-pink-500',
      category: 'secondary',
      href: '/schedule',
      description: 'View class schedule and timetable',
      roles: ['teacher', 'student', 'parent']
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      color: 'bg-yellow-500',
      category: 'secondary',
      href: '/achievements',
      description: 'View student achievements and awards',
      roles: ['teacher', 'student', 'parent', 'admin']
    },

    // Utility Actions - Less frequent but useful
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      color: 'bg-gray-500',
      category: 'utility',
      action: () => {
        // Trigger search functionality
        document.querySelector<HTMLInputElement>('input[type="search"]')?.focus();
      },
      description: 'Search across the system'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      color: 'bg-red-500',
      category: 'utility',
      href: '/notifications',
      badge: '3',
      description: 'View your notifications',
      roles: ['teacher', 'student', 'parent', 'admin']
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: Download,
      color: 'bg-emerald-500',
      category: 'utility',
      href: '/export',
      description: 'Export data to various formats',
      roles: ['teacher', 'admin']
    },
    {
      id: 'import',
      label: 'Import Data',
      icon: Upload,
      color: 'bg-violet-500',
      category: 'utility',
      href: '/import',
      description: 'Import data from external sources',
      roles: ['admin']
    },
    {
      id: 'scan-qr',
      label: 'Scan QR',
      icon: Scan,
      color: 'bg-cyan-500',
      category: 'utility',
      action: () => {
        // Trigger QR scanner
        if ('mediaDevices' in navigator) {
          // QR scanning logic would go here
          alert('QR Scanner would open here');
        }
      },
      description: 'Scan QR codes for quick actions'
    },
    {
      id: 'take-photo',
      label: 'Take Photo',
      icon: Camera,
      color: 'bg-rose-500',
      category: 'utility',
      action: () => {
        // Trigger camera
        if ('mediaDevices' in navigator) {
          alert('Camera would open here');
        }
      },
      description: 'Take photos for documentation'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Phone,
      color: 'bg-lime-500',
      category: 'utility',
      href: '/contact',
      description: 'Contact school administration'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'bg-sky-500',
      category: 'utility',
      action: () => {
        window.location.href = 'mailto:admin@school.com';
      },
      description: 'Send email to school'
    },
    {
      id: 'share',
      label: 'Share',
      icon: Share,
      color: 'bg-amber-500',
      category: 'utility',
      action: () => {
        if (navigator.share) {
          navigator.share({
            title: 'School Management System',
            url: window.location.href
          });
        }
      },
      description: 'Share school information'
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      icon: Bookmark,
      color: 'bg-stone-500',
      category: 'utility',
      href: '/bookmarks',
      description: 'View saved bookmarks'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      color: 'bg-slate-500',
      category: 'utility',
      href: '/settings',
      description: 'Manage your preferences'
    }
  ];

  // Filter actions based on user role
  const availableActions = allActions.filter(action => 
    !action.roles || action.roles.includes(userRole)
  );

  // Categorize actions
  const primaryActions = availableActions.filter(action => action.category === 'primary');
  const secondaryActions = availableActions.filter(action => action.category === 'secondary');
  const utilityActions = availableActions.filter(action => action.category === 'utility');

  // Get filtered actions for the sheet
  const getFilteredActions = () => {
    switch (selectedCategory) {
      case 'primary': return primaryActions;
      case 'secondary': return secondaryActions;
      case 'utility': return utilityActions;
      default: return availableActions;
    }
  };

  const handleActionClick = (action: QuickAction) => {
    if (action.href) {
      router.push(action.href);
    } else if (action.action) {
      action.action();
    }
    setIsOpen(false);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Quick Actions Grid for Mobile Dashboard */}
      <div className="lg:hidden">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          {/* Primary Actions - Always visible */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {primaryActions.slice(0, 4).map((action) => {
              const IconComponent = action.icon;
              return (
                <div
                  key={action.id}
                  className="p-4 bg-white border border-gray-200 hover:shadow-md rounded-lg cursor-pointer transition-shadow"
                  onClick={() => handleActionClick(action)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={cn("p-3 rounded-xl", action.color)}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {action.label}
                      </p>
                      {action.badge && (
                        <Badge variant="secondary" className="mt-1">
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More Actions Button */}
          {(secondaryActions.length > 0 || utilityActions.length > 0) && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  More Actions
                </Button>
              </SheetTrigger>
              
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Quick Actions</SheetTitle>
                </SheetHeader>
                
                {/* Category Filters */}
                <div className="flex gap-2 my-4">
                  {['all', 'primary', 'secondary', 'utility'].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category as any)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Actions List */}
                <ScrollArea className="h-full">
                  <div className="space-y-2">
                    {getFilteredActions().map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <div
                          key={action.id}
                          className="flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                          onClick={() => handleActionClick(action)}
                        >
                          <div className={cn("p-2 rounded-lg mr-3", action.color)}>
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{action.label}</span>
                              {action.badge && (
                                <Badge variant="secondary">{action.badge}</Badge>
                              )}
                            </div>
                            {action.description && (
                              <p className="text-sm text-gray-500 mt-1">
                                {action.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* Sync Status Indicator */}
      {!isOnline && (
        <div className="flex items-center justify-center p-2 bg-orange-100 border border-orange-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-orange-700">
              Offline Mode - {syncStatus?.unsyncedCount || 0} pending changes
            </span>
          </div>
        </div>
      )}

      {/* Desktop Quick Actions Bar */}
      <div className="hidden lg:flex lg:items-center lg:gap-2 lg:overflow-x-auto lg:p-2">
        {primaryActions.concat(secondaryActions.slice(0, 3)).map((action) => {
          const IconComponent = action.icon;
          return (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              onClick={() => handleActionClick(action)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <IconComponent className="h-4 w-4" />
              {action.label}
              {action.badge && (
                <Badge variant="secondary" className="ml-1">
                  {action.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}