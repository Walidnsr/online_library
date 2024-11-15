"use client";

import { useState, useEffect } from 'react';
import UserList from '../../modules/admin/components/UserList';
import UserForm from '../../modules/admin/components/UserForm';
import { getAllUsers, updateUserProfile, deleteUser } from '../../api/adminApi';
import { User } from '../../types/user.types';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUserFormOpen(true);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleSaveUser = async (userData: User) => {
    try {
      if (userData.id) {
        await updateUserProfile(userData.id, userData);
      }
      // Add additional logic for creating a new user if needed
      setIsUserFormOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
        <button onClick={() => setIsUserFormOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add User
        </button>
      </div>
      <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      {isUserFormOpen && (
        <UserForm user={selectedUser} onSubmit={handleSaveUser} onClose={() => setIsUserFormOpen(false)} />
      )}
    </>
  );
};

export default AdminUsersPage;
