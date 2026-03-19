import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './utils/global-setup.ts',

  testDir: './tests',

  timeout: 30000,
  retries: 1,

  reporter: [
    ['list'],
    ['html', { 
      open: 'never',
      outputFolder: 'playwright-report'
    }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  outputDir: 'test-results', // 🔥 importante para Jenkins
});