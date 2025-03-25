import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const DOCS_DIRECTORIES = [
  'https://github.com/checkly/docs.checklyhq.com/tree/main/site/content/docs/cli',
  'https://github.com/checkly/docs.checklyhq.com/tree/main/site/content/docs/testing'
];

const OUTPUT_DIR = './knowledgebase';

test.describe('GitHub Docs Crawler', () => {
  test.setTimeout(120000);
  
  test.beforeAll(async () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
  });

  test('Crawl documentation', async ({ page, context }) => {
    const allFileUrls: string[] = [];

    // First pass: Collect all .md file URLs from directory pages
    for (const directoryUrl of DOCS_DIRECTORIES) {
      await page.goto(directoryUrl);

      // Get all markdown file links and deduplicate
      const fileLinks = await page.$$eval('a.Link--primary[href$=".md"]', (links) =>
        links.map((link) => {
          const href = (link as HTMLAnchorElement).href;
          return href.includes('://') ? href : `https://github.com${href}`;
        })
      );
      
      const uniqueLinks = [...new Set(fileLinks)];
      allFileUrls.push(...uniqueLinks);
      console.log(`Found ${uniqueLinks.length} unique files in ${directoryUrl}`);
    }

    console.log(`Total files to process: ${allFileUrls.length}`);

    // Second pass: Process each file
    for (const fileUrl of allFileUrls) {
      console.log(`Processing ${fileUrl}`);

      // Extract relative path from URL
      const urlPath = new URL(fileUrl).pathname;
      const relativePath = urlPath
        .split('/site/content/docs/')[1] // Get path after docs/
        .replace('.md', '.txt'); // Change extension
        
      const outputPath = path.join(OUTPUT_DIR, relativePath);
      const outputDir = path.dirname(outputPath);

      // Create directory if it doesn't exist
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Open each file in a new tab
      const newPage = await context.newPage();
      await newPage.goto(fileUrl);

      try {
        // Wait for and click the Raw button
        await newPage.waitForSelector('[data-testid="raw-button"]', { timeout: 10000 });
        await newPage.getByTestId('raw-button').click();
        await page.waitForTimeout(5000);

        const content = await newPage.locator('pre').textContent();

        if (content) {
          fs.writeFileSync(outputPath, content);
          console.log(`Saved content to ${outputPath}`);
        } else {
          console.warn(`No content found for ${fileUrl}`);
        }
      } catch (error) {
        console.error(`Error processing ${fileUrl}:`, error);
      } finally {
        await newPage.close();
        await page.waitForTimeout(1000);
      }
    }
  });
});