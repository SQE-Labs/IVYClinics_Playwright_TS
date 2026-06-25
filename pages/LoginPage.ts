import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { ConfigManager } from "../utils/ConfigManager";

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = page.getByRole("textbox", { name: "Email*" });

    this.passwordInput = page.getByRole("textbox", { name: "Password*" });

    this.signInButton = page.getByRole("button", { name: "Sign in" });
  }

  async goto() {
    const env = ConfigManager.getEnvironment();

    await this.navigateTo(env.paths.login);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL((url) => !url.pathname.includes("/login"), {
        timeout: 30000,
      }),
      this.signInButton.click(),
    ]);
  }
}
