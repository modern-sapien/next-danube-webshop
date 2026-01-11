import { MultiStepCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import * as path from 'path';

const env = defaults.projectEnv;
const freq = defaults.checkFrequency;

// API Health Check - Error handling and resilience
new MultiStepCheck(`${env}-api-health`, {
  name: `API Health & Error Handling`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'api', 'health', 'critical'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 2,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/api-health.spec.ts'),
  },
});

// Books API Check - CRUD operations on books
new MultiStepCheck(`${env}-api-books`, {
  name: `Books API (CRUD)`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'api', 'books', 'crud'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/api-books.spec.ts'),
  },
});

// Auth API Check - Login, token validation, user profile
new MultiStepCheck(`${env}-api-auth`, {
  name: `Auth API (Login/Token)`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'api', 'auth', 'critical'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 2,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/api-auth.spec.ts'),
  },
});

// Reviews API Check - Review creation and retrieval
new MultiStepCheck(`${env}-api-reviews`, {
  name: `Reviews API`,
  group,
  activated: true,
  frequency: Frequency.EVERY_30M,
  tags: [env, 'api', 'reviews'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/api-reviews.spec.ts'),
  },
});

// User Flow Check - Complete API journey (login, browse, review)
new MultiStepCheck(`${env}-api-user-flow`, {
  name: `Complete User Journey (API)`,
  group,
  activated: true,
  frequency: freq,
  tags: [env, 'api', 'user-flow', 'e2e'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 10,
    maxRetries: 2,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/api-user-flow.spec.ts'),
  },
});
