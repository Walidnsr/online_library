"use client";

import Link from 'next/link';
import { FaBell, FaCog, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full ml-64 z-10">
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 hover:text-blue-700 cursor-pointer text-xl" aria-label="Notifications" />
        <Link href="/admin/settings" aria-label="Settings">
          <FaCog className="text-gray-600 hover:text-blue-700 cursor-pointer text-xl" />
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
            className="flex items-center focus:outline-none"
          >
            <FaUserCircle className="cursor-pointer text-2xl text-gray-600" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
              <Link href="/profile">
                <div className="px-4 py-2 hover:bg-gray-100">Profile</div>
              </Link>
              <Link href="/logout">
                <div className="px-4 py-2 hover:bg-gray-100">Logout</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
