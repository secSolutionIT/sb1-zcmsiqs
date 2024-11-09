import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import SubdomainScanner from './pages/SubdomainScanner';
import NetworkScanner from './pages/NetworkScanner';
import WebsiteScanner from './pages/WebsiteScanner';
import PortScanner from './pages/PortScanner';
import URLFuzzer from './pages/URLFuzzer';
import WordPressScanner from './pages/WordPressScanner';
import MyAccount from './pages/MyAccount';
import ScanViewer from './pages/ScanViewer';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subdomain-scanner" element={<SubdomainScanner />} />
            <Route path="/network-scanner" element={<NetworkScanner />} />
            <Route path="/website-scanner" element={<WebsiteScanner />} />
            <Route path="/port-scanner" element={<PortScanner />} />
            <Route path="/url-fuzzer" element={<URLFuzzer />} />
            <Route path="/wordpress-scanner" element={<WordPressScanner />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/scan/:id" element={<ScanViewer />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}