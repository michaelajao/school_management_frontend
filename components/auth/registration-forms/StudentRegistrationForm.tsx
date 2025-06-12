"use client";

import { StudentInviteRegistrationForm } from "../student-invite-registration-form";

interface InviteData {
  email: string;
  role: string;
  token: string;
  schoolName?: string;
  isValid: boolean;
}

interface StudentRegistrationFormProps {
  inviteData: InviteData;
}

export function StudentRegistrationForm({ inviteData }: StudentRegistrationFormProps) {
  return <StudentInviteRegistrationForm inviteToken={inviteData.token} />;
} 