"use client";

import { useEffect, useState } from 'react';
import { getBookById } from '../../../api/bookApi';
import { getReviewsByBookId } from '../../../api/reviewApi';
import FavoriteBookButton from './FavoriteBookButton';

interface BookDetailProps {
  bookID: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookID }) => {
  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookById(Number(bookID));
        setBook(bookData);

        const reviewData = await getReviewsByBookId(Number(bookID));
        setReviews(reviewData);
      } catch (err) {
        setError('Could not fetch book details');
      } finally {
        setLoading(false);
      }
    };
    if (bookID) {
      fetchBookDetails();
    }
  }, [bookID]);

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!book) {
    return <p>No book details available</p>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={book.coverImageUrl || 'https://via.placeholder.com/150'}
          alt={`Cover of ${book.title}`}
          className="w-full h-64 object-cover rounded-md"
        />
        <div className="mt-6">
          <h2 className="text-4xl font-bold">{book.title}</h2>
          <p className="text-lg text-gray-600 mt-2">
            Author: {book.author?.firstName} {book.author?.lastName}
          </p>
          <p className="mt-4">{book.summary}</p>
          <p className="text-gray-700 mt-4">
            Genre: {book.genre} <br />
            Language: {book.language} <br />
            Pages: {book.pageCount} <br />
            Price: ${typeof book.price === 'number' ? book.price.toFixed(2) : book.price} <br />
            Publisher: {book.publisher}
          </p>
          <FavoriteBookButton bookId={book.id} isFavorited={book.isFavorited || false} />
        </div>
      </div>

      <div className="bg-gray-100 mt-10 p-6 rounded-lg shadow-md">
        <h3 className="text-3xl font-bold">Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <p className="font-bold">Rating: {review.rating}/5</p>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-600 mt-2">
                By: {review.user?.firstName} {review.user?.lastName}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet for this book.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
