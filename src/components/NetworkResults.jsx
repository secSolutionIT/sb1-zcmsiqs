import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaServer, FaNetworkWired } from 'react-icons/fa';

export default function NetworkResults({ results, scanStats }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaNetworkWired className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Network Scan Results
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({results.length} ports)
            </span>
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <FaServer className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Port {result.port} ({result.service})
                    </p>
                    <p className="text-sm text-gray-600">
                      State: {result.state} | Protocol: {result.protocol}
                    </p>
                  </div>
                </div>
                {result.version && (
                  <p className="mt-2 text-sm text-gray-600 ml-8">
                    Version: {result.version}
                  </p>
                )}
              </div>
              <button
                onClick={() => copyToClipboard(`${result.port}/${result.protocol}`, index)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <FaCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FaCopy className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}