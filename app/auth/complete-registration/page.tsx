"use client";

import { useSearchParams } from "next/navigation";
import { InviteValidation } from "@/components/auth/invite-validation";
import { TeacherRegistrationForm } from "@/components/auth/registration-forms/TeacherRegistrationForm";
import { StudentRegistrationForm } from "@/components/auth/registration-forms/StudentRegistrationForm";
import { ParentRegistrationForm } from "@/components/auth/registration-forms/ParentRegistrationForm";
import { StaffRegistrationForm } from "@/components/auth/registration-forms/StaffRegistrationForm";

interface InviteData {
  email: string;
  role: string;
  token: string;
  schoolName?: string;
  isValid: boolean;
}

export default function CompleteRegistrationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Registration Link</h1>
          <p className="text-gray-600">This registration link is missing required parameters.</p>
        </div>
      </div>
    );
  }

  const renderRegistrationForm = (inviteData: InviteData) => {
    const role = inviteData.role.toUpperCase();
    
    switch (role) {
      case 'TEACHER':
      case 'SUBJECT_TEACHER':
      case 'CLASS_TEACHER':
        return <TeacherRegistrationForm inviteData={inviteData} />;
      
      case 'STUDENT':
        return <StudentRegistrationForm inviteData={inviteData} />;
      
      case 'PARENT':
        return <ParentRegistrationForm inviteData={inviteData} />;
      
      case 'ADMIN':
      case 'FINANCE_ADMIN':
      case 'NON_ACADEMIC_STAFF':
        return <StaffRegistrationForm inviteData={inviteData} />;
      
      default:
        return (
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Unsupported Role</h2>
            <p className="text-gray-600">
              The role "{inviteData.role}" is not supported for registration completion.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Please contact your school administrator for assistance.
            </p>
          </div>
        );
    }
  };

  return (
    <InviteValidation tokenParam="token" emailParam="email">
      {(inviteData) => renderRegistrationForm(inviteData)}
    </InviteValidation>
  );
} 