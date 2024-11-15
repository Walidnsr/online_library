import axios from 'axios';

const BASE_URL = 'http://localhost:3001/reviews';

// Get all reviews with optional filters
export const getReviews = async (filters?: { title?: string; rating?: string }) => {
  try {
    console.log('Fetching reviews with filters:', filters);
    const response = await axios.get(BASE_URL, {
      params: filters,
      withCredentials: true,
    });
    console.log('Received reviews data:', response.data);
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error('Error fetching reviews:', err.response ? err.response.data : err.message);
    throw new Error('Could not fetch reviews');
  }
};

// Get reviews by book ID
export const getReviewsByBookId = async (bookId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/book/${bookId}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error fetching reviews for book ID ${bookId}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not fetch reviews');
  }
};

// Create a new review (requires user authentication)
export const createReview = async (reviewData: {
  bookId: number;
  rating: number;
  comment?: string;
  title?: string; // Optional review title for more detail
}) => {
  try {
    const response = await axios.post(BASE_URL, reviewData, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error('Error creating review:', err.response ? err.response.data : err.message);
    throw new Error('Could not create review');
  }
};

// Get review by ID (for editing purposes)
export const getReviewById = async (reviewId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${reviewId}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error fetching review with ID ${reviewId}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not fetch review');
  }
};

// Update an existing review (requires user authentication)
export const updateReview = async (reviewId: number, updateData: { rating: number; comment?: string; title?: string }) => {
  try {
    const response = await axios.put(`${BASE_URL}/${reviewId}`, updateData, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error updating review with ID ${reviewId}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not update review');
  }
};

// Delete a review by ID (requires user authentication)
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${reviewId}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error deleting review with ID ${reviewId}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not delete review');
  }
};
