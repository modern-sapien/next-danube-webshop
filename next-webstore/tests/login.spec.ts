import { test, expect } from "@playwright/test";

const responseURL =
  process.env.NODE_ENV === "production"
    ? "https://next-danube-webshop-backend.vercel.app/api/v1"
    : "https://next-danube-webshop-backend-staging.vercel.app/api/v1"

const testUser = process.env.NODE_ENV === "production" ? {email: "jane@example.com", password: "password2"} : {
  email: "staging-sam@example.com", password: "staging-password1"
}

test("test", async ({ page }) => {
  test.setTimeout(30000);

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "login" }).click();
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill(testUser.email);
  await page.locator('input[type="password"]').fill(testUser.password);
  
  await page.getByRole("button", { name: "Login" }).click();

  console.log(responseURL)
  
  const response = await page.waitForResponse((response) => {
    return response
      .url()
      .includes(`${responseURL}/auth/login`);
  });

  await page.waitForSelector('[data-test="login-state"]');
  const loginStateElement = await page.locator('[data-test="login-state"]');
  const loginStateText = await loginStateElement.innerText();

  expect(loginStateText).toBe("Successful login");
});
