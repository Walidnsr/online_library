// src/types/user.types.ts
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'user' | 'admin' | 'author';
  }
  