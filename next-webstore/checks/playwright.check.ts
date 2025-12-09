import { PlaywrightCheck } from "checkly/constructs";
import { defaults } from "../tests/defaults";
import { group } from "./resources/group.check";
import { emailChannel, slackChannel, webhookChannel } from "./resources/alertChannels";

const alertChannels = [emailChannel, slackChannel, webhookChannel];

new PlaywrightCheck(`plawyright-next-danube-${defaults.projectEnv}-playwright-login`, {
  name: `Next Danube ${defaults.projectEnv} - login - playwright`,
  alertChannels,
  playwrightConfigPath: "../playwright.config.ts",
  testCommand: "npx playwright test login.spec.ts",
  group,
  frequency: 5,
//   installCommand: "npm ci",
//   testCommand: "npx playwright test login.spec.ts",
  // pwProjects: ["chromium"],
//   pwTags: ["login"],
//   include: [".npmrc"],
});

new PlaywrightCheck(`plawyright-next-danube-${defaults.projectEnv}-playwright-visit`, {
  name: `Next Danube ${defaults.projectEnv} - login - playwright`,
  alertChannels,
  playwrightConfigPath: "../playwright.config.ts",
  testCommand: "npx playwright test visit.spec.ts",
  group,
  frequency: 5,
  //   installCommand: "npm ci",
  //   pwProjects: ["chromium"],
  //   pwTags: ["login"],
  //   include: [".npmrc"],
});
