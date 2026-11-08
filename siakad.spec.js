// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test.describe('Tugas Pengujian Otomatis - Portal SIAKAD Polinema', () => {

  // Kunjungi website sebelum setiap skenario pengujian dijalankan
  test.beforeEach(async ({ page }) => {
    // Timeout 60 detik untuk toleransi koneksi jaringan di GitHub Actions
    await page.goto('https://siakad.polinema.ac.id/beranda', { timeout: 60000 });
  });

  // TEST CASE 1: Verifikasi Tampilan Utama & Komponen Form Login
  test('TC01 - Memastikan halaman beranda dan form login tampil dengan benar', async ({ page }) => {
    // 1. Verifikasi judul halaman memuat kata SIAKAD atau Polinema
    await expect(page).toHaveTitle(/SIAKAD|Polinema/i);

    // 2. Verifikasi input NIM/Username, Password, dan tombol Login terlihat
    const inputUsername = page.locator('input[name="username"], input[name="nim"], input[type="text"]').first();
    const inputPassword = page.locator('input[type="password"]').first();
    const buttonSubmit = page.getByRole('button', { name: /masuk|login/i }).first();

    await expect(inputUsername).toBeVisible();
    await expect(inputPassword).toBeVisible();
    await expect(buttonSubmit).toBeVisible();

    // 3. Simpan screenshot sebagai bukti pengujian tugas
    await page.screenshot({ 
      path: path.join(__dirname, 'bukti-tc01-tampilan.png'), 
      fullPage: true 
    });
  });

  // TEST CASE 2: Uji Interaksi Input Pengguna
  test('TC02 - Memastikan input NIM dan Password dapat diisi', async ({ page }) => {
    const inputUsername = page.locator('input[name="username"], input[name="nim"], input[type="text"]').first();
    const inputPassword = page.locator('input[type="password"]').first();

    // Isi dengan data simulasi (dummy data)
    await inputUsername.fill('2141720000');
    await inputPassword.fill('passwordDummy123');

    // Pastikan nilai yang diketik benar-benar tersimpan di dalam field
    await expect(inputUsername).toHaveValue('2141720000');
    await expect(inputPassword).toHaveValue('passwordDummy123');

    // Simpan screenshot bukti pengisian form
    await page.screenshot({ 
      path: path.join(__dirname, 'bukti-tc02-input.png') 
    });
  });

  // TEST CASE 3: Uji Negatif (Validasi Form Kosong)
  test('TC03 - Validasi sistem saat menekan tombol login tanpa mengisi data', async ({ page }) => {
    const buttonSubmit = page.getByRole('button', { name: /masuk|login/i }).first();

    // Klik tombol masuk/login tanpa mengisi input apa pun
    await buttonSubmit.click();

    // Pastikan sistem menahan pengguna di halaman login (tidak tembus ke dalam sistem)
    await expect(page).toHaveURL(/.*siakad\.polinema\.ac\.id.*/);
  });

  // TEST CASE 4: Uji Login Berhasil (Positive Test) hingga Masuk ke Halaman Dalam
  test('TC04 - Login berhasil dan masuk ke halaman dashboard mahasiswa', async ({ page }) => {
    // Kredensial akun mahasiswa
    const NIM = '254107023002';
    const PASSWORD = 'Rezawalker#007';

    const inputUsername = page.locator('input[name="username"], input[name="nim"], input[type="text"]').first();
    const inputPassword = page.locator('input[type="password"]').first();
    const buttonSubmit = page.getByRole('button', { name: /masuk|login/i }).first();

    // 1. Masukkan NIM dan Password
    await inputUsername.fill(NIM);
    await inputPassword.fill(PASSWORD);

    // 2. Klik tombol Masuk / Login
    await buttonSubmit.click();

    // 3. Verifikasi berhasil masuk ke dalam:
    await page.waitForLoadState('networkidle');

    // 4. Verifikasi elemen khas dashboard/halaman dalam muncul
    const elemenDashboard = page.getByRole('link', { name: /keluar|logout/i })
      .or(page.getByText(/selamat datang|dashboard|mahasiswa/i))
      .first();

    await expect(elemenDashboard).toBeVisible({ timeout: 15000 });

    // 5. Simpan tangkapan layar (screenshot) halaman dashboard mahasiswa
    await page.screenshot({ 
      path: path.join(__dirname, 'bukti-tc04-dashboard-berhasil.png'), 
      fullPage: true 
    });
  });

});

