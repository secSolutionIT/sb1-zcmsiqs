import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaNetworkWired, FaServer, FaClock, FaShieldAlt } from 'react-icons/fa';
import SearchForm from '../components/SearchForm';
import StatsCard from '../components/StatsCard';
import NetworkResults from '../components/NetworkResults';
import useAuthStore from '../store/authStore';
import useScanStore from '../store/scanStore';
import toast from 'react-hot-toast';

export default function NetworkScanner() {
  const [target, setTarget] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, isPro, credits } = useAuthStore();
  const { addScan } = useScanStore();
  const [scanStats, setScanStats] = useState({
    portsScanned: 0,
    openPorts: 0,
    scanTime: 0,
    vulnerabilities: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!target.trim()) return;

    if (!isAuthenticated) {
      toast.error('Please sign in to use the scanner');
      return;
    }

    if (!isPro && credits <= 0) {
      toast.error('No credits left. Please upgrade to Pro!');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);
    setScanStats({ portsScanned: 0, openPorts: 0, scanTime: 0, vulnerabilities: 0 });

    const startTime = performance.now();
    
    try {
      // Simulate scanning delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const sampleResults = [
        { port: 80, service: 'HTTP', state: 'open', protocol: 'tcp', version: 'nginx 1.18.0' },
        { port: 443, service: 'HTTPS', state: 'open', protocol: 'tcp', version: 'OpenSSL 1.1.1' },
        { port: 22, service: 'SSH', state: 'open', protocol: 'tcp', version: 'OpenSSH 8.2p1' },
        { port: 3306, service: 'MySQL', state: 'filtered', protocol: 'tcp', version: '8.0.26' }
      ];

      const endTime = performance.now();
      const scanTime = ((endTime - startTime) / 1000).toFixed(2);
      
      const stats = {
        portsScanned: 1000,
        openPorts: sampleResults.length,
        scanTime,
        vulnerabilities: 2
      };

      setResults(sampleResults);
      setScanStats(stats);

      // Add scan to history
      addScan({
        type: 'network',
        target,
        results: sampleResults,
        stats,
        isPro
      });

    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Network Port Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced network analysis with port scanning and service detection
          </p>
        </motion.div>

        <SearchForm
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          onSubmit={handleSubmit}
          loading={loading}
          placeholder="Enter IP or hostname (e.g., example.com)"
        />

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
          >
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-lg font-medium text-gray-600">
                Scanning network and analyzing ports...
              </p>
            </div>
          </div>
        )}

        {!loading && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Ports"
                value={scanStats.portsScanned}
                description="Total ports scanned"
                icon={FaNetworkWired}
              />
              <StatsCard
                title="Open Ports"
                value={scanStats.openPorts}
                description="Open ports detected"
                icon={FaServer}
              />
              <StatsCard
                title="Vulnerabilities"
                value={scanStats.vulnerabilities}
                description="Potential security issues"
                icon={FaShieldAlt}
              />
              <StatsCard
                title="Scan Time"
                value={`${scanStats.scanTime}s`}
                description="Total scan duration"
                icon={FaClock}
              />
            </div>

            <NetworkResults results={results} scanStats={scanStats} />
          </motion.div>
        )}
      </div>
    </div>
  );
}