"use client";

import { useEffect, useState } from 'react';
import { getAuthors } from '../../../api/authorApi';
import Link from 'next/link';

const AuthorList = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true); // Explicitly setting loading state
        const data = await getAuthors();
        
        // Ensure authors data is in expected format
        if (Array.isArray(data)) {
          setAuthors(data);
        } else {
          setError('Unexpected response format.');
        }
      } catch (err: any) {
        console.error('Error fetching authors:', err);
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {authors.map((author) => (
        <div key={author.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg">{author.user?.firstName} {author.user?.lastName}</h3>
          <p className="text-sm text-gray-600">{author.biography}</p>
          <Link href={`/authors/${author.user?.id}`}>
            <button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-700">
              View Profile
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AuthorList;
