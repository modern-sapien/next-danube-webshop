import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import { emailChannel } from './resources/alertChannels';
// alertChannels

const alertChannels = [emailChannel];

import * as path from 'path';

new BrowserCheck(`next-danube-${defaults.projectEnv}-login`, {
  name: `Next Danube ${defaults.projectEnv} login - browser`,
  group,
  alertChannels,
  frequency: 5,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/login.spec.ts'),
  },
});

new BrowserCheck(`next-danube-${defaults.projectEnv}-visit`, {
  name: `Next Danube ${defaults.projectEnv} visit - browser`,
  group,
  tags: ['cli'],
  frequency: 30,
  code: {
    entrypoint: path.join(__dirname, '../tests/e2e/visit.spec.ts'),
  },
});
