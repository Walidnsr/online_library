// src/modules/books/components/FavoriteBookButton.tsx

"use client";

import { useState } from 'react';
import { addFavoriteBook, removeFavoriteBook } from 'api/userApi'; // Add these methods to userApi
import { useRouter } from 'next/navigation';

interface FavoriteBookButtonProps {
  bookId: number;
  isFavorited: boolean; // Initial favorite status
}

const FavoriteBookButton: React.FC<FavoriteBookButtonProps> = ({ bookId, isFavorited }) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      if (favorited) {
        await removeFavoriteBook(bookId);
      } else {
        await addFavoriteBook(bookId);
      }
      setFavorited(!favorited);
      router.refresh(); // Refresh to show updated state
    } catch (error) {
      console.error("Error updating favorite status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`mt-4 px-4 py-2 rounded-md ${
        favorited ? "bg-red-600 text-white" : "bg-blue-600 text-white"
      } hover:bg-opacity-90`}
    >
      {loading ? "Updating..." : favorited ? "Unfavorite" : "Favorite"}
    </button>
  );
};

export default FavoriteBookButton;
