"use client";

import { useEffect, useState } from 'react';
import { getAuthorProfile } from '../../api/authorApi';
import { useRouter } from 'next/router';

const AuthorDetailPage = () => {
  const router = useRouter();
  const { authorId } = router.query;

  const [author, setAuthor] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authorId) {
      const fetchAuthor = async () => {
        setLoading(true);
        try {
          const data = await getAuthorProfile(Number(authorId));
          setAuthor(data);
        } catch (err: unknown) {
          const error = err as any;
          setError('Could not fetch author details');
        } finally {
          setLoading(false);
        }
      };
      fetchAuthor();
    }
  }, [authorId]);

  if (loading) {
    return <p>Loading author details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!author) {
    return <p>No author details found.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold">{author.user.firstName} {author.user.lastName}</h2>
      <p className="text-lg text-gray-600 mt-2">Biography: {author.biography}</p>
      {author.photoUrl && (
        <img
          src={author.photoUrl}
          alt={`${author.user.firstName} ${author.user.lastName}`}
          className="mt-4 rounded-lg"
        />
      )}
    </div>
  );
};

export default AuthorDetailPage;
