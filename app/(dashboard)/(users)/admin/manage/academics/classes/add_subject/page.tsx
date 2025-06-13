// components/SubjectList.tsx
import React from 'react';
import { MoreHorizontal, Filter, Plus, ChevronDown, Search } from 'lucide-react';

interface SubjectItem {
  subject: string;
  teachers: number;
}

const subjectData: SubjectItem[] = [
  { subject: 'Mathematics', teachers: 10 },
  { subject: 'English', teachers: 10 },
  { subject: 'Physics', teachers: 7 },
  { subject: 'Chemistry', teachers: 6 },
  { subject: 'Biology', teachers: 5 },
  { subject: 'Agricultural Science', teachers: 5 },
  { subject: 'Computer Science', teachers: 10 },
  { subject: 'Commerce', teachers: 5 },
  { subject: 'Business Studies', teachers: 3 },
  { subject: 'Accounting', teachers: 5 },
  { subject: 'Technical Drawing', teachers: 4 },
  { subject: 'Yoruba', teachers: 4 },
  { subject: 'Further Mathematics', teachers: 5 },
  { subject: 'Fine Art', teachers: 6 },
  { subject: 'Literature', teachers: 4 },
  { subject: 'Music', teachers: 3 },
  { subject: 'Economics', teachers: 4 },
  { subject: 'French', teachers: 2 },
];

const SubjectList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* Header Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Subject List</h2>

      {/* Academic Year Dropdown */}
      <div className="mb-4 w-full max-w-[200px]">
        <select className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none">
          <option>2023/2024 Academic Year</option>
        </select>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-1 flex-wrap gap-3 items-center justify-between md:justify-start">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm bg-gray-50 focus:outline-none"
            />
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm">
            <Filter className="w-4 h-4" /> Filter <ChevronDown className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-700 text-white rounded-md text-sm">
            <Plus className="w-4 h-4" /> Add New Subject
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Subject <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">No of Teachers <ChevronDown className="w-3 h-3" /></div>
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-left">
                <div className="flex items-center gap-1">Action <ChevronDown className="w-3 h-3" /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {subjectData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap font-medium">{item.subject}</td>
                <td className="py-3 px-4 whitespace-nowrap">{item.teachers}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <MoreHorizontal className="w-4 h-4 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;