import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe, FaServer, FaClock, FaShieldAlt } from 'react-icons/fa';
import SearchForm from '../components/SearchForm';
import StatsCard from '../components/StatsCard';
import ResultsList from '../components/ResultsList';
import DNSResults from '../components/DNSResults';
import { StatsSkeleton } from '../components/SkeletonLoader';
import useAuthStore from '../store/authStore';
import useScanStore from '../store/scanStore';
import toast from 'react-hot-toast';
import { scanSubdomains } from '../services/scanner';

export default function SubdomainScanner() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, isPro, credits } = useAuthStore();
  const { addScan } = useScanStore();
  const [scanStats, setScanStats] = useState({
    subdomains: 0,
    dnsRecords: 0,
    scanTime: 0,
    totalScanned: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

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
      subdomains: 0,
      dnsRecords: 0,
      scanTime: 0,
      totalScanned: 0
    });

    try {
      const scanResults = await scanSubdomains(domain, { isPro });

      setResults(scanResults);
      setScanStats({
        subdomains: scanResults.subdomains.length,
        dnsRecords: Object.values(scanResults.dnsRecords || {}).flat().length,
        scanTime: scanResults.scanTime,
        totalScanned: scanResults.totalScanned
      });

      addScan({
        type: 'subdomain',
        domain,
        results: scanResults,
        stats: {
          subdomains: scanResults.subdomains.length,
          dnsRecords: Object.values(scanResults.dnsRecords || {}).flat().length,
          scanTime: scanResults.scanTime,
          totalScanned: scanResults.totalScanned
        },
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
            Professional Security Scanner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced security analysis platform with DNS enumeration and subdomain discovery
          </p>
        </motion.div>

        <SearchForm
          value={domain}
          onChange={(e) => setDomain(e.target.value.toLowerCase())}
          onSubmit={handleSubmit}
          loading={loading}
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

        <div className="mt-12 space-y-8">
          {loading ? (
            <StatsSkeleton />
          ) : results ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Subdomains"
                  value={scanStats.subdomains}
                  description="Unique subdomains found"
                  icon={FaGlobe}
                />
                <StatsCard
                  title="DNS Records"
                  value={scanStats.dnsRecords}
                  description="Total DNS records found"
                  icon={FaServer}
                />
                <StatsCard
                  title="Processed"
                  value={scanStats.totalScanned}
                  description="Total records processed"
                  icon={FaShieldAlt}
                />
                <StatsCard
                  title="Scan Time"
                  value={`${scanStats.scanTime}s`}
                  description="Total scan duration"
                  icon={FaClock}
                />
              </div>

              <div className="space-y-8">
                <ResultsList results={results} loading={loading} />
                <DNSResults 
                  records={results.dnsRecords}
                  sslInfo={results.sslInfo}
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}