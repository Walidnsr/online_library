"use client";

import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from 'api/userApi';

const ProfileForm = ({ onClose }: { onClose: () => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setFirstName(data.firstName);
        setLastName(data.lastName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(firstName, lastName);
      alert('Profile updated successfully');
      onClose(); // Close modal after successful update
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="w-full border rounded-md p-2 mb-2"
        />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button onClick={onClose} className="text-sm text-blue-600 mt-4 underline">Close</button>
    </div>
  );
};

export default ProfileForm;
