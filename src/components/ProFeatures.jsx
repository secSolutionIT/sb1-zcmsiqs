import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaLock, FaBolt, FaChartLine, FaUserShield, FaCode, FaSearch, FaGlobe } from 'react-icons/fa';

const features = [
  {
    icon: FaRocket,
    title: 'Deep Reconnaissance',
    description: 'Advanced subdomain discovery using multiple data sources and techniques',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: FaLock,
    title: 'SSL Analysis',
    description: 'Comprehensive SSL/TLS certificate analysis and vulnerability detection',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: FaSearch,
    title: 'Search Engine Discovery',
    description: 'Find subdomains through Google, Bing, and other search engines',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FaGlobe,
    title: 'DNS Enumeration',
    description: 'Advanced DNS record analysis including NS, MX, TXT, and AXFR',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FaChartLine,
    title: 'Advanced Analytics',
    description: 'Detailed security metrics and vulnerability assessment reports',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: FaCode,
    title: 'API Access',
    description: 'Full API access for automation and integration with your tools',
    color: 'from-rose-500 to-pink-500'
  }
];

export default function ProFeatures() {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Pro Features
          </h2>
          <p className="text-xl text-blue-200">
            Advanced security analysis tools for professional penetration testing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
                <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-lg w-12 h-12 flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-blue-200">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl">
            Upgrade to Pro - $29/month
          </button>
          <p className="mt-4 text-blue-200">
            30-day money-back guarantee • Cancel anytime
          </p>
        </motion.div>
      </div>
    </div>
  );
}</content>