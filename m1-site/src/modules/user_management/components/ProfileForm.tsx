"use client";

import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from 'api/userApi';

interface ProfileFormProps {
  onClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose }) => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          bio: data.bio || '',
        });
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
    setError(null);
    try {
      await updateProfile(profileData);
      alert('Profile updated successfully');
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={profileData.firstName}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={profileData.lastName}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={profileData.phoneNumber}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={profileData.address}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-2"
          disabled={loading}
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profileData.bio}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-2"
          rows={3}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <button onClick={onClose} className="text-sm text-blue-600 mt-4 underline" disabled={loading}>
        Close
      </button>
    </div>
  );
};

export default ProfileForm;
