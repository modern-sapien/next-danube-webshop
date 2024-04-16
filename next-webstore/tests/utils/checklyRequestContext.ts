import { request } from '@playwright/test';

export async function createChecklyContext(apiKey, accountID) {
  return await request.newContext({
    baseURL: 'https://api.checklyhq.com/v1/',
    extraHTTPHeaders: {
      Authorization: `Bearer ${apiKey}`,
      'x-checkly-account': `${accountID}`,
      'Content-Type': 'application/json',
    },
  });
}
