import { test, expect } from '@playwright/test';
import { defaults } from '../defaults';

const apiUrl = defaults.apiUrl;

test.describe('Books API', () => {
  test('GET /books - should return list of books', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books`);

    expect(response).toBeOK();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.data).toBeDefined();
    expect(Array.isArray(body.data)).toBe(true);
  });

  test('GET /books - should return books with expected properties', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books`);
    expect(response).toBeOK();

    const body = await response.json();
    const books = body.data;

    if (books.length > 0) {
      const book = books[0];
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
      expect(book).toHaveProperty('publisher');
      expect(book).toHaveProperty('genre');
      expect(book).toHaveProperty('price');
    }
  });

  test('GET /books/:id - should return single book by ID', async ({ request }) => {
    // First get all books to get a valid ID
    const listResponse = await request.get(`${apiUrl}/books`);
    expect(listResponse).toBeOK();

    const listBody = await listResponse.json();
    const books = listBody.data;

    if (books.length > 0) {
      const bookId = books[0]._id;

      const response = await request.get(`${apiUrl}/books/${bookId}`);
      expect(response).toBeOK();

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data._id).toBe(bookId);
    }
  });

  test('GET /books/:id - should return 404 for non-existent book', async ({ request }) => {
    const fakeId = '000000000000000000000000';
    const response = await request.get(`${apiUrl}/books/${fakeId}`);

    expect(response.status()).toBe(404);
  });

  test('GET /books - should support pagination', async ({ request }) => {
    const response = await request.get(`${apiUrl}/books?limit=2`);
    expect(response).toBeOK();

    const body = await response.json();
    expect(body.data.length).toBeLessThanOrEqual(2);
  });
});
