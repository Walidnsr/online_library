import axios from 'axios';

const BASE_URL = 'http://localhost:3001/authors';

// Create an author profile (requires user to be an author)
export const createAuthorProfile = async (
  userId: number,
  profileData: { biography: string; photoUrl?: string }
) => {
  try {
    const response = await axios.post(`${BASE_URL}/${userId}/profile`, profileData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error('Error creating author profile:', err.response ? err.response.data : err.message);
    throw new Error('Could not create author profile');
  }
};

// Update an author profile (requires user to be an author)
export const updateAuthorProfile = async (
  userId: number,
  updates: { biography?: string; photoUrl?: string }
) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}/profile`, updates, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as any;
    console.error('Error updating author profile:', err.response ? err.response.data : err.message);
    throw new Error('Could not update author profile');
  }
};

// Get all authors
export const getAuthors = async () => {
  try {
    const response = await axios.get(BASE_URL, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any;
    console.error('Error fetching authors:', err.response ? err.response.data : err.message);
    throw new Error('Could not fetch authors');
  }
};

// Get author profile by user ID
export const getAuthorProfile = async (userId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/profile`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any;
    console.error('Error fetching author profile:', err.response ? err.response.data : err.message);
    throw new Error('Could not fetch author profile');
  }
};
