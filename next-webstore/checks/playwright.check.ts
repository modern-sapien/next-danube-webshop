import { PlaywrightCheck } from 'checkly/constructs';
import { defaults } from '../tests/defaults';
import { emailChannel } from './resources/alertChannels';
// alertChannels

const alertChannels = [emailChannel];

new PlaywrightCheck(`next-danube-${defaults.projectEnv}-login-playwright`, {
  name: `Next Danube ${defaults.projectEnv} login - playwright`,
  alertChannels,
  groupName: `Next Danube - ${defaults.projectEnv}`,
  testCommand: 'npx playwright test ./tests/e2e/login.spec.ts',
  playwrightConfigPath: './../playwright.config.ts',
});
