"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getBooks, deleteBook } from 'api/bookApi';
import { FaTrashAlt } from 'react-icons/fa';

interface Book {
  id: number;
  title: string;
  author?: {
    firstName: string;
    lastName: string;
  };
}

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = "admin"; // This should ideally be fetched from user state/context

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks({});
        setBooks(booksData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId: number) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(bookId);
      alert('Book deleted successfully');
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete book');
    }
  };

  return (
    <AdminLayout role={userRole}>
      <h1 className="text-3xl font-bold mb-6">Manage Books</h1>
      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md">
            <thead>
              <tr>
                <th className="border-b p-4 text-left">ID</th>
                <th className="border-b p-4 text-left">Title</th>
                <th className="border-b p-4 text-left">Author</th>
                <th className="border-b p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book.id}>
                    <td className="border-b p-4">{book.id}</td>
                    <td className="border-b p-4">{book.title}</td>
                    <td className="border-b p-4">
                      {book.author
                        ? `${book.author.firstName} ${book.author.lastName}`
                        : 'Unknown Author'}
                    </td>
                    <td className="border-b p-4">
                      <button
                        onClick={() => handleDeleteBook(book.id)}
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
                  <td colSpan={4} className="p-4 text-center">
                    No books found.
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

export default AdminBooksPage;
