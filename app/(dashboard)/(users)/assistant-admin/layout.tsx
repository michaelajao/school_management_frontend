"use client";

import { useAuth } from "@/contexts/auth-context";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { hasPermission, UserRole } from "@/lib/rbac";

export default function AssistantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();


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