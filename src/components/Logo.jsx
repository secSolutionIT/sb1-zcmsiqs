import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaLock, FaEye } from 'react-icons/fa';

export default function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-12 h-12">
        {/* Outer Shield */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-lg transform rotate-3"></div>
        
        {/* Inner Shield */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg transform -rotate-3 opacity-90"></div>
        
        {/* Center Eye */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <FaShieldAlt className="w-6 h-6 text-white" />
            <FaEye className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
          HawkScan
        </span>
        <span className="text-xs text-gray-500">Advanced Security Intelligence</span>
      </div>
    </motion.div>
  );
}