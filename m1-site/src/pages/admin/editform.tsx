import React from 'react';

interface EditUserModalProps {
  user: {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    bio?: string;
  };
  isOpen: boolean;
  onSave: () => void;
  onCancel: () => void;
  onChange: (field: string, value: string) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onSave,
  onCancel,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Phone Number</label>
            <input
              type="text"
              value={user.phoneNumber || ''}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              value={user.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Bio</label>
            <textarea
              value={user.bio || ''}
              onChange={(e) => onChange('bio', e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
