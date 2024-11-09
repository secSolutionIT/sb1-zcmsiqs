import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGlobe, FaNetworkWired, FaDownload } from 'react-icons/fa';
import useScanStore from '../store/scanStore';
import ResultsList from '../components/ResultsList';
import DNSResults from '../components/DNSResults';
import NetworkResults from '../components/NetworkResults';
import SSLResults from '../components/SSLResults';
import StatsCard from '../components/StatsCard';

export default function ScanViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getScanById } = useScanStore();
  const scan = getScanById(id);

  if (!scan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Scan Not Found</h2>
          <p className="text-gray-600 mb-4">The requested scan could not be found.</p>
          <button
            onClick={() => navigate('/my-account')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to My Account</span>
          </button>
        </div>
      </div>
    );
  }

  const downloadReport = () => {
    const reportData = {
      id: scan.id,
      timestamp: scan.timestamp,
      type: scan.type,
      target: scan.type === 'subdomain' ? scan.domain : scan.target,
      results: scan.results,
      stats: scan.stats,
      dnsRecords: scan.dnsRecords,
      sslInfo: scan.sslInfo
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/my-account')}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {scan.type === 'subdomain' ? scan.domain : scan.target}
              </h1>
              <p className="text-gray-600">
                {new Date(scan.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaDownload className="w-4 h-4" />
            <span>Download Report</span>
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scan.type === 'subdomain' ? (
              <>
                <StatsCard
                  title="Subdomains"
                  value={scan.results.length}
                  description="Unique subdomains found"
                  icon={FaGlobe}
                />
                <StatsCard
                  title="DNS Records"
                  value={scan.stats.dnsRecords}
                  description="Total DNS records found"
                  icon={FaGlobe}
                />
              </>
            ) : (
              <>
                <StatsCard
                  title="Open Ports"
                  value={scan.results.length}
                  description="Open ports detected"
                  icon={FaNetworkWired}
                />
                <StatsCard
                  title="Services"
                  value={scan.stats.services}
                  description="Unique services found"
                  icon={FaNetworkWired}
                />
              </>
            )}
            <StatsCard
              title="Scan Time"
              value={`${scan.stats.scanTime}s`}
              description="Total scan duration"
              icon={FaGlobe}
            />
            <StatsCard
              title="Security Score"
              value={scan.stats.securityScore || 'N/A'}
              description="Overall security rating"
              icon={FaGlobe}
            />
          </div>

          {/* Scan Results */}
          {scan.type === 'subdomain' ? (
            <>
              <ResultsList 
                results={scan.results} 
                sslInfo={scan.sslInfo} 
                dnsRecords={scan.dnsRecords} 
              />
              <DNSResults 
                records={scan.dnsRecords}
                sslInfo={scan.sslInfo}
                deepScanResults={scan.deepScanResults}
              />
              {scan.sslInfo && <SSLResults sslInfo={scan.sslInfo} />}
            </>
          ) : (
            <NetworkResults results={scan.results} scanStats={scan.stats} />
          )}
        </motion.div>
      </div>
    </div>
  );
}