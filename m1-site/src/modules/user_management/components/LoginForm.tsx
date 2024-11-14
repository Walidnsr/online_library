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
    setError(null);
    try {
      const user = await login(email, password);
      
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);

      onClose();

      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user.role === 'author') {
        router.push('/author/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
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
          className={`w-full py-2 rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button onClick={onClose} className="text-sm text-blue-600 mt-4 underline" disabled={loading}>
        Close
      </button>
    </div>
  );
};

export default LoginForm;
