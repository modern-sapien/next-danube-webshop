import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://next-danube-webshop.vercel.app/');
  await page.getByRole('link', { name: 'login' }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('newuser1@email.com');
  await page.locator('input[type="email"]').press('Tab');
  await page.locator('input[type="password"]').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('heading', { name: 'Successful login' }).click();
});