"use client";

import { RouteGuard } from "@/components/auth/RouteGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard-specific layout elements */}
        <main>{children}</main>
      </div>
    </RouteGuard>
  );
}