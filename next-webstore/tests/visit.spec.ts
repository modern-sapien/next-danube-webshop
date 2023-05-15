import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  test.setTimeout(30000);

  await page.goto("/");

  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(/Checkly Webshop/);

  console.log(process.env.NEXT_PUBLIC_LOG_ENV, "bananas in pajamas")
  console.log(await page.url());

  // const response = await page.waitForResponse(
  //   "https://next-danube-webshop-backend-staging.vercel.app/api/v1/books"
  // );

  // if (response.status() !== 200) {
  //   console.log(response.status());
  //   throw new Error(`Request failed with status ${response.status()}`);
  // }
});
