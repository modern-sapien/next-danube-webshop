import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import * as path from 'path';

new BrowserCheck(`next-danube-${defaults.projectEnv}-login`, {
  name: `Next Danube ${defaults.projectEnv} login - browser`,
  group,
  frequency: 5,
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 5,
    maxRetries: 1,
    sameRegion: false,
  }),
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/login.spec.ts'),
  },
});

new BrowserCheck(`next-danube-${defaults.projectEnv}-visit`, {
  name: `Next Danube ${defaults.projectEnv} visit - browser`,
  group,
  tags: ['cli'],
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/visit.spec.ts'),
  },
});

new BrowserCheck(`wealth-mgmt-bofa`, {
  name: `Wealth Management Sign Up - browser`,
  tags: ['cli', 'BofA'],
  group,
  frequency: Frequency.EVERY_1M,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/wealthMGMT.spec.ts'),
  },
});

new BrowserCheck(`visual-regression-bofa`, {
  name: `Marketing Visual Regression - browser`,
  tags: ['cli', 'BofA'],
  group,
  frequency: Frequency.EVERY_1M,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/visualRegression.spec.ts'),
  },
});
