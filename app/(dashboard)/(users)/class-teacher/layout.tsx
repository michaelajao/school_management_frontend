"use client";

import { RouteGuard } from "@/components/auth/RouteGuard";

export default function ClassTeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard 
      allowedRoles={["class_teacher", "school_admin", "super_admin"]}
    >
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </RouteGuard>
  );
}