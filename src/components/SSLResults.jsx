import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function SSLResults({ sslInfo }) {
  const getStatusColor = (isValid, daysUntilExpiration) => {
    if (!isValid) return 'text-red-500';
    if (daysUntilExpiration < 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStatusIcon = (isValid, daysUntilExpiration) => {
    if (!isValid) return FaTimesCircle;
    if (daysUntilExpiration < 30) return FaExclamationTriangle;
    return FaCheckCircle;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <FaLock className="w-6 h-6 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">SSL Certificate Analysis</h2>
          <p className="text-gray-600">Comprehensive SSL/TLS certificate validation</p>
        </div>
      </div>

      <div className="grid gap-6">
        {sslInfo.map((cert, index) => {
          const StatusIcon = getStatusIcon(cert.valid, cert.daysUntilExpiration);
          const statusColor = getStatusColor(cert.valid, cert.daysUntilExpiration);

          return (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all"
            >
              <div className="flex items-start gap-4">
                <StatusIcon className={`w-5 h-5 mt-1 ${statusColor}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cert.subject || cert.domain}
                    </h3>
                    {cert.grade && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        cert.grade.startsWith('A') ? 'bg-green-100 text-green-700' :
                        cert.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        Grade: {cert.grade}
                      </span>
                    )}
                  </div>

                  {cert.valid ? (
                    <>
                      <p className="text-gray-600 mb-2">
                        Issued by: {cert.issuer}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Valid From</p>
                          <p className="font-medium text-gray-900">
                            {cert.validFrom.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Valid Until</p>
                          <p className="font-medium text-gray-900">
                            {cert.validTo.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Days Until Expiration</p>
                          <p className={`font-medium ${
                            cert.daysUntilExpiration < 30 ? 'text-yellow-600' :
                            cert.daysUntilExpiration < 7 ? 'text-red-600' :
                            'text-green-600'
                          }`}>
                            {cert.daysUntilExpiration} days
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Protocol Support</p>
                          <p className="font-medium text-gray-900">
                            {cert.supportsTLS13 ? 'TLS 1.3' : 'TLS 1.2'} 
                            {cert.supportsHSTS && ' + HSTS'}
                          </p>
                        </div>
                      </div>

                      {cert.vulnerabilities?.length > 0 && (
                        <div className="mt-4">
                          <p className="text-red-600 font-medium mb-2">Vulnerabilities Found:</p>
                          <ul className="space-y-2">
                            {cert.vulnerabilities.map((vuln, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <FaExclamationTriangle className="w-4 h-4 text-yellow-500 mt-1" />
                                <span className="text-gray-700">{vuln.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-red-600">
                      Certificate Invalid: {cert.error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}