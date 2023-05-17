import { defineConfig, devices } from "@playwright/test";
import {defaults} from "./tests/defaults"
require("dotenv").config({ path: '.env.local' });

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

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
    url: defaults.pageUrl,
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
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
