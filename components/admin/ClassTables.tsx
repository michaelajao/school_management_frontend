import { useState } from "react";

export type ClassArm = {
    id: string;
    name: string;
    teacher: string;
    assistant: string;
    studentCount: number;
};


export default function ClassTables(){
        const [classes, setClasses] = useState<ClassArm[]>([
            {
                id: '1',
                name: 'JSS 2A',
                teacher: 'Mr. John',
                assistant: 'Ms. Ada',
                studentCount: 35,
            },
            {
                id: '2',
                name: 'SS1 B',
                teacher: 'Mrs. Kemi',
                assistant: '',
                studentCount: 28,
            },
        ]);

        const [searchTerm, setSearchTerm] = useState('');

        const filteredClasses = classes.filter(cls =>
            cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cls.teacher.toLowerCase().includes(searchTerm.toLowerCase())
        );
    return(
        <>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className='min-w-full table-auto'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='px-6 py-4 text-left text-sm font-medium text-gray-600'>Class</th>
                            <th className='px-6 py-4 text-left text-sm font-medium text-gray-600'>Teacher</th>
                            <th className='px-6 py-4 text-left text-sm font-medium text-gray-600'>Assistant</th>
                            <th className='px-6 py-4 text-left text-sm font-medium text-gray-600'>Students</th>
                            <th className='px-6 py-4 text-left text-sm font-medium text-gray-600'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm text-gray-600'>
                        {filteredClasses.map((cls) => (
                            <tr key={cls.id} className='border-t hover:bg-gray-50'>
                                <td className='px-6 py-4'>{cls.name}</td>
                                <td className='px-6 py-4'>{cls.teacher}</td>
                                <td className='px-6 py-4'>{cls.assistant || '-'}</td>
                                <td className='px-6 py-4'>{cls.studentCount}</td>
                                <td className='px-6 py-4'>
                                    <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2' aria-label="Edit Class">Edit</button>
                                    <button className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600' aria-label="View Class">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>        
        </>
    )
}