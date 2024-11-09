export function calculateSecurityScore(sslInfo) {
  if (!sslInfo || sslInfo.length === 0) return 0;

  let totalScore = 0;
  const maxScore = sslInfo.length * 100;

  sslInfo.forEach(info => {
    let score = 0;

    // Protocol score
    if (info.protocol === 'https') score += 40;
    
    // Security headers score
    if (info.serverInfo?.securityHeaders) {
      const headers = info.serverInfo.securityHeaders;
      if (headers.hsts) score += 15;
      if (headers.xframe) score += 15;
      if (headers.contentSecurityPolicy) score += 15;
      if (headers.xssProtection) score += 15;
    }

    totalScore += score;
  });

  return Math.round((totalScore / maxScore) * 100);
}

export function getSecurityRating(score) {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-500' };
  if (score >= 70) return { label: 'Good', color: 'text-blue-500' };
  if (score >= 50) return { label: 'Fair', color: 'text-yellow-500' };
  return { label: 'Poor', color: 'text-red-500' };
}