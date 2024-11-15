"use client";

import BookList from '../../modules/books/components/BookList';
import { useState } from 'react';

const BooksPage = () => {
  // State for managing book filters
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    language: '',
  });

  // Handle change in filters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800">Books Collection</h2>
      <p className="text-gray-600 mt-4">
        Explore our collection of books across different genres and languages.
      </p>

      {/* Filters Section */}
      <div className="mt-6">
        <form className="flex flex-wrap gap-4">
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="genre"
            value={filters.genre}
            onChange={handleInputChange}
            placeholder="Genre"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="language"
            value={filters.language}
            onChange={handleInputChange}
            placeholder="Language"
            className="border rounded-md p-2"
          />
        </form>
      </div>

      {/* Book List Component */}
      <div className="mt-10">
        <BookList filters={filters} />
      </div>
    </div>
  );
};

export default BooksPage;
