'use client'
import React from 'react'
import { SearchIcon, SlidersHorizontal, Upload } from "lucide-react";



const attendanceData = [
    {
        date: "01 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Present",
        reason: "N/A",
    },
    {
        date: "02 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Present",
        reason: "N/A",
    },
    {
        date: "03 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Absent",
        reason: "Sick Leave",
    },
    {
        date: "04 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Present",
        reason: "N/A",
    },
    {
        date: "05 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Absent",
        reason: "Sick Leave",
    },
    {
        date: "06 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Present",
        reason: "N/A",
    },
    {
        date: "07 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Late",
        reason: "Traffic",
    },
    {
        date: "08 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Absent",
        reason: "Doctor's Appointment",
    },
    {
        date: "09 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Absent",
        reason: "Late",
    },
    {
        date: "10 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Present",
        reason: "N/A",
    },
    {
        date: "11 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Absent",
        reason: "N/A",
    },
    {
        date: "12 September 2024",
        name: "Franklin Akhabue",
        timeIn: "08:45 AM",
        timeOut: "04:05 PM",
        status: "Late",
        reason: "Traffic",
    },
];

const AttendanceTable = () => {
    return (
        <div>
            <div className="min-h-screen bg-[#fff] rounded-md mt-6 px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 py-3  mx-0 px-1 relative ">
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
                        <button className="flex items-center justify-center bg-[#008080] text-white rounded-lg px-4 py-1 text-sm md:w-1/3 cursor-pointer">
                            <Upload className="mr-2" />
                            <h6>Download Log</h6>
                        </button>
                    </div>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="border-b text-left text-sm text-gray-600">
                                <th className="p-3">Date</th>
                                <th className="p-3">Staff Name</th>
                                <th className="p-3">Time In</th>
                                <th className="p-3">Time Out</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((staff, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3 text-sm text-gray-700">{staff.date}</td>
                                    <td className="p-3 text-sm text-gray-700">{staff.name}</td>
                                    <td className="p-3 text-sm text-gray-700">{staff.timeIn}</td>
                                    <td className="p-3 text-sm text-gray-700">{staff.timeOut}</td>
                                    <td
                                        className={`p-3 text-sm text-gray-700 ${staff.status === 'Present'
                                                ? 'text-green-900'
                                                : staff.status === 'Absent'
                                                    ? 'text-red-900'
                                                    : staff.status === 'Late'
                                                        ? 'text-yellow-900'
                                                        : ''
                                            }`}
                                    >
                                        {staff.status}
                                    </td>
                                    <td className="p-3 text-sm text-gray-700">{staff.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 text-sm text-gray-600 gap-2 sm:gap-0">
                    <span>Showing 12 from 160 data</span>
                    <div className="flex flex-wrap items-center gap-1">
                        <button className="px-3 py-1 rounded bg-gray-200 text-gray-600">
                            ❮ Previous
                        </button>
                        <button className="px-3 py-1 rounded bg-gray-800 text-white">
                            1
                        </button>
                        <button className="px-3 py-1 rounded bg-gray-100">2</button>
                        <button className="px-3 py-1 rounded bg-gray-100">3</button>
                        <button className="px-3 py-1 rounded bg-gray-100">4</button>
                        <button className="px-3 py-1 rounded bg-[#008080] text-white">
                            Next ❯
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceTable