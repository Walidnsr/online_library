"use client";

import { useEffect, useState } from 'react';
import { getAllAuthors, deleteAuthor } from '../../api/adminApi';

const AdminAuthors: React.FC = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await getAllAuthors();
        setAuthors(response);
      } catch (error) {
        console.error("Failed to fetch authors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (authorId: number) => {
    await deleteAuthor(authorId);
    setAuthors(authors.filter(author => author.id !== authorId));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Authors</h1>
      {loading ? (
        <p>Loading authors...</p>
      ) : (
        <table className="w-full text-left bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border p-4">Name</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td className="border p-4">{author.name}</td>
                <td className="border p-4">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDeleteAuthor(author.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AdminAuthors;
