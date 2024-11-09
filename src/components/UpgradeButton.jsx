import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

export default function UpgradeButton({ onClick, className = "" }) {
  const { isPro } = useAuthStore();

  if (isPro) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all ${className}`}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative flex items-center gap-2">
        <FaCrown className="w-4 h-4" />
        <span>Upgrade to Pro</span>
      </div>
    </motion.button>
  );
}