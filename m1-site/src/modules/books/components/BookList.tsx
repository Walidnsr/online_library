"use client";

import { useEffect, useState } from 'react';
import { getBooks } from '../../../api/bookApi';
import Link from 'next/link';

// Define an interface for the filters
interface Filters {
  title?: string;
  genre?: string;
  language?: string;
}

// Define an interface for the BookListProps to type the props that the component receives
interface BookListProps {
  filters: Filters;
}

const BookList: React.FC<BookListProps> = ({ filters }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Set loading to true at the start of the fetch
      try {
        const data = await getBooks(filters);
        setBooks(data);
        setError(null);
      } catch (err) {
        setError('Could not fetch books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [filters]);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (books.length === 0) {
    return <p>No books found for the given filters.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {books.map((book) => (
        <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={book.coverImageUrl || 'https://via.placeholder.com/150'}
            alt={`Cover of ${book.title}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-600">{book.genre}</p>
            <p className="text-sm text-gray-600">{book.language}</p>
            <p className="text-sm text-blue-700">
              ${typeof book.price === 'number' ? book.price.toFixed(2) : book.price}
            </p>
            <Link href={`/books/${book.id}`}>
              <button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-700 inline-block">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
