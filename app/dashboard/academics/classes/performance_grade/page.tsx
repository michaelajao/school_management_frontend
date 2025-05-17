"use client"
import { PerformanceChart } from '@/components/admin/PerformanceChart';
import { PerformanceTable } from '@/components/admin/PerformanceTable';
import React from 'react';

const PerformanceDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <PerformanceChart />
      <PerformanceTable />
    </div>
  );
};

export default PerformanceDashboard;