"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, ChevronRight } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Check initially
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show loading state
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    // Use window.location.href instead of redirect for client-side navigation
    if (typeof window !== "undefined") {
      window.location.href = "/auth/signin";
      return null;
    }
    return null;
  }

  // Menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { name: "Dashboard", href: `/dashboard/${user?.role}` },
      { name: "Profile", href: `/dashboard/profile` },
    ];

    if (user?.role === "admin") {
      return [
        ...commonItems,
        { name: "Students", href: "/dashboard/admin/students" },
        { name: "Teachers", href: "/dashboard/admin/teachers" },
        { name: "Classes", href: "/dashboard/admin/classes" },
        { name: "Reports", href: "/dashboard/admin/reports" },
      ];
    }

    if (user?.role === "teacher") {
      return [
        ...commonItems,
        { name: "My Classes", href: "/dashboard/teacher/classes" },
        { name: "Attendance", href: "/dashboard/teacher/attendance" },
        { name: "Assignments", href: "/dashboard/teacher/assignments" },
      ];
    }

    if (user?.role === "parent") {
      return [
        ...commonItems,
        { name: "Children", href: "/dashboard/parent/children" },
        { name: "Academic Progress", href: "/dashboard/parent/progress" },
        { name: "Attendance", href: "/dashboard/parent/attendance" },
      ];
    }

    if (user?.role === "student") {
      return [
        ...commonItems,
        { name: "Classes", href: "/dashboard/student/classes" },
        { name: "Assignments", href: "/dashboard/student/assignments" },
        { name: "Progress", href: "/dashboard/student/progress" },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  // Sidebar component
  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-slate-700">
        <Link href={`/dashboard/${user?.role}`} className="font-bold text-xl flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            {user?.role.charAt(0).toUpperCase()}
          </div>
          {isSidebarOpen && (
            <div>
              <span className="text-white">SchoolMS</span>
              <p className="text-sm text-slate-400 mt-1">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          )}
        </Link>
      </div>
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {item.name}
                {isSidebarOpen ? null : <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <Button 
          variant="outline" 
          className="w-full text-slate-300 hover:text-white border-slate-600"
          onClick={() => logout()}
        >
          {isSidebarOpen ? "Log Out" : "Out"}
        </Button>
      </div>
    </>
  );

  // Main layout with responsive behavior
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* For desktop: Collapsible Sidebar */}
      <div 
        className={`hidden md:flex bg-slate-800 text-white flex-col h-full transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <SidebarContent />
      </div>

      {/* For mobile: Drawer/Sheet */}
      <div className="md:hidden">
        <Sheet>          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-40"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-slate-800 text-white w-[280px]">
            {/* Adding SheetTitle for accessibility */}
            <div className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </div>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-between">
          {/* Toggle button for desktop */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden md:flex" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="md:hidden">
            {/* This div creates space in mobile view where the Sheet trigger is rendered */}
            <div className="w-8 h-8" />
          </div>
          
          {/* Page Title - this could be dynamic based on current path */}          <h1 className="text-lg font-medium">
            {user?.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard` : "Dashboard"}
          </h1>
          
          {/* Right side of header - could add notifications, profile menu, etc. */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Welcome, {user?.name}</span>
          </div>
        </header>

        {/* Main content area with padding */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
