# Tugas Pengujian Otomatis SIAKAD Polinema

Folder ini merupakan satu paket mandiri (*self-contained*) untuk tugas pengujian otomatis SIAKAD Polinema. Seluruh skrip, konfigurasi, bukti tangkapan layar, dan laporan HTML berada di dalam folder ini.

## Struktur Folder:
```text
tugas-siakad/
├── siakad.spec.js          # Skrip pengujian otomatis (TC01 - TC04)
├── playwright.config.js    # Konfigurasi pengujian khusus folder ini
├── README.md               # Panduan tugas
├── playwright-report/      # Laporan HTML hasil pengujian (otomatis dibuat setelah test)
├── test-results/           # Detail log dan artefak pengujian (otomatis dibuat)
└── bukti-tc*.png           # Tangkapan layar bukti pengujian (otomatis dibuat)
```

## Cara Menjalankan Pengujian:

### Opsi 1: Dari folder utama (`C:\Devs\Playwright`)
```bash
npm run test:tugas
```
Untuk melihat laporan HTML:
```bash
npm run report:tugas
```

### Opsi 2: Dari dalam folder `tugas-siakad` langsung (`C:\Devs\Playwright\tugas-siakad`)
```bash
npx playwright test --headed
```
Untuk melihat laporan HTML:
```bash
npx playwright show-report
```
