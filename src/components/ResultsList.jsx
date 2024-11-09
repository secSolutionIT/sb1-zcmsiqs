import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaExternalLinkAlt, FaLock, FaLockOpen, FaServer } from 'react-icons/fa';
import { SubdomainSkeleton } from './SkeletonLoader';

const getProtocolBadge = (protocol = 'unknown') => {
  const badges = {
    https: {
      icon: FaLock,
      className: 'bg-green-100 text-green-700',
      text: 'HTTPS'
    },
    http: {
      icon: FaLockOpen,
      className: 'bg-red-100 text-red-700',
      text: 'HTTP'
    },
    unknown: {
      icon: FaLockOpen,
      className: 'bg-gray-100 text-gray-700',
      text: 'Unknown'
    }
  };

  const badge = badges[protocol.toLowerCase()] || badges.unknown;
  const Icon = badge.icon;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.className}`}>
      <Icon className="w-3 h-3" />
      {badge.text}
    </span>
  );
};

export default function ResultsList({ results, loading }) {
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

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <SubdomainSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!results?.subdomains?.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Discovered Subdomains
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({results.subdomains.length} total)
          </span>
        </h2>
      </div>

      <div className="space-y-2">
        {results.subdomains.map((subdomain, index) => (
          <motion.div
            key={subdomain.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              {getProtocolBadge(subdomain.serverInfo?.protocol)}
              <div>
                <span className="font-mono text-gray-700">{subdomain.name}</span>
                {subdomain.serverInfo?.server && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <FaServer className="w-3 h-3" />
                    <span>{subdomain.serverInfo.server}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => copyToClipboard(subdomain.name, index)}
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <FaCheck className="w-4 h-4 text-green-500" />
                ) : (
                  <FaCopy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`https://${subdomain.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                title="Open in new tab"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}