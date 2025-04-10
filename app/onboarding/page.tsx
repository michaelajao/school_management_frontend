"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type UserRole = "admin" | "teacher" | "parent" | "student";

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

function RoleCard({ role, title, description, icon, isSelected, onClick }: RoleCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all ${
        isSelected 
          ? "ring-2 ring-primary ring-offset-2" 
          : "hover:bg-slate-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-slate-100 p-3">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleContinue = () => {
    if (!selectedRole) return;
    router.push(`/onboarding/${selectedRole}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Welcome to SchoolMS</h1>
        <p className="text-muted-foreground">
          Let's set up your account. First, please select your role in the school system.
        </p>
      </div>

      <div className="grid gap-4">
        <RoleCard
          role="admin"
          title="Administrator"
          description="School leadership, administrators, and office staff"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M12 2v2" />
              <path d="M12 22v-2" />
              <path d="m17 20.66-1-1.73" />
              <path d="M11 10.27 7 3.34" />
              <path d="m20.66 17-1.73-1" />
              <path d="m3.34 7 1.73 1" />
              <path d="M14 12h8" />
              <path d="M2 12h2" />
              <path d="m20.66 7-1.73 1" />
              <path d="m3.34 17 1.73-1" />
              <path d="m17 3.34-1 1.73" />
              <path d="m7 20.66-1-1.73" />
            </svg>
          }
          isSelected={selectedRole === "admin"}
          onClick={() => setSelectedRole("admin")}
        />
        <RoleCard
          role="teacher"
          title="Teacher"
          description="Faculty member responsible for teaching students"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
            >
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4" />
              <path d="M3 15h18" />
              <path d="M7 10v5" />
              <path d="M17 10v5" />
              <path d="M12 10v5" />
              <path d="M3 10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v0Z" />
              <path d="M12 6V3" />
            </svg>
          }
          isSelected={selectedRole === "teacher"}
          onClick={() => setSelectedRole("teacher")}
        />
        <RoleCard
          role="parent"
          title="Parent/Guardian"
          description="Parent or guardian of one or more students"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-orange-600"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          isSelected={selectedRole === "parent"}
          onClick={() => setSelectedRole("parent")}
        />
        <RoleCard
          role="student"
          title="Student"
          description="Student enrolled in the school"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
            </svg>
          }
          isSelected={selectedRole === "student"}
          onClick={() => setSelectedRole("student")}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          disabled={!selectedRole}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}