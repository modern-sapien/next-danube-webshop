import { defineConfig } from 'checkly';
import {
  emailChannel,
  slackChannel,
  webhookChannel,
} from './checks/resources/alertChannels';
import { defaults } from '../next-webstore/tests/defaults';


const config = defineConfig({
  projectName: `Next Danube ${defaults.projectEnv}`,
  logicalId: `next-danube-${defaults.projectEnv}`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2023.09',
    frequency: 60,
    locations: ['us-east-1', 'eu-west-1'],
    tags: [`cli`],
    alertChannels: [emailChannel, slackChannel, webhookChannel],
    checkMatch: '*/**/*.check.ts',
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 30,
      testMatch: '*/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'us-east-1',
    // privateRunLocation: 'test-location'
  },
});

export default config;
