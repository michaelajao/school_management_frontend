'use client'

/*
For now this works with only the staff attendance. In the future,
it should be able to also handle attendance for students too
*/

import React, { JSX, useState } from "react";
import { CustomButton } from "@/components/shared/CustomButton.";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";



type AttendanceProps = {
    test: string;
    addProperPropsLater: string
}


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

const formatYAxis = (value: number) => {
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



export default function Attendance() {
    const [selectedRole, setSelectedRole] = useState('Subject Teacher');

    const handleRoleChange = (role: React.SetStateAction<string>) => {
        setSelectedRole(role);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-[55%]">
                {/* Attendance Summary & Staff Attendance */}
                <div className="">
                    <Card className="md:col-span-2 mb-10">
                        <CardHeader className="flex flex-col md:flex-row justify-between items-center space-y-4">
                            <CardTitle className="font-thin font-lg">Attendance Summary</CardTitle>
                            <div className="flex gap-4">
                                <Select defaultValue="monthly">
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Monthly" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="daily">Daily</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select defaultValue="students">
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Students" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="students">Students</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                        <SelectItem value="all">All</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent>

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
                </div>
            </div>

            <div className="md:w-[45%]">
                <div className=" mb-10">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle>Staff Attendance</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                March 23, 2025 10:41AM
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6 flex flex-col items-center">
                            <Select>
                                <SelectTrigger className="p-6 w-4/5 border border-gray-500 !bg-white focus:!bg-white hover:!bg-white">
                                    <SelectValue placeholder="Select Staff" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="staff1">Staff 1</SelectItem>
                                    <SelectItem value="staff2">Staff 2</SelectItem>
                                    <SelectItem value="staff3">Staff 3</SelectItem>
                                </SelectContent>
                            </Select>

                            <CustomButton
                                variant="default"
                                size="lg"
                                className="w-4/5 text-sm"
                            >
                                Time In
                            </CustomButton>
                            <CustomButton
                                variant="default"
                                size="lg"
                                className="w-4/5 text-sm  bg-[#B6B6B6] text-black"
                            >
                                Time Out
                            </CustomButton>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}