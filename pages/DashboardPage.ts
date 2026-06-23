import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class DashboardPage extends BasePage {
  private readonly greetingHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.greetingHeading = page.getByRole('heading', {
      name: /^Good (morning|afternoon|evening), Demo$/,
    });
  }

  async verifyGreetingVisible(): Promise<void> {
    await this.expectToBeVisible(this.greetingHeading);
  }

  async waitForDashboard(): Promise<void> {
    await this.waitForElement(this.greetingHeading);
  }
}
