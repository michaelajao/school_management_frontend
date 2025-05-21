"use client";
import React, { JSX, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { AlarmClock, ChevronRight, GraduationCap, IdCard, Plus, Users } from "lucide-react";
import { SummaryCard } from "./parents/SummaryCard";
import { PiPercentBold } from "react-icons/pi";

import { ChevronRight, GraduationCap, IdCard, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { Checkbox } from "@radix-ui/react-checkbox";

const attendanceData = [
  { month: "Jan", value: 70 },
  { month: "Feb", value: 85 },
  { month: "Mar", value: 70 },
  { month: "Apr", value: 95 },
  { month: "May", value: 0 },
  { month: "Jun", value: 45 },
  { month: "Jul", value: 30 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 10 },
  { month: "Nov", value: 10 },
  { month: "Dec", value: 10 },
  { month: "Jul", value: 30 },
  { month: "Aug", value: 0 },
  { month: "Sep", value: 20 },
  { month: "Oct", value: 10 },
  { month: "Nov", value: 10 },
  { month: "Dec", value: 10 },
];

const financialData = [
  { month: "Jan", income: 290000, expenses: 190000 },
  { month: "Feb", income: 210000, expenses: 140000 },
  { month: "Mar", income: 120000, expenses: 140000 },
  { month: "Apr", income: 90000, expenses: 40000 },
  { month: "May", income: 0, expenses: 0 },
  { month: "Jun", income: 0, expenses: 0 },
];
  { month: "Jan", income: 290000, expenses: 190000 },
  { month: "Feb", income: 210000, expenses: 140000 },
  { month: "Mar", income: 120000, expenses: 140000 },
  { month: "Apr", income: 90000, expenses: 40000 },
  { month: "May", income: 0, expenses: 0 },
  { month: "Jun", income: 0, expenses: 0 },
];

const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return `${value}`;
};
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return `${value}`;
};


/**
 * A custom tooltip component for recharts.
 *
 * @param {{ active: boolean, payload: { value: number }[] | null }} props
 * @returns {JSX.Element | null}
 */
const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: { value: number }[] | null;
}): JSX.Element | null => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-teal-600 text-white p-2 rounded shadow-md">
        <p className="text-center font-bold">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Sample announcement data
// Sample announcement data
const announcements = [
  {
    id: 1,
    content: "Cultural Day is this Friday! Don't forget to dress accordingly.",
    date: "07 Jun 2025, 12:32PM",
  },
  {
    id: 2,
    content: "Cultural Day is this Friday! Don't forget to dress accordingly.",
    date: "07 Jun 2025, 12:32PM",
  },
  {
    id: 3,
    content: "School closes early tomorrow – Check your updated timetable.",
    date: "07 Jun 2025, 12:32PM",
    highlight: {
      text: "859.9",
      prefix: "415",
    },
  },
  {
    id: 4,
    content: "Cultural Day is this Friday! Don't forget to dress accordingly.",
    date: "07 Jun 2025, 12:32PM",
  },
  {
    id: 5,
    content: "School closes early tomorrow – Check your updated timetable.",
    date: "07 Jun 2025, 12:32PM",
  },
];

// Events data
const events = [
  {
    id: 1,
    title: "Inter-House Sports – April 28",
  },
  {
    id: 2,
    title: "Mid-Term Test Week – May 6–10",
  },
];

