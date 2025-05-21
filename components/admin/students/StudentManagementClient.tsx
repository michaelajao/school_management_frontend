/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { SummaryCard } from "@/components/admin/parents/SummaryCard";
import { GenericTable } from "@/components/ui/GenericTable";

export interface StudentManagementClientProps {
  summaryData: {
    totalParents: number;
    activeParents: number;
    pendingParents: number;
  };
  studentColumns: any[];
  studentRows: any[];
}

export default function StudentManagementClient({ 
    summaryData, 
    studentColumns, 
    studentRows
}: StudentManagementClientProps) {
  const router = useRouter();
  const [globalLoading, setGlobalLoading] = useState(false);

  const handlenewStudent = useCallback(() => {
    router.push("/dashboard/users/students/addnew");
  }, [router]);

  const handleDeleteStudent = useCallback(async (row: { id: any; }) => {
    try {
      setGlobalLoading(true);
      console.log("Deleting student:", row.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Student deleted successfully");
      return Promise.resolve();
    } catch (error) {
      console.error("Error deleting student:", error);
      return Promise.reject(error);
    } finally {
      setGlobalLoading(false);
    }
  }, []);

  const handleBulkUpload = useCallback(() => {
    console.log("Opening bulk upload modal");
  }, []);

  const handleViewStudent = useCallback((row: { id: any; }) => {
    router.push(`/dashboard/users/students/${row.id}`);
  }, [router]);

  return (
    <div className="bg-zinc-100 p-6 rounded-2xl">
      <section className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">Student Management</h1>
        <p className="text-sm">Create, update, delete parent access</p>
      </section>

      {/* Summary Metrics section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
        <SummaryCard
          label="Total Parent / Guardian"
          value={summaryData.totalParents}
          icon={"/graduationcap.svg"}
          textColor="#008080"
          bgColor="#BDFAFF4D"
        />
        <SummaryCard
          label="Male Students"
          value={summaryData.activeParents}
          icon={"/people.svg"}
          textColor="#FF9F43"
          bgColor="#FFAB5A33"
        />
        <SummaryCard
          label="Female Students"
          value={summaryData.pendingParents}
          icon={"/femalepeople.svg"}
          textColor="#6A24FF"
          bgColor="#6A24FF26"
        />
      </section>

      {/* Student Table */}
      <div className="bg-white rounded-xl p-4 space-y-4">
        <section className="my-6">
          <h2 className="text-lg text-gray-700 font-semibold">Student List</h2>
          <p className="text-sm mb-4">Manage students list and their profile</p>
          
          <GenericTable
            columns={studentColumns}
            rows={studentRows}
            totalCount={studentRows.length}
            pageSize={10}
            addNewTrigger={handlenewStudent}
            onBulkUpload={handleBulkUpload}
            actionHandlers={{
              onView: handleViewStudent,
              onDelete: handleDeleteStudent,
            }}
          />
        </section>
      </div>
    </div>
  );
}
