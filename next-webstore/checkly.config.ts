import { defineConfig } from 'checkly';
import { emailChannel, slackChannel, webhookChannel } from './checks/resources/alertChannels';
import { defaults } from './tests/defaults';

const config = defineConfig({
  projectName: `Next Danube production`,
  logicalId: `next-danube-production`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2025.04',
    frequency: 60,
    locations: ['us-east-1', 'eu-west-1'],
    // privateLocations: ['private-infra'],
    tags: [`cli`],
    alertChannels: [emailChannel, slackChannel, webhookChannel],
    checkMatch: '*/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 30,
      testMatch: './tests/e2e/*.spec.ts',
      tags: ['browser'],
    },
    multiStepChecks: {
      frequency: 30,
      testMatch: './tests/multi/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'us-east-1',
    // privateRunLocation: 'private-infra'
  },
});

export default config;
