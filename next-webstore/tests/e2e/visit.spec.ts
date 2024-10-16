import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test('does a simple visit and confirms the title and that it looks correct', async ({ page }) => {
  test.setTimeout(60000);

  console.log(defaults.pageUrl, 'pageUrl');

  await page.goto(defaults.pageUrl);

  const response = await page.waitForResponse(`${defaults.apiUrl}/books`);

  if (response.status() !== 200) {
    console.log(response.status());
    throw new Error(`Request failed with status ${response.status()}`);
  }
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveTitle(/Checkly Webshop/);

  await page.waitForTimeout(1000);

  if( defaults.projectEnv != 'staging' || 'production') {
    await expect(page).toHaveScreenshot();

  } else {
    console.log('test complete')
  }
});
