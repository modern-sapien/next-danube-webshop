/**
 * Setup script to create environment-specific Checkly variables
 *
 * Run once to create the variables:
 *   npx ts-node scripts/setup-checkly-variables.ts
 *
 * This creates:
 *   - PROD_STORAGE_STATE, PROD_COOKIE_TIME
 *   - STAGING_STORAGE_STATE, STAGING_COOKIE_TIME
 */

import { request } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.CHECKLY_API_KEY;
const ACCOUNT_ID = process.env.CHECKLY_ACCOUNT_ID;

if (!API_KEY || !ACCOUNT_ID) {
  console.error('Missing CHECKLY_API_KEY or CHECKLY_ACCOUNT_ID in environment');
  process.exit(1);
}

const variablesToCreate = [
  { key: 'PROD_STORAGE_STATE', value: '{}' },
  { key: 'PROD_COOKIE_TIME', value: '0' },
  { key: 'STAGING_STORAGE_STATE', value: '{}' },
  { key: 'STAGING_COOKIE_TIME', value: '0' },
];

async function createVariable(context: any, key: string, value: string) {
  // First try to GET to see if it exists
  const getResponse = await context.get(`variables/${key}`);

  if (getResponse.ok()) {
    console.log(`✓ Variable ${key} already exists`);
    return true;
  }

  // Create via POST
  const postResponse = await context.post('variables', {
    data: {
      key,
      value,
      locked: false,
    },
  });

  if (postResponse.ok()) {
    console.log(`✓ Created variable ${key}`);
    return true;
  } else {
    const error = await postResponse.text();
    console.error(`✗ Failed to create ${key}: ${error}`);
    return false;
  }
}

async function main() {
  console.log('Setting up Checkly environment variables...\n');

  const context = await request.newContext({
    baseURL: 'https://api.checklyhq.com/v1/',
    extraHTTPHeaders: {
      Authorization: `Bearer ${API_KEY}`,
      'x-checkly-account': ACCOUNT_ID!,
      'Content-Type': 'application/json',
    },
  });

  let allSuccess = true;

  for (const variable of variablesToCreate) {
    const success = await createVariable(context, variable.key, variable.value);
    if (!success) allSuccess = false;
  }

  console.log('\n' + (allSuccess ? 'All variables ready!' : 'Some variables failed to create.'));

  await context.dispose();
}

main().catch(console.error);
