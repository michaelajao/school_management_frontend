'use client'

import { Parent, getParents, formatDateTime } from '@/lib/utils';
import { Users, UserRoundCheck, UserCog, Router } from 'lucide-react';
import ParentInvitesManagement from '@/components/admin/parents/ParentInvitesManagement';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';
import { GenericTable } from '@/components/ui/GenericTable';
import { parents } from '@/lib/fakeData';

import type { Column } from "@/components/ui/GenericTable";
import { useParentStore } from '@/store/parentStore';
import { useRouter } from 'next/navigation';

// Define a type for the cleaned parent data
type CleanedParent = Omit<Parent, 'linkedStudents' | 'status' | 'lastLogin'> & {
  linkedStudents: string;
  status: "active" | "pending";
  lastLogin: string;
};

// Define columns for the cleaned data
const columns: Column<CleanedParent>[] = [
  { accessor: "name", header: "Parent Name" },
  { accessor: "email", header: "Email" },
  { accessor: "phoneNumber", header: "Phone Number" },
  { accessor: "linkedStudents", header: "Linked Students" },
  { accessor: "status", header: "Status" },
  { accessor: "lastLogin", header: "Last Login" },
];

export default function ParentManagement() {
  const router = useRouter();
  const { active, pending } = getParents(parents);
  const totalParents = active.length + pending.length;
  const setSelectedParent = useParentStore((state) => state.setSelectedParent)

  // Preprocess the parent data: convert linkedStudents to a string of names and format lastLogin
  const parentDataCleaned: CleanedParent[] = parents.map((parent) => ({
    ...parent,
    linkedStudents: parent.linkedStudents.map(student => {
    // Check if student is a string ID or an object
    if (typeof student === 'string') {
      return student;
    } else if (typeof student === 'object' && student !== null && 'name' in student) {
      return student.name;
    }
    return 'Unknown Student';
  }).join(", "),
    status: (parent.status.charAt(0).toUpperCase() + parent.status.slice(1)) as "active" | "pending", // Ensure type is restricted
    lastLogin: parent.lastLogin ? formatDateTime(parent.lastLogin) : "N/A", // Format last login
  }));

  const parentMetrics = [
    {
      icon: Users,
      value: totalParents,
      label: 'Total Parent / Guardian',
      primaryColor: '#22c55e',
      secondaryColor: '#bbf7d0',
    },
    {
      icon: UserRoundCheck,
      value: active.length,
      label: "Registered Parents",
      primaryColor: "#348081",
      secondaryColor: "#ebfdfe",
    },
    {
      icon: UserCog,
      value: pending.length,
      label: "Pending Invites",
      primaryColor: "#6e49f6",
      secondaryColor: "#e1d2fc"
    }
  ];

  const handleView = (cleanedParent: CleanedParent) => {
    // Find the original parent data for navigation
    const originalParent = parents.find(p => p.id === cleanedParent.id);
    if (originalParent) {
      setSelectedParent(originalParent);
      router.push('/admin/manage/parents/view');
      console.log("Viewing parent:", originalParent);
    }
  };

  const handleEdit = (cleanedParent: CleanedParent) => {
    // Find the original parent data for editing
    const originalParent = parents.find(p => p.id === cleanedParent.id);
    if (originalParent) {
      setSelectedParent(originalParent);
      router.push('/admin/manage/parents/edit');
      console.log("Editing parent:", originalParent);
    }
  };

  const handleDelete = async (cleanedParent: CleanedParent) => {
    // Find the original parent data for deletion
    const originalParent = parents.find(p => p.id === cleanedParent.id);
    if (originalParent) {
      console.log("Deleting parent:", originalParent);
    }
  };

  const handleAddNew = () => {
    console.log("Add new parent");
    router.push('/admin/manage/parents/add');
  };

  const handleBulkUpload = () => {
    console.log("Bulk uploading CSV...");
    router.push('/admin/data-upload');
  };

  return (
    <div className='bg-zinc-100 md:p-6 rounded-2xl'>
      <section>
        <h1 className='text-xl font-bold text-gray-700'>Parent Management</h1>
        <p className='text-sm'>Create, update, delete parent access</p>
      </section>

      <div className='my-6'>
        <DashboardMetrics metrics={parentMetrics} />
      </div>

      <div className='bg-white rounded-xl p-4 space-y-4'>
        <section>
          <h2 className='text-lg text-gray-700 font-semibold'>Pending Invites</h2>
          <ParentInvitesManagement pending={pending} />
        </section>

        <section className='my-6'>
          <h2 className='text-lg text-gray-700 font-semibold'>Parent List</h2>
          <p className='text-sm'>Manage users and their permissions</p>

          <GenericTable
            columns={columns}
            rows={parentDataCleaned} // Use the cleaned data here
            totalCount={parentDataCleaned.length}
            pageSize={10}
            addNewTrigger={handleAddNew}
            onBulkUpload={handleBulkUpload}
            actionHandlers={{
              onView: handleView,
              onEdit: handleEdit,
              onDelete: handleDelete,
            }}
          />
        </section>
      </div>
    </div>
  );
}