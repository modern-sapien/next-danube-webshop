import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test.describe('Cart Page', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(`${defaults.pageUrl}/cart`);
    await page.waitForLoadState('networkidle');
  });

  test('should display cart page with order heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Order' })).toBeVisible();
  });

  test('should display cart items with book information', async ({ page }) => {
    const cartItems = page.locator('[class*="leftColumn"]').first();
    await expect(cartItems).toBeVisible();

    await expect(page.getByText('Title 1')).toBeVisible();
    await expect(page.getByText('Author 1')).toBeVisible();
  });

  test('should display shipping form with required fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Shipping' })).toBeVisible();

    await expect(page.locator('#firstName')).toBeVisible();
    await expect(page.locator('#lastName')).toBeVisible();
    await expect(page.locator('#address')).toBeVisible();
    await expect(page.locator('#city')).toBeVisible();
    await expect(page.locator('#state')).toBeVisible();
    await expect(page.locator('#zipCode')).toBeVisible();
  });

  test('should display payment form with required fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();

    await expect(page.locator('#cardNumber')).toBeVisible();
    await expect(page.locator('#cardExpiration')).toBeVisible();
    await expect(page.locator('#cardCVV')).toBeVisible();
  });

  test('should have pre-filled checkout form values', async ({ page }) => {
    await expect(page.locator('#firstName')).toHaveValue('John');
    await expect(page.locator('#lastName')).toHaveValue('Doe');
    await expect(page.locator('#address')).toHaveValue('123 Main St');
    await expect(page.locator('#city')).toHaveValue('Anytown');
    await expect(page.locator('#state')).toHaveValue('CA');
    await expect(page.locator('#zipCode')).toHaveValue('12345');
  });

  test('should allow editing shipping information', async ({ page }) => {
    const firstNameInput = page.locator('#firstName');
    await firstNameInput.clear();
    await firstNameInput.fill('Jane');
    await expect(firstNameInput).toHaveValue('Jane');

    const addressInput = page.locator('#address');
    await addressInput.clear();
    await addressInput.fill('456 Oak Ave');
    await expect(addressInput).toHaveValue('456 Oak Ave');
  });

  test('should display submit button', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();
  });

  test('should be accessible from homepage navigation', async ({ page }) => {
    await page.goto(defaults.pageUrl);
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'cart' }).click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*\/cart/);
    await expect(page.getByRole('heading', { name: 'Order' })).toBeVisible();
  });
});
