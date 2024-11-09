import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCopy, FaCheck, FaShieldAlt, FaServer, FaLock, FaGlobe, 
  FaSearch, FaHistory, FaLink, FaCertificate, FaExchangeAlt 
} from 'react-icons/fa';

export default function DNSResults({ records = {}, sslInfo = [], deepScanResults = {} }) {
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderRecordValue = (record) => {
    if (!record) return null;
    
    switch (record.type) {
      case 'MX':
        return `${record.data} (Priority: ${record.priority || 0})`;
      case 'TXT':
        return record.data.replace(/"/g, '');
      default:
        return record.data;
    }
  };

  const renderRecordSection = (title, records = [], icon) => {
    if (!records || records.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="space-y-2">
          {records.map((record, index) => (
            <div
              key={`${record.type}-${index}`}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-between group"
            >
              <div className="flex-1">
                <div className="font-mono text-gray-700">{renderRecordValue(record)}</div>
                <div className="text-sm text-gray-500 mt-1">
                  TTL: {record.TTL}s | Type: {record.type}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(renderRecordValue(record), index)}
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
          ))}
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <FaServer className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">DNS Analysis</h2>
      </div>

      {/* DNS Records */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">DNS Records</h3>
        {renderRecordSection(
          'Name Servers',
          records.NS,
          <FaServer className="w-6 h-6 text-blue-600" />
        )}
        {renderRecordSection(
          'Mail Servers',
          records.MX,
          <FaServer className="w-6 h-6 text-blue-600" />
        )}
        {renderRecordSection(
          'A Records',
          records.A,
          <FaGlobe className="w-6 h-6 text-blue-600" />
        )}
        {renderRecordSection(
          'AAAA Records',
          records.AAAA,
          <FaGlobe className="w-6 h-6 text-blue-600" />
        )}
        {renderRecordSection(
          'CNAME Records',
          records.CNAME,
          <FaExchangeAlt className="w-6 h-6 text-blue-600" />
        )}
        {renderRecordSection(
          'TXT Records',
          records.TXT,
          <FaShieldAlt className="w-6 h-6 text-blue-600" />
        )}
      </div>

      {/* SSL/TLS Information */}
      {sslInfo && sslInfo.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SSL/TLS Analysis</h3>
          {sslInfo.map((info, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaLock className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{info.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Protocol:</span>
                  <span className="ml-2 font-medium">{info.serverInfo?.protocol || 'unknown'}</span>
                </div>
                {info.serverInfo && (
                  <>
                    <div>
                      <span className="text-gray-600">Server:</span>
                      <span className="ml-2 font-medium">{info.serverInfo.server}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Security Headers:</span>
                      <ul className="mt-1 space-y-1">
                        {Object.entries(info.serverInfo.securityHeaders).map(([key, value]) => (
                          <li key={key} className="flex items-center gap-2">
                            <FaCheck className={`w-3 h-3 ${value ? 'text-green-500' : 'text-red-500'}`} />
                            <span>{key}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}