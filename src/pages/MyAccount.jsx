import React from 'react';
import { motion } from 'framer-motion';
import { FaCrown, FaChartLine, FaHistory, FaRocket } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
import useScanStore from '../store/scanStore';
import ScanHistory from '../components/ScanHistory';
import toast from 'react-hot-toast';

export default function MyAccount() {
  const { user, isPro, setPro } = useAuthStore();
  const { scanHistory, clearHistory } = useScanStore();
  const creditsLeft = isPro ? 'Unlimited' : `${3 - (user?.scansCount || 0)}`;

  const toggleProMode = () => {
    setPro(!isPro);
    toast.success(
      isPro 
        ? 'Pro features deactivated (Demo Mode)' 
        : 'Pro features activated (Demo Mode)'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Account Overview</h2>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                  isPro 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {isPro ? 'Pro Plan' : 'Free Plan'}
                </span>
                <button
                  onClick={toggleProMode}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <FaCrown className="w-5 h-5" />
                  <span>Demo Mode</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaChartLine className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Credits Left</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{creditsLeft}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <FaHistory className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Total Scans</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{scanHistory.length}</p>
              </div>
            </div>
          </motion.div>

          <ScanHistory />
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => clearHistory()}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <FaHistory className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">Clear Scan History</span>
                </div>
              </button>
              <button
                onClick={toggleProMode}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <FaCrown className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-700">
                    {isPro ? 'Disable Pro Mode' : 'Enable Pro Mode'}
                  </span>
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}