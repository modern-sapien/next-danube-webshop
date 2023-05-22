import { test, expect } from "@playwright/test";
import { defaults } from "./defaults";

test("login", async ({ page }) => {
  test.setTimeout(defaults.testTime);

  await page.goto(defaults.pageUrl);

  await page.getByRole("link", { name: "login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(defaults.testUser.email);
  await page.locator('input[type="password"]').fill(defaults.testUser.password);

  await page.getByRole("button", { name: "Login" }).click();

  const response = await page.waitForResponse((response) => {
    console.log(response.url(), "response url being hit");
    return response.url().includes(`/auth/login`);
  });
  const responseBody = await response.json();
  const success = responseBody.success;
  const token = responseBody.token;

  expect(success).toBe(true);
  expect(token).toBeDefined();
});