const AdminDashboard = () => {
  const [selectedRole, setSelectedRole] = useState('Subject Teacher');

  const handleRoleChange = (role: React.SetStateAction<string>) => {
    setSelectedRole(role);
  };
  return (
    <>
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card>
          <CardContent className="p-4 text-center flex flex-row justify-around items-center">
            <span className="bg-[#BDFAFF] bg-opacity-30 rounded-full p-2">
              <GraduationCap size={40} color="#008080" />
            </span>{" "}
            <span>
              <p className="text-xl text-[#008080] font-bold">1,250</p>
              <p className=" text-sm text-[#008080]">Total Students</p>
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center flex flex-row justify-around items-center">
            <span className="bg-[#FFAB5A33] bg-opacity-30 rounded-full p-2">
              <IdCard size={40} color="#FF9F43" />
            </span>
            <span>
              <p className="text-xl font-bold text-[#FF9F43]">78</p>
              <p className="text-sm text-[#FF9F43]">Total Staff</p>
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center flex flex-row justify-around items-center">
            <span className="bg-[#28C76F33] bg-opacity-30 rounded-full p-2">
              <IdCard size={40} color="#28C76F" />
              <IdCard size={40} color="#28C76F" />
            </span>
            <span>
              <p className="text-xl font-bold text-[#28C76F]">78%</p>
              <p className=" text-sm text-[#28C76F]">Total Fee Paid</p>
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center flex flex-row justify-around items-center">
            <span className="bg-[#FFDDDE80] bg-opacity-60 rounded-full p-2">
            <span className="bg-[#FFDDDE80] bg-opacity-60 rounded-full p-2">
              <IdCard size={40} color="#EF1A36" />
            </span>
            <span className="text-[#EF1A36]">
              <p className="text-xl font-bold ">5</p>
              <p className="text-xs">Pending Approvals</p>
            </span>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap mb-6">
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-[#FF9F43] rounded-r-none border-r-0">
            Add New User
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-56 z-10 px-4 py-2 space-y-2 shadow-2xl rounded-b-2xl">
          <DropdownMenuItem className="flex items-center hover:bg-gray-50">
            <div className="w-5 h-5 rounded-full border border-cyan-500 flex items-center justify-center mr-2">
              {selectedRole === 'Subject Teacher' && (
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              )}
            </div>
            <Link 
              href="/dashboard/users/staff/addstaff"
              onClick={() => handleRoleChange('Subject Teacher')}
              className="flex-1"
            >
              Subject Teacher
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center hover:bg-gray-50">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedRole === 'Class Teacher' && (
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              )}
            </div>
            <Link 
              href="/dashboard/users/staff/addstaff"
              onClick={() => handleRoleChange('Class Teacher')}
              className="flex-1"
            >
              Class Teacher
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center hover:bg-gray-50">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedRole === 'Parent' && (
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              )}
            </div>
            <Link 
              href="/dashboard/users/parents/add"
              onClick={() => handleRoleChange('Parent')}
              className="flex-1"
            >
              Parent
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center hover:bg-gray-50">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedRole === 'Student' && (
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              )}
            </div>
            <Link 
              href="/dashboard/users/students"
              onClick={() => handleRoleChange('Student')}
              className="flex-1"
            >
              Student
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="flex items-center hover:bg-gray-50">
            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center mr-2">
              {selectedRole === 'Admin' && (
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              )}
            </div>
            <Link 
              href="/dashboard/users/staff/addstaff"
              onClick={() => handleRoleChange('Admin')}
              className="flex-1"
            >
              Admin
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
            <Button variant="outline" className="text-[#28C76F]">
              Assign Class Teacher
            </Button>
            <Button variant="outline" className="text-[#8B5CF6]">
              Update Payment Record
            </Button>
          </div>

          {/* Attendance Summary & Staff Attendance */}
          <div className=" ">
            <Card className="md:col-span-2 mb-10">
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Monthly" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="students">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Students" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-52 w-full overflow-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={attendanceData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#60a5fa"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#60a5fa"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280" }}
                      />
                      <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280" }}
                      />
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        stroke="#f3f4f6"
                      />
                      <Tooltip
                        content={
                          <CustomTooltip active={false} payload={null} />
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="url(#colorValue)"
                        activeDot={{
                          r: 6,
                          stroke: "#3b82f6",
                          strokeWidth: 2,
                          fill: "white",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 mb-10">
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={financialData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barGap={10}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip
                      content={<CustomTooltip active={false} payload={null} />}
                    />
                    <Legend />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#34d399"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="expenses"
                      name="Expenses"
                      fill="#60a5fa"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>

              <CardHeader>
                <CardTitle>Fees Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-bold">Term 2</span>
                  </p>
                  <p className="text-sm">
                    Expected Fees (Term):{" "}
                    <span className="font-bold">₦20,000,000</span>
                  </p>
                  <p className="text-sm">
                    Amount Collected:{" "}
                    <span className="font-bold">₦12,500,000</span>
                  </p>
                  <p className="text-sm text-red-600">
                    Outstanding Balance:{" "}
                    <span className="font-bold">₦7,500,000</span>
                  </p>
                  <Button variant="link" className="p-0 h-auto">
                    Manage Record
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          {/* Financial Summary */}
          <div className=" mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Staff Attendance</CardTitle>
                <p className="text-sm text-muted-foreground">
                  March 23, 2025 10:41AM
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Staff" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="staff1">Staff 1</SelectItem>
                    <SelectItem value="staff2">Staff 2</SelectItem>
                    <SelectItem value="staff3">Staff 3</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full">Time In</Button>
                <Button className="w-full" variant="outline">
                  Time Out
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Upcoming Events Card */}
            <Card className="border border-gray-200 shadow-sm rounded-md">
              <CardHeader className="flex flex-row justify-between items-center pb-4 pt-4 px-6">
                <CardTitle className="text-lg font-bold">
                  Upcoming Events
                </CardTitle>
                <Button
                  className="bg-white text-teal-500 border border-teal-500 hover:bg-teal-50 flex items-center gap-1 rounded-md px-3 py-1"
                  variant="outline"
                >
                  <Plus size={18} className="text-teal-500" />
                  <span>Create Event</span>
                </Button>
              </CardHeader>
              <CardContent className="px-6 pb-4">
                <ul className="space-y-4">
                  {events.map((event) => (
                    <li key={event.id} className="flex items-start gap-3">
                      <div className="mt-1 w-4 h-4 rounded-full bg-teal-500 flex-shrink-0"></div>
                      <span className="text-gray-800 font-medium">
                        {event.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <Button
                    className="text-teal-500 hover:text-teal-700 p-0 flex items-center gap-1 font-medium"
                    variant="link"
                  >
                    See all events
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Announcements Card */}
            <Card className="border border-gray-200 shadow-sm rounded-md">
              <CardHeader className="flex flex-row justify-between items-center pb-4 pt-4 px-6">
                <CardTitle className="text-lg font-bold">
                  Announcements
                </CardTitle>
                <Button
                  className="bg-white text-teal-500 border border-teal-500 hover:bg-teal-50 flex items-center gap-1 rounded-md px-3 py-1"
                  variant="outline"
                >
                  <Plus size={18} className="text-teal-500" />
                  <span>Create Announcement</span>
                </Button>
              </CardHeader>
              <CardContent className="px-6 pb-4">
                <ul className="space-y-6">
                  {announcements.map((announcement) => (
                    <li key={announcement.id} className="relative">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-teal-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-gray-800 font-medium mb-1">
                            {announcement.content}
                          </p>
                          {announcement.highlight && (
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                              <span className="bg-blue-500 text-white px-1 py-0.5 text-xs rounded-l">
                                {announcement.highlight.prefix}
                              </span>
                              <span className="bg-blue-300 text-white px-1 py-0.5 text-xs rounded-r">
                                {announcement.highlight.text}
                              </span>
                            </div>
                          )}
                          <p className="text-teal-500 text-xs">
                            {announcement.date}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
