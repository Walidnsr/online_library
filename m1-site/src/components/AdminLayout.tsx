
// src/components/AdminLayout.tsx
import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  role?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, role = 'guest' }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar role={role} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page content */}
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
