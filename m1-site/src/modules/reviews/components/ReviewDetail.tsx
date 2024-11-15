"use client";

import { useEffect, useState } from 'react';
import { getReviewById } from '../../../api/reviewApi';
import { useParams } from 'next/navigation';

const ReviewDetail = () => {
  const { reviewID } = useParams();
  const [review, setReview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(Number(reviewID));
        setReview(data);
      } catch (err: unknown) {
        const error = err as any;
        console.error('Error:', error);
        setError('Could not fetch review');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewID]);

  if (loading) {
    return <p>Loading review details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!review) {
    return <p>No review details available</p>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold">{review.title}</h2>
        <p className="text-lg text-gray-600 mt-2">Rating: {review.rating}/5</p>
        <p className="mt-4">{review.comment}</p>
        <p className="text-gray-700 mt-4">
          Reviewed by: {review.user?.firstName} {review.user?.lastName}
        </p>
      </div>
    </div>
  );
};

export default ReviewDetail;
