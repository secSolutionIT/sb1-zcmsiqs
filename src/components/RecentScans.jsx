import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaNetworkWired, FaClock, FaTrash, FaDownload, FaEye } from 'react-icons/fa';
import { format } from 'date-fns';
import useScanStore from '../store/scanStore';
import { Link } from 'react-router-dom';

export default function RecentScans() {
  const { scanHistory, removeScan } = useScanStore();

  const getScanIcon = (type) => {
    switch (type) {
      case 'subdomain':
        return FaGlobe;
      case 'network':
        return FaNetworkWired;
      default:
        return FaGlobe;
    }
  };

  const getScanSummary = (scan) => {
    switch (scan.type) {
      case 'subdomain':
        return `Found ${scan.results.length} subdomains`;
      case 'network':
        return `Found ${scan.results.length} open ports`;
      default:
        return 'Scan completed';
    }
  };

  const downloadReport = (scan) => {
    // Generate and download report
    const reportData = {
      id: scan.id,
      timestamp: scan.timestamp,
      type: scan.type,
      target: scan.type === 'subdomain' ? scan.domain : scan.target,
      results: scan.results,
      stats: scan.stats
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-report-${scan.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Scans</h2>
      
      {scanHistory.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No scans performed yet</p>
      ) : (
        <div className="space-y-4">
          {scanHistory.map((scan) => {
            const Icon = getScanIcon(scan.type);
            
            return (
              <motion.div
                key={scan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                      <FaEye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => downloadReport(scan)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Download report"
                    >
                      <FaDownload className="w-4 h-4" />
                    </button>
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
      )}
    </div>
  );
}