"use client";

import { useState } from 'react';
import { signup } from 'api/userApi';
import { useRouter } from 'next/navigation';

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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      // Call signup API with all the form details
      await signup(email, password, firstName, lastName, dateOfBirth);
      onClose(); // Close the modal after successful signup
      router.push('/'); // Redirect to the home page after successful signup
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {error && (
        <p className="text-red-600 mt-2">
          {error}
        </p>
      )}
      <button
        onClick={onClose}
        className="text-sm text-blue-600 mt-4 underline"
        disabled={loading}
      >
        Close
      </button>
    </div>
  );
};

export default SignupForm;
