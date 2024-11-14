"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from 'api/userApi';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear previous error
    try {
      // Make login API call
      await login(email, password);
      
      // Save login state to localStorage
      localStorage.setItem('userLoggedIn', 'true');

      // Close modal after successful login
      onClose();
      
      // Redirect to home page
      router.push('/');
    } catch (err: any) {
      // Set error message based on the response from the backend
      setError(err.message || 'Something went wrong during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading} // Disable input during loading
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading} // Disable input during loading
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {loading ? 'Logging in...' : 'Login'}
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
        disabled={loading} // Disable close button during loading
      >
        Close
      </button>
    </div>
  );
};

export default LoginForm;
