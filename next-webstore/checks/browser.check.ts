import { BrowserCheck, Frequency } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import * as path from 'path';

new BrowserCheck(`next-danube-${defaults.projectEnv}-login`, {
  name: `Next Danube ${defaults.projectEnv} login - browser`,
  group,
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, '../tests/login.spec.ts'),
  },
});

new BrowserCheck(`next-danube-${defaults.projectEnv}-visit`, {
  name: `Next Danube ${defaults.projectEnv} visit - browser`,
  group,
  tags: ["tagtest"],
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, '../tests/visit.spec.ts'),
  },
});
