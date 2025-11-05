import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';
// import { validateStorageState } from '../utils/validateStorageState';
import { createChecklyContext } from '../utils/checklyRequestContext';

const apiKey =  defaults.apiKey;
const accountID = defaults.accountID;
// Declare variable we'll reference during our test
let storageState;


test('login', async ({ page }) => {
  console.log(defaults.projectEnv, " projectEnv within spec")

  const context = await createChecklyContext(apiKey, accountID)

  test.setTimeout(defaults.testTime);

  await page.goto(defaults.pageUrl);

  await page.getByRole('link', { name: 'login' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(defaults.testUser.email);
  await page.locator('input[type="password"]').fill(defaults.testUser.password);

  await page.getByRole('button', { name: 'Login' }).click();

  let response = await page.waitForResponse((response) => {
    console.log(response.url(), 'response url being hit');
    return response.url().includes(`/auth/logins`);
  });
  const responseBody = await response.json();
  const success = responseBody.success;
  const token = responseBody.token;

  expect(success).toBe(true);
  expect(token).toBeDefined();

  const storage = await page.context().storageState();

  // stringify storage to before updating environment variable
  const stringifiedStorage = JSON.stringify(storage);

  const unixTimestamp = Math.floor(Date.now() / 1000);

  console.log(defaults.apiKey)

  let responseStorage = await context.put(`variables/DEV_STORAGE_STATE`, {
    data: {
      key: `DEV_STORAGE_STATE`,
      value: `${stringifiedStorage}`,
    },
  });

  let responseTime = await context.put(`variables/DEV_COOKIE_TIME`, {
    data: {
      key: `DEV_COOKIE_TIME`,
      value: `${unixTimestamp}`,
    },
  });

  let responseTimeJSON = await responseTime.json()
  let responseStorageJSON = await responseStorage.json();

  console.log(responseTimeJSON.value, 'unix response time')
  console.log(responseStorageJSON.value, 'storage JSON');
});
