import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ConfigManager } from "../utils/ConfigManager";

setup
("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const credentials = ConfigManager.getCredentials();

  await loginPage.goto();

  console.log(`ENV: ${process.env.ENV}`);
  console.log(`USER_TYPE: ${process.env.USER_TYPE}`);

  await loginPage.login(
    credentials.email,
    credentials.password
  );

  // await dashboardPage.waitForDashboard();

  // await dashboardPage.verifyGreetingVisible();

  await page.context().storageState({
    path: "auth/user.json",
  });
});