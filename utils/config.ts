import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 4,
  retries: 1,

  use: {
    baseURL: 'https://app.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  }
});