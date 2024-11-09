import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaGlobe, FaNetworkWired, FaShieldAlt, FaClock, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import useScanStore from '../store/scanStore';

export default function ScanHistory() {
  const { scanHistory, removeScan } = useScanStore();

  const getScanIcon = (type) => {
    switch (type) {
      case 'subdomain':
        return FaGlobe;
      case 'network':
        return FaNetworkWired;
      case 'website':
        return FaShieldAlt;
      default:
        return FaGlobe;
    }
  };

  const getScanSummary = (scan) => {
    switch (scan.type) {
      case 'subdomain':
        return `Found ${scan.results.subdomains.length} subdomains`;
      case 'network':
        return `Found ${scan.results.length} open ports`;
      case 'website':
        return `Security Score: ${scan.stats.securityScore}%`;
      default:
        return 'Scan completed';
    }
  };

  if (scanHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <FaGlobe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Scans Yet</h3>
        <p className="text-gray-600">Start scanning domains to see your history here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Scans</h2>
      
      <div className="space-y-4">
        {scanHistory.map((scan) => {
          const Icon = getScanIcon(scan.type);
          
          return (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {scan.type === 'subdomain' ? scan.domain : scan.target}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaClock className="w-4 h-4" />
                      <span>{format(new Date(scan.timestamp), 'PPp')}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {getScanSummary(scan)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/scan/${scan.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View scan details"
                  >
                    <FaExternalLinkAlt className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => removeScan(scan.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove scan"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}