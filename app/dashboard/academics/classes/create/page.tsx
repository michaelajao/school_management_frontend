import React from 'react';

export default function CreateNewClass() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Create New Class</h2>

        <form className="space-y-4">
          {/* Class Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200">
              <option>Select Class</option>
              <option>Year 7</option>
              <option>Year 8</option>
              <option>Year 9</option>
            </select>
          </div>

          {/* Arm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arm</label>
            <input
              type="text"
              placeholder="Enter Class Arm"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Description</label>
            <textarea
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="Write a short description"
            ></textarea>
          </div>

          {/* Assign Teachers */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Class Teacher</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option>Select Teacher</option>
                <option>Mr. Johnson</option>
                <option>Ms. Daniels</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Assistant Teacher</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                <option>Select Assistant</option>
                <option>Mr. Smith</option>
                <option>Mrs. Jane</option>
              </select>
            </div>

            {/* Repeat Subject Teachers (up to 6) */}
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Subject Teacher</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  <option>Select Subject Teacher</option>
                  <option>Mr. Alex - Math</option>
                  <option>Mrs. Bella - English</option>
                </select>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-start gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#00594C] text-white px-6 py-2 rounded-lg hover:bg-[#00473D]"
            >
              Save Class
            </button>
            <button
              type="button"
              className="border border-red-400 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}