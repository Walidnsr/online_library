"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllUsers, deleteUser } from '../../api/adminApi';
import { User } from '../../types/user.types';

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the role from localStorage
    const role = localStorage.getItem('userRole');
    setUserRole(role);

    // Fetch users for management
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (role === 'admin') {
      fetchUsers();
    }
  }, []);

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {userRole === 'admin' && (
          <Link href="/admin/users" className="block bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 cursor-pointer transition duration-300 transform hover:scale-105">
            <h2 className="text-2xl font-bold">Manage Users</h2>
            <p className="mt-2">View, edit, or delete user accounts.</p>
          </Link>
        )}
        <Link href="/admin/authors" className="block bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-bold">Manage Authors</h2>
          <p className="mt-2">View and manage authors' details.</p>
        </Link>
        <Link href="/admin/books" className="block bg-purple-600 text-white p-6 rounded-lg shadow-md hover:bg-purple-700 cursor-pointer transition duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-bold">Manage Books</h2>
          <p className="mt-2">View, edit, or delete books from the library.</p>
        </Link>
        <Link href="/admin/reviews" className="block bg-yellow-600 text-white p-6 rounded-lg shadow-md hover:bg-yellow-700 cursor-pointer transition duration-300 transform hover:scale-105">
          <h2 className="text-2xl font-bold">Manage Reviews</h2>
          <p className="mt-2">Manage customer reviews and feedback.</p>
        </Link>
      </div>

      {/* Manage Users Section */}
      {userRole === 'admin' && (
        <>
          <h2 className="text-3xl font-bold mt-12 mb-6">Manage Users</h2>
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <table className="w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-4 border">Name</th>
                  <th className="p-4 border">Email</th>
                  <th className="p-4 border">Role</th>
                  <th className="p-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="p-4 border">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="p-4 border">{user.email}</td>
                    <td className="p-4 border">{user.role}</td>
                    <td className="p-4 border">
                      <button
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 mr-2"
                        onClick={() => console.log('Edit user:', user.id)} // Add your edit handler here
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

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
    </>
  );
};

export default AdminDashboard;
