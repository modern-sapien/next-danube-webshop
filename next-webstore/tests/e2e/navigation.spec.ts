import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test.describe('Homepage Navigation', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(defaults.pageUrl);
    await page.waitForLoadState('networkidle');
  });

  test('should display header with all navigation links', async ({ page }) => {
    const header = page.locator('header.header');
    await expect(header).toBeVisible();

    await expect(page.getByRole('link', { name: 'next danube' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'login' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'account' })).toBeVisible();
  });

  test('should navigate to login page from header', async ({ page }) => {
    await page.getByRole('link', { name: 'login' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should navigate to cart page from header', async ({ page }) => {
    await page.getByRole('link', { name: 'cart' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/cart/);
    await expect(page.getByRole('heading', { name: 'Order' })).toBeVisible();
  });

  test('should navigate to account page from header', async ({ page }) => {
    await page.getByRole('link', { name: 'account' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/user/);
  });

  test('should navigate back to homepage via logo', async ({ page }) => {
    await page.getByRole('link', { name: 'cart' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*\/cart/);

    await page.getByRole('link', { name: 'next danube' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(new RegExp(`^${defaults.pageUrl}/?$`));
  });

  test('should display search input and button', async ({ page }) => {
    await expect(page.locator('[data-test="search-textarea"]')).toBeVisible();
    await expect(page.locator('[data-test="search-submit"]')).toBeVisible();
  });
});
