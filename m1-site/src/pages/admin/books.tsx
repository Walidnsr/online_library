"use client";

import { useEffect, useState } from 'react';
import { getAllBooks, deleteBook } from '../../api/adminApi';

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllBooks();
        setBooks(response);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId: number) => {
    await deleteBook(bookId);
    setBooks(books.filter(book => book.id !== bookId));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <table className="w-full text-left bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border p-4">Title</th>
              <th className="border p-4">Author</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td className="border p-4">{book.title}</td>
                <td className="border p-4">{book.author}</td>
                <td className="border p-4">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => handleDeleteBook(book.id)}
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

export default AdminBooks;
