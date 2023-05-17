import { defineConfig } from 'checkly'
// set path in terminal when testing locally
require('dotenv').config()

const config = defineConfig({
  projectName: `Next Danube ${process.env.NEXT_PUBLIC_NODE_ENV}`,
  logicalId: `next-danube-${process.env.NEXT_PUBLIC_NODE_ENV}`,
  repoUrl: 'https://vercel.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2022.10",
    frequency: 1,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["website", "critical-user-flows"],
    alertChannels: [],
    checkMatch: "*/**/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: 1,
      testMatch: "*/**/*.spec.ts",
    },
  },
  cli: {
    runLocation: 'us-east-1',
  },
})

export default config