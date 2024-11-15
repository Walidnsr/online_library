// src/components/AdminSidebar.tsx
import React from 'react';
import Link from 'next/link';

interface AdminSidebarProps {
  role?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ role }) => {
  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-4 h-full">
      <Link href="/admin/dashboard">
        <span className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Dashboard</span>
      </Link>
      {role === 'admin' && (
        <Link href="/admin/users">
          <span className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Manage Users</span>
        </Link>
      )}
      <Link href="/admin/authors">
        <span className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Manage Authors</span>
      </Link>
      <Link href="/admin/books">
        <span className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Manage Books</span>
      </Link>
      <Link href="/admin/reviews">
        <span className="block py-2 px-4 hover:bg-gray-700 rounded cursor-pointer">Manage Reviews</span>
      </Link>
    </div>
  );
};

export default AdminSidebar;
