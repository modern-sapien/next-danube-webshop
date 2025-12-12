import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

test.describe('Book Catalog', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(defaults.testTime);
    await page.goto(defaults.pageUrl);

    const response = await page.waitForResponse((response) =>
      response.url().includes('/books')
    );
    expect(response.status()).toBe(200);

    await page.waitForLoadState('networkidle');
  });

  test('should load and display book cards from API', async ({ page }) => {
    const bookCards = page.locator('[data-test="book-div"]');
    await expect(bookCards.first()).toBeVisible();

    const count = await bookCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display book information on each card', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    await expect(firstCard).toBeVisible();

    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('li').filter({ hasText: 'Author:' })).toBeVisible();
    await expect(firstCard.locator('li').filter({ hasText: 'Publisher:' })).toBeVisible();
    await expect(firstCard.locator('li').filter({ hasText: 'Genre:' })).toBeVisible();
    await expect(firstCard.locator('li').filter({ hasText: 'Price:' })).toBeVisible();
  });

  test('should display add to cart button on book cards', async ({ page }) => {
    const addToCartButtons = page.locator('[data-test="add-to-cart"]');
    await expect(addToCartButtons.first()).toBeVisible();
    await expect(addToCartButtons.first()).toHaveText('add to cart');
  });

  test('should show book profile when clicking on a book card', async ({ page }) => {
    const firstCard = page.locator('.card').first();
    const bookTitle = await firstCard.locator('h3').textContent();

    await firstCard.click();
    await page.waitForLoadState('networkidle');

    await expect(page.locator('[data-test="book-image"]')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Write a review' })).toBeVisible();

    if (bookTitle) {
      await expect(page.locator('h3').filter({ hasText: `Title: ${bookTitle}` })).toBeVisible();
    }
  });

  test('should display genre filter options', async ({ page }) => {
    const genreFilter = page.locator('[data-test="book-filter-genre"]');
    await expect(genreFilter).toBeVisible();

    await expect(genreFilter.getByText('Romance')).toBeVisible();
    await expect(genreFilter.getByText('Sci-Fi')).toBeVisible();
    await expect(genreFilter.getByText('Fantasy')).toBeVisible();
    await expect(genreFilter.getByText('History')).toBeVisible();
  });

  test('should display rating filter options', async ({ page }) => {
    const ratingFilter = page.locator('[data-test="book-filter-review"]').last();
    await expect(ratingFilter).toBeVisible();

    await expect(ratingFilter.getByText('5 stars')).toBeVisible();
    await expect(ratingFilter.getByText('4 stars')).toBeVisible();
    await expect(ratingFilter.getByText('3 stars')).toBeVisible();
    await expect(ratingFilter.getByText('2 stars')).toBeVisible();
    await expect(ratingFilter.getByText('1 star')).toBeVisible();
  });
});
