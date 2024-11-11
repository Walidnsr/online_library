"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Modal from 'components/Modal'; // Updated to use absolute path
import LoginForm from 'modules/user_management/components/LoginForm'; // Updated to use absolute path
import SignupForm from 'modules/user_management/components/SignupForm'; // Updated to use absolute path
import ProfileForm from 'modules/user_management/components/ProfileForm'; // Updated to use absolute path
import { FaUserCircle } from 'react-icons/fa'; // Import profile icon

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect to read from localStorage after the component has mounted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('userLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Online Library
        </Link>
        <div className="ml-10 hidden md:flex">
          <Link href="#" className="mx-4 text-gray-600 hover:text-blue-700">
            My Books
          </Link>
          <Link href="#" className="mx-4 text-gray-600 hover:text-blue-700">
            Browse
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md p-2 pl-8 pr-4 focus:outline-none focus:border-blue-500"
          />
        </div>
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
