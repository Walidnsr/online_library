"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getAllAuthors, deleteAuthor } from 'api/userApi';
import { FaTrashAlt } from 'react-icons/fa';

interface Author {
  id: number;
  name: string;
  email: string;
}

const AdminAuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await getAllAuthors();
        setAuthors(authorsData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch authors');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthors();
  }, []);

  const handleDeleteAuthor = async (authorId: number) => {
    if (!window.confirm('Are you sure you want to delete this author?')) return;
    try {
      await deleteAuthor(authorId);
      alert('Author deleted successfully');
      setAuthors((prevAuthors) => prevAuthors.filter((author) => author.id !== authorId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete author');
    }
  };

  return (
    <AdminLayout role="admin">
      <h1 className="text-3xl font-bold mb-6">Manage Authors</h1>
      {loading ? (
        <p>Loading authors...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">ID</th>
                <th className="border-b p-4 text-left">Name</th>
                <th className="border-b p-4 text-left">Email</th>
                <th className="border-b p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.length > 0 ? (
                authors.map((author) => (
                  <tr key={author.id}>
                    <td className="border-b p-4">{author.id}</td>
                    <td className="border-b p-4">{author.name}</td>
                    <td className="border-b p-4">{author.email}</td>
                    <td className="border-b p-4">
                      <button
                        onClick={() => handleDeleteAuthor(author.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 flex items-center space-x-2"
                      >
                        <FaTrashAlt />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border-b p-4 text-center">
                    No authors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminAuthorsPage;
