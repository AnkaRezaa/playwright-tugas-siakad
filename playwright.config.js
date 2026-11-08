// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi Tugas Pengujian Otomatis SIAKAD Polinema
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  
  // Folder untuk menyimpan hasil artefak & trace pengujian
  outputDir: './test-results',

  // Laporan HTML disimpan langsung di dalam folder playwright-report
  reporter: [
    ['html', { outputFolder: './playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
