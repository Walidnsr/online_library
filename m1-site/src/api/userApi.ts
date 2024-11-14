// src/api/userApi.ts

import axios from 'axios';

// Define the base URL for API requests
const BASE_URL = 'http://localhost:3001/auth';

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
      {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during signup:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during signup');
    }
    throw new Error('Error during signup');
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during login');
    }
    throw new Error('Error during login');
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching profile:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error fetching profile');
    }
    throw new Error('Error fetching profile');
  }
};

// Update user profile
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
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during profile update:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error updating profile');
    }
    throw new Error('Error updating profile');
  }
};

// Logout user
export const logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error during logout:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error during logout');
    }
    throw new Error('Error during logout');
  }
};

// Add Favorite Book
export const addFavoriteBook = async (bookId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/favorite-book/${bookId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error adding favorite book:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error adding favorite book');
    }
    throw new Error('Error adding favorite book');
  }
};

// Remove Favorite Book
export const removeFavoriteBook = async (bookId: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/unfavorite-book/${bookId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error removing favorite book:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error removing favorite book');
    }
    throw new Error('Error removing favorite book');
  }
};
