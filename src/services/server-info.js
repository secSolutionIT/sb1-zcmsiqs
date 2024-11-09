import axios from 'axios';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'HawkScan/1.0'
  }
});

export async function getServerInfo(domain) {
  try {
    // Try HTTPS first
    try {
      const httpsResponse = await api.head(`https://${domain}`);
      return {
        protocol: 'https',
        server: httpsResponse.headers['server'] || 'unknown',
        headers: httpsResponse.headers
      };
    } catch (httpsError) {
      // Fall back to HTTP if HTTPS fails
      const httpResponse = await api.head(`http://${domain}`);
      return {
        protocol: 'http',
        server: httpResponse.headers['server'] || 'unknown',
        headers: httpResponse.headers
      };
    }
  } catch (error) {
    return {
      protocol: 'unknown',
      server: 'unknown',
      headers: {}
    };
  }
}