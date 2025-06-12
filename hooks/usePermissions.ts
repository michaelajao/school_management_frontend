import { useAuth } from "@/contexts/auth-context";
import { 
  hasPermission, 
  canAccessRoute, 
  canAccessAdminRoutes,
  canAccessTeacherFeatures,
  getAllowedRoutes,
  type Permission,
  type UserRole 
} from "@/lib/rbac";

export function usePermissions() {
  const { user } = useAuth();

  // Check if user has specific permission
  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  // Check if user can access specific route
  const checkRouteAccess = (route: string): boolean => {
    if (!user) return false;
    return canAccessRoute(user.role, route);
  };

  // Check multiple permissions (user needs ALL)
  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => hasPermission(user.role, permission));
  };

  // Check multiple permissions (user needs ANY)
  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => hasPermission(user.role, permission));
  };

  // Get all allowed routes for current user
  const getUserAllowedRoutes = (): string[] => {
    if (!user) return [];
    return getAllowedRoutes(user.role);
  };

  // Role-based checks
  const isAdmin = (): boolean => {
    if (!user) return false;
    return canAccessAdminRoutes(user.role);
  };

  const isTeacher = (): boolean => {
    if (!user) return false;
    return canAccessTeacherFeatures(user.role);
  };

  const isStudent = (): boolean => {
    return user?.role === "student";
  };

  const isParent = (): boolean => {
    return user?.role === "parent";
  };

  const isSuperAdmin = (): boolean => {
    return user?.role === "super_admin";
  };

  const isSchoolAdmin = (): boolean => {
    return user?.role === "school_admin";
  };

  // Specific permission checks for common actions
  const canManageUsers = (): boolean => checkPermission("manage_users");
  const canManageClasses = (): boolean => checkPermission("manage_classes");
  const canManageStudents = (): boolean => checkPermission("manage_students");
  const canManageStaff = (): boolean => checkPermission("manage_staff");
  const canManageParents = (): boolean => checkPermission("manage_parents");
  const canTakeAttendance = (): boolean => checkPermission("take_attendance");
  const canCreateAssignments = (): boolean => checkPermission("create_assignments");
  const canViewAssignments = (): boolean => checkPermission("view_assignments");
  const canManageGrades = (): boolean => checkPermission("manage_grades");
  const canSendMessages = (): boolean => checkPermission("send_messages");
  const canViewAnalytics = (): boolean => checkPermission("view_analytics");
  const canViewReports = (): boolean => checkPermission("view_reports");
  const canManageSchedule = (): boolean => checkPermission("manage_schedule");
  const canManageSchoolSettings = (): boolean => checkPermission("manage_school_settings");
  const canViewFinancialReports = (): boolean => checkPermission("view_financial_reports");
  const canManagePayments = (): boolean => checkPermission("manage_payments");

  return {
    // Core permission checks
    checkPermission,
    checkRouteAccess,
    checkAllPermissions,
    checkAnyPermission,
    getUserAllowedRoutes,

    // Role checks
    isAdmin,
    isTeacher,
    isStudent,
    isParent,
    isSuperAdmin,
    isSchoolAdmin,

    // Specific permission checks
    canManageUsers,
    canManageClasses,
    canManageStudents,
    canManageStaff,
    canManageParents,
    canTakeAttendance,
    canCreateAssignments,
    canViewAssignments,
    canManageGrades,
    canSendMessages,
    canViewAnalytics,
    canViewReports,
    canManageSchedule,
    canManageSchoolSettings,
    canViewFinancialReports,
    canManagePayments,

    // Current user info
    userRole: user?.role as UserRole | undefined,
    user
  };
}