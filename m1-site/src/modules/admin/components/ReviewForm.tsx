// src/modules/admin/components/ReviewForm.tsx
import React, { useState } from 'react';
import Modal from '../../../components/Modal'; // Assuming you already have a Modal component

interface Review {
  id?: number;
  content: string;
  rating: number;
  bookId: string;
}

interface ReviewFormProps {
  review?: Review;
  onSubmit: (reviewData: Review) => void;
  onClose: () => void;
  isVisible: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ review, onSubmit, onClose, isVisible }) => {
  const [reviewData, setReviewData] = useState<Review>({
    content: '',
    rating: 0,
    bookId: '',
    ...review, // Populate fields if editing an existing review
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewData((prev: Review) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(reviewData);
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <h2 className="text-2xl mb-4">{review ? 'Edit Review' : 'Add Review'}</h2>
      <div className="mb-4">
        <textarea
          name="content"
          value={reviewData.content}
          onChange={handleChange}
          placeholder="Review Content"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="rating"
          value={reviewData.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="bookId"
          value={reviewData.bookId}
          onChange={handleChange}
          placeholder="Book ID"
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        {review ? 'Update' : 'Add'}
      </button>
    </Modal>
  );
};

export default ReviewForm;
