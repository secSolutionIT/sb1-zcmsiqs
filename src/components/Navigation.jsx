import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Logo from './Logo';
import AuthModal from './AuthModal';
import useAuthStore from '../store/authStore';

export default function Navigation() {
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600';
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow-lg backdrop-blur-lg bg-white/80 sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex-shrink-0 flex items-center">
                    <Logo />
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  {isAuthenticated ? (
                    <Menu as="div" className="relative">
                      <Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                        <FaUser className="w-5 h-5" />
                        <span>{user?.email}</span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 divide-y divide-gray-100">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/my-account"
                                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                                  }`}
                                >
                                  <FaCog className="w-4 h-4" />
                                  My Account
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={`flex w-full items-center gap-2 px-4 py-2 text-sm ${
                                    active ? 'bg-gray-50 text-red-600' : 'text-red-500'
                                  }`}
                                >
                                  <FaSignOutAlt className="w-4 h-4" />
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button
                      onClick={() => setShowAuthModal(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Sign in
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}