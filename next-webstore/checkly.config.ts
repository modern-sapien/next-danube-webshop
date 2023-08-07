import { defineConfig } from 'checkly'
require('dotenv').config()

const config = defineConfig({
  projectName: `Next Danube Production`,
  logicalId: `next-danube-Production`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2023.02",
    frequency: 60,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["cli", "production", "next-danube", `production`],
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