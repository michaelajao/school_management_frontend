'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { inviteLinks, UserRole } from '@/lib/utils';
import RegistrationForm from '@/components/onboarding/registrationform';

export default function RegistrationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [role, setRole] = useState<UserRole | ''>('');

  const inviteId = searchParams.get('inviteId');
//   const schoolId = searchParams.get('schoolId');
//   const classId = searchParams.get('classId');

  useEffect(() => {
    if (inviteId) {
      const resolvedRole = inviteLinks[inviteId];
      if (resolvedRole) {
        setRole(resolvedRole);
      } else {
        toast.error('Invalid or expired invitation link.');
        router.push('/error');
      }
    }
  }, [inviteId]);

  if (!role) return null;

  return <RegistrationForm prefilledRole={role} />;
}
