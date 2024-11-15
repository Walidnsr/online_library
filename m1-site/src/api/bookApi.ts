import axios from 'axios';

const BASE_URL = 'http://localhost:3001/books';

// Get books with optional filters
export const getBooks = async (filters?: { title?: string; genre?: string; language?: string; publicationDate?: string; format?: string }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: filters,
      withCredentials: true,
    });
    return response.data.map((book: any) => ({
      ...book,
      author: `${book.author?.firstName || ''} ${book.author?.lastName || ''}`.trim(),
    }));
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error('Error fetching books:', err.response ? err.response.data : err.message);
    throw new Error('Could not fetch books');
  }
};

// Get book by ID
export const getBookById = async (id: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error fetching book with ID ${id}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not fetch book');
  }
};

// Create a new book (only for authors)
export const createBook = async (bookData: Record<string, any>) => {
  try {
    const response = await axios.post(BASE_URL, bookData, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error('Error creating book:', err.response ? err.response.data : err.message);
    throw new Error('Could not create book');
  }
};

// Update an existing book (only for authors)
export const updateBook = async (id: number, updateData: Record<string, any>) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updateData, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error updating book with ID ${id}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not update book');
  }
};

// Delete a book by ID (only for authors)
export const deleteBook = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
    return response.data;
  } catch (error: unknown) {
    const err = error as any; // Casting error to 'any' to handle unknown type
    console.error(`Error deleting book with ID ${id}:`, err.response ? err.response.data : err.message);
    throw new Error('Could not delete book');
  }
};
