import axios from 'axios';

// Define the base URL for API requests
const BASE_URL = 'http://localhost:3001/auth';
const ADMIN_BASE_URL = 'http://localhost:3001/admin';

// Helper function to get response data or throw an error for invalid response structure
const getResponseData = (response: any) => {
  if (response?.data) {
    return response.data;
  } else if (response?.message) {
    return response.message;
  } else {
    throw new Error('Unexpected response format from server');
  }
};

// Signup function
export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth?: string
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/signup`,
      { email, password, firstName, lastName, dateOfBirth },
      { withCredentials: true }
    );
    console.log('Signup response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during signup:', error.response?.data);
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Email is already in use')) {
        throw new Error('This email address is already registered. Please try logging in.');
      }
      throw new Error(error.response?.data?.message || 'Error during signup. Please try again.');
    }
    throw new Error('Error during signup. Please check your connection and try again.');
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

    console.log('Login response:', response);
    const data = getResponseData(response);
    const { role } = data;
    localStorage.setItem('userRole', role);
    localStorage.setItem('userLoggedIn', 'true');

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during login. Please try again.');
    }
    throw new Error('Error during login. Please check your connection and try again.');
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
    console.log('Get profile response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching profile:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error fetching profile. Please try again.');
    }
    throw new Error('Error fetching profile. Please check your connection and try again.');
  }
};

// Update user profile (self)
export const updateProfile = async (userDetails: {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  bio?: string;
  photoUrl?: string;
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/profile`, userDetails, { withCredentials: true });
    console.log('Update profile response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during profile update:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error updating profile. Please try again.');
    }
    throw new Error('Error updating profile. Please check your connection and try again.');
  }
};

// Update user profile (admin)
export const updateUserProfile = async (
  userId: number,
  userDetails: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
    bio?: string;
    photoUrl?: string;
  }
) => {
  try {
    const response = await axios.put(`${ADMIN_BASE_URL}/user/${userId}`, userDetails, { withCredentials: true });
    console.log('Update user profile (admin) response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during profile update (admin):', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error updating user profile (admin). Please try again.');
    }
    throw new Error('Error updating user profile (admin). Please check your connection and try again.');
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    console.log('Logout response:', response);
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userRole');
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during logout:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during logout. Please try again.');
    }
    throw new Error('Error during logout. Please check your connection and try again.');
  }
};

// Add Favorite Book
export const addFavoriteBook = async (bookId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/favorite-book/${bookId}`, {}, { withCredentials: true });
    console.log('Add favorite book response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error adding favorite book:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error adding favorite book. Please try again.');
    }
    throw new Error('Error adding favorite book. Please check your connection and try again.');
  }
};

// Remove Favorite Book
export const removeFavoriteBook = async (bookId: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/favorite-book/${bookId}`, { withCredentials: true });
    console.log('Remove favorite book response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error removing favorite book:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error removing favorite book. Please try again.');
    }
    throw new Error('Error removing favorite book. Please check your connection and try again.');
  }
};

// Admin Functions

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/users`, { withCredentials: true });
    console.log('Get all users response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching all users:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error fetching all users. Please try again.');
    }
    throw new Error('Error fetching all users. Please check your connection and try again.');
  }
};

// Get all authors (admin only)
export const getAllAuthors = async () => {
  try {
    const response = await axios.get(`${ADMIN_BASE_URL}/authors`, { withCredentials: true });
    console.log('Get all authors response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching all authors:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error fetching all authors. Please try again.');
    }
    throw new Error('Error fetching all authors. Please check your connection and try again.');
  }
};

// Update user role (admin only)
export const updateUserRole = async (userId: number, role: string) => {
  try {
    const response = await axios.put(
      `${ADMIN_BASE_URL}/user/${userId}/role`,
      { role },
      { withCredentials: true }
    );
    console.log('Update user role response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating user role:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error updating user role. Please try again.');
    }
    throw new Error('Error updating user role. Please check your connection and try again.');
  }
};

// Delete user (admin only)
export const deleteUser = async (userId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/user/${userId}`, { withCredentials: true });
    console.log('Delete user response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting user:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error deleting user. Please try again.');
    }
    throw new Error('Error deleting user. Please check your connection and try again.');
  }
};

// Delete author (admin only)
export const deleteAuthor = async (userId: number) => {
  try {
    const response = await axios.delete(`${ADMIN_BASE_URL}/author/${userId}`, { withCredentials: true });
    console.log('Delete author response:', response);
    return getResponseData(response);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error deleting author:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error deleting author. Please try again.');
    }
    throw new Error('Error deleting author. Please check your connection and try again.');
  }
};
