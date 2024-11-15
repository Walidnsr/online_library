"use client";

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getBooks, getBookById } from '../api/bookApi';
import BookDetail from '../modules/books/components/BookDetail';

const HomePage = () => {
  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookID, setSelectedBookID] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [loadingBook, setLoadingBook] = useState(false);

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

  const handleViewDetails = async (bookID: string) => {
    setLoadingBook(true);
    setSelectedBookID(bookID);

    try {
      const bookData = await getBookById(Number(bookID));
      setSelectedBook(bookData);
    } catch (err) {
      setError('Could not fetch book details');
    } finally {
      setLoadingBook(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedBookID(null);
    setSelectedBook(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to Online Library</h1>
        <p className="text-lg text-gray-700 mt-4">
          Millions of books available through Controlled Digital Lending
        </p>
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
          {loadingBook ? (
            <p>Loading book details...</p>
          ) : selectedBook ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                onClick={handleCloseDetails}
                className="text-red-500 font-bold mb-4"
              >
                Close Details
              </button>
              <BookDetail bookID={selectedBookID} />
            </div>
          ) : (
            <p>No book details available</p>
          )}
        </section>
      )}
    </div>
  );
};

export default HomePage;
