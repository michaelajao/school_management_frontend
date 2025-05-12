"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, ChevronDown, MoreVertical, SlidersHorizontal } from "lucide-react";

const studentAttendance = [
  { date: "01/03/2025", name: "Oluwatoyin Ahmed", gender: "Female", timeIn: "7:45AM", timeOut: "1:40PM", status: "Present", reason: "" },
  { date: "01/03/2025", name: "Ebuka Onyema", gender: "Male", timeIn: "7:40AM", timeOut: "1:42PM", status: "Present", reason: "" },
  { date: "01/03/2025", name: "Fatima Mohammed", gender: "Female", timeIn: "7:50AM", timeOut: "1:38PM", status: "Present", reason: "" },
  { date: "01/03/2025", name: "Adaeze Nwankwo", gender: "Female", timeIn: "-", timeOut: "-", status: "Absent", reason: "On permission" },
  { date: "01/03/2025", name: "John Adeyemi", gender: "Male", timeIn: "-", timeOut: "-", status: "Absent", reason: "Sick" },
  { date: "01/03/2025", name: "Sarah Olumide", gender: "Female", timeIn: "7:55AM", timeOut: "1:43PM", status: "Present", reason: "" },
  { date: "01/03/2025", name: "Mohammed Yusuf", gender: "Male", timeIn: "7:35AM", timeOut: "1:37PM", status: "Present", reason: "" },
  { date: "01/03/2025", name: "Juliet Akpan", gender: "Female", timeIn: "-", timeOut: "-", status: "Absent", reason: "Sick" },
];

const subjectAttendance = [
  { time: "08:00AM", subject: "Mathematics", present: true },
  { time: "09:00AM", subject: "English", present: true },
  { time: "10:00AM", subject: "Biology", present: false },
  { time: "11:00AM", subject: "Chemistry", present: false },
  { time: "12:00PM", subject: "Physics", present: true },
  { time: "01:00PM", subject: "Geography", present: true },
];

export default function AttendancePage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Year 7A Attendance Record</h2>
        <Button className="bg-[#028A82] text-white hover:bg-[#027268] flex items-center gap-2">
          <Download size={16} /> Download
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md">
          <Input placeholder="Search" className="pl-10" />
          <Search className="absolute top-2.5 left-3 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal size={16} /> Filter <ChevronDown size={16} />
          </Button>
        </div>
      </div>

      {/* Student Attendance Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Time In</TableHead>
              <TableHead>Time Out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentAttendance.map((student, i) => (
              <TableRow key={i}>
                <TableCell>{student.date}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell>{student.timeIn}</TableCell>
                <TableCell>{student.timeOut}</TableCell>
                <TableCell className={student.status === "Present" ? "text-green-600" : "text-red-500"}>{student.status}</TableCell>
                <TableCell>{student.reason}</TableCell>
                <TableCell>
                  <button>
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Footer - EXACT MATCHED STYLING */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6 text-sm text-gray-600">
  {/* Left: "Showing x to y of z entries" */}
  <div className="flex items-center gap-2">
    <label htmlFor="entries" className="text-gray-700">Show</label>
    <select
      id="entries"
      className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
    >
      <option>10</option>
      <option>20</option>
      <option>50</option>
    </select>
    <span className="text-gray-700">entries</span>
  </div>

  {/* Right: Pagination controls */}
  <div className="flex items-center space-x-1">
    <button className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200">
      Previous
    </button>
    <button className="px-3 py-1 border rounded-md bg-[#028A82] text-white font-medium">
      1
    </button>
    <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
      2
    </button>
    <button className="px-3 py-1 border rounded-md hover:bg-gray-100">
      3
    </button>
    <button className="px-3 py-1 border rounded-md bg-gray-100 hover:bg-gray-200">
      Next
    </button>
  </div>
</div>


      {/* Subject Attendance Detail */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Subject Attendance Detail</h3>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Showing 1 to 6 of 6 entries</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="default" size="sm">Next</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Present/Absent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjectAttendance.map((subject, i) => (
                <TableRow key={i}>
                  <TableCell>{subject.time}</TableCell>
                  <TableCell>{subject.subject}</TableCell>
                  <TableCell className={subject.present ? "text-green-600" : "text-red-500"}>
                    {subject.present ? "✔" : "✖"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Parent Absence Notification */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Parent Absence Notification</h3>
        <div className="grid gap-4 max-w-xl">
          <select className="border p-2 rounded-md">
            <option>Choose student to notify (3 Absences)</option>
            <option>Adaeze Nwankwo</option>
            <option>Juliet Akpan</option>
            <option>John Adeyemi</option>
          </select>
          <Input placeholder="Parent Email" type="email" />
          <textarea placeholder="Write your message..." className="border p-3 rounded-md h-32"></textarea>
          <Button className="bg-[#028A82] text-white hover:bg-[#027268] w-full">
            Send Notification
          </Button>
        </div>
      </div>
    </div>
  );
}