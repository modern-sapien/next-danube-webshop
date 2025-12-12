import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

const apiUrl = defaults.apiUrl;

test.describe('Reviews API', () => {
  let authToken: string;
  let bookId: string;

  test.beforeAll(async ({ request }) => {
    // Login to get auth token
    const loginResponse = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: defaults.testUser.email,
        password: defaults.testUser.password,
      },
    });

    const loginBody = await loginResponse.json();
    authToken = loginBody.token;

    // Get a book ID for review tests
    const booksResponse = await request.get(`${apiUrl}/books`);
    const booksBody = await booksResponse.json();
    if (booksBody.data && booksBody.data.length > 0) {
      bookId = booksBody.data[0]._id;
    }
  });

  test('GET /books/:bookId/reviews - should return reviews for a book', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');

    const response = await request.get(`${apiUrl}/books/${bookId}/reviews`);

    expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /books/:bookId/reviews - reviews should have expected properties', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');

    const response = await request.get(`${apiUrl}/books/${bookId}/reviews`);
    expect(response).toBeOK();

    const body = await response.json();
    const reviews = body.data;

    if (reviews.length > 0) {
      const review = reviews[0];
      expect(review).toHaveProperty('title');
      expect(review).toHaveProperty('recommend');
      expect(review).toHaveProperty('review');
      expect(review).toHaveProperty('stars');
    }
  });

  test('POST /books/:bookId/reviews - should require authentication', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');

    const response = await request.post(`${apiUrl}/books/${bookId}/reviews`, {
      data: {
        title: 'Test Review',
        recommend: true,
        review: 'This is a test review',
        stars: 5,
      },
    });

    expect(response.status()).toBe(401);
  });

  test('POST /books/:bookId/reviews - should create review with valid token', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');
    test.skip(!authToken, 'No auth token available');

    const uniqueTitle = `Test Review ${Date.now()}`;

    const response = await request.post(`${apiUrl}/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        title: uniqueTitle,
        recommend: true,
        review: 'This is an automated test review from Playwright',
        stars: 4,
      },
    });

    expect(response).toBeOK();

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(body.data.title).toBe(uniqueTitle);
    expect(body.data.stars).toBe(4);
    expect(body.data.recommend).toBe(true);
  });

  test('POST /books/:bookId/reviews - should validate required fields', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');
    test.skip(!authToken, 'No auth token available');

    const response = await request.post(`${apiUrl}/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        title: 'Incomplete Review',
        // Missing required fields: recommend, review, stars
      },
    });

    expect(response.ok()).toBe(false);
  });

  test('POST /books/:bookId/reviews - should validate stars range', async ({ request }) => {
    test.skip(!bookId, 'No books available to test reviews');
    test.skip(!authToken, 'No auth token available');

    const response = await request.post(`${apiUrl}/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        title: 'Invalid Stars Review',
        recommend: true,
        review: 'Testing invalid stars',
        stars: 10, // Invalid: should be 1-5
      },
    });

    expect(response.ok()).toBe(false);
  });
});
