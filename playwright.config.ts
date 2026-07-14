import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  //Global Scetion
  //timeouts
  timeout: 100000,
  globalTimeout: 60000,
  expect:{
    timeout:50000
  },
  //Retry and reporters
  
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200/',
    trace: 'on-first-retry',
    navigationTimeout: 50000,
    video: {
      mode:'off',
      size: { width: 1920, height: 1080 },
    }, 
  },
  //Project section
  projects: [
    {
      name: 'chromium',
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox',
       },
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'UsePOM.spec.ts',
      use:{
        viewport:{width:1920,height:1080}
      }
    }
  ],
});
