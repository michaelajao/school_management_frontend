"use client";
import StaffListTable from "@/components/StaffDashboard/StaffListTable";
import { useRouter } from "next/navigation";
import { DashboardMetrics } from '@/components/shared/DashboardMetrics'
import { TeacherIcon } from 'hugeicons-react'
import { FileUser } from "lucide-react";
import Attendance from "@/components/shared/Attendance";


const StaffDashboardPage = () => {
  const router = useRouter();
  const attendance = () => {
    router.push("/dashboard/users/staff/attendancerecords");

  }
  const staffMetrics = [
           {                    
            icon: '/icons/pass-valid-line.svg',
            value: 78,
            label: 'Total Staff',
            primaryColor: '#008080',
            secondaryColor: '#BDFAFF4D',
        },
        {
            icon: TeacherIcon,
            value: 52,
            label:"Total Teaching Staff",
            primaryColor: "#FF9F43",
            secondaryColor: "#FFAB5A33",
        }, 
        {
            icon: FileUser,
            value: 26,
            label: "Total Non-Teaching Staff",
            primaryColor: "#6e49f6",
            secondaryColor: "#e1d2fc"
        }
  ]


  return (
    <div className="flex bg-[#F5F5F5] rounded-2xl min-h-screen w-full flex-col p-4">
      <p className="text-2xl font-bold py-0.5">Staff Management</p>
      <h3 className="mb-5">Create, update, delete and assign roles to staff</h3>
      <div>
          <DashboardMetrics metrics={staffMetrics} />
      </div>

      <div className="min-h-screen bg-[#F5F5F5] mt-6">
        {/* Ideally you can pass your data to attendance and it will handle the rest */}
        <Attendance />

        {/* Staff Table */}
        <StaffListTable />
      </div>
    </div>
  );
};

export default StaffDashboardPage;
