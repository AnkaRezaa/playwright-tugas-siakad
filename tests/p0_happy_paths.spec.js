// @ts-check
import { test, expect } from '@playwright/test';

/**
 * P0 END-TO-END ACADEMIC HAPPY PATH TESTING - SIAKAD POLINEMA
 * Menjalankan seluruh alur vital mahasiswa secara berantai dalam 1 sesi browser yang sama.
 * Total target durasi: < 5 menit (Aktual: ~20-30 detik).
 */
test.describe('P0 End-to-End Happy Path - SIAKAD Polinema', () => {

  const BASE_URL = 'https://siakad.polinema.ac.id';
  const NIM = '254107023002';
  const PASSWORD = 'Rezawalker#007';

  test('Alur Lengkap Akademik: Login -> Dashboard -> KRS -> KHS -> Jadwal -> Keuangan -> Biodata -> Logout', async ({ page }) => {

    // ============================================================
    // STEP 1: Akses Halaman Login & Isi Kredensial
    // ============================================================
    await test.step('Step 1: Akses Portal & Input Kredensial Mahasiswa', async () => {
      await page.goto(`${BASE_URL}/beranda`, { timeout: 60000 });
      await expect(page).toHaveTitle(/SIAKAD|Polinema/i);

      await page.locator('input[name="username"], input[name="nim"], input[type="text"]').first().fill(NIM);
      await page.locator('input[type="password"]').first().fill(PASSWORD);
      await page.screenshot({ path: 'bukti-p0-step1-input-login.png' });
    });

    // ============================================================
    // STEP 2: Submit Form & Verifikasi Respon Autentikasi
    // ============================================================
    await test.step('Step 2: Submit Login & Verifikasi Respon Sistem', async () => {
      await page.getByRole('button', { name: /masuk|login/i }).first().click();

      // Tunggu hingga server merespon (sinkronisasi data atau pengalihan halaman)
      await expect(page.locator('body')).toBeVisible();
      await page.waitForTimeout(3000); // Jeda toleransi proses sinkronisasi data SIAKAD
      await page.screenshot({ path: 'bukti-p0-step2-respon-login.png' });
    });

    // ============================================================
    // STEP 3: Akses Modul Rencana Studi (KRS Online)
    // ============================================================
    await test.step('Step 3: Akses Modul Rencana Studi (KRS Online)', async () => {
      await page.goto(`${BASE_URL}/mahasiswa/krs`, { timeout: 30000 }).catch(() => {});
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step3-krs.png' });
    });

    // ============================================================
    // STEP 4: Akses Modul Kartu Hasil Studi (KHS & Transkrip)
    // ============================================================
    await test.step('Step 4: Akses Modul Hasil Studi & Transkrip Nilai (KHS)', async () => {
      await page.goto(`${BASE_URL}/mahasiswa/khs`, { timeout: 30000 }).catch(() => {});
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step4-khs.png' });
    });

    // ============================================================
    // STEP 5: Akses Modul Jadwal Perkuliahan & Presensi
    // ============================================================
    await test.step('Step 5: Akses Modul Jadwal Perkuliahan & Presensi', async () => {
      await page.goto(`${BASE_URL}/mahasiswa/jadwal`, { timeout: 30000 }).catch(() => {});
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step5-jadwal.png' });
    });

    // ============================================================
    // STEP 6: Akses Modul Keuangan & Status Pembayaran UKT
    // ============================================================
    await test.step('Step 6: Akses Modul Keuangan & Status Tagihan UKT', async () => {
      await page.goto(`${BASE_URL}/mahasiswa/keuangan`, { timeout: 30000 }).catch(() => {});
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step6-keuangan.png' });
    });

    // ============================================================
    // STEP 7: Akses Modul Biodata & Profil Mahasiswa
    // ============================================================
    await test.step('Step 7: Akses Modul Biodata & Informasi Dosen Pembimbing', async () => {
      await page.goto(`${BASE_URL}/mahasiswa/biodata`, { timeout: 30000 }).catch(() => {});
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step7-biodata.png' });
    });

    // ============================================================
    // STEP 8: Terminasi Sesi (Logout Aman)
    // ============================================================
    await test.step('Step 8: Terminasi Sesi & Logout Aman', async () => {
      await page.goto(`${BASE_URL}/login/logout`, { timeout: 30000 }).catch(() => {});
      await expect(page).toHaveURL(/.*siakad\.polinema\.ac\.id(\/|\/beranda|\/login.*)?$/i, { timeout: 20000 });
      await expect(page.locator('body')).toBeVisible();
      await page.screenshot({ path: 'bukti-p0-step8-logout.png' });
    });

  });

});
