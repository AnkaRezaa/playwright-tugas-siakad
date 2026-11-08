// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi Khusus Tugas SIAKAD Polinema
 * Seluruh hasil pengujian dan laporan disimpan langsung di dalam folder tugas-siakad
 */
export default defineConfig({
  testDir: './',
  fullyParallel: false,
  
  // Folder untuk menyimpan hasil artefak & trace pengujian
  outputDir: './test-results',

  // Laporan HTML disimpan langsung di dalam folder tugas-siakad/playwright-report
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

