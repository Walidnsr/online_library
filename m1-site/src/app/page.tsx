"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { getBooks } from '../api/bookApi';
import BookDetail from '../modules/books/components/BookDetail';

const HomePage = () => {
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookID, setSelectedBookID] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingBooks = async () => {
      try {
        const books = await getBooks(); // Fetch all books; ideally, trending books would be a separate API call
        setTrendingBooks(books.slice(0, 4)); // Limiting to 4 books for display
      } catch (err) {
        setError('Could not fetch trending books');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingBooks();
  }, []);

  const handleViewDetails = (bookID: string) => {
    setSelectedBookID(bookID);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to Online Library</h1>
        <p className="text-lg text-gray-700 mt-4">
          Millions of books available through Controlled Digital Lending
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/books">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Browse Books
            </button>
          </Link>
          <Link href="/authors">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
              Browse Authors
            </button>
          </Link>
          <Link href="/reviews">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
              View Reviews
            </button>
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800">Trending Books</h2>

        {loading ? (
          <p>Loading trending books...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {trendingBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={book.coverImageUrl || 'https://via.placeholder.com/150'}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <button
                    onClick={() => handleViewDetails(book.id)}
                    className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Render BookDetail inline when a book is selected */}
      {selectedBookID && (
        <section className="container mx-auto px-6 py-10">
          <BookDetail bookID={selectedBookID} />
        </section>
      )}
    </div>
  );
};

export default HomePage;
