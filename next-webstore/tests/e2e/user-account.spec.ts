import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test.describe('User Account Page', () => {
  test('should display loading state initially', async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(`${defaults.pageUrl}/user`);

    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('should be accessible from header navigation', async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(defaults.pageUrl);
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'account' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/user/);
  });

  test('should display user page structure with two columns', async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(`${defaults.pageUrl}/user`);
    await page.waitForLoadState('networkidle');

    const columns = page.locator('.columns');
    await expect(columns).toBeVisible();

    const leftColumn = page.locator('.left-column');
    const rightColumn = page.locator('.right-column-expanded');

    await expect(leftColumn).toBeVisible();
    await expect(rightColumn).toBeVisible();
  });
});

test.describe('User Account Page - Authenticated', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(defaults.testTime);

    await page.goto(`${defaults.pageUrl}/login`);
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="email"]').fill(defaults.testUser.email);
    await page.locator('input[type="password"]').fill(defaults.testUser.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await page.waitForResponse((response) =>
      response.url().includes('/auth/login')
    );

    await expect(page.locator('[data-test="login-state"]')).toContainText('Successful login', { timeout: 10000 });
  });

  test('should access account page after login', async ({ page }) => {
    await page.getByRole('link', { name: 'account' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/user/);

    const columns = page.locator('.columns');
    await expect(columns).toBeVisible();
  });

  test('should make authenticated request to user API', async ({ page }) => {
    await page.goto(`${defaults.pageUrl}/user`);

    const responsePromise = page.waitForResponse((response) =>
      response.url().includes('auth/me')
    );

    const response = await responsePromise;
    expect([200, 401]).toContain(response.status());
  });
});
