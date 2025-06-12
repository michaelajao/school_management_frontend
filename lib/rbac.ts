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
  "/(dashboard)/(users)/admin": ["manage_users"],
  "/(dashboard)/(users)/admin/manage": ["manage_users"],
  "/(dashboard)/(users)/admin/manage/students": ["manage_students"],
  "/(dashboard)/(users)/admin/manage/staff": ["manage_staff"],
  "/(dashboard)/(users)/admin/manage/parents": ["manage_parents"],
  "/(dashboard)/(users)/admin/manage/academics": ["manage_classes", "manage_subjects"],
  "/(dashboard)/(users)/admin/communications": ["send_messages"],
  "/(dashboard)/(users)/admin/data-upload": ["manage_users"],

  // Assistant admin routes
  "/(dashboard)/(users)/assistant-admin": ["manage_students", "manage_parents"],

  // Teacher routes
  "/(dashboard)/(users)/teacher": ["take_attendance", "view_assignments"],
  
  // Student routes  
  "/(dashboard)/(users)/student": ["view_assignments"],
  
  // Parent routes
  "/(dashboard)/(users)/parent": ["view_reports"],

  // Super admin routes
  "/(dashboard)/(users)/superadmin": ["manage_school_settings"],
  
  // School management routes
  "/(dashboard)/(users)/school_management": ["manage_school_settings"]
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
      return "/(dashboard)/(users)/superadmin";
    case "school_admin":
      return "/(dashboard)/(users)/admin";
    case "assistant_admin":
      return "/(dashboard)/(users)/assistant-admin";
    case "class_teacher":
    case "subject_teacher":
      return "/(dashboard)/(users)/teacher";
    case "student":
      return "/(dashboard)/(users)/student";
    case "parent":
      return "/(dashboard)/(users)/parent";
    default:
      // Fallback for unrecognized roles
      if (canAccessAdminRoutes(userRole)) {
        return "/(dashboard)/(users)/admin";
      }
      if (canAccessTeacherFeatures(userRole)) {
        return "/(dashboard)/(users)/teacher";
      }
      return "/(dashboard)/(users)/student";
  }
}