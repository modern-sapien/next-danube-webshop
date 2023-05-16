import { test, expect } from "@playwright/test";

const responseURL =
  process.env.NODE_ENV === "production"
    ? "https://next-danube-webshop-backend.vercel.app/api/v1"
    : "https://next-danube-webshop-backend-staging.vercel.app/api/v1"

const testUser = process.env.NODE_ENV === "production" ? {email: "jane@example.com", password: "password2"} : {
  email: "staging-sam@example.com", password: "staging-password1"
}

test("has title", async ({ page }) => {
  await page.goto("/");
  console.log(responseURL, "responseURL")
  const response = await page.waitForResponse(
    `${responseURL}/books`
  );

  if (response.status() !== 200) {
    console.log(response.status());
    throw new Error(`Request failed with status ${response.status()}`);
  }
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveTitle(/Checkly Webshop/);

  console.log(process.env.NEXT_PUBLIC_LOG_ENV, "bananas in pajamas")
  console.log(await page.url());


});
