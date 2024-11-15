"use client";

import { useState, useEffect } from 'react';
import { createReview, updateReview, getReviewById } from '../../../api/reviewApi';

interface ReviewFormProps {
  reviewID?: number; // If provided, we will update; if not, we create a new review
  bookID: number; // The ID of the book being reviewed
}

const ReviewForm: React.FC<ReviewFormProps> = ({ reviewID, bookID }) => {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If reviewID is provided, we're editing an existing review
    if (reviewID) {
      const fetchReviewDetails = async () => {
        setLoading(true);
        try {
          const review = await getReviewById(reviewID);
          setTitle(review.title);
          setRating(review.rating);
          setComment(review.comment);
        } catch (err: unknown) {
          const error = err as any;
          setError('Could not load review details');
        } finally {
          setLoading(false);
        }
      };

      fetchReviewDetails();
    }
  }, [reviewID]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const reviewData = {
      title,
      rating,
      comment,
      bookId: bookID, // Corrected to match the expected type in `createReview` and `updateReview`
    };

    try {
      if (reviewID) {
        // Update the existing review
        await updateReview(reviewID, reviewData);
      } else {
        // Create a new review
        await createReview(reviewData);
      }
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as any;
      console.error('Error:', error);
      setError('Could not save review');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{reviewID ? 'Edit Review' : 'Add a Review'}</h2>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Review saved successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value={0} disabled>
              Select a rating
            </option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {reviewID ? 'Update Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
