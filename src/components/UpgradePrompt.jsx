import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaRocket, FaArrowRight } from 'react-icons/fa';

export default function UpgradePrompt({ onUpgrade, variant = 'default' }) {
  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FaCrown className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Upgrade to Pro
              </h3>
              <p className="text-gray-600">
                Get unlimited scans and advanced features
              </p>
            </div>
          </div>
          <button
            onClick={onUpgrade}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Learn More</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative">
        <div className="flex items-start gap-6">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur-xl">
            <FaRocket className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">
              Unlock Advanced Security Features
            </h3>
            <p className="text-blue-100 mb-6">
              Get unlimited scans, deep reconnaissance, and advanced security analysis tools with our Pro plan.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={onUpgrade}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all"
              >
                <FaCrown className="w-5 h-5" />
                <span>Upgrade to Pro</span>
              </button>
              <span className="text-blue-200">Starting at $29/month</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}