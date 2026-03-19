import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './utils/global-setup.ts', // 👈 NUEVO (WireMock auto start)

  testDir: './tests',

  timeout: 30000,
  retries: 1,

  reporter: [
    ['list'],
    ['html']
  ],

  use: {
    baseURL: 'https://www.saucedemo.com', // 👈 SOLO UI
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});