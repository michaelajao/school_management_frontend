"use client"
import React, { useState } from 'react';
import SearchAndActions from '@/components/admin/SearchAndActions';
import { TimetableManagement } from '@/components/admin/TimetableManagement';
import ClassActions from '@/components/admin/ClassActions';
import ClassTables from '@/components/admin/ClassTables';
import { BookOpenText, GraduationCap, School } from 'lucide-react';
import { DashboardMetrics } from '@/components/shared/DashboardMetrics';
import { TeacherIcon } from 'hugeicons-react'


const ClassManagement: React.FC = () => {

    const classMetrics = [
        {
            icon: GraduationCap,
            value: 1250,
            label: "Total Students",
            primaryColor: "#00787A",
            secondaryColor: "#E6FBFF"
        },
        {
            icon: School,
            value: 18,
            label: "Total Classes",
            primaryColor: "#F78C1F",
            secondaryColor: "#FFE7CC"
        },
        {
            icon: TeacherIcon,
            value: 17,
            label: "Total Class Teachers",
            primaryColor: "#6A24FF",
            secondaryColor: "#6A24FF33"
        },
        {
            icon: BookOpenText,
            value: 20,
            label: "Total Subjects",
            primaryColor: "#02B9B9",
            secondaryColor: "#02B9B933"
        }
    ]


    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Class Management</h2>

            {/* Summary Cards */}
            <div className='my-6'>
                <DashboardMetrics metrics={classMetrics} />
            </div>

            {/* Action Buttons */}
            <ClassActions />
            <div className='overflow-x-auto bg-white shadow-md rounded-lg p-6'>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Class List</h2>
                    <p className="text-gray-600">Manage Class and Info</p>
                </div>

                {/* Class Table */}
                <ClassTables />
            </div>
        </div>
    );
};

export default ClassManagement;