import { test, expect } from '@playwright/test';

test('visual regression', async ({ page }) => {
  await page.goto('https://www.bankofamerica.com/');
  await page.getByPlaceholder('User ID').click();
  await expect(page).toHaveScreenshot()
  await page.getByRole('link', { name: 'Small Business' }).click();
  await expect(page).toHaveScreenshot()
  await page.getByRole('link', { name: 'Wealth Management' }).click();
  await expect(page).toHaveScreenshot()
  await page.getByRole('link', { name: 'Businesses & Institutions' }).click();
  await expect(page).toHaveScreenshot()
});