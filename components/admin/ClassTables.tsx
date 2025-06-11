'use client';

import { FC, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { GenericTable } from '../ui/GenericTable';
import { classRows, ClassRow } from '@/lib/fakeData';
import type { Column } from '../ui/GenericTable'; 

const ClassListPage: FC = () => {
  const router = useRouter();

  // Custom columns with cell renderers
  const classColumns: Column<ClassRow>[] = [
    { accessor: "class", header: "Class" },
    { accessor: "teacher", header: "Class Teacher" },
    { 
      accessor: "assistant", 
      header: "Assistant Teacher",
      cell: (row: ClassRow) => row.assistant || '—'
    },
    { 
      accessor: "count", 
      header: "Students Count",
      cell: (row: ClassRow) => <span className="text-[#028A82]">{row.count}</span>
    },
    { accessor: "type", header: "Classification" },
  ];

  const handleView = useCallback((row: ClassRow) => {
    router.push(`/admin/manage/academics/classes/manage`);
  }, [router]);

  {/* 
    /admin/manage/academics/classes/${row.id}/edit
    */}
  const handleEdit = useCallback((row: ClassRow) => {
    router.push(`/admin/manage/academics/classes/edit_class`);
  }, [router]);

  const handleDelete = useCallback(async (row: ClassRow) => {
    console.log("Deleting class:", row.id);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Class deleted successfully");
    return Promise.resolve();
  }, []);

  const handleAddNew = useCallback(() => {
    router.push('/admin/manage/academics/classes/add');
  }, [router]);

  const handleBulkUpload = useCallback(() => {
    console.log("Bulk uploading classes...");
    router.push('/admin/data-upload');
  }, [router]);

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <GenericTable
          columns={classColumns}
          rows={classRows}
          totalCount={classRows.length}
          pageSize={10}
          addNewTrigger={handleAddNew}
          onBulkUpload={handleBulkUpload}
          actionHandlers={{
            onView: handleView,
            onEdit: handleEdit,
            onDelete: handleDelete,
          }}
        />
      </div>
    </div>
  );
};
export default ClassListPage;