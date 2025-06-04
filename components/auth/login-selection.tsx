"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuthLayout } from "@/components/auth/auth-layout";
import { User, GraduationCap, Users, UserCheck } from "lucide-react";

const roles = [
  {
    value: "admin",
    label: "Admin",
    description: "School administrators and management",
    icon: UserCheck,
    color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
  },
  {
    value: "teacher", 
    label: "Teacher",
    description: "Teaching staff and educators",
    icon: GraduationCap,
    color: "bg-green-50 hover:bg-green-100 border-green-200"
  },
  {
    value: "student",
    label: "Student", 
    description: "Students and learners",
    icon: User,
    color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
  },
  {
    value: "parent",
    label: "Parent",
    description: "Parents and guardians",
    icon: Users,
    color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
  }
];

export function LoginSelectionPage() {
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    router.push(`/auth/login/${role}`);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Choose Your Role</h1>
          <p className="text-gray-600 mt-2">
            Select your role to continue to the login page
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.value}
                onClick={() => handleRoleSelect(role.value)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${role.color}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{role.label}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/auth/school-signup")}
              variant="outline"
              className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              New School? Register Here
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Need an account?{" "}
              <button
                onClick={() => router.push("/auth/create-account")}
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
