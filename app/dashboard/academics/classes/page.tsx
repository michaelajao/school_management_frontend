"use client"
import React, { useState } from 'react';
import SearchAndActions from '@/components/admin/SearchAndActions';
import { TimetableManagement } from '@/components/admin/TimetableManagement';
import ClassActions from '@/components/admin/ClassActions';
import ClassTables from '@/components/admin/ClassTables';
import { SummaryCard } from '@/components/admin/parents/SummaryCard';
import { AlarmClock, BadgePercent, GraduationCap, Users } from 'lucide-react';
import { PiPercentBold } from "react-icons/pi";


const ClassManagement: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Class Management</h2>
            {/* Summary Cards */}
            <div className="flex gap-4 justify-between bg-[#f7f7f7] p-4 mb-6">
                <SummaryCard
                    icon={<GraduationCap className="text-cyan-700" />}
                    value={1250}
                    label="Total Students"
                    textColor="#00787A"
                    bgColor="#E6FBFF"
                />
                <SummaryCard
                    icon={<Users className="text-orange-500" />}
                    value={78}
                    label="Total Staff"
                    textColor="#F78C1F"
                    bgColor="#FFE7CC"
                />
                <SummaryCard
                    icon={<PiPercentBold className="text-green-600" />}
                    value="78%"
                    label="Total Fee Paid"
                    textColor="#00B266"
                    bgColor="#DFF9E4"
                />
                <SummaryCard
                    icon={<AlarmClock className="text-red-500" />}
                    value={5}
                    label="Pending Approvals"
                    textColor="#E31B23"
                    bgColor="#FFE6E6"
                />
            </div>
            {/* Action Buttons */}
            <ClassActions />
            <div className='overflow-x-auto bg-white shadow-md rounded-lg p-6'>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Class List</h2>
                    <p className="text-gray-600">Manage Class and Info</p>
                    </div>
                    
                    {/* Search & Actions */}
                    <SearchAndActions />
                    
                    {/* Class Table */}
                    <ClassTables />
                </div>
            </div>
    );
};

export default ClassManagement;