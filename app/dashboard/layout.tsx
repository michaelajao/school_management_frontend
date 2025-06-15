"use client";

import { RouteGuard } from "@/components/auth/RouteGuard";
import { AppHeader } from "@/components/navigation/AppHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen bg-gray-50">
        <AppHeader />
        <main className="pb-16 lg:pb-0">
          {children}
        </main>
      </div>
    </RouteGuard>
  );
}