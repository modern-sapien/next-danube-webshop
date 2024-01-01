import { CheckGroup, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';

export const group = new CheckGroup(`${defaults.projectName}-next-danube-group`, {
  name: `next danube ${defaults.projectName}`,
  activated: true,
  frequency: Frequency.EVERY_15M,
  locations: ['us-east-1', 'eu-west-1'],
  tags: [`${defaults.projectName}`, 'cli'],
  runParallel: true,
  retryStrategy: RetryStrategyBuilder.fixedStrategy({
    baseBackoffSeconds: 30,
    maxRetries: 1,
    sameRegion: true,
  }),
  browserChecks: {
    frequency: Frequency.EVERY_30M,
    testMatch: '*.spec.js',
  },
});
