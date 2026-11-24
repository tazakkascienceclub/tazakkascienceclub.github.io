// =========================================================
// PENGATURAN LANGGANAN  ⚠️ ISI NOMOR REKENING / E-WALLET DI BAWAH
// =========================================================

// Harga langganan per bulan (Rupiah)
const HARGA_BULANAN = 25000;

// Pilihan lama langganan (bulan) yang bisa dipilih santri
const PILIHAN_BULAN = [1, 3, 6, 12];

// Tujuan transfer. Tambah / hapus baris sesuai kebutuhan.
const TUJUAN_BAYAR = [
  { nama: "Bank (contoh: BSI)", nomor: "ISI_NOMOR_REKENING", atasNama: "ISI_NAMA_PEMILIK" },
  { nama: "DANA / GoPay / OVO", nomor: "ISI_NOMOR_HP", atasNama: "ISI_NAMA_PEMILIK" },
];

// Nomor WhatsApp admin untuk konfirmasi (format 62..., tanpa + dan spasi). Kosongkan "" jika tidak dipakai.
const WA_ADMIN = "";
