import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaArrowRight } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

export default function PricingBanner() {
  const { isAuthenticated, isPro } = useAuthStore();

  if (isPro) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaCrown className="w-5 h-5" />
            <span className="font-medium">
              {isAuthenticated 
                ? 'Upgrade to Pro for unlimited scans and advanced features'
                : 'Get started with HawkScan Pro'}
            </span>
          </div>
          <button className="flex items-center gap-2 px-4 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-sm">
            <span>View Plans</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}