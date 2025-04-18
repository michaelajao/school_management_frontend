"use client";

import { useAuth } from "@/contexts/auth-context";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();

  // Redirect to the appropriate role-specific dashboard
  if (user?.role) {
    redirect(`/dashboard/${user.role}`);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Loading your dashboard...</h1>
        <p className="mt-2 text-muted-foreground">Please wait while we prepare your dashboard.</p>
      </div>
    </div>
  );
}
