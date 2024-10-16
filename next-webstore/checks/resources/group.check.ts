import { CheckGroup, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../../tests/defaults';

export const group = new CheckGroup(`${defaults.projectEnv}-next-danube-group`, {
  name: `next danube ${defaults.projectEnv}`,
  activated: true,
  frequency: Frequency.EVERY_15M,
  locations: ['us-east-1', 'us-west-1'],
  tags: [`${defaults.projectEnv}`, 'cli'],
  runParallel: true,
  retryStrategy: RetryStrategyBuilder.noRetries(),
  browserChecks: {
    frequency: Frequency.EVERY_30M,
    testMatch: '*.spec.js',
  },
});
