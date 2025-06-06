"use client";

import { Check, X } from "lucide-react";

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    {
      label: "At least 8 characters",
      met: password?.length >= 8,
    },
    {
      label: "One uppercase letter",
      met: /[A-Z]/.test(password || ""),
    },
    {
      label: "One lowercase letter",
      met: /[a-z]/.test(password || ""),
    },
    {
      label: "One number",
      met: /\d/.test(password || ""),
    },
    {
      label: "One special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password || ""),
    },
  ];

  if (!password) return null;

  return (
    <div className="mt-3 p-4 bg-gray-50 rounded-lg">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
      <div className="space-y-1">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center text-sm">
            {requirement.met ? (
              <Check className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <X className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span className={requirement.met ? "text-green-700" : "text-red-700"}>
              {requirement.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 