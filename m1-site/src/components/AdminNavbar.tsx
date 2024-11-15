// src/components/AdminNavbar.tsx
import React from 'react';
import Link from 'next/link';

const AdminNavbar: React.FC = () => {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Admin Dashboard</div>
        <div className="space-x-4">
          <Link href="/admin/dashboard">
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/profile">
            <span className="hover:underline cursor-pointer">Profile</span>
          </Link>
          <Link href="/logout">
            <span className="hover:underline cursor-pointer">Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
