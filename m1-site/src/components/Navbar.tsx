// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'components/Modal';
import LoginForm from 'modules/user_management/components/LoginForm';
import SignupForm from 'modules/user_management/components/SignupForm';
import ProfileForm from 'modules/user_management/components/ProfileForm';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(loggedIn);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Online Library
        </Link>
        <div className="ml-10 hidden md:flex">
          <Link href="/books" className="mx-4 text-gray-600 hover:text-blue-700">
            My Books
          </Link>
          {userRole === 'admin' && (
            <Link href="/admin/dashboard" className="mx-4 text-gray-600 hover:text-blue-700">
              Admin Dashboard
            </Link>
          )}
          {userRole === 'author' && (
            <Link href="/author/dashboard" className="mx-4 text-gray-600 hover:text-blue-700">
              Author Dashboard
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Logout
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center space-x-2 text-blue-700"
            >
              <FaUserCircle size={24} />
              <span>Profile</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Log In
            </button>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="bg-gray-200 text-blue-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Modals */}
      <Modal isVisible={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginForm
          onClose={() => {
            setIsLoginModalOpen(false);
            setIsLoggedIn(true);
          }}
        />
      </Modal>
      <Modal isVisible={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)}>
        <SignupForm onClose={() => setIsSignupModalOpen(false)} />
      </Modal>
      <Modal isVisible={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}>
        <ProfileForm onClose={() => setIsProfileModalOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
