/**
 * Production environment configuration
 */
export const environment = {
  production: true,
  // Add any environment-specific variables here
  apiUrl: 'https://www.beslagicadin.vercel.app',
  enableDebugTools: false,
  logLevel: 'error',
  
  // Analytics configuration
  analytics: {
    enabled: true,
    vercelAnalytics: true,
    vercelSpeedInsights: true
  }
};
