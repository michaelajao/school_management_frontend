// File: app/dashboard/users/students/page.tsx (Server Component)
import { getParents } from "@/lib/utils";
import { parents, studentColumns, studentRows } from "@/lib/fakeData";
import StudentManagementClient from "@/components/admin/students/StudentManagementClient";

export default async function StudentManagementPage() {
  // Data fetching happens on the server
  const { active, pending } = getParents(parents);
  
  const summaryData = {
    totalParents: active.length + pending.length,
    activeParents: active.length,
    pendingParents: pending.length
  };

  return (
    <StudentManagementClient
      summaryData={summaryData} 
      studentColumns={studentColumns}
      studentRows={studentRows}
    />
  );
}