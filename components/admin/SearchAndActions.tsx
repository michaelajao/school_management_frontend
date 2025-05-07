import {
    MagnifyingGlassIcon,
    ChevronDownIcon,
    ArrowUpTrayIcon
} from '@heroicons/react/24/solid';
import { useState } from 'react';


export default function SearchAndActions() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
              <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-6">
                <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
                    <div className="relative w-full md:w-80">
                        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                            type="text"
                            placeholder="Search by Name or Teacher"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
                        />
                    </div>
                    <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100">
                        <span>Filter</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex gap-3">
                    <button className="bg-[#D1F3EB] text-[#0F766E] px-4 py-2 rounded-lg font-medium hover:bg-[#BAE6E0]">
                        + Add New Student
                    </button>
                    <button className="flex items-center gap-2 bg-[#00594C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#00473D]">
                        <ArrowUpTrayIcon className="w-4 h-4" />
                        <span>Bulk Upload (.CSV)</span>
                    </button>
                </div>
            </div>
    </div>
  );
}