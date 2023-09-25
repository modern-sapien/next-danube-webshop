import { defineConfig } from 'checkly';

// Utility function to determine the environment
const getEnvironment = () => {
  if (process.env.NEXT_PUBLIC_NODE_STAGING === 'staging') return 'staging';
  if (process.env.NEXT_PUBLIC_NODE_PRODUCTION === 'production') return 'production';
  return 'preview';
};

// Determine the environment
const env = getEnvironment();

const config = defineConfig({
  projectName: `Next Danube ${env}`,
  logicalId: `next-danube-${env}`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: '2023.09',
    frequency: 60,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['cli', 'next-danube', `${env}`],
    alertChannels: [],
    checkMatch: "*/**/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 5,
      testMatch: "*/**/*.spec.ts",
    },
  },
  cli: {
    runLocation: 'us-east-1',
  },
})

export default config