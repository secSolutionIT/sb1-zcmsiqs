import axios from 'axios';

const api = axios.create({
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'SecurityScanner/1.0',
  }
});

// Simulated network scanning functionality
export async function scanNetwork(target, options = { deep: false }) {
  if (!target) {
    throw new Error('Please provide a valid target');
  }

  // Validate IP address or hostname
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const hostnameRegex = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
  
  if (!ipRegex.test(target) && !hostnameRegex.test(target)) {
    throw new Error('Please provide a valid IP address or hostname');
  }

  try {
    // Simulate masscan for fast port discovery
    const openPorts = await performMasscan(target);
    
    // Basic scan results
    const results = {
      target,
      totalPorts: 1000, // Default scan range for free users
      openPorts,
      timestamp: new Date().toISOString()
    };

    // Deep scan with nmap for pro users
    if (options.deep) {
      results.totalPorts = 65535; // Full port range
      const nmapResults = await performNmap(target, openPorts);
      results.services = nmapResults.services;
      results.vulnerabilities = nmapResults.vulnerabilities;
      results.osInfo = nmapResults.osInfo;
    }

    return results;
  } catch (error) {
    throw new Error('Network scan failed. Please try again later.');
  }
}

// Simulate masscan port discovery
async function performMasscan(target) {
  // Simulated open ports for demonstration
  const commonPorts = [
    { port: 21, protocol: 'tcp', service: 'FTP' },
    { port: 22, protocol: 'tcp', service: 'SSH' },
    { port: 80, protocol: 'tcp', service: 'HTTP' },
    { port: 443, protocol: 'tcp', service: 'HTTPS' },
    { port: 3306, protocol: 'tcp', service: 'MySQL' },
    { port: 5432, protocol: 'tcp', service: 'PostgreSQL' },
    { port: 27017, protocol: 'tcp', service: 'MongoDB' }
  ];

  // Simulate scanning delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  return commonPorts.filter(() => Math.random() > 0.5);
}

// Simulate nmap deep scan
async function performNmap(target, openPorts) {
  // Simulate scanning delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  const services = openPorts.map(port => ({
    name: port.service,
    version: `${port.service} ${Math.floor(Math.random() * 5)}.${Math.floor(Math.random() * 10)}`,
    state: 'open',
    banner: `${port.service} Server Ready`
  }));

  const vulnerabilities = [
    {
      title: 'OpenSSL Heartbleed',
      severity: 'Critical',
      description: 'TLS heartbeat read overrun (CVE-2014-0160)',
      recommendation: 'Upgrade OpenSSL to version 1.0.1g or later'
    },
    {
      title: 'SSH Weak Ciphers',
      severity: 'Medium',
      description: 'SSH server supports weak ciphers',
      recommendation: 'Disable weak ciphers in SSH configuration'
    },
    {
      title: 'HTTP TRACE/TRACK',
      severity: 'Low',
      description: 'HTTP TRACE method is enabled',
      recommendation: 'Disable TRACE method in web server configuration'
    }
  ].filter(() => Math.random() > 0.5);

  return {
    services,
    vulnerabilities,
    osInfo: {
      name: 'Linux',
      version: '4.15.0',
      accuracy: 95
    }
  };
}