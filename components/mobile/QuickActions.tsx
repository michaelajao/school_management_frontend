"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { usePWA } from "@/components/providers/PWAProvider";
import { TouchCard } from "@/components/ui/touch-card";
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
  Sort,
  Zap
} from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  href?: string;
  action?: () => void;
  badge?: string | number;
  description?: string;
  roles?: string[];
  category?: 'primary' | 'secondary' | 'utility';
}

const getQuickActions = (userRole: string): QuickAction[] => {
  const commonActions: QuickAction[] = [
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      color: 'bg-blue-500',
      description: 'Search students, teachers, or classes',
      category: 'utility',
      roles: ['super_admin', 'school_admin', 'assistant_admin', 'class_teacher', 'subject_teacher'],
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      color: 'bg-purple-500',
      href: '/dashboard/notifications',
      description: 'View all notifications',
      category: 'utility',
      roles: ['super_admin', 'school_admin', 'assistant_admin', 'class_teacher', 'subject_teacher', 'student', 'parent'],
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      color: 'bg-green-500',
      href: '/dashboard/schedule',
      description: 'View your schedule',
      category: 'primary',
      roles: ['class_teacher', 'subject_teacher', 'student'],
    },
  ];

  const roleSpecificActions: Record<string, QuickAction[]> = {
    school_admin: [
      {
        id: 'add_student',
        label: 'Add Student',
        icon: Plus,
        color: 'bg-[#1B5B5E]',
        href: '/admin/manage/students/addnew',
        description: 'Register a new student',
        category: 'primary',
      },
      {
        id: 'add_staff',
        label: 'Add Staff',
        icon: Users,
        color: 'bg-blue-600',
        href: '/admin/manage/staff/addstaff',
        description: 'Add new staff member',
        category: 'primary',
      },
      {
        id: 'announcements',
        label: 'Announcement',
        icon: MessageSquare,
        color: 'bg-orange-500',
        href: '/admin/communications/announcement/create',
        description: 'Create announcement',
        category: 'primary',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: BarChart3,
        color: 'bg-purple-600',
        href: '/admin/reports',
        description: 'View analytics and reports',
        category: 'secondary',
      },
      {
        id: 'bulk_upload',
        label: 'Bulk Upload',
        icon: Upload,
        color: 'bg-indigo-500',
        href: '/admin/data-upload',
        description: 'Import data from spreadsheet',
        category: 'utility',
      },
    ],
    assistant_admin: [
      {
        id: 'mark_attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        color: 'bg-green-600',
        href: '/dashboard/attendance/mark',
        description: 'Mark class attendance',
        category: 'primary',
      },
      {
        id: 'student_list',
        label: 'Students',
        icon: Users,
        color: 'bg-blue-500',
        href: '/admin/manage/students',
        description: 'Manage students',
        category: 'primary',
      },
      {
        id: 'parent_contact',
        label: 'Contact Parents',
        icon: Phone,
        color: 'bg-yellow-500',
        description: 'Contact parents of absent students',
        category: 'secondary',
      },
      {
        id: 'attendance_report',
        label: 'Attendance Report',
        icon: FileText,
        color: 'bg-purple-500',
        href: '/dashboard/reports/attendance',
        description: 'Generate attendance reports',
        category: 'secondary',
      },
    ],
    class_teacher: [
      {
        id: 'mark_attendance',
        label: 'Mark Attendance',
        icon: ClipboardCheck,
        color: 'bg-green-600',
        href: '/dashboard/attendance/mark',
        description: 'Take class attendance',
        category: 'primary',
      },
      {
        id: 'enter_grades',
        label: 'Enter Grades',
        icon: Award,
        color: 'bg-yellow-500',
        href: '/dashboard/grades/enter',
        description: 'Record student grades',
        category: 'primary',
      },
      {
        id: 'lesson_plan',
        label: 'Lesson Plans',
        icon: BookOpen,
        color: 'bg-blue-500',
        href: '/dashboard/lesson-plans',
        description: 'Create and manage lesson plans',
        category: 'secondary',
      },
      {
        id: 'class_report',
        label: 'Class Report',
        icon: BarChart3,
        color: 'bg-purple-500',
        href: '/dashboard/reports/class',
        description: 'View class performance',
        category: 'secondary',
      },
      {
        id: 'contact_parents',
        label: 'Parent Messages',
        icon: MessageSquare,
        color: 'bg-orange-500',
        href: '/dashboard/messages/parents',
        description: 'Send messages to parents',
        category: 'utility',
      },
    ],
    subject_teacher: [
      {
        id: 'enter_grades',
        label: 'Enter Grades',
        icon: Award,
        color: 'bg-yellow-500',
        href: '/dashboard/grades/enter',
        description: 'Record assessment scores',
        category: 'primary',
      },
      {
        id: 'create_assignment',
        label: 'New Assignment',
        icon: FileText,
        color: 'bg-blue-500',
        href: '/dashboard/assignments/create',
        description: 'Create new assignment',
        category: 'primary',
      },
      {
        id: 'grade_assignments',
        label: 'Grade Work',
        icon: Scan,
        color: 'bg-purple-500',
        href: '/dashboard/assignments/grade',
        description: 'Grade submitted work',
        category: 'primary',
      },
      {
        id: 'subject_report',
        label: 'Subject Analytics',
        icon: BarChart3,
        color: 'bg-green-500',
        href: '/dashboard/reports/subject',
        description: 'View subject performance',
        category: 'secondary',
      },
    ],
    student: [
      {
        id: 'assignments',
        label: 'Assignments',
        icon: FileText,
        color: 'bg-blue-500',
        href: '/dashboard/assignments',
        description: 'View and submit assignments',
        category: 'primary',
        badge: '3', // Mock pending assignments
      },
      {
        id: 'grades',
        label: 'My Grades',
        icon: Award,
        color: 'bg-yellow-500',
        href: '/dashboard/grades',
        description: 'View your grades',
        category: 'primary',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        color: 'bg-green-500',
        href: '/dashboard/attendance',
        description: 'View attendance record',
        category: 'secondary',
      },
      {
        id: 'timetable',
        label: 'Timetable',
        icon: Calendar,
        color: 'bg-purple-500',
        href: '/dashboard/timetable',
        description: 'View class schedule',
        category: 'secondary',
      },
      {
        id: 'submit_work',
        label: 'Submit Work',
        icon: Upload,
        color: 'bg-orange-500',
        href: '/dashboard/assignments/submit',
        description: 'Submit assignments',
        category: 'utility',
      },
    ],
    parent: [
      {
        id: 'child_progress',
        label: 'Child Progress',
        icon: BarChart3,
        color: 'bg-blue-500',
        href: '/dashboard/progress',
        description: 'View your child\'s progress',
        category: 'primary',
      },
      {
        id: 'grades',
        label: 'Grades',
        icon: Award,
        color: 'bg-yellow-500',
        href: '/dashboard/grades',
        description: 'View grades and reports',
        category: 'primary',
      },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: ClipboardCheck,
        color: 'bg-green-500',
        href: '/dashboard/attendance',
        description: 'View attendance record',
        category: 'primary',
      },
      {
        id: 'teacher_messages',
        label: 'Messages',
        icon: MessageSquare,
        color: 'bg-purple-500',
        href: '/dashboard/messages',
        description: 'Messages from teachers',
        category: 'secondary',
      },
      {
        id: 'events',
        label: 'School Events',
        icon: Calendar,
        color: 'bg-orange-500',
        href: '/dashboard/events',
        description: 'Upcoming school events',
        category: 'secondary',
      },
    ],
  };

  const allActions = [...commonActions, ...(roleSpecificActions[userRole] || [])];
  
  return allActions.filter(action => 
    !action.roles || action.roles.includes(userRole)
  );
};

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'primary' | 'secondary' | 'utility'>('all');
  const { user } = useAuth();
  const { syncStatus } = usePWA();
  const router = useRouter();

  if (!user) return null;

  const quickActions = getQuickActions(user.role);
  
  // Group actions by category
  const primaryActions = quickActions.filter(a => a.category === 'primary');
  const secondaryActions = quickActions.filter(a => a.category === 'secondary');
  const utilityActions = quickActions.filter(a => a.category === 'utility');

  const filteredActions = selectedCategory === 'all' 
    ? quickActions 
    : quickActions.filter(a => a.category === selectedCategory);

  const handleActionClick = (action: QuickAction) => {
    if (action.href) {
      router.push(action.href);
    } else if (action.action) {
      action.action();
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Quick Actions Grid for Mobile Dashboard */}
      <div className="lg:hidden">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          {/* Primary Actions - Always visible */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {primaryActions.slice(0, 4).map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchCard
                  key={action.id}
                  className="p-4 bg-white border border-gray-200 hover:shadow-md"
                  onTap={() => handleActionClick(action)}
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
                </TouchCard>
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

                <ScrollArea className="h-[60vh]">
                  <div className="grid grid-cols-2 gap-3 pb-6">
                    {filteredActions.map((action) => {
                      const IconComponent = action.icon;
                      return (
                        <TouchCard
                          key={action.id}
                          className="p-4 bg-white border border-gray-200"
                          onTap={() => handleActionClick(action)}
                        >
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className={cn("p-3 rounded-xl", action.color)}>
                              <IconComponent className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {action.label}
                              </p>
                              {action.description && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {action.description}
                                </p>
                              )}
                              {action.badge && (
                                <Badge variant="secondary" className="mt-1">
                                  {action.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TouchCard>
                      );
                    })}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      {/* Desktop Quick Actions (Optional - can be integrated into existing layout) */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {primaryActions.slice(0, 8).map((action) => {
            const IconComponent = action.icon;
            return (
              <TouchCard
                key={action.id}
                className="p-4 bg-white border border-gray-200 hover:shadow-md"
                onTap={() => handleActionClick(action)}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn("p-2 rounded-lg", action.color)}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {action.label}
                    </p>
                    {action.badge && (
                      <Badge variant="secondary" className="mt-1">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </TouchCard>
            );
          })}
        </div>
      </div>
    </>
  );
}