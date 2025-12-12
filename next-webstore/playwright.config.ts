// @ts-nocheck
import { defineConfig, devices } from "@playwright/test";
require("dotenv").config({ path: ".env.local" });

export default defineConfig({
  timeout: 60 * 1000,
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on",
    actionTimeout: 6000,
    navigationTimeout: 5000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "API",
      testDir: "./tests/multi", // Point to the first directory
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "UI",
      testDir: "./tests/e2e", // Point to the first directory
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
