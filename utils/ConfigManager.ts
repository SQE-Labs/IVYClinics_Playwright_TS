import testData from "../test-data/test-data.json";

/**
 * ConfigManager — reads test settings from test-data/test-data.json
 *
 * WHY THIS EXISTS:
 * - Keeps URLs and login credentials in ONE place (the JSON file).
 * - Tests don't hardcode "uat" or "owner@demo.com" — they ask ConfigManager instead.
 * - You can switch environment or user by setting env variables before running tests.
 *
 * DEFAULTS (when no env variables are set):
 *   ENV=uat          → uses UAT base URL
 *   USER_TYPE=owner  → logs in as the owner user
 *
 * OVERRIDE EXAMPLE (PowerShell):
 *   $env:ENV="qa"; $env:USER_TYPE="manager"; npx playwright test
 */
export class ConfigManager {
  // Reads ENV from the terminal/CI; falls back to "uat" if not set
  private static env = process.env.ENV || "uat";

  // Reads USER_TYPE from the terminal/CI; falls back to "owner" if not set
  private static userType = process.env.USER_TYPE || "owner";

  /**
   * Returns the config for the current environment (baseUrl + page paths).
   * Used by playwright.config.ts (baseURL) and LoginPage.goto() (login path).
   */
  static getEnvironment() {
    // Look up "uat" or "qa" inside test-data.json → environments section
    const environment =
      testData.environments[this.env as keyof typeof testData.environments];

    // Stop early with a clear error if someone sets ENV=invalid
    if (!environment) {
      throw new Error(`Environment '${this.env}' not found`);
    }

    return environment;
  }

  /**
   * Returns decoded email + password for the current user type.
   * Used by login.spec.ts to fill the login form.
   *
   * Credentials in JSON are Base64-encoded (not plain text).
   * Buffer.from(..., "base64") converts them back to readable strings.
   */
  static getCredentials() {
    // Look up "owner", "manager", or "customer" inside test-data.json
    const user =
      testData.credentials[this.userType as keyof typeof testData.credentials];

    // Stop early with a clear error if someone sets USER_TYPE=invalid
    if (!user) {
      throw new Error(`User '${this.userType}' not found`);
    }

    return {
      email: Buffer.from(user.email, "base64").toString("utf8"),

      password: Buffer.from(user.password, "base64").toString("utf8"),
    };
  }
}
