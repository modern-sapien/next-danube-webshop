import { MultiStepCheck, Frequency } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './group.check';
import * as path from 'path';

new MultiStepCheck(`next-danube-${defaults.projectEnv}-crud`, {
  name: `Next Danube ${defaults.projectEnv} CRUD - multi`,
  group,
  frequency: Frequency.EVERY_10M,
  code: {
    entrypoint: path.join(__dirname, '../tests/multi-crud.spec.ts'),
  },
});