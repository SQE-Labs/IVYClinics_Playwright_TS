import { defineConfig, devices } from "@playwright/test";
import { ConfigManager } from "./utils/ConfigManager";

const envConfig = ConfigManager.getEnvironment();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  reporter: [["html", { open: "never" }], ["list"]],

  timeout: 30000,

  expect: {
    timeout: 10000,
  },

  use: {
    headless: !!process.env.CI,

    baseURL: envConfig.baseUrl,

    trace: "on-first-retry",

    screenshot: "only-on-failure",

    video: "retain-on-failure",

    actionTimeout: 10000,

    navigationTimeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
