import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

const apiUrl = defaults.apiUrl;

test.describe('Auth API', () => {
  test('POST /auth/login - should login with valid credentials', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: defaults.testUser.email,
        password: defaults.testUser.password,
      },
    });

    expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe('string');
  });

  test('POST /auth/login - should reject invalid credentials', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test('POST /auth/login - should reject missing email', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        password: 'somepassword',
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test('POST /auth/login - should reject missing password', async ({ request }) => {
    const response = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: 'test@example.com',
      },
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.success).toBe(false);
  });

  test('GET /auth/me - should return user data with valid token', async ({ request }) => {
    // First login to get token
    const loginResponse = await request.post(`${apiUrl}/auth/login`, {
      data: {
        email: defaults.testUser.email,
        password: defaults.testUser.password,
      },
    });

    expect(loginResponse).toBeOK();
    const loginBody = await loginResponse.json();
    const token = loginBody.token;

    // Then get user data
    const response = await request.get(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response).toBeOK();

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(body.data.email).toBe(defaults.testUser.email);
  });

  test('GET /auth/me - should reject request without token', async ({ request }) => {
    const response = await request.get(`${apiUrl}/auth/me`);

    expect(response.status()).toBe(401);
  });

  test('GET /auth/me - should reject invalid token', async ({ request }) => {
    const response = await request.get(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: 'Bearer invalid_token_here',
      },
    });

    expect(response.status()).toBe(401);
  });
});
