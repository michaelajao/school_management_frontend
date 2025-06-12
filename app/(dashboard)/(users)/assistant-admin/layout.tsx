"use client";

import { useAuth } from "@/contexts/auth-context";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { hasPermission } from "@/lib/rbac";

export default function AssistantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // Check if user has assistant admin permissions
  const canAccess = user && (
    user.role === "assistant_admin" ||
    hasPermission(user.role as any, "manage_students") ||
    hasPermission(user.role as any, "manage_parents")
  );

  return (
    <RouteGuard 
      allowedRoles={["assistant_admin", "school_admin", "super_admin"]}
      fallback="/auth/signin"
    >
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </RouteGuard>
  );
}