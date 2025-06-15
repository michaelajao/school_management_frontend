"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { canAccessRoute, getUserDashboardPath, type UserRole } from "@/lib/rbac";

interface RouteGuardProps {
  children: ReactNode;
  requiredPermissions?: string[];
  allowedRoles?: UserRole[];
  fallbackRoute?: string;
}

export const RouteGuard = ({ 
  children, 
  requiredPermissions = [],
  allowedRoles = [],
  fallbackRoute 
}: RouteGuardProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
      router.push("/auth/signin");
      return;
    }

    // Check role-based access
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      const userDashboard = getUserDashboardPath(user.role);
      router.push(fallbackRoute || userDashboard);
      return;
    }

    // Check route-based access
    if (!canAccessRoute(user.role, pathname)) {
      const userDashboard = getUserDashboardPath(user.role);
      router.push(fallbackRoute || userDashboard);
      return;
    }
  }, [user, isAuthenticated, loading, pathname, router, allowedRoles, fallbackRoute]);

  // Show loading while checking permissions
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || !user) {
    return null;
  }

  // Check permissions before rendering
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  if (!canAccessRoute(user.role, pathname)) {
    return null;
  }

  return <>{children}</>;
};

// Higher-order component for page-level protection
export const withRouteGuard = (
  Component: React.ComponentType<any>,
  options: Omit<RouteGuardProps, 'children'> = {}
) => {
  return function ProtectedComponent(props: any) {
    return (
      <RouteGuard {...options}>
        <Component {...props} />
      </RouteGuard>
    );
  };
};

// Specific guards for common scenarios
export const AdminRouteGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard 
    allowedRoles={["super_admin", "school_admin", "assistant_admin"]}
    fallbackRoute="/dashboard/student"
  >
    {children}
  </RouteGuard>
);

export const TeacherRouteGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard 
    allowedRoles={["class_teacher", "subject_teacher"]}
    fallbackRoute="/dashboard/student"
  >
    {children}
  </RouteGuard>
);

export const StudentRouteGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard 
    allowedRoles={["student"]}
    fallbackRoute="/dashboard/teacher"
  >
    {children}
  </RouteGuard>
);

export const ParentRouteGuard = ({ children }: { children: ReactNode }) => (
  <RouteGuard 
    allowedRoles={["parent"]}
    fallbackRoute="/dashboard/student"
  >
    {children}
  </RouteGuard>
);