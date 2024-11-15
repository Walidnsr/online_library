"use client";

import { useEffect, useState } from 'react';
import { getAuthors } from '../../api/authorApi';
import Link from 'next/link';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true); // Explicitly set loading state
        const data = await getAuthors();
        console.log('Fetched Authors Data:', data); // Log data to verify
        setAuthors(data);
      } catch (err: unknown) {
        const error = err as any;
        console.error('Error fetching authors:', error);
        setError('Could not fetch authors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) {
    return <p>Loading authors...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (authors.length === 0) {
    return <p>No authors found.</p>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800">Authors</h2>
      <p className="text-gray-600 mt-4">Browse and learn more about our authors.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {authors.map((author) => (
          <div key={author.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-bold text-lg">
              {author.user?.firstName} {author.user?.lastName}
            </h3>
            <p className="text-sm text-gray-600">
              {author.biography ?? 'No biography available'}
            </p>
            <Link href={`/authors/${author.user?.id}`}>
              <button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-700">
                View Profile
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
