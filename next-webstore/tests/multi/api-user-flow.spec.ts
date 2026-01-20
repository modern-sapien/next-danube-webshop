import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

const apiUrl = defaults.apiUrl;

test.describe('API User Flow - Complete Journey', () => {
  test('should complete full user journey: login, browse books, view book, submit review', async ({ request }) => {
    // Step 1: Login
    const loginResponse = await test.step('Login with valid credentials', async () => {
      const response = await request.post(`${apiUrl}/auth/login`, {
        data: {
          email: defaults.testUser.email,
          password: defaults.testUser.password,
        },
      });

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.token).toBeDefined();

      return body;
    });

    const token = loginResponse.token;

    // Step 2: Get user profile
    await test.step('Fetch authenticated user profile', async () => {
      const response = await request.get(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.email).toBe(defaults.testUser.email);
    });

    // Step 3: Browse books catalog
    const books = await test.step('Browse books catalog', async () => {
      const response = await request.get(`${apiUrl}/books`);

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);

      return body.data;
    });

    // Step 4: View single book details
    const selectedBook = await test.step('View single book details', async () => {
      const bookId = books[0]._id;
      const response = await request.get(`${apiUrl}/books/${bookId}`);

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data._id).toBe(bookId);

      return body.data;
    });

    // Step 5: View existing reviews for the book
    await test.step('View existing reviews for book', async () => {
      const response = await request.get(`${apiUrl}/books/${selectedBook._id}/reviews`);

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(false);
    });

    // Step 6: Submit a new review
    await test.step('Submit a new review for book', async () => {
      const uniqueTitle = `Flow Test Review ${Date.now()}`;

      const response = await request.post(`${apiUrl}/books/${selectedBook._id}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: uniqueTitle,
          recommend: true,
          review: `Automated flow test review for ${selectedBook.title}`,
          stars: 5,
        },
      });

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.title).toBe(uniqueTitle);
    });
  });

  test('should handle unauthenticated user flow: browse and view only', async ({ request }) => {
    // Step 1: Browse books without authentication
    const books = await test.step('Browse books catalog (unauthenticated)', async () => {
      const response = await request.get(`${apiUrl}/books`);

      expect(response).toBeOK();
      const body = await response.json();
      expect(body.success).toBe(true);

      return body.data;
    });

    // Step 2: View single book
    await test.step('View single book details (unauthenticated)', async () => {
      if (books.length > 0) {
        const response = await request.get(`${apiUrl}/books/${books[0]._id}`);
        expect(response).toBeOK();
      }
    });

    // Step 3: View reviews
    await test.step('View reviews (unauthenticated)', async () => {
      if (books.length > 0) {
        const response = await request.get(`${apiUrl}/books/${books[0]._id}/reviews`);
        expect(response).toBeOK();
      }
    });

    // Step 4: Attempt to submit review without auth - should fail
    await test.step('Attempt review submission without auth - should fail', async () => {
      if (books.length > 0) {
        const response = await request.post(`${apiUrl}/books/${books[0]._id}/reviews`, {
          data: {
            title: 'Unauthorized Review',
            recommend: true,
            review: 'This should fail',
            stars: 3,
          },
        });

        expect(response.status()).toBe(401);
      }
    });

    // Step 5: Attempt to access protected route - should fail
    await test.step('Attempt to access user profile without auth - should fail', async () => {
      const response = await request.get(`${apiUrl}/auth/me`);
      expect(response.status()).toBe(401);
    });
  });

  test('should validate API response times are acceptable', async ({ request }) => {
    const maxResponseTime = 5000; // 5 seconds max

    await test.step('Books list response time', async () => {
      const start = Date.now();
      const response = await request.get(`${apiUrl}/books`);
      const duration = Date.now() - start;

      expect(response).toBeOK();
      expect(duration).toBeLessThan(maxResponseTime);
    });

    await test.step('Login response time', async () => {
      const start = Date.now();
      const response = await request.post(`${apiUrl}/auth/login`, {
        data: {
          email: defaults.testUser.email,
          password: defaults.testUser.password,
        },
      });
      const duration = Date.now() - start;

      expect(response).toBeOK();
      expect(duration).toBeLessThan(maxResponseTime);
    });
  });
});
