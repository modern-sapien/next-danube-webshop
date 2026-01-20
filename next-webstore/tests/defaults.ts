/**
 * PROPOSED: Environment Configuration
 *
 * Environment detection priority:
 * 1. NEXT_PUBLIC_ENVIRONMENT explicitly set → production | staging
 * 2. Vercel preview deployment (VERCEL_ENV=preview) → preview (ad-hoc testing)
 * 3. Local development → development
 *
 * Usage:
 * - Production deploy: NEXT_PUBLIC_ENVIRONMENT=production npx checkly deploy
 * - Staging deploy:    NEXT_PUBLIC_ENVIRONMENT=staging npx checkly deploy
 * - Preview CI test:   npx checkly test (auto-detects VERCEL_URL)
 * - Local test:        npx playwright test
 */

type Environment = 'production' | 'staging' | 'preview' | 'development';

// Detect environment with priority order
function detectEnvironment(): Environment {
  // 1. Explicit environment setting takes priority
  const explicit = process.env.NEXT_PUBLIC_ENVIRONMENT as Environment;
  if (explicit && ['production', 'staging'].includes(explicit)) {
    return explicit;
  }

  // 2. Vercel preview deployment detection
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return 'preview';
  }

  // 3. Vercel production (but no explicit env set - shouldn't happen in proper setup)
  if (process.env.VERCEL_ENV === 'production') {
    return 'production';
  }

  // 4. Default to development
  return 'development';
}

const projectEnv = detectEnvironment();

// Build preview URL from Vercel environment
function getPreviewUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_ENVIRONMENT_URL || 'http://localhost:3000';
}

// Environment-specific configurations
const envConfig = {
  production: {
    pageUrl: 'https://next-danube-webshop.vercel.app',
    apiUrl: 'https://next-danube-webshop-backend.vercel.app/api/v1',
    testUser: { email: 'jane@example.com', password: 'password2' },
    testTime: 45000,
    waitTime: 2500,
    checkFrequency: 5,
    variablePrefix: 'PROD',
    projectSuffix: 'production',
  },
  staging: {
    pageUrl: 'https://next-danube-webshop-staging.vercel.app',
    apiUrl: 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
    testUser: { email: 'staging-sam@example.com', password: 'staging-password1' },
    testTime: 450,
    waitTime: 250,
    checkFrequency: 15,
    variablePrefix: 'STAGING',
    projectSuffix: 'staging',
  },
  preview: {
    pageUrl: getPreviewUrl(),
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://next-danube-webshop-backend-staging.vercel.app/api/v1',
    testUser: { email: 'staging-sam@example.com', password: 'staging-password1' },
    testTime: 60000,
    waitTime: 3000,
    checkFrequency: 30,
    variablePrefix: 'PREVIEW',
    projectSuffix: 'preview',
  },
  development: {
    pageUrl: process.env.NEXT_PUBLIC_ENVIRONMENT_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
    testUser: { email: 'staging-sam@example.com', password: 'staging-password1' },
    testTime: 60000,
    waitTime: 3000,
    checkFrequency: 30,
    variablePrefix: 'DEV',
    projectSuffix: 'development',
  },
};

const currentEnvConfig = envConfig[projectEnv];

export const defaults = {
  // Core identifiers
  projectEnv,
  apiKey: process.env.CHECKLY_API_KEY,
  accountID: process.env.CHECKLY_ACCOUNT_ID,

  // Environment-specific values
  testTime: currentEnvConfig.testTime,
  waitTime: currentEnvConfig.waitTime,
  checkFrequency: currentEnvConfig.checkFrequency,
  testUser: currentEnvConfig.testUser,
  pageUrl: currentEnvConfig.pageUrl,
  apiUrl: currentEnvConfig.apiUrl,

  // Checkly project configuration
  projectSuffix: currentEnvConfig.projectSuffix,

  // Checkly variable names (environment-prefixed)
  checklyVars: {
    storageState: `${currentEnvConfig.variablePrefix}_STORAGE_STATE`,
    cookieTime: `${currentEnvConfig.variablePrefix}_COOKIE_TIME`,
  },

  // Helper to check if this is a persistent environment (should be deployed to Checkly)
  isPersistentEnv: ['production', 'staging'].includes(projectEnv),
};
