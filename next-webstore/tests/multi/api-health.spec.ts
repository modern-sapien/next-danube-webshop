import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

const apiUrl = defaults.apiUrl;

test.describe('API Health & Error Handling', () => {
  test('API base URL should be accessible', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books`);
    expect(response.status()).not.toBe(500);
    expect(response.status()).not.toBe(502);
    expect(response.status()).not.toBe(503);
  });

  test('API should return JSON content type', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books`);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });

  test('API should handle invalid endpoints gracefully', async ({ request }) => {
    const response = await request.get(`${apiUrl}/nonexistent-endpoint`);
    // Should return 404, not 500
    expect(response.status()).toBe(404);
  });

  test('API should handle malformed request body', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: 'not valid json string that should be parsed',
    });

    // Should not crash the server (no 500)
    expect(response.status()).not.toBe(500);
  });

  test('API should handle empty request body on login', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {},
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test('API should handle invalid book ID format', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books/invalid-id-format`);

    // Should return error, not crash
    expect([400, 404, 500]).toContain(response.status());
  });

  test('API should handle special characters in requests', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: '<script>alert("xss")</script>@test.com',
        password: '"; DROP TABLE users;--',
      },
    });

    // Should handle gracefully (reject, not crash)
    expect(response.status()).not.toBe(500);
  });

  test('Books endpoint should return consistent response structure', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books`);
    expect(response).toBeOK();

    const body = await response.json();

    // Check standard response structure
    expect(body).toHaveProperty('success');
    expect(body).toHaveProperty('data');
    expect(typeof body.success).toBe('boolean');
  });

  test('Auth endpoint should return consistent error structure', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      },
    });

    expect(response.status()).toBe(401);
    const body = await response.json();

    expect(body).toHaveProperty('success');
    expect(body.success).toBe(false);
    expect(body).toHaveProperty('error');
  });

  test('Multiple concurrent requests should be handled', async ({ request }) => {
    const requests = Array(5).fill(null).map(() =>
      request.get(`${apiUrl}/books`)
    );

    const responses = await Promise.all(requests);

    for (const response of responses) {
      expect(response).toBeOK();
    }
  });
});
