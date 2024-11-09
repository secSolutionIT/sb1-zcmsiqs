import React from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaExternalLinkAlt } from 'react-icons/fa';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ResultsCard({ title, data, icon: Icon }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {data.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <span className="font-mono text-gray-700">{item}</span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => navigator.clipboard.writeText(item)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaCopy className="w-4 h-4" />
              </button>
              <a
                href={`https://${item}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}