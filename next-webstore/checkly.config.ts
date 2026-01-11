import { defineConfig } from 'checkly';
import { emailChannel, webhookChannel } from './checks/resources/alertChannels';
import { defaults } from './tests/defaults';

const config = defineConfig({
  projectName: `Next Danube ${defaults.projectEnv}`,
  logicalId: `next-danube-${defaults.projectSuffix}`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2025.04',
    frequency: defaults.checkFrequency,
    locations: ['us-east-1', 'eu-west-1'],
    tags: [defaults.projectEnv, 'cli'],
    alertChannels: [emailChannel, webhookChannel],
    checkMatch: '*/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: defaults.checkFrequency,
      testMatch: './tests/e2e/*.spec.ts',
      tags: ['browser', defaults.projectEnv],
    },
    multiStepChecks: {
      frequency: defaults.checkFrequency,
      testMatch: './tests/multi/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'us-west-1',
  },
});

export default config;
