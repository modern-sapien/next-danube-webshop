import { MultiStepCheck, Frequency } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import * as path from 'path';

/**
 * This CHECK will fail if you do not set obtain an API key from this free service
 * Use this third party service to create a simple CRUD API
 * An API_KEY from https://crudapi.co.uk/ is required for this example to work.
 */
new MultiStepCheck(`next-danube-${defaults.projectEnv}-crud`, {
  name: `Next Danube ${defaults.projectEnv} CRUD - multi`,
  group,
  frequency: Frequency.EVERY_5M,
  code: {
    entrypoint: path.join(__dirname, '../tests/multi/degraded-spacex.spec.ts'),
  },
});
