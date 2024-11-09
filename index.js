const axios = require('axios');
const chalk = require('chalk');

class SubdomainScanner {
  constructor() {
    this.subdomains = new Set();
  }

  async scanCrtSh(domain) {
    try {
      const response = await axios.get(`https://crt.sh/?q=%25.${domain}&output=json`);
      const data = response.data;
      data.forEach(entry => {
        const name = entry.name_value.toLowerCase();
        if (name.endsWith(domain)) {
          this.subdomains.add(name);
        }
      });
    } catch (error) {
      console.error(chalk.red(`Error scanning crt.sh: ${error.message}`));
    }
  }

  async scanAlienVault(domain) {
    try {
      const response = await axios.get(`https://otx.alienvault.com/api/v1/indicators/domain/${domain}/passive_dns`);
      const data = response.data.passive_dns;
      data.forEach(entry => {
        const hostname = entry.hostname.toLowerCase();
        if (hostname.endsWith(domain)) {
          this.subdomains.add(hostname);
        }
      });
    } catch (error) {
      console.error(chalk.red(`Error scanning AlienVault: ${error.message}`));
    }
  }

  async scanUrlscan(domain) {
    try {
      const response = await axios.get(`https://urlscan.io/api/v1/search/?q=domain:${domain}`);
      const results = response.data.results;
      results.forEach(result => {
        if (result.page && result.page.domain) {
          const subdomain = result.page.domain.toLowerCase();
          if (subdomain.endsWith(domain)) {
            this.subdomains.add(subdomain);
          }
        }
      });
    } catch (error) {
      console.error(chalk.red(`Error scanning Urlscan: ${error.message}`));
    }
  }

  async scan(domain) {
    console.log(chalk.blue(`Starting subdomain scan for ${domain}...\n`));

    await Promise.all([
      this.scanCrtSh(domain),
      this.scanAlienVault(domain),
      this.scanUrlscan(domain)
    ]);

    console.log(chalk.green(`\nFound ${this.subdomains.size} unique subdomains:\n`));
    Array.from(this.subdomains).sort().forEach(subdomain => {
      console.log(chalk.yellow(`- ${subdomain}`));
    });
  }
}

// Example usage
if (process.argv.length < 3) {
  console.log(chalk.red('Please provide a domain name as an argument'));
  console.log(chalk.yellow('Example: node index.js example.com'));
  process.exit(1);
}

const domain = process.argv[2];
const scanner = new SubdomainScanner();
scanner.scan(domain);