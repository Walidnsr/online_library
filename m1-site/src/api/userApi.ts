// src/api/userApi.ts

import axios, { AxiosError } from 'axios';

// Define the base URL for API requests
const BASE_URL = 'http://localhost:3001/auth';

// Signup function
export const signup = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      email,
      password,
      firstName,
      lastName,
    }, { withCredentials: true });
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
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    }, { withCredentials: true });
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
// Update user profile
export const updateProfile = async (firstName: string, lastName: string) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/profile`,
        { firstName, lastName },
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error response during profile update:', error.response?.data);
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
