"use client";

import { useParams } from 'next/navigation';
import BookDetail from '../../modules/books/components/BookDetail';

const BookDetailPage = () => {
  const params = useParams();

  // Check if params is not null and contains bookID
  if (!params || !params.bookID) {
    return <p>Loading...</p>;
  }

  const bookID = Array.isArray(params.bookID) ? params.bookID[0] : params.bookID;

  return (
    <div className="bg-gray-100 min-h-screen">
      <BookDetail bookID={bookID} />
    </div>
  );
};

export default BookDetailPage;
