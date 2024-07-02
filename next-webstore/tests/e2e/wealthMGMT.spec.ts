//@ts-nocheck
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.bankofamerica.com/');

  await page.getByRole('link', { name: 'Wealth Management' }).click();
  await page.getByRole('link', { name: 'Merrill Lynch Wealth' }).click();
  await page.locator('#form_7_firstName').click();
  await page.locator('#form_7_firstName').fill('Johnny');
  await page.locator('#form_7_firstName').press('Tab');
  await page.locator('#form_7_lastName').fill('Tester');
  await page.locator('#form_7_lastName').press('Tab');
  await page.locator('#form_7_emailAddress').fill('johnnytester@gmail.com');
  await page.locator('#form_7_emailAddress').press('Tab');
  await page.locator('#form_7_confirmEmailAddress').fill('johnnytester@gmail.com');
  await page.locator('#form_7_confirmEmailAddress').press('Tab');
  await page.locator('#form_7_primaryPhone').fill('555-770-5555');
  await page.locator('#form_7_primaryPhone').press('Tab');
  await page.locator('#form_7_zipCode').fill('31404');

  // Create a Promise to wait for the specific POST request
  const requestPromise = new Promise((resolve) => {
    page.route('**/*', (route) => {
      const request = route.request();
      console.log(`Intercepted ${request.method()} request to: ${request.url()}`);
      if (
        request.method() === 'POST' &&
        request.url() === 'https://www.ml.com/services/form/ml/token'
      ) {
        resolve(true);
        route.abort();
      }
    });
  });

  // Simulate clicking the submit button with the text "Submit"
  await page.locator('[id="\\37 _submit-button_submit"]').click();

  // Wait for the specific POST request to be intercepted
  const postRequestMade = await requestPromise;

  // Assert that the specific POST request was made
  expect(postRequestMade).toBeTruthy();
});
