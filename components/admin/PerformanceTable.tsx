// components/PerformanceTable.tsx
"use client"
import React from 'react';
import { Search, Filter, Download, Share2, MoreHorizontal, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const performanceData = [
  { class: 'Year 7A', term1: '91 A+', term2: '89 A', term3: '93 A+', overall: '91 A+' },
  { class: 'Year 7B', term1: '93 A+', term2: '91 A+', term3: '92 A+', overall: '92 A+' },
  { class: 'Year 7C', term1: '92 A+', term2: '92 A+', term3: '91 A+', overall: '92 A+' },
  { class: 'Year 7D', term1: '93 A+', term2: '92 A+', term3: '91 A+', overall: '92 A+' },
  { class: 'Year 7E', term1: '91 A+', term2: '91 A+', term3: '90 A+', overall: '91 A+' },
  { class: 'Year 7F', term1: '92 A+', term2: '91 A+', term3: '89 A', overall: '91 A+' },
  { class: 'Year 7G', term1: '90 A+', term2: '92 A+', term3: '91 A+', overall: '91 A+' },
  { class: 'Year 7H', term1: '92 A+', term2: '93 A+', term3: '94 A+', overall: '93 A+' },
  { class: 'Year 10A', term1: '91 A+', term2: '91 A+', term3: '92 A+', overall: '91 A+' },
  { class: 'Year 10B', term1: '92 A+', term2: '93 A+', term3: '91 A+', overall: '92 A+' },
  { class: 'Year 10C', term1: '94 A+', term2: '91 A+', term3: '92 A+', overall: '92 A+' },
  { class: 'Year 10D', term1: '91 A+', term2: '90 A+', term3: '93 A+', overall: '91 A+' },
];

export const PerformanceTable: React.FC = () => {
    const router = useRouter();
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="font-semibold text-lg mb-6">Overall Performance (2023/2024 Academic Year)</h2>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm">
            <Filter className="w-4 h-4" /> Filter <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-emerald-700 text-emerald-700 rounded-md text-sm">
            <Share2 className="w-4 h-4" /> Share Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-md text-sm">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Class Name <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Average Grade (Term 1) <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Average Grade (Term 2) <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Average Grade (Term 3) <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Overall Average Grade <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => {router.push('/dashboard/academics/classes/view_class_performance')}}>
                <td className="py-3 px-4 font-medium whitespace-nowrap">{item.class}</td>
                <td className="px-4 whitespace-nowrap">{item.term1}</td>
                <td className="px-4 whitespace-nowrap">{item.term2}</td>
                <td className="px-4 whitespace-nowrap">{item.term3}</td>
                <td className="px-4 text-emerald-600 font-semibold whitespace-nowrap">{item.overall}</td>
                <td className="px-4"><MoreHorizontal className="w-4 h-4 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};