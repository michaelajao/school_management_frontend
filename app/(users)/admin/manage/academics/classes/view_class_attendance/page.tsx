"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, ChevronDown, ChevronUp, MoreVertical, Search, Users, FileText, GraduationCap, SlidersHorizontal, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const attendanceData = [
  { class: "Year 7A", teacher: "Samuel Olera" },
  { class: "Year 7B", teacher: "Betty Jacobs" },
  { class: "Year 7C", teacher: "Anthony Allen" },
  { class: "Year 8A", teacher: "Susan Oji" },
  { class: "Year 8B", teacher: "Annabella Adu" },
  { class: "Year 8C", teacher: "Justin Ogbo" },
  { class: "Year 9A", teacher: "Michael Aigbogu" },
  { class: "Year 9B", teacher: "Kore Ogbiei" },
  { class: "Year 9C", teacher: "Edward Cole" },
  { class: "Year 10A", teacher: "Elizabeth Ari" },
  { class: "Year 10B", teacher: "Elizabeth Ari" },
  { class: "Year 10C", teacher: "Justin Ogbo" }
];

const AttendancePage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Class Attendance Record</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-teal-50">
          <CardContent className="p-4 flex items-center gap-4">
            <FileText className="text-emerald-500" />
            <div>
              <p className="text-3xl font-bold text-emerald-500">18</p>
              <p className="text-sm text-emerald-500">Total Classes</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50">
          <CardContent className="p-4 flex items-center gap-4">
            <GraduationCap className="text-orange-500" />
            <div>
              <p className="text-3xl font-bold text-orange-500">17</p>
              <p className="text-sm text-orange-500">Total Class Teachers</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-4 flex items-center gap-4">
            <Users className="text-purple-500" />
            <div>
              <p className="text-3xl font-bold text-purple-500">1250</p>
              <p className="text-sm text-purple-500">Total Students</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <Input type="text" placeholder="Search" className="pl-10" />
          <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal size={16} />
            Filter
            <ChevronDown size={16} />
          </Button>
          <Button className="bg-[#028A82] text-white hover:bg-[#02726B] flex items-center gap-2">
            <Download size={16} /> Download Record
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Class
                  <div className="flex flex-col text-gray-400">
                    <ChevronUp className="w-3 h-3 -mb-1" />
                    <ChevronDown className="w-3 h-3 -mt-1" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Date
                  <div className="flex flex-col text-gray-400">
                    <ChevronUp className="w-3 h-3 -mb-1" />
                    <ChevronDown className="w-3 h-3 -mt-1" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Class Teacher
                  <div className="flex flex-col text-gray-400">
                    <ChevronUp className="w-3 h-3 -mb-1" />
                    <ChevronDown className="w-3 h-3 -mt-1" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Students Present
                  <div className="flex flex-col text-gray-400">
                    <ChevronUp className="w-3 h-3 -mb-1" />
                    <ChevronDown className="w-3 h-3 -mt-1" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <div className="flex items-center gap-1">
                  Students Absent
                  <div className="flex flex-col text-gray-400">
                    <ChevronUp className="w-3 h-3 -mb-1" />
                    <ChevronDown className="w-3 h-3 -mt-1" />
                  </div>
                </div>
              </TableHead>
              <TableHead className="whitespace-nowrap">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.class}</TableCell>
                <TableCell>26 March 2025</TableCell>
                <TableCell>{item.teacher}</TableCell>
                <TableCell className="text-green-600">20</TableCell>
                <TableCell className="text-red-500">4</TableCell>
                <TableCell>
                  <button onClick={() => {router.push('/(users)/admin/academics/classes/view_class_attendance/individual_attendance')}} className="hover:text-gray-700">
                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AttendancePage;