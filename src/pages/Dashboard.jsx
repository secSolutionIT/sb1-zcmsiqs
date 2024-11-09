import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobe, FaNetworkWired, FaShieldAlt, FaSearch, FaRandom, FaWordpress, FaArrowRight } from 'react-icons/fa';
import useAuthStore from '../store/authStore';

const tools = [
  {
    name: 'Subdomain Scanner',
    description: 'Discover and analyze subdomains with advanced enumeration techniques',
    path: '/subdomain-scanner',
    icon: FaGlobe,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Network Scanner',
    description: 'Comprehensive network security analysis and vulnerability detection',
    path: '/network-scanner',
    icon: FaNetworkWired,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Website Scanner',
    description: 'Deep security analysis for web applications and infrastructure',
    path: '/website-scanner',
    icon: FaShieldAlt,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Port Scanner',
    description: 'Advanced port scanning and service detection capabilities',
    path: '/port-scanner',
    icon: FaSearch,
    color: 'from-red-500 to-rose-500'
  },
  {
    name: 'URL Fuzzer',
    description: 'Discover hidden endpoints and potential security vulnerabilities',
    path: '/url-fuzzer',
    icon: FaRandom,
    color: 'from-amber-500 to-orange-500'
  },
  {
    name: 'WordPress Scanner',
    description: 'Specialized security analysis for WordPress installations',
    path: '/wordpress-scanner',
    icon: FaWordpress,
    color: 'from-cyan-500 to-blue-500'
  }
];

const features = [
  'Advanced DNS Enumeration',
  'SSL Certificate Analysis',
  'Deep Reconnaissance',
  'Vulnerability Detection',
  'Custom Reporting',
  'API Integration'
];

export default function Dashboard() {
  const { isPro } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Security Analysis Platform
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Advanced security scanning tools for modern web applications and infrastructure.
              Discover vulnerabilities before attackers do.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/subdomain-scanner"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Scanning
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
              {!isPro && (
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-all border border-blue-200">
                  View Pro Features
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool, index) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group block transform hover:scale-105 transition-all duration-200"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-gradient-to-br ${tool.color} rounded-lg`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Security Features
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive security analysis tools for modern web applications
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
              >
                <FaShieldAlt className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}