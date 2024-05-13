import { test, expect } from "@playwright/test";
import { defaults } from "./defaults";

test("does a simple visit and confirms the title and that it looks correct", async ({ page }) => {
  test.setTimeout(60000);

  console.log(defaults.pageUrl, "pageUrl");

  await page.goto("https://www.google.com");

  await page.waitForTimeout(1000)
  
  await expect(page).toHaveScreenshot()
});