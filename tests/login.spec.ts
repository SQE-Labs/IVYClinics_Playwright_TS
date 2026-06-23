import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import testData from '../test-data/test-data.json';

test.describe('Login', () => {
  test('should login successfully and display dashboard greeting', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter credentials and sign in', async () => {
      await loginPage.enterEmail(testData.credentials.owner.email);
      await loginPage.enterPassword(testData.credentials.owner.password);
      await loginPage.clickSignIn();
    });

    await test.step('Verify dashboard loads successfully', async () => {
      await dashboardPage.waitForDashboard();

      await expect(
        page.getByRole('heading', { name: 'Good evening, Demo' }),
      ).toBeVisible();
    });
  });
});
