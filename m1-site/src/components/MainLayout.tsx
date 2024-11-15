"use client";

import Navbar from './Navbar';
import Link from 'next/link';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to Online Library</h1>
        <p className="text-lg text-gray-700 mt-4">
          Millions of books available through Controlled Digital Lending
        </p>
        <div className="mt-6 space-x-4">
          <Link href="/books">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Browse Books
            </button>
          </Link>
          <Link href="/authors">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700">
              Browse Authors
            </button>
          </Link>
          <Link href="/reviews">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
              View Reviews
            </button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10">{children}</main>
    </div>
  );
};

export default MainLayout;
