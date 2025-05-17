"use client";

import { CustomButton } from "@/components/generalComp/custom-button.";
import Chart from "@/components/StaffDashboard/Chart";
import { DashboardMetrics } from "@/components/StaffDashboard/DashboardMetrics";
import StaffListTable from "@/components/StaffDashboard/StaffListTable";
import { useRouter } from "next/navigation";


const StaffDashboardPage = () => {
  const router = useRouter();
  const attendance = () => {
    router.push("/dashboard/users/staff/attendancerecords");

  }
  return (
    <div className="flex bg-[#F5F5F5] rounded-2xl min-h-screen w-full flex-col p-4">
      <p className="text-2xl font-bold py-0.5">Staff Management</p>
      <h3 className="mb-5">Create, update, delete and assign roles to staff</h3>
      <div>
        <section className="space-y-2">
          <DashboardMetrics />
        </section>
      </div>

      <div className="min-h-screen bg-[#F5F5F5] mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium mb-2">
                Staff Attendance Summary
              </h3>
              <CustomButton
                variant="default"
                onClick={attendance}
                size="sm"
                className="h-[36px] rounded-[10px] border-[0.5px] border-[#008080] text-[#fff]"
              >
                View Attendance Record
              </CustomButton>
            </div>
            <p className="text-sm text-center text-gray-500 py-4">
              2nd Term 2024/2025 Academic Session
            </p>

            <div className="bg-gray-100 rounded-lg h-60 mb-6 flex items-center justify-center">
              <Chart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-lg font-semibold mb-1">Staff Attendance</h2>
            <p className="text-sm text-gray-500 mb-4">March 23, 2025 10:41AM</p>

            <select className="w-full border border-gray-300 rounded-md p-2 mb-4">
              <option>Select Staff</option>
            </select>
            <CustomButton
              variant="default"
              size="sm"
              className="w-full h-[48px] rounded-[10px] text-[#fff]"
            >
              Time In
            </CustomButton>

            <CustomButton
              variant="ghost"
              size="sm"
              className="w-full h-[48px] rounded-[10px] my-8"
            >
              Time Out
            </CustomButton>
          </div>
        </div>
        <StaffListTable />
      </div>
    </div>
  );
};

export default StaffDashboardPage;
