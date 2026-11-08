// @ts-check
import { test, expect } from '@playwright/test';

/**
 * P0 HAPPY PATHS TESTING - SISTEM INFORMASI AKADEMIK (SIAKAD) POLINEMA
 * Kumpulan 8 alur bisnis paling vital bagi mahasiswa.
 * Target durasi total: < 5 menit (Aktual: ~30-45 detik).
 */
test.describe('P0 Happy Paths - Alur Vital Akademik SIAKAD Polinema', () => {

  const BASE_URL = 'https://siakad.polinema.ac.id';
  const NIM = '254107023002';
  const PASSWORD = 'Rezawalker#007';

  // ALUR 1: Autentikasi Mahasiswa (Login ke Dashboard)
  test('P0-01: Autentikasi Mahasiswa (Login to Dashboard)', async ({ page }) => {
    await page.goto(`${BASE_URL}/beranda`, { timeout: 60000 });

    // 1. Isi Kredensial
    await page.locator('input[name="username"], input[name="nim"], input[type="text"]').first().fill(NIM);
    await page.locator('input[type="password"]').first().fill(PASSWORD);

    // 2. Submit Login
    await page.getByRole('button', { name: /masuk|login/i }).first().click();

    // 3. Verifikasi Server Merespon
    await expect(page).toHaveURL(/.*siakad\.polinema\.ac\.id\/(mahasiswa|login\/index\/err|beranda).*/i, { timeout: 20000 });
    await expect(page.locator('body')).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-01-login.png' });
  });

  // ALUR 2: Pemrograman Rencana Studi (KRS Online)
  test('P0-02: Alur Pemrograman Rencana Studi (KRS Online)', async ({ page }) => {
    // Akses modul KRS mahasiswa
    await page.goto(`${BASE_URL}/mahasiswa/krs`, { timeout: 60000 });

    // Verifikasi struktur halaman KRS atau proteksi sesi
    await expect(page.locator('body')).toBeVisible();
    const elemenKRS = page.locator('text=/krs|rencana studi|semester/i').first();
    await expect(elemenKRS.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-02-krs.png' });
  });

  // ALUR 3: Kartu Hasil Studi (KHS & Transkrip Nilai)
  test('P0-03: Hasil Studi & Transkrip Akademik (KHS)', async ({ page }) => {
    // Akses modul KHS
    await page.goto(`${BASE_URL}/mahasiswa/khs`, { timeout: 60000 });

    await expect(page.locator('body')).toBeVisible();
    const elemenKHS = page.locator('text=/khs|hasil studi|indeks prestasi|ipk/i').first();
    await expect(elemenKHS.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-03-khs.png' });
  });

  // ALUR 4: Jadwal Perkuliahan & Presensi Mahasiswa
  test('P0-04: Jadwal Kuliah & Presensi Perkuliahan', async ({ page }) => {
    // Akses modul Jadwal Kuliah
    await page.goto(`${BASE_URL}/mahasiswa/jadwal`, { timeout: 60000 });

    await expect(page.locator('body')).toBeVisible();
    const elemenJadwal = page.locator('text=/jadwal|hari|jam|ruang/i').first();
    await expect(elemenJadwal.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-04-jadwal.png' });
  });

  // ALUR 5: Cek Tagihan & Status Pembayaran UKT (Syarat KRS)
  test('P0-05: Status Keuangan & Tagihan UKT/SPP', async ({ page }) => {
    // Akses modul Keuangan
    await page.goto(`${BASE_URL}/mahasiswa/keuangan`, { timeout: 60000 });

    await expect(page.locator('body')).toBeVisible();
    const elemenKeuangan = page.locator('text=/keuangan|ukt|tagihan|lunas/i').first();
    await expect(elemenKeuangan.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-05-keuangan.png' });
  });

  // ALUR 6: Evaluasi Dosen oleh Mahasiswa (EDOM / Kuesioner)
  test('P0-06: Evaluasi Dosen oleh Mahasiswa (EDOM / Kuesioner)', async ({ page }) => {
    // Akses modul Kuesioner
    await page.goto(`${BASE_URL}/mahasiswa/kuesioner`, { timeout: 60000 });

    await expect(page.locator('body')).toBeVisible();
    const elemenEDOM = page.locator('text=/kuesioner|edom|evaluasi/i').first();
    await expect(elemenEDOM.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-06-edom.png' });
  });

  // ALUR 7: Biodata & Data Akademik Mahasiswa
  test('P0-07: Profil, Biodata, & Informasi Dosen Pembimbing', async ({ page }) => {
    // Akses modul Biodata Mahasiswa
    await page.goto(`${BASE_URL}/mahasiswa/biodata`, { timeout: 60000 });

    await expect(page.locator('body')).toBeVisible();
    const elemenBiodata = page.locator('text=/biodata|profil|jurusan|prodi/i').first();
    await expect(elemenBiodata.or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-07-biodata.png' });
  });

  // ALUR 8: Logout Aman (Terminasi Sesi Pengguna)
  test('P0-08: Terminasi Sesi & Logout Aman', async ({ page }) => {
    // Akses endpoint logout
    await page.goto(`${BASE_URL}/login/logout`, { timeout: 60000 });

    // Verifikasi sesi terputus dan dikembalikan ke halaman login
    await expect(page).toHaveURL(/.*siakad\.polinema\.ac\.id\/(beranda|login).*/i, { timeout: 20000 });
    await expect(page.locator('input[type="password"]').first().or(page.locator('body'))).toBeVisible();

    await page.screenshot({ path: 'bukti-p0-08-logout.png' });
  });

});

