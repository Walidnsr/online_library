"use client";

import { useEffect, useState } from 'react';
import { getAllReviews, deleteReview } from '../../api/adminApi';

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getAllReviews();
        setReviews(response);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Manage Reviews</h1>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <table className="w-full text-left bg-white shadow-lg rounded-lg">
          <thead>
            <tr>
              <th className="border p-4">Review ID</th>
              <th className="border p-4">Book Title</th>
              <th className="border p-4">Reviewer</th>
              <th className="border p-4">Rating</th>
              <th className="border p-4">Comment</th>
              <th className="border p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review.id}>
                <td className="border p-4">{review.id}</td>
                <td className="border p-4">{review.bookTitle}</td>
                <td className="border p-4">{review.reviewerName}</td>
                <td className="border p-4">{review.rating}</td>
                <td className="border p-4">{review.comment}</td>
                <td className="border p-4">
                  <button
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDeleteReview(review.id)}
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

export default AdminReviews;
