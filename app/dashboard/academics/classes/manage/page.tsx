"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteUser from "@/components/admin/DeleteUser";
import SearchAndActions from "@/components/admin/SearchAndActions";

const dummyStudents = [
  { id: 1, name: "Kingsley Ekwu", studentId: "STD-2025-0044", class: "Year 7A", gender: "Male" },
  { id: 2, name: "Chidi Okafor", studentId: "STD-2025-0051", class: "Year 7A", gender: "Female" },
];

export default function ManageClassInfo() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleDeleteUser = () => {
    console.log("User deleted");
    setShowDeleteModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md">
      {/* Class Header and Info Section */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Year 7A</h2>

        <div className="grid grid-cols-2 items-start text-sm text-gray-700">
          {/* Left Column - Red Button */}
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg border border-red-400 hover:bg-red-600"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Class
            </button>
            {showDeleteModal && (
              <DeleteUser
                onClose={() => setShowDeleteModal(false)}
                onDelete={handleDeleteUser}
              />
            )}
          </div>

          {/* Right Column - Green Button */}
          <div className="flex justify mb-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700"
              onClick={() => router.push('/dashboard/academics/classes/create/edit_info')}
            >
              Edit Class Info
            </button>
          </div>

          <p className="font-semibold">Class Teacher:</p>
          <p>Audrey Allen</p>

          <p className="font-semibold">Assistant Teacher:</p>
          <p>Samuel Okoro</p>

          <p className="font-semibold">Classification:</p>
          <p>Science</p>

          <p className="font-semibold">Student Count:</p>
          <p>25</p>

          <p className="font-semibold">Males:</p>
          <p>10</p>

          <p className="font-semibold">Females:</p>
          <p>15</p>

          <p className="font-semibold">Subject Teachers:</p>
          <p>Mr Okoro - Maths, Mrs B - English, ...</p>
        </div>
      </div>


      {/* Student List Section */}
      <div className="bg-white p-6 shadow-md mt-0">
        <SearchAndActions />

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-t border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Student ID</th>
                <th className="p-3">Class</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.studentId}</td>
                  <td className="p-3">{student.class}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}