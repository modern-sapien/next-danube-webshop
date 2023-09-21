import { defineConfig } from 'checkly'
require('dotenv').config()

const config = defineConfig({
  projectName: `Next Danube ${process.env.NEXT_PUBLIC_NODE_ENV}`,
  logicalId: `next-danube-${process.env.NEXT_PUBLIC_NODE_ENV}`,
  repoUrl: 'https://github.com/modern-sapien/next-danube-webshop',
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2023.09",
    frequency: 60,
    locations: ["us-east-1", "eu-west-1"],
    tags: ["cli", "next-danube", `${process.env.NEXT_PUBLIC_NODE_ENV}`],
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