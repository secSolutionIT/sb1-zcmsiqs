import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaShieldAlt, FaBug, FaClock } from 'react-icons/fa';
import SearchForm from '../components/SearchForm';
import StatsCard from '../components/StatsCard';
import SecurityResults from '../components/SecurityResults';
import { StatsGridSkeleton, ResultsSkeleton } from '../components/SkeletonLoader';
import useAuthStore from '../store/authStore';
import useScanStore from '../store/scanStore';
import toast from 'react-hot-toast';
import { checkServerSecurity } from '../services/vulnerability-scanner';

export default function WebsiteScanner() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, isPro, credits } = useAuthStore();
  const { addScan } = useScanStore();
  const [scanStats, setScanStats] = useState({
    vulnerabilities: 0,
    securityScore: 0,
    scanTime: 0,
    testsRun: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Validate URL
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch {
      toast.error('Please enter a valid URL');
      return;
    }

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
    setResults(null);
    setScanStats({
      vulnerabilities: 0,
      securityScore: 0,
      scanTime: 0,
      testsRun: 0
    });

    const startTime = performance.now();

    try {
      const security = await checkServerSecurity(url);
      const endTime = performance.now();
      const scanTime = ((endTime - startTime) / 1000).toFixed(2);

      const stats = {
        vulnerabilities: security.vulnerabilities.length,
        securityScore: calculateSecurityScore(security),
        scanTime,
        testsRun: isPro ? 25 : 10
      };

      setResults(security);
      setScanStats(stats);

      // Add scan to history
      addScan({
        type: 'website',
        target: url,
        results: security,
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

  const calculateSecurityScore = (security) => {
    let score = 100;
    
    // Deduct points for each vulnerability
    score -= security.vulnerabilities.length * 10;
    
    // Check security headers
    if (!security.securityHeaders.hsts) score -= 10;
    if (!security.securityHeaders.xframe) score -= 10;
    if (!security.securityHeaders.xss) score -= 10;
    if (!security.securityHeaders.csp) score -= 10;
    
    return Math.max(0, score);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
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
            Website Security Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive security analysis for web applications
          </p>
        </motion.div>

        <SearchForm
          value={url}
          onChange={handleUrlChange}
          onSubmit={handleSubmit}
          loading={loading}
          placeholder="Enter website URL (e.g., https://example.com)"
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
          <div className="mt-12 space-y-8">
            <StatsGridSkeleton />
            <ResultsSkeleton />
          </div>
        )}

        {!loading && results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Security Score"
                value={`${scanStats.securityScore}%`}
                description="Overall security rating"
                icon={FaShieldAlt}
              />
              <StatsCard
                title="Vulnerabilities"
                value={scanStats.vulnerabilities}
                description="Security issues found"
                icon={FaBug}
              />
              <StatsCard
                title="Tests Run"
                value={scanStats.testsRun}
                description="Security checks performed"
                icon={FaGlobe}
              />
              <StatsCard
                title="Scan Time"
                value={`${scanStats.scanTime}s`}
                description="Total scan duration"
                icon={FaClock}
              />
            </div>

            <SecurityResults security={results} />
          </motion.div>
        )}
      </div>
    </div>
  );
}