
/**
 * Environment variables configuration
 * 
 * This file provides a centralized way to access environment variables
 * while providing defaults and type safety.
 */

export const env = {
  // API URLs
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  
  // Authentication
  authSecret: import.meta.env.VITE_AUTH_SECRET || 'fallback-dev-secret-do-not-use-in-production',
  
  // Feature flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
}

// Add a console warning in development if environment variables are missing
if (import.meta.env.DEV) {
  const missingVars = [];
  
  if (!import.meta.env.VITE_API_URL) missingVars.push('VITE_API_URL');
  if (!import.meta.env.VITE_AUTH_SECRET) missingVars.push('VITE_AUTH_SECRET');
  
  if (missingVars.length > 0) {
    console.warn(
      `⚠️ Missing environment variables: ${missingVars.join(', ')}.\n` +
      `Create a .env file in the project root with these variables for proper functionality.`
    );
  }
}
