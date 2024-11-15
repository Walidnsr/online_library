"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from 'layouts/AdminLayout';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Assuming the role is fetched from the user's session or authentication context
    const fetchUserRole = async () => {
      try {
        // Fetch user role logic here, for now we assume it's coming from local storage for demo purposes
        const role = localStorage.getItem('userRole');
        setUserRole(role);
      } catch (err) {
        console.error('Error fetching user role', err);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <AdminLayout role={userRole || 'guest'}>
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {userRole === 'admin' && (
          <Link href="/admin/users">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition duration-300 transform hover:scale-105">
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <p className="mt-2">View, edit, or delete user accounts.</p>
            </div>
          </Link>
        )}
        <Link href="/admin/authors">
          <div className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold">Manage Authors</h2>
            <p className="mt-2">View and manage authors' details.</p>
          </div>
        </Link>
        <Link href="/admin/books">
          <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 cursor-pointer transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold">Manage Books</h2>
            <p className="mt-2">View, edit, or delete books from the library.</p>
          </div>
        </Link>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <h3 className="text-3xl font-bold text-blue-700">$10,567</h3>
          <p className="text-gray-600">Sales Value</p>
          <p className="text-green-500 mt-1">+10.57% Yesterday</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <h3 className="text-3xl font-bold text-blue-700">345k</h3>
          <p className="text-gray-600">Customers</p>
          <p className="text-green-500 mt-1">+18.2% Since last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <h3 className="text-3xl font-bold text-blue-700">$43,594</h3>
          <p className="text-gray-600">Revenue</p>
          <p className="text-green-500 mt-1">+28.4% Since last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300">
          <h3 className="text-3xl font-bold text-blue-700">Traffic Share</h3>
          <p className="text-gray-600 mt-2">Desktop 60%, Mobile 30%, Tablet 10%</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
