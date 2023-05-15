import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Checkly Webshop/);

  console.log(await page.title())

  console.log(await page.url())
});