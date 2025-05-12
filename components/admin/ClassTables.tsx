import { ChevronUp, ChevronDown, MoreHorizontal } from "lucide-react"; // Use MoreHorizontal for horizontal dots
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ClassArm = {
    id: string;
    name: string;
    teacher: string;
    assistant: string;
    studentCount: number;
    classification: string; // Added classification field
};

export default function ClassTables() {
    const router = useRouter();
    const [classes, setClasses] = useState<ClassArm[]>([
        {
            id: '1',
            name: 'JSS 2A',
            teacher: 'Mr. John',
            assistant: 'Ms. Ada',
            studentCount: 35,
            classification: 'Science',
        },
        {
            id: '2',
            name: 'SS1 B',
            teacher: 'Mrs. Kemi',
            assistant: '',
            studentCount: 28,
            classification: 'Arts',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [menuVisible, setMenuVisible] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const filteredClasses = classes.filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleMenu = (id: string) => {
        setMenuVisible(menuVisible === id ? null : id);
    };

    const toggleSort = (column: string) => {
        setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        // You can implement sorting logic here based on the column and sort direction
    };

    return (
        <>
            <div className="overflow-x-auto bg-white shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                <span className="cursor-pointer" onClick={() => toggleSort('name')}>
                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </span>
                                Class
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                <span className="cursor-pointer" onClick={() => toggleSort('teacher')}>
                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </span>
                                Class Teacher
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                <span className="cursor-pointer" onClick={() => toggleSort('assistant')}>
                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </span>
                                Assistant Teacher
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                <span className="cursor-pointer" onClick={() => toggleSort('studentCount')}>
                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </span>
                                Students Count
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                <span className="cursor-pointer" onClick={() => toggleSort('classification')}>
                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </span>
                                Classifications
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-600">
                        {filteredClasses.map((cls) => (
                            <tr key={cls.id} className="border-t hover:bg-gray-50">
                                <td className="px-6 py-4">{cls.name}</td>
                                <td className="px-6 py-4">{cls.teacher}</td>
                                <td className="px-6 py-4">{cls.assistant || '-'}</td>
                                <td className="px-6 py-4">{cls.studentCount}</td>
                                <td className="px-6 py-4">{cls.classification}</td>
                                <td className="px-6 py-4 relative">
                                    {/* Three dots button (Horizontal) */}
                                    <button
                                        onClick={() => toggleMenu(cls.id)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                        aria-label="Actions"
                                    >
                                        <MoreHorizontal size={16} />
                                    </button>

                                    {/* Menu with Edit and View options */}
                                    {menuVisible === cls.id && (
                                        <div className="absolute right-0 bg-white border rounded-lg shadow-md mt-2">
                                            <button
                                                onClick={() => router.push('/dashboard/academics/classes/edit_class')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                aria-label="Edit Class"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => router.push('/dashboard/academics/classes/manage')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                aria-label="View Class"
                                            >
                                                View
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}