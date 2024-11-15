import axios, { AxiosResponse } from 'axios';

const ADMIN_BASE_URL = 'http://localhost:3001/admin';

// Helper function to get response data or throw an error for invalid response structure
const getResponseData = <T>(response: AxiosResponse<T>): T => {
  if (response?.data) {
    return response.data;
  } else {
    throw new Error('Unexpected response format from server');
  }
};

// API Call Function Types
interface AuthorProfileData {
  biography: string;
  photoUrl?: string;
}

interface BookData {
  title: string;
  authorId: number;
  description: string;
}

interface ReviewData {
  content: string;
  rating: number;
  bookId: number;
}

interface UserProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  photoUrl?: string;
}

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/users`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw new Error('Error fetching all users. Please try again.');
  }
};

// Get all authors (admin only)
export const getAllAuthors = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/authors`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error fetching all authors:', error);
    throw new Error('Error fetching all authors. Please try again.');
  }
};

// Create or Update an Author Profile (admin only)
export const saveAuthorProfile = async (authorId: number | null, profileData: AuthorProfileData) => {
  try {
    const url = authorId ? `${ADMIN_BASE_URL}/author/${authorId}` : `${ADMIN_BASE_URL}/author`;
    const response = authorId
      ? await axios.put(url, profileData, { withCredentials: true })
      : await axios.post(url, profileData, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error saving author profile:', error);
    throw new Error('Error saving author profile. Please try again.');
  }
};

// Update user role (admin only)
export const updateUserRole = async (userId: number, role: string) => {
  try {
    const response = await axios.put(`${ADMIN_BASE_URL}/user/${userId}/role`, { role }, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error updating user role:', error);
    throw new Error('Error updating user role. Please try again.');
  }
};

// Update user profile (admin only)
export const updateUserProfile = async (userId: number, userDetails: UserProfileData) => {
  try {
    const response = await axios.put(`${ADMIN_BASE_URL}/user/${userId}`, userDetails, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Error updating user profile. Please try again.');
  }
};

// Delete user (admin only)
export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/user/${userId}`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user. Please try again.');
  }
};

// Delete author (admin only)
export const deleteAuthor = async (authorId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/author/${authorId}`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error deleting author:', error);
    throw new Error('Error deleting author. Please try again.');
  }
};

// Get all books (admin only)
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/books`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error fetching all books:', error);
    throw new Error('Error fetching all books. Please try again.');
  }
};

// Create or Update Book (admin only)
export const saveBook = async (bookId: number | null, bookData: BookData) => {
  try {
    const url = bookId ? `${ADMIN_BASE_URL}/book/${bookId}` : `${ADMIN_BASE_URL}/book`;
    const response = bookId
      ? await axios.put(url, bookData, { withCredentials: true })
      : await axios.post(url, bookData, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error saving book:', error);
    throw new Error('Error saving book. Please try again.');
  }
};

// Delete book (admin only)
export const deleteBook = async (bookId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/book/${bookId}`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error deleting book:', error);
    throw new Error('Error deleting book. Please try again.');
  }
};

// Get all reviews (admin only)
export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/reviews`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    throw new Error('Error fetching all reviews. Please try again.');
  }
};

// Create or Update Review (admin only)
export const saveReview = async (reviewId: number | null, reviewData: ReviewData) => {
  try {
    const url = reviewId ? `${ADMIN_BASE_URL}/review/${reviewId}` : `${ADMIN_BASE_URL}/review`;
    const response = reviewId
      ? await axios.put(url, reviewData, { withCredentials: true })
      : await axios.post(url, reviewData, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error saving review:', error);
    throw new Error('Error saving review. Please try again.');
  }
};

// Delete review (admin only)
export const deleteReview = async (reviewId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/review/${reviewId}`, { withCredentials: true });
    return getResponseData(response);
  } catch (error) {
    console.error('Error deleting review:', error);
    throw new Error('Error deleting review. Please try again.');
  }
};
