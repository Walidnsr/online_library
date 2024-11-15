"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllUsers, updateUserRole, deleteUser, updateUserProfile } from '../../api/userApi';
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa';
import EditUserModal from './editform'; // Ensure this file exists as mentioned in your earlier structure

interface User {
  id: number;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        if (Array.isArray(usersData)) {
          setUsers(usersData);
        } else {
          throw new Error('Unexpected response format from the server');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      const responseMessage = await updateUserRole(userId, newRole);
      alert(responseMessage);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const responseMessage = await deleteUser(userId);
      alert(responseMessage);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete user');
    }
  };

  const handleEditUserDetails = (user: User) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleSaveUserDetails = async () => {
    if (editUser) {
      try {
        const responseMessage = await updateUserProfile(editUser.id, {
          firstName: editUser.firstName,
          lastName: editUser.lastName,
          phoneNumber: editUser.phoneNumber || '',
          address: editUser.address || '',
          bio: editUser.bio || '',
        });
        alert(responseMessage);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === editUser.id ? editUser : user))
        );
        setEditUser(null);
        setIsEditModalOpen(false);
      } catch (err: any) {
        alert(err.message || 'Failed to update user details');
      }
    }
  };

  const handleChangeUserDetails = (field: string, value: string) => {
    if (editUser) {
      setEditUser({ ...editUser, [field]: value });
    }
  };

  const handleCancelEdit = () => {
    setEditUser(null);
    setIsEditModalOpen(false);
  };

  return (
    <AdminLayout role="admin">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">ID</th>
                <th className="border-b p-4 text-left">Email</th>
                <th className="border-b p-4 text-left">Role</th>
                <th className="border-b p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="border-b p-4">{user.id}</td>
                    <td className="border-b p-4">{user.email}</td>
                    <td className="border-b p-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleUpdateRole(user.id, e.target.value)
                        }
                        className="border rounded-md p-1"
                      >
                        <option value="regular">Regular</option>
                        <option value="author">Author</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="border-b p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUserDetails(user)}
                          className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 flex items-center space-x-2"
                        >
                          <FaUserEdit />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 flex items-center space-x-2"
                        >
                          <FaTrashAlt />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-4 text-center" colSpan={4}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isEditModalOpen && editUser && (
        <EditUserModal
          user={editUser}
          isOpen={isEditModalOpen}
          onSave={handleSaveUserDetails}
          onCancel={handleCancelEdit}
          onChange={handleChangeUserDetails}
        />
      )}
    </AdminLayout>
  );
};

export default UsersPage;
