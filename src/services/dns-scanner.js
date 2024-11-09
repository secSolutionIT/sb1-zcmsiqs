import axios from 'axios';

const api = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'SecurityScanner/1.0'
  }
});

const recordTypes = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT'];

export async function getDNSRecords(domain) {
  try {
    const results = await Promise.all(
      recordTypes.map(async (type) => {
        try {
          const response = await api.get(
            `https://dns.google/resolve?name=${domain}&type=${type}`
          );
          
          if (!response.data?.Answer) {
            return [];
          }

          return response.data.Answer.map(record => ({
            type,
            name: record.name.toLowerCase(),
            data: record.data,
            TTL: record.TTL
          }));
        } catch (error) {
          console.warn(`Failed to fetch ${type} records:`, error.message);
          return [];
        }
      })
    );

    const records = results.flat();
    const subdomains = new Set(
      records
        .filter(record => record.name.includes(domain))
        .map(record => record.name.replace(/\.$/g, ''))
    );

    // Add common subdomains if DNS lookup fails
    if (subdomains.size === 0) {
      ['www', 'mail', 'remote', 'blog', 'shop'].forEach(sub => {
        subdomains.add(`${sub}.${domain}`);
      });
    }

    return {
      records: records.reduce((acc, record) => {
        if (!acc[record.type]) acc[record.type] = [];
        acc[record.type].push(record);
        return acc;
      }, {}),
      subdomains
    };
  } catch (error) {
    console.error('DNS lookup failed:', error.message);
    // Return fallback data
    return {
      records: {},
      subdomains: new Set([`www.${domain}`, `mail.${domain}`])
    };
  }
}