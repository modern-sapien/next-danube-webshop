import { PlaywrightCheck, Frequency } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { group } from './resources/group.check';
import { emailChannel, webhookChannel } from './resources/alertChannels';

const env = defaults.projectEnv;
const alertChannels = [emailChannel, webhookChannel];

/**
 * PlaywrightCheck runs the full Playwright test runner via CLI.
 * Use these for comprehensive test suites that need the full Playwright config.
 *
 * For individual test files running in Checkly's browser infrastructure,
 * use BrowserCheck instead (see browser.check.ts).
 */

// Full E2E Test Suite - Runs all UI tests
new PlaywrightCheck(`${env}-playwright-e2e-suite`, {
  name: `E2E Test Suite (Playwright)`,
  alertChannels,
  playwrightConfigPath: '../playwright.config.ts',
  testCommand: 'npx playwright test tests/e2e --project=firefox',
  group,
  frequency: Frequency.EVERY_1H,
  activated: defaults.isPersistentEnv, // Only for prod/staging
});

// Full API Test Suite - Runs all multi-step API tests
new PlaywrightCheck(`${env}-playwright-api-suite`, {
  name: `API Test Suite (Playwright)`,
  alertChannels,
  playwrightConfigPath: '../playwright.config.ts',
  testCommand: 'npx playwright test tests/multi --project=API',
  group,
  frequency: Frequency.EVERY_1H,
  activated: defaults.isPersistentEnv, // Only for prod/staging
});
