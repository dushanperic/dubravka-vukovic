import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    browserName: 'chromium',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321 --strictPort',
    url: 'http://127.0.0.1:4321/dubravka-vukovic/sr-Cyrl-RS/',
    reuseExistingServer: !process.env.CI,
  },
});
