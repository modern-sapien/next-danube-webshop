const { test, expect } = require('@playwright/test');

test.describe('GraphQL API Tests', () => {
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext();
  });

  test('Test Dragons Query', async () => {
    const response = await apiContext.post('https://spacex-production.up.railway.app/', {
      data: {
        query: `
          query Dragons {
            dragons {
              name
              first_flight
              diameter {
                feet
              }
              launch_payload_mass {
                lb
              }
            }
          }
        `,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('data.dragons');
    expect(Array.isArray(responseBody.data.dragons)).toBeTruthy();
  });

  test('Test Ships Query', async () => {
    const response = await apiContext.post('https://spacex-production.up.railway.app/', {
      data: {
        query: `
          query Ships {
            ships {
              id
              model
              name
              type
              status
            }
          }
        `,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('data.ships');
    expect(Array.isArray(responseBody.data.ships)).toBeTruthy();
  });
});
