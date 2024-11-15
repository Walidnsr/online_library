// src/modules/admin/components/BookForm.tsx
import React, { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';

interface Book {
  id?: number;
  title: string;
  authorId: string;
  description: string;
}

interface BookFormProps {
  book?: Book;
  onSubmit: (bookData: Book) => void;
  onClose: () => void;
  isVisible: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ book, onSubmit, onClose, isVisible }) => {
  const [bookData, setBookData] = useState<Book>({
    title: '',
    authorId: '',
    description: '',
    ...book, // Populate fields if editing an existing book
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(bookData);
  };

  return (
    <Modal onClose={onClose} isVisible={isVisible}>
      <h2 className="text-2xl mb-4">{book ? 'Edit Book' : 'Add Book'}</h2>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="authorId"
          value={bookData.authorId}
          onChange={handleChange}
          placeholder="Author ID"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        {book ? 'Update' : 'Add'}
      </button>
    </Modal>
  );
};

export default BookForm;
