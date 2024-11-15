"use client";

import { ReactNode } from 'react';
import Navbar from '../components/Navbar'; // Updated relative path
import Sidebar from '../components/Sidebar'; // Updated relative path

interface AuthorLayoutProps {
  children: ReactNode;
}

const AuthorLayout: React.FC<AuthorLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Pass the role as 'author' to ensure Sidebar displays only relevant options */}
      <Sidebar role="author" />
      <div className="flex-grow ml-64">
        <Navbar />
        <main className="p-8 min-h-full bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default AuthorLayout;