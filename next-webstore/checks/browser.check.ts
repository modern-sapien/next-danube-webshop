import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import * as path from 'path';

const env = defaults.projectEnv;
const freq = defaults.checkFrequency;

// Homepage Visit Check - Critical path monitoring
new BrowserCheck(`${env}-homepage-visit`, {
  name: `Homepage Visit & API Health`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'critical', 'homepage'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 2,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/visit.spec.ts'),
  },
});

// Navigation Check - Header links and routing
new BrowserCheck(`${env}-navigation`, {
  name: `Header Navigation`,
  group,
  activated: true,
  frequency: Frequency.EVERY_30M,
  tags: [env, 'navigation', 'ui'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/navigation.spec.ts'),
  },
});

// Book Catalog Check - Product listing and filtering
new BrowserCheck(`${env}-book-catalog`, {
  name: `Book Catalog Display`,
  group,
  activated: true,
  frequency: Frequency.EVERY_30M,
  tags: [env, 'catalog', 'products'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/book-catalog.spec.ts'),
  },
});

// Cart Check - Shopping cart functionality
new BrowserCheck(`${env}-cart`, {
  name: `Cart & Checkout Form`,
  group,
  activated: true,
  frequency: Frequency.EVERY_30M,
  tags: [env, 'cart', 'checkout'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/cart.spec.ts'),
  },
});

// Auth Forms Check - Login/Signup UI
new BrowserCheck(`${env}-auth-forms`, {
  name: `Auth Forms (Login/Signup)`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'auth', 'forms'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 2,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/auth-forms.spec.ts'),
  },
});

// User Account Check - Account page after login
new BrowserCheck(`${env}-user-account`, {
  name: `User Account Page`,
  group,
  activated: true,
  frequency: Frequency.EVERY_30M,
  tags: [env, 'account', 'authenticated'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/user-account.spec.ts'),
  },
});

// Login Flow Check - Full login with Checkly state persistence
// Note: This check updates Checkly environment variables with storage state
new BrowserCheck(`${env}-login-flow`, {
  name: `Login Flow & State Sync`,
  group,
  activated: defaults.isPersistentEnv, // Only active for prod/staging
  frequency: Frequency.EVERY_1H, // Run hourly to keep storage state fresh
  tags: [env, 'login', 'state-sync'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 10,
    maxRetries: 2,
    sameRegion: true,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/login.spec.ts'),
  },
});
