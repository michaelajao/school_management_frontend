import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { term: 'Term 1', percentage: 30 },
  { term: 'Term 2', percentage: 55 },
  { term: 'Term 3', percentage: 85 },
];

export const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Overall Performance Trend</h2>
        <select className="border rounded px-3 py-1 text-sm">
          <option>2024/2025 Academic Session</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="term" />
          <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Area type="monotone" dataKey="percentage" stroke="#6366f1" fillOpacity={1} fill="url(#colorPerformance)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};