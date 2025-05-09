'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Parent } from "@/lib/utils"
import { Search, SlidersHorizontal, Plus, Upload, Ellipsis } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow

} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useParentStore } from "@/store/parentStore";

interface ParentTableProps {
    parents: Parent[];
}

const ITEMS_PER_PAGE = 10;
const PAGE_WINDOW = 5;
const noProfilePicture =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';


export default function ParentTable({ parents }: ParentTableProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const router = useRouter();

    // Pagination logic (i.e. showing 10 parents at a time)
    const totalPages = Math.ceil(parents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedParents = parents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Pagination window logic
    const pageStart = Math.floor((currentPage - 1) / PAGE_WINDOW) * PAGE_WINDOW + 1;
    const pageEnd = Math.min(pageStart + PAGE_WINDOW - 1, totalPages);
    const pageNumbers = Array.from({ length: pageEnd - pageStart + 1 }, (_, i) => pageStart + i);



    // Functions
    const setSelectedParent = useParentStore((state) => state.setSelectedParent);

    // No implementation for now
    function handleManageParent(parent: Parent) {
        setSelectedParent(parent)
        router.push('parents/view')
    }

    function handleEditParent(parent: Parent) {
        setSelectedParent(parent)
        router.push('parents/edit')
    }

    function handleAddNewParent() {
        router.push('parents/add')
    }

    function handleDeleteParent(parent: Parent) { }


    return (
        <div>
            {/* Controls */}
            <div className="my-4 flex flex-col gap-6 md:gap-0 md:flex-row">

                {/* Search bar - Left side */}
                <div className="bg-red-100 relative w-full md:w-6/12 rounded-lg">
                    <Search
                        className="absolute top-2 left-2 h-5 w-5"
                    />
                    <input
                        className="text-sm pl-9 bg-zinc-100 w-full p-2.5 rounded-lg"
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                        }}
                    />
                </div>

                {/* Buttons - Right side */}
                <section className="flex flex-col gap-6 md:gap-0 md:flex-row md:w-6/12 justify-evenly">

                    {/* Filter button */}
                    <div className="relative flex w-full md:w-3/12 ">
                        <SlidersHorizontal
                            color="#388889"
                            className="absolute top-3.25 left-2 h-4 w-4"
                        />
                        <select
                            className="w-full pl-9 bg-zinc-100 p-2.5 rounded-lg text-sm"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as 'all' | 'active' | 'pending');
                            }}
                        >
                            <option value="all">Filter</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>

                    <button
                        onClick={handleAddNewParent}
                        className="flex gap-2 items-center text-sm cursor-pointer text-[#388889] border border-[#388889] px-6 py-4 md:px-4 md:py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        <p>Add parent</p>
                    </button>
                    <button
                        className="flex gap-2 items-center text-sm cursor-pointer text-white border bg-[#388889] px-6 py-4 md:px-4 md:py-2 rounded-lg">
                        <Upload className="w-4 h-4" />
                        <p>Bulk upload (CSV)</p>
                    </button>
                </section>

            </div>

            {/* Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Parent</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Linked Students</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedParents.map((parent, idx) => (
                        <TableRow
                            key={idx}
                            className="text-sm hover:bg-slate-200 cursor-pointer"
                        >
                            <TableCell className="flex gap-2 items-center pr-12 md:pr-0">
                                <img
                                    src={noProfilePicture}
                                    alt={parent.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="text-wrap md:text-nowrap">{parent.name}</span>
                            </TableCell>
                            <TableCell>{parent.email}</TableCell>
                            <TableCell>{parent.phoneNumber}</TableCell>
                            <TableCell>
                                <ul>{parent.linkedStudents.map((student, idx) =>
                                    <li key={idx}>{student.name}</li>)}
                                </ul>
                            </TableCell>
                            <TableCell className={`font-bold ${parent.status === 'active'
                                ? 'text-green-700'
                                : 'text-orange-300'
                                }`}>
                                {parent.status.charAt(0).toUpperCase() + parent.status.slice(1)}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button>
                                            <Ellipsis className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleManageParent(parent)}>
                                            View Parent
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleEditParent(parent)}>
                                            Edit Parent
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteParent(parent)}>
                                            Delete Parent
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}

                    {paginatedParents.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-sm text-gray-500 py-6">
                                No parents found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Table footer */}
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-0 justify-between my-4">
                <div className="text-xs md:text-sm">
                    Showing {startIndex + 1} to{' '}
                    {Math.min(startIndex + ITEMS_PER_PAGE, parents.length)} of{' '}
                    {parents.length} entries
                </div>

                <div className="flex justify-center text-sm">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md mr-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100'
                            }`}
                    >
                        Previous
                    </button>

                    {pageNumbers.map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-1  ${currentPage === pageNum
                                ? 'bg-white text-black font-semibold border border-gray-200'
                                : 'bg-gray-300 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {pageNum}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        className={`px-2 py-1 md:px-4 md:py-2 rounded-md ml-2 ${currentPage === totalPages
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border hover:bg-gray-100'
                            }`}
                    >
                        Next
                    </button>

                </div>

            </div>
        </div>

    )
}