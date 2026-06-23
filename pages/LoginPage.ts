import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import testData from '../test-data/test-data.json';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByRole('textbox', { name: 'Email*' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password*' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async goto(): Promise<void> {
    await this.navigateTo(testData.environment.paths.login);
  }

  async enterEmail(email: string): Promise<void> {
    await this.fill(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordInput, password);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInButton);
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}
