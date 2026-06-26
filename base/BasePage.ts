import { expect, Locator, Page } from '@playwright/test';

/**
 * BasePage — parent class for all Page Object classes (LoginPage, DashboardPage, etc.)
 *
 * WHY THIS EXISTS:
 * - Page Object Model (POM): each screen of the app gets its own class.
 * - Common actions (click, fill, navigate) live here so we don't repeat the same code.
 * - Child pages extend BasePage and inherit these helpers automatically.
 *
 * EXAMPLE:
 *   class LoginPage extends BasePage { ... }
 *   loginPage.click(emailInput)  // uses the click() method from BasePage
 */
export class BasePage {
  // Playwright's Page object — represents the browser tab we are testing.
  // "protected" means child classes (LoginPage, etc.) can use this.page directly.
  protected readonly page: Page;

  // Every page object receives the same Playwright "page" from the test.
  constructor(page: Page) {
    this.page = page;
  }

  // Opens a URL path. Playwright combines this with baseURL from playwright.config.ts.
  // Example: navigateTo("/login") → https://clinicos-uat.up.railway.app/login
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  // Clicks any element on the page (button, link, checkbox, etc.)
  async click(locator: Locator) {
    await locator.click();
  }

  // Types text into an input field (clears existing text first)
  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  // Reads visible text from an element and returns it as a string
  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
  }

  // Waits until an element appears on screen (up to the timeout set in config)
  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  // Returns true/false — useful for conditional checks without failing the test
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // Asserts that an element is visible — test FAILS if it is not found
  async expectToBeVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }
}
