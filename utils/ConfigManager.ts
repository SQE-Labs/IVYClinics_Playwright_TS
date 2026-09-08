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

const env = process.env.ENV || "uat";
const userType = process.env.USER_TYPE || "owner";

function getTestData() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("../test-data/test-data.json");
}

export function getEnvironment() {
  const testData = getTestData();
  const environment = testData.environments[env];

  if (!environment) {
    throw new Error(`Environment '${env}' not found`);
  }

  return environment;
}

export function getCredentials() {
  const testData = getTestData();
  const user = testData.credentials[userType];

  if (!user) {
    throw new Error(`User '${userType}' not found`);
  }

  return {
    email: Buffer.from(user.email, "base64").toString("utf8"),
    password: Buffer.from(user.password, "base64").toString("utf8"),
  };
}

export const ConfigManager = { getEnvironment, getCredentials };
