// src/types/book.types.ts

export interface Book {
    id: number;
    title: string;
    coverImageUrl?: string;
    author: string;
    genre: string;
    language: string;
    price: string | number;
  }
  