'use client';

import UserInvite from '@/components/admin/parents/UserInvite';
import { Parent } from '@/lib/utils';

interface Props {
    pending: Parent[];
}

export default function ParentInvitesManagement({ pending }: Props) {
    const handleInviteRequest = (parent: Parent) => {
    };

    return (
        <section className='bg-white p-4 rounded-xl'>
            <div className='flex flex-col gap-6 md:gap-4'>
                {pending.map((pendingParent, idx) => (
                    <UserInvite
                        key={idx}
                        parent={pendingParent}
                        onClick={() => handleInviteRequest(pendingParent)}
                    />
                ))}
            </div>

        </section>
    );
}
