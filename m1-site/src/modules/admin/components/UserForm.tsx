// src/modules/admin/components/UserForm.tsx
import React, { useState } from 'react';
import Modal from '../../../components/Modal';
import { User } from '../../../types/user.types';

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: User) => void;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onClose }) => {
  const [userData, setUserData] = useState<User>({
    id: user?.id ?? 0,
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    email: user?.email ?? '',
    role: user?.role ?? 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(userData);
  };

  return (
    <Modal onClose={onClose} isVisible={true}>
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <div className="mb-4">
        <input
          type="text"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <select
          name="role"
          value={userData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
        </select>
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        {user ? 'Update' : 'Add'}
      </button>
    </Modal>
  );
};

export default UserForm;
