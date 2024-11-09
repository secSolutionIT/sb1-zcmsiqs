import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';

export default function ProBadge() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white text-sm font-medium shadow-lg"
    >
      <FaCrown className="w-4 h-4" />
      <span>Pro</span>
    </motion.div>
  );
}