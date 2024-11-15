"use client";

import { useState, useCallback } from 'react';
import { debounce } from '../../utils/debounce';
import ReviewList from '../../modules/reviews/components/ReviewList';

const ReviewsPage = () => {
  // State for managing review filters
  const [filters, setFilters] = useState({
    title: '',
    rating: '',
  });

  // Handle change in filters
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateFilters({ ...filters, [name]: value });
  };

  // Debounced version of the function to update the filters state
  const updateFilters = useCallback(
    debounce((newFilters: any) => {
      setFilters(newFilters);
    }, 300),
    [] // Dependencies array
  );

  return (
    <>
      <h2 className="text-3xl font-semibold text-gray-800">Reviews</h2>
      <p className="text-gray-600 mt-4">
        Explore reviews by our users on various books.
      </p>

      {/* Filters Section */}
      <div className="mt-6">
        <form className="flex flex-wrap gap-4">
          <input
            type="text"
            name="title"
            onChange={handleInputChange}
            placeholder="Title"
            className="border rounded-md p-2"
          />
          <input
            type="text"
            name="rating"
            onChange={handleInputChange}
            placeholder="Rating"
            className="border rounded-md p-2"
          />
        </form>
      </div>

      {/* Review List Component */}
      <div className="mt-10">
        <ReviewList filters={filters} />
      </div>
    </>
  );
};

export default ReviewsPage;
