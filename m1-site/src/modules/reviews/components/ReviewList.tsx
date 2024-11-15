"use client";

import { useEffect, useState } from 'react';
import { getReviews } from '../../../api/reviewApi';
import Link from 'next/link';

interface ReviewListProps {
  filters: {
    title: string;
    rating: string;
  };
}

const ReviewList: React.FC<ReviewListProps> = ({ filters }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(filters); // Pass filters to the API function
        setReviews(data);
      } catch (err: unknown) {
        const error = err as any;
        console.error('Error:', error);
        setError('Could not fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [filters]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg">{review.title}</h3>
          <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
          <p className="text-sm text-gray-800 mt-2">{review.comment}</p>
          <Link href={`/reviews/${review.id}`}>
            <button className="bg-blue-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-blue-700">
              View Details
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
