"use client";

import React from 'react';

const PerformanceDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Performance Grade Dashboard</h1>
        <p className="text-gray-600">
          This dashboard will show comprehensive performance analytics and grade reports.
        </p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900">Overall Average</h3>
            <p className="text-2xl font-bold text-blue-600">92.5%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900">Top Performing Class</h3>
            <p className="text-2xl font-bold text-green-600">Year 7H</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900">Total Classes</h3>
            <p className="text-2xl font-bold text-purple-600">12</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
              View Detailed Reports
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Export Data
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Configure Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
