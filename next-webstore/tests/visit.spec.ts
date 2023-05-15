import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Checkly Webshop/);

  const response = await page.waitForResponse("https://next-danube-webshop-backend-staging.vercel.app/api/v1/books");

  if (response.status() !== 200) {
    console.log(response.status())
    throw new Error(`Request failed with status ${response.status()}`);
  }});