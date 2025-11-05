import { PlaywrightCheck } from "checkly/constructs";

new PlaywrightCheck("critical-e2e-monitor", {
  name: "Critical E2E Monitor",
  playwrightConfigPath: "../playwright.config.ts",
//   installCommand: "npm ci",
//   testCommand: "npx playwright test --retries=2",
//   pwProjects: ["chromium"],
//   pwTags: ["e2e"],
//   include: [".npmrc"],
});
