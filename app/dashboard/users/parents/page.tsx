import { Parent, getParents } from '@/lib/utils';
import { SummaryCard } from '@/components/admin/parents/SummaryCard';
import { Users, UserRoundCheck, UserCog } from 'lucide-react';
import ParentInvitesManagement from '@/components/admin/parents/ParentInvitesManagement';
import ParentTable from '@/components/admin/parents/ParentTable';

// fakeData
import { parents } from '@/lib/fakeData'

export default function ParentManagement() {

    // fetches fake data and stores them in active and pending
    // active:  parents who are active on the management system
    // pending: parents who have been invited but are yet to login into the platform. 
    const { active, pending } = getParents(parents)

    const handleInviteRequest = () => {

    }

    return (
        <div className='bg-zinc-100 p-6 rounded-2xl'>
            <section>
                <h1 className='text-xl font-bold text-gray-700'>Parent Management</h1>
                <p className='text-sm'>Create, update, delete parent access</p>
            </section>

            {/* Summary Metrics section */}
            <section className='flex flex-col md:flex-row gap-4 my-4'>
                <SummaryCard
                    label='Total Parent / Guardian'
                    value={active.length + pending.length}
                    icon={<Users color='#22c55e' />}
                    textColor='#22c55e'
                    bgColor='#bbf7d0'
                />
                <SummaryCard
                    label="Registered Parents"
                    value={active.length}
                    icon={<UserRoundCheck color="#348081" />}
                    textColor="#348081"
                    bgColor="#ebfdfe"
                />
                <SummaryCard
                    label="Pending Invites"
                    value={pending.length}
                    icon={<UserCog color="#6e49f6" />}
                    textColor="#6e49f6"
                    bgColor="#e1d2fc"
                />
            </section>

            {/* Pending Invites */}
            <div className='bg-white rounded-xl p-4 space-y-4'>
                <section className=''>
                    <h2 className='text-lg text-gray-700 font-semibold'>Pending Invites</h2>
                    <ParentInvitesManagement pending={pending} />
                </section>

                {/* Parent Table */}
                <section className='my-6'>
                    <h2 className='text-lg text-gray-700 font-semibold'>Parent List</h2>
                    <p className='text-sm'>Mange users and their permissions</p>
                    <ParentTable parents={parents} />
                </section>
            </div>
        </div>
    )
}