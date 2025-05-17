'use client';

import { FC, useState } from 'react';
import { Search, SlidersHorizontal, Plus, Upload,  MoreHorizontal, Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu'; 

interface ClassItem {
  class: string;
  teacher: string;
  assistant: string;
  count: number;
  type: string;
}

const classData: (ClassItem & { id: string })[] = [
  { id: 'year-7A', class: 'Year 7A', teacher: 'Anthony Allen', assistant: 'Samuel Olera', count: 20, type: 'Science' },
  { id: 'year-7B', class: 'Year 7B', teacher: 'Samuel Olera', assistant: 'Betty Jacobs', count: 20, type: 'Commercial' },
  { id: 'Year 7C', class: 'Year 7C', teacher: 'Susan Oyii', assistant: 'Anthony Allen', count: 20, type: 'Art' },
  { id: 'Year 8A', class: 'Year 8A', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Science' },
  { id: 'Year 8B', class: 'Year 8B', teacher: 'Michael Aigboka', assistant: 'Annabella Adu', count: 20, type: 'Art' },
  { id: 'Year 8C', class: 'Year 8C', teacher: 'Eduard Cole', assistant: '', count: 20, type: 'Commercial' },
  { id: 'Year 9A', class: 'Year 9A', teacher: 'Justin Ogbo', assistant: 'Michael Aigboka', count: 20, type: 'Art' },
  { id: 'Year 9B', class: 'Year 9B', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Science' },
  { id: 'Year 9C', class: 'Year 9C', teacher: 'Eduard Cole', assistant: '', count: 20, type: 'Commercial' },
  { id: 'year-7a', class: 'Year 10A', teacher: 'Elizabeth Arii', assistant: '', count: 20, type: 'Science' },
  { id: 'Year 10B', class: 'Year 10B', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Art' },
  { id: 'Year 10C', class: 'Year 10C', teacher: 'Susan Oyii', assistant: 'Justin Ogbo', count: 20, type: 'Science' },
  { id: 'Year 11A', class: 'Year 11A', teacher: 'Samuel Olera', assistant: 'Susan Oyii', count: 20, type: 'Commercial' },
  { id: 'Year 11B', class: 'Year 11B', teacher: 'Kore Ogbei', assistant: 'Betty Jacobs', count: 20, type: 'Art' },
  { id: 'Year 11C', class: 'Year 11C', teacher: 'Eduard Cole', assistant: 'Michael Aigboka', count: 20, type: 'Science' },
  { id: 'year 12A', class: 'Year 12A', teacher: 'Michael Aigboka', assistant: 'Eduard Cole', count: 20, type: 'Commercial' },
  { id: 'Year 12B', class: 'Year 12B', teacher: 'Michael Aigboka', assistant: 'Kore Ogbei', count: 20, type: 'Science' },
];

const ClassListPage: FC = () => {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const toggleMenu = (id: string) => {
        setMenuVisible(menuVisible === id ? null : id);
    };
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        {/* <h2 className="text-lg font-semibold text-gray-800">Class List</h2>
        <p className="text-sm text-gray-500 mb-4">Manage Classes and Info</p> */}

        {/* Top Actions
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center w-full md:max-w-sm border rounded-md px-3 py-2 bg-gray-50">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by Name, Student ID or Class"
              className="w-full bg-transparent focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filter
            </button>

            <button className="flex items-center px-4 py-2 border border-[#028A82] text-[#028A82] rounded-md text-sm hover:bg-[#028A82]/10">
              <Plus className="w-4 h-4 mr-2" />
              Add New Student
            </button>

            <button className="flex items-center px-4 py-2 bg-[#028A82] text-white rounded-md text-sm hover:bg-[#02736e]">
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload (CSV)
            </button>
          </div>
        </div> */}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Class Teacher</th>
                <th className="px-4 py-3">Assistant Teacher</th>
                <th className="px-4 py-3">Students Count</th>
                <th className="px-4 py-3">Classification</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {classData.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-700">{item.class}</td>
                  <td className="px-4 py-3">{item.teacher}</td>
                  <td className="px-4 py-3">{item.assistant || '—'}</td>
                  <td className="px-4 py-3 text-[#028A82]">{item.count}</td>
                  <td className="px-4 py-3">{item.type}</td>
                  <td className="px-4 py-3">
                    {/* <button onClick={() => toggleMenu(item.id)} className="relative cursor-pointer">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button> */}
                        {/* {menuVisible === item.id && (
                            <div className="absolute right-0 bg-white border rounded-lg shadow-md mt-2">
                                <button
                                    onClick={() => router.push('/dashboard/academics/classes/edit_class')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    aria-label="Edit Class"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => router.push('/dashboard/academics/classes/manage')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                    aria-label="View Class"
                                >
                                    View
                                </button>
                            </div>
                        )} */}
                        <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button>
                                        <MoreHorizontal className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <button onClick={() => router.push('/dashboard/academics/classes/edit_class')}>
                                    <DropdownMenuItem>
                                        View
                                    </DropdownMenuItem>
                                  </button>
                                  <button onClick={() => router.push('/dashboard/academics/classes/manage')}>
                                    <DropdownMenuItem>
                                        Edit
                                    </DropdownMenuItem>
                                  </button>
                                    <DropdownMenuItem>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassListPage;