'use client';

import { ChevronLeft, TrashIcon, PenLine } from 'lucide-react';
import Link from 'next/link';
import { useParentStore } from '@/store/parentStore';
import { formatDateTime } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Parent } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const noProfilePicture =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

export default function ViewParent() {
    const selectedParent = useParentStore((state) => state.selectedParent);
    const setSelectedParent = useParentStore((state) => state.setSelectedParent);
    const router = useRouter();

    if (!selectedParent) {
        return <div>No parent selected.</div>; // Handle null case
    }

    console.log(selectedParent, "here")
    function handleEditParent(parent: Parent) {
        setSelectedParent(parent)
        router.push('edit')
    }

    return (
        <div>
            <Button className='flex gap-4 font-semibold mb-8 bg-transparent text-black'
                onClick={() => router.back()}>
                <ChevronLeft />
                <p>Manage Users</p>
            </Button>
            <section className='bg-white p-4 rounded-lg pl-6'>
                <div className='flex items-center gap-4 font-semibold text-lg'>
                    <img
                        src={noProfilePicture}
                        alt={selectedParent.name}
                        className='w-12 h-12 md:w-14 md:h-14 rounded-full object-cover'
                    />
                    <p>{selectedParent.name}</p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col md:flex-row md:w-7/12 gap-6 space-x-2 my-8 text-sm'>
                    <button
                        className='w-full md:w-6/12 flex justify-center items-center bg-red-600  text-white gap-2 px-6 py-4 md:py-2 rounded-lg'>
                        <TrashIcon className='w-5 h-5' />
                        <p>Delete User</p>
                    </button>
                    <button
                        onClick={() =>handleEditParent(selectedParent)}
                        className='cursor-pointer w-full md:w-6/12 flex justify-center items-center bg-[#348081]  text-white gap-2 px-6 py-4 md:py-2 rounded-lg'
                    >
                        <PenLine className='w-5 h-5' />
                        <p>Edit Info</p>
                    </button>
                    <button
                        className={`
                            w-full md:w-6/12 border border-[#348081] text-[#348081] px-6 py-4 md:py-2 rounded-lg
                            ${selectedParent.status == 'active' ? 'hidden' : ''}`}
                    >
                        Send Invite
                    </button>
                </div>

                {/* Information */}
                <div className='space-y-12 mt-12'>
                    <div className='flex'>
                        <span className='w-3/12'>Status</span>
                        <span
                            className={`
                                    px-12 py-2 font-semibold
                                    ${selectedParent.status == 'active' ?
                                    'bg-[#ebfefe] text-[#348081]' :
                                    'bg-[#fcecd9] text-[#f49e41]'}`}
                        >{selectedParent.status.charAt(0).toUpperCase() + selectedParent.status.slice(1)}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Email</span>
                        <span>{selectedParent.email}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Phone Number</span>
                        <span>{selectedParent.phoneNumber}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Address</span>
                        <span>{selectedParent.address}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Gender</span>
                        <span>{selectedParent.gender}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Linked to</span>
                        <ul>
                            {
                                selectedParent.linkedStudents.map((child, idx) =>
                                    <li key={idx}>{child.name}</li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Relationship to Student(s)</span>
                        <span>{selectedParent.relationship}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Occupation</span>
                        <span>{selectedParent.occupation}</span>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Fee Status</span>
                        <ul className='flex flex-col gap-4'>
                            {
                                selectedParent.linkedStudents.map((child, idx) =>
                                    <li key={idx}>
                                        <p>{child.name}</p>
                                        <p>{child.studentId}</p>
                                        <p>{child.class}</p>
                                        <span className='flex gap-6'>
                                            <p>Outstanding Fees:</p>
                                            <p className={`${child.outstandingFees > 0 ? 'text-red-500' : ''}`}>{child.outstandingFees}</p>
                                        </span>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='flex'>
                        <span className='w-3/12'>Last login</span>
                        <span>{formatDateTime(selectedParent.lastLogin as string)}</span>
                    </div>

                </div>
            </section>
        </div>
    )
}