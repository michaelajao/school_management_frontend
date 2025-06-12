"use client";

import { ReactNode } from "react";
import { usePermissions } from "@/hooks/usePermissions";
import { type Permission, type UserRole } from "@/lib/rbac";

interface PermissionWrapperProps {
  children: ReactNode;
  permission?: Permission;
  permissions?: Permission[];
  requireAll?: boolean; // If true, user needs ALL permissions; if false, needs ANY
  allowedRoles?: UserRole[];
  fallback?: ReactNode;
  className?: string;
}

export const PermissionWrapper = ({
  children,
  permission,
  permissions = [],
  requireAll = false,
  allowedRoles = [],
  fallback = null,
  className
}: PermissionWrapperProps) => {
  const { 
    checkPermission, 
    checkAllPermissions, 
    checkAnyPermission,
    userRole 
  } = usePermissions();

  // Check single permission
  if (permission) {
    const hasAccess = checkPermission(permission);
    if (!hasAccess) return <>{fallback}</>;
  }

  // Check multiple permissions
  if (permissions.length > 0) {
    const hasAccess = requireAll 
      ? checkAllPermissions(permissions)
      : checkAnyPermission(permissions);
    if (!hasAccess) return <>{fallback}</>;
  }

  // Check role-based access
  if (allowedRoles.length > 0 && userRole) {
    const hasRoleAccess = allowedRoles.includes(userRole);
    if (!hasRoleAccess) return <>{fallback}</>;
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Convenience components for common scenarios
export const AdminOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper 
    allowedRoles={["super_admin", "school_admin", "assistant_admin"]}
    fallback={fallback}
  >
    {children}
  </PermissionWrapper>
);

export const TeacherOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper 
    allowedRoles={["class_teacher", "subject_teacher"]}
    fallback={fallback}
  >
    {children}
  </PermissionWrapper>
);

export const StudentOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper 
    allowedRoles={["student"]}
    fallback={fallback}
  >
    {children}
  </PermissionWrapper>
);

export const ParentOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper 
    allowedRoles={["parent"]}
    fallback={fallback}
  >
    {children}
  </PermissionWrapper>
);

export const SuperAdminOnly = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper 
    allowedRoles={["super_admin"]}
    fallback={fallback}
  >
    {children}
  </PermissionWrapper>
);

// Permission-based components
export const CanManageUsers = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper permission="manage_users" fallback={fallback}>
    {children}
  </PermissionWrapper>
);

export const CanTakeAttendance = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper permission="take_attendance" fallback={fallback}>
    {children}
  </PermissionWrapper>
);

export const CanCreateAssignments = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper permission="create_assignments" fallback={fallback}>
    {children}
  </PermissionWrapper>
);

export const CanManageGrades = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper permission="manage_grades" fallback={fallback}>
    {children}
  </PermissionWrapper>
);

export const CanViewAnalytics = ({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) => (
  <PermissionWrapper permission="view_analytics" fallback={fallback}>
    {children}
  </PermissionWrapper>
);