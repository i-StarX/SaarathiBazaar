import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['allure-playwright'], ['json', { outputFile: 'test-results.json' }]],
  // reporter: [
  //   ['list'], // Console reporter
  //   ['html'], // HTML reporter
  //   ['json', { outputFile: 'test-results.json' }],
  //   ['junit', { outputFile: 'results.xml' }], // Add JUnit for CI integration
  //   ['allure-playwright'],
  // ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    permissions: ['geolocation'],
    geolocation: { latitude: -33.8698439, longitude: 151.2082848 },
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 500,
    },
  },
  timeout: 1000 * 60 * 1000,
  globalTimeout: 1000 * 60 * 1000,
  expect: { timeout: 1000 * 60 * 1000 },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'desktop',
      testMatch: ['**/tests/web/**/*.spec.ts'],
      use: {
        viewport: { width: 1280, height: 800 },
        browserName: 'chromium',
      },
    },
    {
      name: 'desktop',
      testMatch: ['**/tests/api/**/*.spec.ts'],
      use: {
        viewport: { width: 1280, height: 800 },
        browserName: 'chromium',
      },
    },
    {
      name: 'mobile',
      testMatch: ['**/tests/mobile/**/*.spec.ts'],
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'google-chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'microsoft-edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  globalSetup: "./setup",

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
