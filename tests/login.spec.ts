import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ConfigManager } from "../utils/ConfigManager";

test.describe("Login", () => {
  test(
    "should login successfully and display dashboard greeting",
    {
      tag: ["@smoke"],
    },
    async ({ page }) => {
      const loginPage = new LoginPage(page);

      const dashboardPage = new DashboardPage(page);

      const credentials = ConfigManager.getCredentials();

      await test.step("Navigate to login page", async () => {
        await loginPage.goto();
      });

      await test.step("Login", async () => {
        //console.log(`ENV: ${process.env.ENV}`);
        //console.log(`USER_TYPE: ${process.env.USER_TYPE}`);
        console.log(`ENV: UAT`);
        console.log(`USER_TYPE: Automation`);
        await loginPage.login(credentials.email, credentials.password);
      });

      await test.step("Verify dashboard", async () => {
        await dashboardPage.waitForDashboard();

        await dashboardPage.verifyGreetingVisible();
      });
    },
  );
});
