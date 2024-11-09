import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function SecurityResults({ security }) {
  if (!security) return null;

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <FaShieldAlt className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Security Analysis</h2>
          <p className="text-gray-600">Server configuration and vulnerability assessment</p>
        </div>
      </div>

      {/* Server Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Server Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Server Software</p>
            <p className="font-medium text-gray-900">{security.server || 'Not Disclosed'}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Powered by</p>
            <p className="font-medium text-gray-900">{security.poweredBy || 'Not Disclosed'}</p>
          </div>
        </div>
      </div>

      {/* Security Headers */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Security Headers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(security.securityHeaders).map(([header, value]) => (
            <div key={header} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{header.toUpperCase()}</p>
                {value ? (
                  <FaCheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <FaTimesCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <p className="font-medium text-gray-900 mt-1">
                {value ? 'Implemented' : 'Missing'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerabilities */}
      {security.vulnerabilities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Detected Vulnerabilities</h3>
          <div className="space-y-4">
            {security.vulnerabilities.map((vuln, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${getSeverityColor(vuln.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-semibold">{vuln.vulnerability}</h4>
                    <p className="text-sm mt-1">{vuln.description}</p>
                    {vuln.software && (
                      <p className="text-sm mt-1">
                        Affected: {vuln.software} {vuln.version}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-white/50">
                        {vuln.severity} Severity
                      </span>
                      {vuln.type && (
                        <span className="px-2 py-1 text-xs rounded-full bg-white/50">
                          {vuln.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}