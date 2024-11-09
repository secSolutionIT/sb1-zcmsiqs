import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { FaCrown, FaExclamationCircle } from 'react-icons/fa';

export default function LimitReachedModal({ isOpen, onClose, onUpgrade }) {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="text-center">
                <FaExclamationCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <Dialog.Title as="h3" className="text-2xl font-bold text-gray-900 mb-2">
                  Scan Limit Reached
                </Dialog.Title>
                <p className="text-gray-600 mb-6">
                  You've used all your free scans for today. Upgrade to Pro for unlimited scans and advanced features.
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <button
                  onClick={onUpgrade}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <FaCrown className="w-5 h-5" />
                  <span>Upgrade to Pro</span>
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}