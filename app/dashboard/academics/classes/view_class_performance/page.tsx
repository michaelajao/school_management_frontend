'use client';

import { Download, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const attendanceData = [
  {
    student: "Emeka Okafor",
    date: "26 March 2025",
    class: "Year 7A",
    subject: "Mathematics",
    status: "Absent",
    avatar: "/avatar1.jpg",
  },
  {
    student: "Kemi Adebayo",
    date: "26 March 2025",
    class: "Year 7A",
    subject: "Mathematics",
    status: "Present",
    avatar: "/avatar2.jpg",
  },
  {
    student: "Ifeanyi Eze",
    date: "26 March 2025",
    class: "Year 7A",
    subject: "Mathematics",
    status: "Absent",
    avatar: "/avatar3.jpg",
  },
  {
    student: "Tolu Fatunmise",
    date: "26 March 2025",
    class: "Year 7A",
    subject: "Mathematics",
    status: "Present",
    avatar: "/avatar4.jpg",
  },
];

const studentRecord = [
  {
    subject: "Mathematics",
    date: "03 March 2025",
    class: "Year 7A",
    status: "Present",
  },
  {
    subject: "English",
    date: "04 March 2025",
    class: "Year 7A",
    status: "Absent",
  },
  {
    subject: "Biology",
    date: "05 March 2025",
    class: "Year 7A",
    status: "Present",
  },
  {
    subject: "Physics",
    date: "06 March 2025",
    class: "Year 7A",
    status: "Absent",
  },
];

export default function AttendancePage() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [absenceNote, setAbsenceNote] = useState("");
  const router = useRouter();

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Attendance Record Section */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Attendance Record</h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              <SlidersHorizontal size={16} />
              <ChevronDown size={16} />
              Filter
            </button>
            <button className="bg-[#028A82] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
              <Download size={16} className="inline mr-1" />
              Download Record
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((row, idx) => (
                <tr onClick={() => {router.push('/dashboard/academics/classes/view_class_performance/individual')}} key={idx} className="border-b cursor-pointer">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Image src={row.avatar} alt="avatar" width={24} height={24} className="rounded-full" />
                    {row.student}
                  </td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.class}</td>
                  <td className="px-4 py-3">{row.subject}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        row.status === "Absent" ? "text-red-500" : "text-green-600"
                      } font-medium`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Attendance Section */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Individual Student Attendance Record</h2>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              <SlidersHorizontal size={16} />
              <ChevronDown size={16} />
              Filter
            </button>
            <button onClick={() => {router.push('/dashboard/academics/classes/view_class_performance/individual')}} className="bg-[#028A82] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90">
              {/* <Download size={16} className="inline mr-1" /> */}
              View Attendance Record
            </button>
          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3">Subject Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentRecord.map((row, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-3">{row.subject}</td>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.class}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        row.status === "Absent" ? "text-red-500" : "text-green-600"
                      } font-medium`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Parent Notification Form */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Parent Absence Notification</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-600">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            >
              <option>Select Student</option>
              <option value="Emeka Okafor">Emeka Okafor</option>
              <option value="Kemi Adebayo">Kemi Adebayo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Add Note</label>
            <textarea
              rows={4}
              value={absenceNote}
              onChange={(e) => setAbsenceNote(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
              placeholder="Write message here"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#028A82] text-white px-6 py-2 rounded-lg hover:opacity-90"
          >
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
} 