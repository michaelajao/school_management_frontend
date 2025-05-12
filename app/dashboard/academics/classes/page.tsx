"use client"
import React, { useState } from 'react';
import SearchAndActions from '@/components/admin/SearchAndActions';
import { TimetableManagement } from '@/components/admin/TimetableManagement';
import ClassActions from '@/components/admin/ClassActions';
import SummaryCard from '@/components/admin/SummaryCard';
import ClassTables from '@/components/admin/ClassTables';


const ClassManagement: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Class Management</h2>
            {/* Summary Cards */}
            <SummaryCard />
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