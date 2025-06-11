// import {
//     MagnifyingGlassIcon,
//     ChevronDownIcon,
//     ArrowUpTrayIcon,
//   } from '@heroicons/react/24/solid';
  import { ArrowUpIcon, ChevronDownIcon, GlassesIcon } from 'lucide-react';
import { SetStateAction, useState } from 'react';
  
  export default function SearchAndActions() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [selectedGender, setSelectedGender] = useState('All');
  
    const toggleDropdown = () => {
      setShowFilterDropdown(!showFilterDropdown);
    };
  
    const handleGenderSelect = (gender: SetStateAction<string>) => {
      setSelectedGender(gender);
      setShowFilterDropdown(false);
    };
  
    return (
    <div className="flex flex-wrap space-evenly items-center gap-2 bg-white p-4 shadow-sm rounded-xl mb-6">
        <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
          <div className="relative w-full md:w-80">
            <GlassesIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by Name or Teacher"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
  
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <span>Filter: {selectedGender}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </button>
  
            {showFilterDropdown && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                {['All', 'Male', 'Female'].map((gender) => (
                  <div
                    key={gender}
                    onClick={() => handleGenderSelect(gender)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {gender}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
  
        <div className="flex gap-3">
          <button className="bg-[#D1F3EB] text-[#0F766E] px-4 py-2 rounded-lg font-medium hover:bg-[#BAE6E0]">
            + Add New Student
          </button>
          <button className="flex items-center gap-2 bg-[#00594C] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#00473D]">
            <ArrowUpIcon className="w-4 h-4" />
            <span>Bulk Upload (.CSV)</span>
          </button>
        </div>
    </div>
    );
  }  