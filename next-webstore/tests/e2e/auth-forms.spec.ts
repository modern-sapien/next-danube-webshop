import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test.describe('Authentication Forms', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(`${defaults.pageUrl}/login`);
    await page.waitForLoadState('networkidle');
  });

  test('should display login form by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should toggle to signup form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    await page.getByRole('link', { name: 'Sign up here' }).click();

    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });

  test('should display additional fields in signup mode', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up here' }).click();

    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.getByLabel('Username:')).toBeVisible();
    await expect(page.getByLabel('Password:')).toBeVisible();
    await expect(page.getByLabel('Confirm Password:')).toBeVisible();
  });

  test('should toggle back to login form from signup', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign up here' }).click();
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();

    await page.getByRole('link', { name: 'Login here' }).click();

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should allow entering email and password', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await emailInput.fill('test@example.com');
    await passwordInput.fill('testpassword123');

    await expect(emailInput).toHaveValue('test@example.com');
    await expect(passwordInput).toHaveValue('testpassword123');
  });

  test('should show error message for invalid credentials', async ({ page }) => {
    await page.locator('input[type="email"]').fill('invalid@example.com');
    await page.locator('input[type="password"]').fill('wrongpassword');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="login-state"]')).toBeVisible({ timeout: 10000 });
  });

  test('should show success message for valid login', async ({ page }) => {
    await page.locator('input[type="email"]').fill(defaults.testUser.email);
    await page.locator('input[type="password"]').fill(defaults.testUser.password);

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="login-state"]')).toContainText('Successful login', { timeout: 10000 });
  });

  test('should be accessible from header navigation', async ({ page }) => {
    await page.goto(defaults.pageUrl);
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'login' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
