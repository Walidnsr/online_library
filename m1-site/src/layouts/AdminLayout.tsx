"use client";

import { ReactNode, useState } from 'react';
import Sidebar from '../components/Sidebar';
import AdminNavbar from '../components/AdminNavbar';

interface AdminLayoutProps {
  children: ReactNode;
  role: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
        <Sidebar role={role} />
      </div>

      {/* Main content area */}
      <div className="flex-grow ml-0 md:ml-64">
        <AdminNavbar />
        <main className="p-8 min-h-full bg-gray-100">{children}</main>
      </div>

      {/* Sidebar toggle button for small screens */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-20 p-2 bg-gray-700 text-white rounded-md md:hidden"
      >
        {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button>
    </div>
  );
};

export default AdminLayout;
