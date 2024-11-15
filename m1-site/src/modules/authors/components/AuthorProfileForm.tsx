"use client";

import { useState, useEffect } from 'react';
import { createAuthorProfile, updateAuthorProfile, getAuthorProfile } from '../../../api/authorApi';

interface AuthorProfileFormProps {
  userId: number;
}

const AuthorProfileForm: React.FC<AuthorProfileFormProps> = ({ userId }) => {
  const [biography, setBiography] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      setLoading(true);
      try {
        const profile = await getAuthorProfile(userId);
        if (profile) {
          setBiography(profile.biography || '');
          setPhotoUrl(profile.photoUrl || '');
        }
      } catch (err: any) {
        console.error('Error fetching author profile:', err);
        setError('Could not load author profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateAuthorProfile(userId, { biography, photoUrl });
      setSuccess(true);
    } catch (err: any) {
      console.error('Error updating author profile:', err);
      setError('Could not save author profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Author Profile</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Profile saved successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Biography</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default AuthorProfileForm;
