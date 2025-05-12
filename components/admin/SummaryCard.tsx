import {
    AcademicCapIcon,
    BuildingLibraryIcon,
    PresentationChartBarIcon,
    BookOpenIcon
} from '@heroicons/react/24/outline';

export default function SummaryCard() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-6'>
            <div className='flex items-center bg-[#EAF8F4] rounded-xl p-4 space-x-4'>
                <div className='bg-[#D1F3EB] text-[#0D9488] p-3 rounded-full'>
                    <AcademicCapIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-[#0D9488]'>1,250</h2>
                    <p className='text-sm text-[#0F766E]'>Total Students</p>
                </div>
            </div>

            <div className='flex items-center bg-[#FFF7ED] rounded-xl p-4 space-x-4'>
                <div className='bg-[#FFF8C8] text-[#F97316] p-3 rounded-full'>
                    <BuildingLibraryIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-[#F97316]'>18</h2>
                    <p className='text-sm text-[#0F766E]'>Total Classes</p>
                </div>
            </div>

            <div className='flex items-center bg-[#F3F0FF] rounded-xl p-4 space-x-4'>
                <div className='bg-[#E0DBFF] text-[#7C3AED] p-3 rounded-full'>
                    <PresentationChartBarIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-[#7C3AED]'>17</h2>
                    <p className='text-sm text-[#6D28D9]'>Total Class Teachers</p>
                </div>
            </div>

            <div className='flex items-center bg-[#F0FDF4] rounded-xl p-4 space-x-4'>
                <div className='bg-[#DCFCE7] text-[#22C55E] p-3 rounded-full'>
                    <BookOpenIcon className="w-6 h-6" />
                </div>
                <div>
                    <h2 className='text-2xl font-bold text-[#22C55E]'>20</h2>
                    <p className='text-sm text-[#15803D]'>Total Subjects</p>
                </div>
            </div>
        </div>
    );
}