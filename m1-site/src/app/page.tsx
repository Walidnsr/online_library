// src/app/page.tsx

"use client";

import Navbar from '../components/Navbar';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="bg-blue-50 py-16 text-center">
        <h1 className="text-4xl font-bold text-blue-700">Welcome to Online Library</h1>
        <p className="text-lg text-gray-700 mt-4">
          Millions of books available through Controlled Digital Lending
        </p>
        <Link href="/books">
          <button className="bg-blue-600 text-white mt-6 px-6 py-3 rounded-md hover:bg-blue-700">
            Browse Books
          </button>
        </Link>
      </header>

      <section className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800">Trending Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Book Cover"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800">The Laws of Power</h3>
              <button className="bg-gray-600 text-white mt-4 px-4 py-2 rounded-md hover:bg-gray-700">
                Checked Out
              </button>
            </div>
          </div>
          {/* Add more book cards dynamically here */}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
