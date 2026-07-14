import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200/',
  },
  //Project section
  projects: [
    {
      name: 'chromium',
    },
  ],
});
