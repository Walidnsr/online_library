"use client";

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTachometerAlt, FaUsers, FaUserEdit, FaBook, FaCog } from 'react-icons/fa';

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-6 fixed">
      <div className="text-3xl font-bold mb-8">
        <span>Admin</span>
      </div>
      <nav>
        <ul className="space-y-6">
          {/* Dashboard Link */}
          <li>
            <Link href="/admin/dashboard">
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ${
                  currentRoute === '/admin/dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <FaTachometerAlt />
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          {/* Manage Users Link - Only visible to admins */}
          {role !== 'author' && (
            <li>
              <Link href="/admin/users">
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ${
                    currentRoute === '/admin/users' ? 'bg-blue-600' : 'hover:bg-gray-700'
                  }`}
                >
                  <FaUsers />
                  <span>Manage Users</span>
                </div>
              </Link>
            </li>
          )}

          {/* Manage Authors Link */}
          <li>
            <Link href="/admin/authors">
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ${
                  currentRoute === '/admin/authors' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <FaUserEdit />
                <span>Manage Authors</span>
              </div>
            </Link>
          </li>

          {/* Manage Books Link */}
          <li>
            <Link href="/admin/books">
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ${
                  currentRoute === '/admin/books' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <FaBook />
                <span>Manage Books</span>
              </div>
            </Link>
          </li>

          {/* Settings Link */}
          <li>
            <Link href="/admin/settings">
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ${
                  currentRoute === '/admin/settings' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
              >
                <FaCog />
                <span>Settings</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
