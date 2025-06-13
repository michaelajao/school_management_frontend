"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { GenericTable, Column } from "@/components/ui/GenericTable";
import { DashboardMetrics } from "@/components/shared/DashboardMetrics";
import { GraduationCap } from 'lucide-react'

// Define Student interface
interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  [key: string]: unknown;
}

export interface StudentManagementClientProps {
  summaryData: {
    totalParents: number;
    activeParents: number;
    pendingParents: number;
  };
  studentColumns: Column<Student>[];
  studentRows: Student[];
}

export default function StudentManagementClient({ 
    summaryData, 
    studentColumns, 
    studentRows
}: StudentManagementClientProps) {
  const router = useRouter();
  const [globalLoading, setGlobalLoading] = useState(false);

  const studentMetrics = [
    {
      icon: GraduationCap,
      label: "Total Students",
      value: summaryData.totalParents,
      primaryColor: "#008080",
      secondaryColor: "#BDFAFF4D"
    },
    {
      icon: '/icons/people.svg',
      label: "Male Students",
      value: summaryData.activeParents,
      primaryColor: "#FF9F43",
      secondaryColor: "#FFAB5A33"

    },
    {
      icon: '/icons/femalepeople.svg',
      label: "Female Students",
      value: summaryData.pendingParents,
      primaryColor: "#6A24FF",
      secondaryColor: "#6A24FF26",
    }
  ]

  const handlenewStudent = useCallback(() => {
    router.push("/admin/manage/students/addnew");
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
    router.push(`/admin/manage/students/${row.id}`);
  }, [router]);

  return (
    <div className="bg-zinc-100 p-6 rounded-2xl">
      <section className="mb-4">
        <h1 className="text-xl font-bold text-gray-700">Student Management</h1>
        <p className="text-sm">Create, update, delete parent access</p>
      </section>

      {/* Summary Metrics section */}
      <div className="my-6">
        <DashboardMetrics metrics={studentMetrics} />
      </div>


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
