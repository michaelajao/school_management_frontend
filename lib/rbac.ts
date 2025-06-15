// Role-Based Access Control (RBAC) utilities

export type UserRole = "super_admin" | "school_admin" | "assistant_admin" | "class_teacher" | "subject_teacher" | "student" | "parent";

export type Permission = 
  | "manage_users"
  | "manage_classes" 
  | "manage_subjects"
  | "manage_students"
  | "manage_staff"
  | "manage_parents"
  | "view_reports"
  | "manage_grades"
  | "take_attendance"
  | "create_assignments"
  | "view_assignments"
  | "manage_schedule"
  | "send_messages"
  | "view_analytics"
  | "manage_school_settings"
  | "view_financial_reports"
  | "manage_payments";

export type RoutePermissions = {
  [key: string]: Permission[];
};

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    "manage_users",
    "manage_classes",
    "manage_subjects", 
    "manage_students",
    "manage_staff",
    "manage_parents",
    "view_reports",
    "manage_grades",
    "take_attendance",
    "create_assignments",
    "view_assignments",
    "manage_schedule",
    "send_messages",
    "view_analytics",
    "manage_school_settings",
    "view_financial_reports",
    "manage_payments"
  ],
  school_admin: [
    "manage_users",
    "manage_classes",
    "manage_subjects",
    "manage_students", 
    "manage_staff",
    "manage_parents",
    "view_reports",
    "manage_grades",
    "take_attendance",
    "create_assignments",
    "view_assignments",
    "manage_schedule",
    "send_messages",
    "view_analytics",
    "manage_school_settings",
    "view_financial_reports",
    "manage_payments"
  ],
  assistant_admin: [
    "manage_students",
    "manage_parents", 
    "view_reports",
    "take_attendance",
    "view_assignments",
    "send_messages",
    "view_analytics"
  ],
  class_teacher: [
    "manage_students",
    "manage_grades",
    "take_attendance",
    "create_assignments",
    "view_assignments",
    "manage_schedule",
    "send_messages",
    "view_analytics"
  ],
  subject_teacher: [
    "manage_grades",
    "take_attendance", 
    "create_assignments",
    "view_assignments",
    "send_messages",
    "view_analytics"
  ],
  student: [
    "view_assignments",
    "send_messages"
  ],
  parent: [
    "view_assignments",
    "send_messages",
    "view_reports"
  ]
};

// Define route permissions
export const ROUTE_PERMISSIONS: RoutePermissions = {
  // Admin routes
  "/admin": ["manage_users"],
  "/admin/manage": ["manage_users"],
  "/admin/manage/students": ["manage_students"],
  "/admin/manage/staff": ["manage_staff"],
  "/admin/manage/parents": ["manage_parents"],
  "/admin/manage/academics": ["manage_classes", "manage_subjects"],
  "/admin/communications": ["send_messages"],
  "/admin/data-upload": ["manage_users"],

  // Assistant admin routes
  "/assistant-admin": ["manage_students", "manage_parents"],

  // Teacher routes
  "/teacher": ["take_attendance", "view_assignments"],
  "/class-teacher": ["manage_students", "take_attendance", "manage_grades"],
  "/subject-teacher": ["manage_grades", "create_assignments", "view_assignments"],
  
  // Student routes  
  "/student": ["view_assignments"],
  
  // Parent routes
  "/parent": ["view_reports"],

  // Super admin routes
  "/superadmin": ["manage_school_settings"],
  
  // School management routes
  "/school_management": ["manage_school_settings"]
};

// Check if user has permission
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole];
  return rolePermissions.includes(permission);
}

// Check if user can access route
export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const requiredPermissions = ROUTE_PERMISSIONS[route];
  
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true; // No specific permissions required
  }
  
  // User needs at least one of the required permissions
  return requiredPermissions.some(permission => hasPermission(userRole, permission));
}

// Get allowed routes for user role
export function getAllowedRoutes(userRole: UserRole): string[] {
  return Object.keys(ROUTE_PERMISSIONS).filter(route => 
    canAccessRoute(userRole, route)
  );
}

// Check if user can access any admin routes
export function canAccessAdminRoutes(userRole: UserRole): boolean {
  const adminPermissions: Permission[] = [
    "manage_users", 
    "manage_classes", 
    "manage_subjects",
    "manage_school_settings"
  ];
  
  return adminPermissions.some(permission => hasPermission(userRole, permission));
}

// Check if user can access teacher-specific features
export function canAccessTeacherFeatures(userRole: UserRole): boolean {
  const teacherPermissions: Permission[] = [
    "take_attendance",
    "create_assignments", 
    "manage_grades"
  ];
  
  return teacherPermissions.some(permission => hasPermission(userRole, permission));
}

// Get user dashboard path based on role and permissions
export function getUserDashboardPath(userRole: UserRole): string {
  switch (userRole) {
    case "super_admin":
      return "/superadmin";
    case "school_admin":
      return "/admin";
    case "assistant_admin":
      return "/assistant-admin";
    case "class_teacher":
      return "/class-teacher";
    case "subject_teacher":
      return "/subject-teacher";
    case "student":
      return "/student";
    case "parent":
      return "/parent";
    default:
      // Fallback for unrecognized roles
      if (canAccessAdminRoutes(userRole)) {
        return "/admin";
      }
      if (canAccessTeacherFeatures(userRole)) {
        return "/teacher";
      }
      return "/student";
  }
}