import axios from 'axios';

const api = axios.create({
  timeout: 10000
});

export async function analyzeCertificate(hostname) {
  try {
    const response = await api.get(`https://${hostname}`, {
      httpsAgent: new (await import('https')).Agent({
        rejectUnauthorized: false
      })
    });

    const cert = response.request.res.socket.getPeerCertificate();
    
    return {
      valid: true,
      issuer: cert.issuer.CN,
      subject: cert.subject.CN,
      validFrom: cert.valid_from,
      validTo: cert.valid_to,
      serialNumber: cert.serialNumber
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}