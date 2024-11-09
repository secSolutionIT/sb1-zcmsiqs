import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

export default function CreditsBadge() {
  const { credits, isPro } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm border border-gray-200"
    >
      <FaBolt className={`w-4 h-4 ${isPro ? 'text-blue-600' : 'text-gray-600'}`} />
      <span className={isPro ? 'text-blue-600' : 'text-gray-600'}>
        {isPro ? 'Unlimited Credits' : `${credits} Credits Left`}
      </span>
    </motion.div>
  );
}