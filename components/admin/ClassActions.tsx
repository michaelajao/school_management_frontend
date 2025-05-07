import { useRouter } from 'next/navigation';


export default function ClassActions() {
    const router = useRouter();
    const goToBlog = () => {
        router.push('/create');
      };
    return (
      <div className="flex flex-wrap gap-3 mt-4 mb-6">
        <button className="border border-orange-400 text-orange-500 font-medium px-4 py-2 rounded-lg hover:bg-orange-50" 
        aria-label="View Class"
        onClick={goToBlog}
        >
            Create New Class / Arm
        </button>
        <button className="bg-[#D1F3EB] text-[#0F766E] px-4 py-2 rounded-lg font-medium hover:bg-[#BAE6E0]">
            Assign Class Teacher
        </button>
        <button className="bg-[#D1F3EB] text-[#0F766E] px-4 py-2 rounded-lg font-medium hover:bg-[#BAE6E0]">
            Assign Subject Teacher
        </button>
        <button className="bg-[#E0DBFF] text-[#7C3AED] px-4 py-2 rounded-lg font-medium hover:bg-[#D8D0FF]">
            View Class Performance
        </button>
        <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
            View Class Attendance
        </button>
     </div>
    );
  }  