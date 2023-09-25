import { defineConfig, devices } from "@playwright/test";
require("dotenv").config({ path: '.env.local' });

export default defineConfig({
  timeout: 60 * 1000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    trace: "on",
    actionTimeout: 6000,
    navigationTimeout: 5000
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
