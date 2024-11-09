import React from 'react';
import { motion } from 'framer-motion';

export default function StatsCard({ title, value, description, icon: Icon }) {
  const displayValue = value?.toString() || '0';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">{displayValue}</p>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}