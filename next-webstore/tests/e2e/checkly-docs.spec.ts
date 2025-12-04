import { test, expect } from '@playwright/test'

test('homepage title and navigate to Docs', async ({ page }) => {
  // Wait until network is idle so the page is ready
  await page.goto('https://www.checklyhq.com/', { waitUntil: 'networkidle' })

  // Assert the exact page title
  await expect(page).toHaveTitle('Checkly: Application Monitoring Powered by Playwright & OTEL')

  // Find the Docs link and navigate, waiting for navigation to finish
  const docsLink = page.getByRole('link', { name: /Docs/i })
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    docsLink.click(),
  ])

  // Confirm we've arrived in the docs section (URL contains /docs)
  await expect(page).toHaveURL(/\/docs(\/|$)/i)

  // Basic check that the docs page shows a documentation heading
  await expect(page.locator('h1')).toContainText(/docs|documentation/i)
})
