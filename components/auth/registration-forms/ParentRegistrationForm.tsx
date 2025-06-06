"use client";

import { ParentInviteRegistrationForm } from "../parent-invite-registration-form";

interface InviteData {
  email: string;
  role: string;
  token: string;
  schoolName?: string;
  isValid: boolean;
}

interface ParentRegistrationFormProps {
  inviteData: InviteData;
}

export function ParentRegistrationForm({ inviteData }: ParentRegistrationFormProps) {
  return <ParentInviteRegistrationForm inviteToken={inviteData.token} />;
} 