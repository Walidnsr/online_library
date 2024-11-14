// src/modules/user_management/components/SignupForm.tsx
import React, { useState } from 'react';
import { signup } from '../../../api/userApi'; // Adjust according to your folder hierarchy
;  // Adjust the path accordingly

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(email, password, firstName, lastName, dateOfBirth);
      setError(null);
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Date of Birth</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
