'use client';

import {
  Search,
  Download,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

export default function AttendancePage() {
  const attendanceData = [
    { date: '21 September 2024', timeIn: '8:00AM', timeOut: '4:00PM', status: 'Present', reason: '' },
    { date: '22 September 2024', timeIn: '', timeOut: '', status: 'Absent', reason: 'Sick leave' },
    { date: '23 September 2024', timeIn: '8:00AM', timeOut: '4:00PM', status: 'Present', reason: '' },
    { date: '24 September 2024', timeIn: '', timeOut: '', status: 'Absent', reason: 'Sick leave' },
    { date: '25 September 2024', timeIn: '8:00AM', timeOut: '4:00PM', status: 'Present', reason: '' },
    { date: '26 September 2024', timeIn: '', timeOut: '', status: 'Absent', reason: 'Sick leave' },
    { date: '27 September 2024', timeIn: '8:00AM', timeOut: '4:00PM', status: 'Present', reason: '' },
    { date: '28 September 2024', timeIn: '', timeOut: '', status: 'Absent', reason: 'Sick leave' },
  ];

  const subjectAttendance = [
    { subject: 'Mathematics', status: 'Present' },
    { subject: 'English', status: 'Present' },
    { subject: 'Basic Science', status: 'Absent' },
    { subject: 'Civic Education', status: 'Present' },
    { subject: 'Agricultural Science', status: 'Present' },
    { subject: 'Social Studies', status: 'Absent' },
    { subject: 'Computer Studies', status: 'Present' },
    { subject: 'Cultural & Creative Art', status: 'Present' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      {/* Student Attendance Record */}
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-semibold">Franklin Okohaube’s Attendance Record</h1>
            <div className="flex space-x-2">
                <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                    placeholder="Search"
                    className="pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none"
                />
                </div>
                <button className="flex items-center px-3 py-2 border rounded-md text-sm text-gray-600">
                <SlidersHorizontal size={16} className="mr-1" />
                <ChevronDown size={16} />
                </button>
                <button className="bg-[#028A82] text-white px-4 py-2 rounded-md text-sm flex items-center">
                <Download size={16} className="mr-2" />
                Download Record
                </button>
            </div>
            </div>
            <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-gray-500 bg-gray-100">
                <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time In</th>
                    <th className="px-4 py-2">Time Out</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Reason</th>
                </tr>
                </thead>
                <tbody>
                {attendanceData.map((entry, i) => (
                    <tr key={i} className="border-b last:border-none">
                    <td className="px-4 py-2">{entry.date}</td>
                    <td className="px-4 py-2">{entry.timeIn || '--'}</td>
                    <td className="px-4 py-2">{entry.timeOut || '--'}</td>
                    <td className="px-4 py-2">
                        <span
                        className={`${
                            entry.status === 'Present' ? 'text-green-600' : 'text-red-500'
                        } font-medium`}
                        >
                        {entry.status}
                        </span>
                    </td>
                    <td className="px-4 py-2">{entry.reason || '--'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {/* Pagination */}
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

        </div>

      {/* Subject Attendance Detail */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold">Subject Attendance Detail</h2>
                <div className="flex space-x-2">
                    <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                    <input
                        placeholder="Search"
                        className="pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none"
                    />
                    </div>
                    <button className="flex items-center px-3 py-2 border rounded-md text-sm text-gray-600">
                    <SlidersHorizontal size={16} className="mr-1" />
                    <ChevronDown size={16} />
                    </button>
                </div>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-500 bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Subject</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subjectAttendance.map((entry, idx) => (
                        <tr key={idx} className="border-b">
                        <td className="px-4 py-2">{entry.subject}</td>
                        <td className="px-4 py-2 text-sm font-medium text-left">
                            <span
                            className={`${
                                entry.status === 'Present' ? 'text-green-600' : 'text-red-500'
                            }`}
                            >
                            {entry.status}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

      {/* Parent Absence Notification */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-base font-semibold mb-4">Parent Absence Notification</h2>
                <form className="space-y-4">
                <div>
                    <input
                    type="email"
                    placeholder="Enter Parent’s Email"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                    />
                </div>
                <div>
                    <select className="w-full border px-4 py-2 rounded-md text-sm">
                    <option>Subject (Optional)</option>
                    <option>Mathematics</option>
                    <option>English</option>
                    </select>
                </div>
                <div>
                    <textarea
                    rows={4}
                    placeholder="Add Note"
                    className="w-full border px-4 py-2 rounded-md text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#028A82] text-white px-6 py-2 rounded-md text-sm hover:opacity-90"
                >
                    Send Notification
                </button>
                </form>
            </div>
    </div>
  );
}