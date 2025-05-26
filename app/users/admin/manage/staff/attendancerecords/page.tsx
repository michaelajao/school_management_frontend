"use client";
import AttendanceTable from "@/components/StaffDashboard/AttendanceTable";
import { ChevronLeft } from "lucide-react";


const AttendanceRecords = () => {

  return (
    <div className="flex bg-[#F5F5F5] rounded-2xl min-h-screen w-full flex-col p-4">
        <div className="flex items-center font-semibold text-[#4A4A4A] cursor-pointer" onClick={() => window.history.back()}>
          <ChevronLeft />
          <p className="text-2xl font-bold py-0.5">Staff Attendance Record</p>
        </div>
        <div className="min-h-screen bg-[#F5F5F5] ">
          <AttendanceTable />
        </div>
      
    </div>
  );
};

export default AttendanceRecords;
