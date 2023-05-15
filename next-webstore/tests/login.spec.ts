import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  test.setTimeout(30000);

  await page.goto("/");
  console.log(await page.url())
  await page.getByRole("link", { name: "login" }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill("production-pete@example.com");
  await page.locator('input[type="password"]').fill("password");

  await page.getByRole("button", { name: "Login" }).click();

  // const response = await page.waitForResponse((response) => {
  //   return response
  //     .url()
  //     .includes("https://next-danube-webshop-backend-staging.vercel.app/api/v1/auth/login");
  // });

  await page.waitForSelector('[data-test="login-state"]');
  const loginStateElement = await page.locator('[data-test="login-state"]');
  const loginStateText = await loginStateElement.innerText();

  expect(loginStateText).toBe("Successful login");
});
