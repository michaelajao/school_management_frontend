/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useState } from "react";
import { Plus, SearchIcon, SlidersHorizontal, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CustomButton } from '@/components/shared/CustomButton.';
import { GenericTable } from '@/components/ui/GenericTable';

const staffData = [
    {
        name: "Amy Johnson",
        image: "",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Amy+Johnson&background=008080&color=fff",
    },
    {
        name: "Benita Johnson",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Biology",
        imageUrl:
            "https://ui-avatars.com/api/?name=Benita+Johnson&background=008080&color=fff",
    },
    {
        name: "Samuel Okoro",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Samuel+Okoro&background=008080&color=fff",
    },
    {
        name: "Samuel Okoro",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Samuel+Okoro&background=008080&color=fff",
    },
    {
        name: "Benita Johnson",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Biology",
        imageUrl:
            "https://ui-avatars.com/api/?name=Benita+Johnson&background=008080&color=fff",
    },
    {
        name: "Amy Johnson",
        image: "",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Amy+Johnson&background=008080&color=fff",
    },
    {
        name: "Benita Johnson",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Biology",
        imageUrl:
            "https://ui-avatars.com/api/?name=Benita+Johnson&background=008080&color=fff",
    },
    {
        name: "Samuel Okoro",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Samuel+Okoro&background=008080&color=fff",
    },
    {
        name: "Samuel Okoro",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Mathematics",
        imageUrl:
            "https://ui-avatars.com/api/?name=Samuel+Okoro&background=008080&color=fff",
    },
    {
        name: "Benita Johnson",
        email: "jennyjohnson@gmail.com",
        role: "Subject Teacher",
        assigned: "Biology",
        imageUrl:
            "https://ui-avatars.com/api/?name=Benita+Johnson&background=008080&color=fff",
    },

];

const StaffListTable = () => {
    const [position, setPosition] = useState("subject-teacher")
    const router = useRouter();

    const managestaff = () => {
        router.push("/users/admin/manage/staff/managestaff");
    }

    const addstaff = () => {
        router.push("/users/admin/manage/staff/addstaff");
    }

    const handleBulkUpload = () => {
        console.log("Bulk uploading CSV...");
        router.push('/users/admin/data-upload');
    };



    // For generic table
    const columns = [
  {
    accessor: "name",
    header: "Name",
    cell: (row) => (
      <div className="flex items-center gap-2">
        <img
          src={row.imageUrl}
          alt={row.name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-xs md:text-sm px-2 md:px-0">
          {row.name}
        </span>
      </div>
    ),
  },
  {
    accessor: "email",
    header: "Email",
  },
  {
    accessor: "role",
    header: "Role",
    cell: (row) => (
      <select className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-lg border border-blue-200">
        <option>{row.role}</option>
      </select>
    ),
  },
  {
    accessor: "assigned",
    header: "Assigned",
  },
];

    const rows = staffData;


    return (
        <div className='bg-[#fff] rounded-md mt-4 p-4'>
            <div>
                <p className="text-2xl font-bold py-0.5">Staff Lists</p>
                <h3 className="mb-5">
                    Create, update, delete and assign roles to staff
                </h3>
            </div>
            {/* 
            <div className="">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4  mx-0 px-1 relative ">
                    <div className="w-full relative">
                        <input
                            type="text"
                            className="w-full rounded-md bg-[#fff] border border-[#000] px-8 py-2 md:w-full md:text-sm"
                            placeholder="Search by Name, School ID, or Department"
                        />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <SearchIcon className="w-4 mx-2" />
                        </span>
                    </div>

                    <div className="w-full flex flex-col md:flex-row gap-2">
                        <button className="flex items-center justify-start gap-4 border border-gray-300 rounded-lg px-4 py-1 text-sm md:w-1/3 cursor-pointer">
                            <SlidersHorizontal className="w-4 h-4" />
                            Filter
                        </button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <CustomButton
                                    variant="outline"
                                    size="sm"
                                    icon={<Plus />}
                                    className="w-[135px] h-[50px] rounded-[10px] border-[0.5px] border-[#008080] text-[#008080] text-[10px] hover:bg-[#008080] hover:text-[#fff]"
                                >
                                    Add New Staff
                                </CustomButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent side="bottom" align="start" className="w-56">
                                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                                    <DropdownMenuRadioItem value="subject-teacher" onClick={addstaff}>Subject Teacher</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="class-teacher">Class Teacher</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <CustomButton
                            variant="default"
                            size="sm"
                            icon={<Upload />}
                            className="w-[138px] h-[50px] rounded-[10px] border-[0.5px] border-[#008080] text-[#fff] text-[10px]"
                        >
                            Bulk Upload (CSV)
                        </CustomButton>
                    </div>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="border-b text-left text-sm text-gray-600">
                                <th className="p-3">Name</th>

                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Assigned</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffData.map((staff, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <img
                                            src={staff.imageUrl}
                                            alt={staff.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-xs md:text-sm px-2 md:px-0">
                                            {staff.name}
                                        </span>
                                    </td>
                                    <td className="p-3 text-sm text-gray-700">{staff.email}</td>
                                    <td className="p-3">
                                        <select className="bg-blue-50 text-blue-700 text-sm px-2 py-1 rounded-lg border border-blue-200">
                                            <option>{staff.role}</option>
                                        </select>
                                    </td>
                                    <td className="p-3 text-sm text-gray-700">
                                        {staff.assigned}
                                    </td>
                                    <td className="mx-4 text-center">
                                        <button className="text-xl text-gray-400 cursor-pointer " onClick={managestaff}>⋯</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-sm text-gray-600 gap-2 sm:gap-0">
                <span>Showing 12 from 160 data</span>
                <div className="flex flex-wrap items-center gap-1">
                    <CustomButton
                        variant="ghost"
                        size="sm"
                        className="w-[114px] h-[40px] rounded-[3.75px] border-[0.5px] border-[#969A9EFE] text-[#fff] text-[10px]"
                    >
                        ❮❮ Previous
                    </CustomButton>
                    <div className=''>

                        <Button className="w-[43px] h-[39px] px-3 py-1 rounded bg-white text-black">
                            1
                        </Button>
                        <Button className="px-3 py-1 rounded bg-[#E4E4ED] text-[#7A7575]">2</Button>
                        <Button className="px-3 py-1 rounded bg-[#E4E4ED] text-[#7A7575]">3</Button>
                        <Button className="px-3 py-1 rounded bg-[#E4E4ED] text-[#7A7575]">4</Button>
                    </div>

                    <CustomButton
                        variant="default"
                        size="sm"
                        className="w-[86px] h-[40px] rounded-[3.75px] border-[0.5px] border-[#008080] text-[#fff] text-[10px]"
                    >
                        Next ❯❯
                    </CustomButton>
                </div>
            </div>
            */}
            <GenericTable 
                columns={columns} 
                rows={rows}
                addNewTrigger={addstaff}
                onBulkUpload={handleBulkUpload}
                actionHandlers={{
                    onView: managestaff,
                }}
                 />
        </div>
    )
}

export default StaffListTable