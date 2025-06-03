/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeft, Pencil } from "lucide-react";
// import Image from 'next/image';
import { useState } from "react";

import StaffInfo from "@/components/StaffDashboard/StaffInfo";
import { useRouter } from "next/navigation";
import { DeleteModal } from "@/components/StaffDashboard/DeleteModal";

export default function ManageStaffPage() {
  const [role, setRole] = useState("Subject Teacher");
  // console.log(role)

  const router = useRouter();
  const editstaff = () => {
    router.push("/admin/manage/staff/editstaff");
  }


  return (
    <div className="max-w-5xl mx-auto mt-2 bg-[#F5F5F5] rounded-xl shadow p-8 space-y-6">
      <div className="flex items-center font-semibold text-[#4A4A4A] cursor-pointer" onClick={() => window.history.back()}>
        <ChevronLeft />
        Manage Staff
      </div>
      <div className="max-w-5xl mx-auto mt-2 bg-white rounded-xl shadow p-8 space-y-6">

        <div>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <img
              src="https://ui-avatars.com/api/?name=Amy+Johnson&background=0D8ABC&color=fff"
              alt="opp"
              className="rounded-full w-12 h-12"
            />
            <p className="text-center justify-center py-3">Amy Johnson</p>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-2 mt-2">
            <DeleteModal />
            <button onClick={editstaff} className="flex items-center justify-center bg-[#008080] text-white rounded-lg px-1 py-1 text-sm md:w-1/6 cursor-pointer">
              <Pencil className="mr-2"  /> Edit Info

            </button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-medium">Switch Role</span>
          <select
            className="px-3 py-1 border rounded bg-[#EBFEFF] text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Subject Teacher</option>
            <option>Class Teacher</option>
            <option>Admin</option>
          </select>
        </div>
        <StaffInfo />
      </div>
    </div>
  );
}



