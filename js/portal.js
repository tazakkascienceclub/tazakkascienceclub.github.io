// =========================================================
// PORTAL ANGGOTA TSTC
// Menu: Belajar, Download, Ujian (hanya untuk yang sudah login)
// Admin bisa menambah & menghapus file; santri hanya melihat & mengunduh.
// =========================================================

// ---------- 1. SUSUNAN MENU & FOLDER ----------
// Untuk menambah folder baru, salin salah satu bagian lalu ubah nama & kuncinya.
// "bawaan" = link yang selalu tampil (tidak perlu diunggah admin).
const MENU = {
  belajar: {
    nama: "Belajar", ikon: "📚", warna: "#14a37f", premium: true,
    deskripsi: "Materi dan aplikasi per mata pelajaran",
    anak: {
      matematika: {
        nama: "Matematika", ikon: "📐", warna: "#0b5d4b", deskripsi: "Aljabar, geometri, kalkulus, statistika",
        anak: {
          materi: { nama: "Materi", ikon: "📖", deskripsi: "Ringkasan, modul, bahan bacaan" },
          aplikasi: { nama: "Aplikasi", ikon: "💻", deskripsi: "Aplikasi dan simulasi", bawaan: [
            { judul: "GeoGebra Classic", keterangan: "Grafik, geometri, dan aljabar interaktif", url: "https://www.geogebra.org/classic", jenis: "web" },
            { judul: "Desmos Graphing Calculator", keterangan: "Kalkulator grafik online", url: "https://www.desmos.com/calculator", jenis: "web" },
          ] },
        },
      },
      fisika: {
        nama: "Fisika", ikon: "⚛️", warna: "#2563eb", deskripsi: "Gerak, gaya, energi, listrik, gelombang",
        anak: {
          materi: { nama: "Materi", ikon: "📖", deskripsi: "Ringkasan, modul, bahan bacaan" },
          aplikasi: { nama: "Aplikasi", ikon: "💻", deskripsi: "Aplikasi dan simulasi", bawaan: [
            { judul: "PhET Simulasi Fisika", keterangan: "Simulasi interaktif dari University of Colorado", url: "https://phet.colorado.edu/en/simulations/filter?subjects=physics", jenis: "web" },
            { judul: "The Physics Classroom", keterangan: "Konsep fisika dan latihan interaktif", url: "https://www.physicsclassroom.com", jenis: "web" },
          ] },
        },
      },
      kimia: {
        nama: "Kimia", ikon: "⚗️", warna: "#d97706", deskripsi: "Atom, ikatan, reaksi, larutan",
        anak: {
          materi: { nama: "Materi", ikon: "📖", deskripsi: "Ringkasan, modul, bahan bacaan" },
          aplikasi: { nama: "Aplikasi", ikon: "💻", deskripsi: "Aplikasi dan simulasi", bawaan: [
            { judul: "PhET Simulasi Kimia", keterangan: "Simulasi atom, molekul, dan reaksi", url: "https://phet.colorado.edu/en/simulations/filter?subjects=chemistry", jenis: "web" },
            { judul: "Ptable", keterangan: "Tabel periodik interaktif", url: "https://ptable.com", jenis: "web" },
            { judul: "MolView", keterangan: "Melihat molekul dalam 3D", url: "https://molview.org", jenis: "web" },
          ] },
        },
      },
      biologi: {
        nama: "Biologi", ikon: "🧬", warna: "#16a34a", deskripsi: "Sel, genetika, ekologi, sistem tubuh",
        anak: {
          materi: { nama: "Materi", ikon: "📖", deskripsi: "Ringkasan, modul, bahan bacaan" },
          aplikasi: { nama: "Aplikasi", ikon: "💻", deskripsi: "Aplikasi dan simulasi", bawaan: [
            { judul: "PhET Simulasi Biologi", keterangan: "Seleksi alam, gen, dan sel saraf", url: "https://phet.colorado.edu/en/simulations/filter?subjects=biology", jenis: "web" },
            { judul: "Learn.Genetics", keterangan: "Genetika dan sel dengan animasi", url: "https://learn.genetics.utah.edu", jenis: "web" },
          ] },
        },
      },
    },
  },

  download: {
    nama: "Download", ikon: "📥", warna: "#2563eb",
    deskripsi: "Pengumuman, hasil ujian, dan sertifikat",
    anak: {
      pengumuman: { nama: "Pengumuman", ikon: "📢", warna: "#2563eb", deskripsi: "Informasi resmi untuk anggota" },
      "hasil-ujian": { nama: "Hasil Ujian", ikon: "📊", warna: "#7c3aed", deskripsi: "Rekap nilai dan hasil ujian" },
      sertifikat: { nama: "Sertifikat", ikon: "🎓", warna: "#d97706", deskripsi: "Sertifikat kegiatan dan lomba" },
    },
  },

  ujian: {
    nama: "Ujian", ikon: "📝", warna: "#dc2626", premium: true,
    deskripsi: "Latihan soal dan soal ujian",
    anak: {
      "latihan-soal": { nama: "Latihan Soal & Pembahasan", ikon: "✏️", warna: "#0b5d4b", deskripsi: "Soal latihan beserta pembahasannya" },
      "soal-ujian": { nama: "Soal Ujian", ikon: "🧾", warna: "#dc2626", deskripsi: "Naskah soal ujian dari pembina" },
    },
  },
};

const IKON_JENIS = { pdf: "📄", dokumen: "📝", slide: "📊", gambar: "🖼️", video: "🎬", web: "🌐" };
const BUCKET = "berkas"; // nama tempat penyimpanan file di Supabase Storage

// =========================================================
// BAGIAN DI BAWAH INI TIDAK PERLU DIUBAH
// =========================================================
const app = document.getElementById("app");
let pengguna = null;
let isAdmin = false;
let statusSaya = "gratis";   // admin | pelanggan | gratis
let aktifSampai = null;      // tanggal akhir langganan
let jumlahPerFolder = {};

// ---------- 2. CEK LOGIN ----------
(async function mulai() {
  if (!db) {
    app.innerHTML =
      '<div class="config-box"><div style="font-size:2.5rem">⚙️</div>' +
      '<h2>Portal belum aktif</h2><p class="muted">Admin perlu mengisi <b>SUPABASE_URL</b> dan <b>SUPABASE_ANON_KEY</b> di file <b>js/config.js</b>.</p>' +
      '<a class="btn btn-green" href="index.html">Kembali ke beranda</a></div>';
    return;
  }

  const { data } = await db.auth.getSession();
  if (!data.session) {
    sessionStorage.setItem("tujuan", "portal.html" + location.hash); // kembali ke sini setelah login
    location.replace("login.html");
    return;
  }
  pengguna = data.session.user;

  // Status: admin, pelanggan (premium aktif), atau gratis
  await muatStatus();
  isiInfoPengguna();
  await hitungFile();
  window.addEventListener("hashchange", tampilkan);
  tampilkan();
})();

// Keluar otomatis kalau sesi habis
if (db) {
  db.auth.onAuthStateChange(function (event) {
    if (event === "SIGNED_OUT") location.replace("login.html");
  });
}

document.querySelectorAll(".js-logout").forEach(function (b) {
  b.addEventListener("click", async function () {
    await db.auth.signOut();
    location.replace("index.html");
  });
});

async function muatStatus() {
  const cek = await db.rpc("status_saya");
  if (cek.error) {
    // SQL langganan belum dijalankan: semua anggota dianggap boleh akses
    const lama = await db.rpc("is_admin");
    statusSaya = lama.data === true ? "admin" : "pelanggan";
  } else {
    statusSaya = cek.data;
  }
  isAdmin = statusSaya === "admin";
  const row = await db.from("anggota").select("aktif_sampai").eq("id", pengguna.id).maybeSingle();
  aktifSampai = row.data && row.data.aktif_sampai ? new Date(row.data.aktif_sampai) : null;
  document.querySelectorAll(".js-admin-only").forEach(function (el) { el.hidden = !isAdmin; });
  document.querySelectorAll(".js-member-only").forEach(function (el) { el.hidden = isAdmin; });
}

function punyaAkses(node) {
  return !node.premium || isAdmin || statusSaya === "pelanggan";
}

function rupiah(n) { return "Rp" + Number(n).toLocaleString("id-ID"); }
function tanggal(d) { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }

function namaPengguna() {
  const meta = pengguna.user_metadata || {};
  return meta.nama || meta.name || pengguna.email.split("@")[0];
}

function isiInfoPengguna() {
  const nama = namaPengguna();
  document.querySelectorAll(".js-nama").forEach(function (el) { el.textContent = nama; });
  document.querySelectorAll(".js-avatar").forEach(function (el) { el.textContent = nama.charAt(0).toUpperCase(); });
  document.querySelectorAll(".js-role").forEach(function (el) {
    el.textContent = isAdmin ? "ADMIN" : statusSaya === "pelanggan" ? "⭐ PREMIUM" : "GRATIS";
    el.classList.toggle("premium", statusSaya === "pelanggan");
    el.classList.toggle("admin", isAdmin);
  });
}

// ---------- 3. HITUNG JUMLAH FILE PER FOLDER ----------
async function hitungFile() {
  const { data } = await db.from("files").select("folder");
  jumlahPerFolder = {};
  (data || []).forEach(function (r) { jumlahPerFolder[r.folder] = (jumlahPerFolder[r.folder] || 0) + 1; });
}

function jumlahItem(jalur, node) {
  if (!node.anak) return (jumlahPerFolder[jalur] || 0) + (node.bawaan ? node.bawaan.length : 0);
  return Object.keys(node.anak).reduce(function (t, k) { return t + jumlahItem(jalur + "/" + k, node.anak[k]); }, 0);
}

// ---------- 4. PINDAH HALAMAN SESUAI ALAMAT (#belajar/fisika/materi) ----------
function tampilkan() {
  const bagian = location.hash.replace("#", "").split("/").filter(Boolean);

  // Halaman khusus: langganan (semua), anggota & pembayaran (admin)
  const khusus = { langganan: halamanLangganan };
  if (isAdmin) { khusus.anggota = halamanAnggota; khusus.pembayaran = halamanPembayaran; }
  if (khusus[bagian[0]]) {
    document.querySelectorAll("[data-menu]").forEach(function (a) { a.classList.toggle("active", a.dataset.menu === bagian[0]); });
    khusus[bagian[0]]();
    window.scrollTo({ top: 0 });
    return;
  }
  let node = null, jalur = [], warna = null;

  // telusuri susunan MENU
  let daftar = MENU;
  for (const k of bagian) {
    if (!daftar || !daftar[k]) break;
    node = daftar[k];
    jalur.push(k);
    warna = node.warna || warna;
    daftar = node.anak;
  }

  // tandai menu aktif
  document.querySelectorAll("[data-menu]").forEach(function (a) {
    a.classList.toggle("active", a.dataset.menu === (jalur[0] || ""));
  });

  const menuUtama = jalur.length ? MENU[jalur[0]] : null;
  if (!node) dashboard();
  else if (menuUtama && !punyaAkses(menuUtama)) halamanPaywall(menuUtama);
  else if (node.anak) halamanFolder(jalur, node);
  else halamanFile(jalur, node, warna);
  window.scrollTo({ top: 0 });
}

// Jejak folder: Dashboard › Belajar › Fisika › Materi
function jejak(jalur) {
  let html = '<nav class="crumbs"><a href="#">🏠 Dashboard</a>';
  let daftar = MENU, alamat = [];
  jalur.forEach(function (k, i) {
    const n = daftar[k];
    alamat.push(k);
    html += '<span class="sep">›</span>';
    html += i === jalur.length - 1
      ? '<span class="now">' + n.nama + '</span>'
      : '<a href="#' + alamat.join("/") + '">' + n.nama + '</a>';
    daftar = n.anak;
  });
  return html + "</nav>";
}

function kartuFolder(href, n, jumlah, i, warna) {
  const kunci = n.premium && !punyaAkses(n);
  return '<a class="folder" href="' + href + '" style="--warna:' + (n.warna || warna) + ';animation-delay:' + i * 0.06 + 's">' +
    (n.premium ? '<span class="tag-premium">' + (kunci ? "🔒 Premium" : "⭐ Premium") + '</span>' : "") +
    '<span class="ic">' + n.ikon + '</span><h3>' + n.nama + '</h3><p>' + n.deskripsi + '</p>' +
    '<span class="count">' + (kunci ? "Langganan " + rupiah(HARGA_BULANAN) + "/bulan" : jumlah + " item") + '</span></a>';
}

// Kotak status langganan (dipakai di dashboard)
function kotakLangganan() {
  if (isAdmin) return "";
  if (statusSaya === "pelanggan") {
    return '<a href="#langganan" class="sub-banner ok"><span class="ic">⭐</span><div><b>Premium aktif</b>' +
      '<span>Berlaku sampai ' + (aktifSampai ? tanggal(aktifSampai) : "-") + '. Ketuk untuk memperpanjang.</span></div><span class="go">›</span></a>';
  }
  return '<a href="#langganan" class="sub-banner"><span class="ic">🔓</span><div><b>Buka menu Belajar &amp; Ujian</b>' +
    '<span>Langganan Premium hanya ' + rupiah(HARGA_BULANAN) + ' per bulan.</span></div><span class="btn btn-gold btn-sm">Langganan</span></a>';
}

// ---------- 5. DASHBOARD ----------
async function dashboard() {
  let html =
    '<div class="welcome"><h1>Assalamu\'alaikum, ' + esc(namaPengguna()) + ' 👋</h1>' +
    '<p>' + (isAdmin ? "Anda masuk sebagai <b>Admin</b>: bisa menambah dan menghapus file di setiap folder." : "Selamat datang di Portal Anggota TSTC. Pilih menu untuk mulai belajar.") + '</p></div>' +
    kotakLangganan() +
    '<div class="folder-grid">';
  Object.keys(MENU).forEach(function (k, i) {
    html += kartuFolder("#" + k, MENU[k], jumlahItem(k, MENU[k]), i);
  });
  html += '</div><p class="section-label">File terbaru</p><div id="terbaru" class="file-list"><p class="loading">Memuat…</p></div>';
  app.innerHTML = html;

  const { data, error } = await db.from("files").select("*").order("created_at", { ascending: false }).limit(6);
  const box = document.getElementById("terbaru");
  if (!box) return;
  if (error) { box.innerHTML = '<div class="empty">Gagal memuat: ' + esc(error.message) + '</div>'; return; }
  if (!data.length) { box.innerHTML = '<div class="empty"><span class="ic">🗂️</span>Belum ada file yang diunggah.</div>'; return; }
  box.innerHTML = data.map(function (f, i) { return barisFile(f, i, true); }).join("");
  pasangAksi(box, data);
}

// ---------- 6. HALAMAN FOLDER (berisi folder lagi) ----------
function halamanFolder(jalur, node) {
  let html = jejak(jalur) +
    '<div class="page-head"><div><h1>' + node.ikon + " " + node.nama + '</h1><p>' + node.deskripsi + '</p></div></div>' +
    '<div class="folder-grid">';
  Object.keys(node.anak).forEach(function (k, i) {
    const p = jalur.concat(k).join("/");
    html += kartuFolder("#" + p, node.anak[k], jumlahItem(p, node.anak[k]), i, node.warna);
  });
  app.innerHTML = html + "</div>";
}

// ---------- 7. HALAMAN FILE (folder paling dalam) ----------
async function halamanFile(jalur, node, warna) {
  const folder = jalur.join("/");
  app.innerHTML = jejak(jalur) +
    '<div class="page-head"><div><h1>' + node.ikon + " " + node.nama + '</h1><p>' + node.deskripsi + '</p></div>' +
    (isAdmin ? '<button class="btn btn-gold" id="btnTambah">＋ Tambah file</button>' : "") + '</div>' +
    '<div id="daftarFile" class="file-list"><p class="loading">Memuat…</p></div>';

  if (isAdmin) document.getElementById("btnTambah").onclick = function () { bukaModal(folder, node.nama); };

  const { data, error } = await db.from("files").select("*").eq("folder", folder).order("created_at", { ascending: false });
  const box = document.getElementById("daftarFile");
  if (!box) return;
  if (error) { box.innerHTML = '<div class="empty">Gagal memuat: ' + esc(error.message) + '</div>'; return; }

  const semua = data.concat((node.bawaan || []).map(function (b) { return Object.assign({ bawaan: true }, b); }));
  if (!semua.length) {
    box.innerHTML = '<div class="empty"><span class="ic">🗂️</span><b>Folder ini masih kosong.</b><br>' +
      (isAdmin ? 'Ketuk "＋ Tambah file" untuk mengunggah.' : "File akan segera ditambahkan oleh pembina.") + '</div>';
    return;
  }
  box.innerHTML = semua.map(function (f, i) { return barisFile(f, i, false); }).join("");
  pasangAksi(box, semua);
}

function barisFile(f, i, tampilFolder) {
  const tgl = f.created_at ? new Date(f.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "";
  const lokasi = tampilFolder ? namaFolder(f.folder) + " · " : "";
  return '<div class="file" style="animation-delay:' + i * 0.05 + 's">' +
    '<span class="ic">' + (IKON_JENIS[f.jenis] || "📄") + '</span>' +
    '<div class="txt"><b>' + esc(f.judul) + '</b>' +
      (f.keterangan ? '<span>' + esc(f.keterangan) + '</span>' : "") +
      (lokasi || tgl ? '<small>' + lokasi + tgl + '</small>' : "") + '</div>' +
    '<div class="acts">' +
      '<button class="btn btn-light btn-sm" data-buka="' + i + '">' + (f.path ? "Unduh" : "Buka") + ' ↗</button>' +
      (isAdmin && !f.bawaan ? '<button class="btn-icon" data-hapus="' + i + '" aria-label="Hapus">🗑️</button>' : "") +
    '</div></div>';
}

function namaFolder(jalur) {
  let daftar = MENU, nama = [];
  (jalur || "").split("/").forEach(function (k) {
    if (daftar && daftar[k]) { nama.push(daftar[k].nama); daftar = daftar[k].anak; }
  });
  return nama.join(" › ");
}

// ---------- 8. BUKA / UNDUH / HAPUS ----------
function pasangAksi(box, list) {
  box.querySelectorAll("[data-buka]").forEach(function (b) {
    b.onclick = function () { bukaFile(list[b.dataset.buka]); };
  });
  box.querySelectorAll("[data-hapus]").forEach(function (b) {
    b.onclick = function () { hapusFile(list[b.dataset.hapus]); };
  });
}

async function bukaFile(f) {
  if (!f.path) { window.open(f.url, "_blank", "noopener"); return; }
  // Buka tab dulu (agar tidak diblokir Safari), lalu isi dengan link sementara
  const tab = window.open("", "_blank");
  const { data, error } = await db.storage.from(BUCKET).createSignedUrl(f.path, 60 * 60);
  if (error) { if (tab) tab.close(); alert("Gagal membuka file: " + error.message); return; }
  if (tab) tab.location.href = data.signedUrl; else location.href = data.signedUrl;
}

async function hapusFile(f) {
  if (!confirm('Hapus "' + f.judul + '"?')) return;
  if (f.path) await db.storage.from(BUCKET).remove([f.path]);
  const { error } = await db.from("files").delete().eq("id", f.id);
  if (error) { alert("Gagal menghapus: " + error.message); return; }
  await hitungFile();
  tampilkan();
}

// ---------- 8b. HALAMAN TERKUNCI (belum langganan) ----------
function halamanPaywall(menu) {
  app.innerHTML =
    '<nav class="crumbs"><a href="#">🏠 Dashboard</a><span class="sep">›</span><span class="now">' + menu.nama + '</span></nav>' +
    '<div class="paywall">' +
      '<div class="pw-icon">🔒</div>' +
      '<h1>' + menu.ikon + ' ' + menu.nama + ' khusus anggota Premium</h1>' +
      '<p>' + menu.deskripsi + '. Berlangganan untuk membuka semua materi, aplikasi, latihan soal, dan soal ujian.</p>' +
      '<div class="pw-price"><b>' + rupiah(HARGA_BULANAN) + '</b><span>/ bulan</span></div>' +
      '<ul class="pw-list"><li>📚 Materi Matematika, Fisika, Kimia, Biologi</li><li>💻 Aplikasi &amp; simulasi pilihan</li>' +
      '<li>✏️ Latihan soal + pembahasan</li><li>🧾 Soal ujian dari pembina</li></ul>' +
      '<a href="#langganan" class="btn btn-gold">Langganan sekarang →</a>' +
    '</div>';
}

// ---------- 8c. HALAMAN LANGGANAN (bayar + riwayat) ----------
async function halamanLangganan() {
  if (isAdmin) { location.hash = "pembayaran"; return; }
  const aktif = statusSaya === "pelanggan";

  let html =
    '<nav class="crumbs"><a href="#">🏠 Dashboard</a><span class="sep">›</span><span class="now">Langganan</span></nav>' +
    '<div class="page-head"><div><h1>⭐ Langganan Premium</h1><p>Akses penuh menu Belajar dan Ujian.</p></div></div>' +
    '<div class="sub-status ' + (aktif ? "ok" : "") + '">' +
      (aktif
        ? '<span class="ic">✅</span><div><b>Premium aktif</b><span>Berlaku sampai <b>' + tanggal(aktifSampai) + '</b>. Pembayaran baru akan menambah masa aktif.</span></div>'
        : '<span class="ic">🔒</span><div><b>Belum berlangganan</b><span>Ikuti 3 langkah di bawah. Langganan aktif setelah admin memeriksa bukti transfer.</span></div>') +
    '</div>' +

    '<div class="sub-grid">' +
      '<div class="card-box"><h3><span class="step-no">1</span> Pilih lama langganan</h3>' +
        '<div class="plans" id="plans">' +
          PILIHAN_BULAN.map(function (b, i) {
            return '<button type="button" class="plan' + (i === 0 ? " active" : "") + '" data-bulan="' + b + '">' +
              '<b>' + b + ' bulan</b><span>' + rupiah(b * HARGA_BULANAN) + '</span></button>';
          }).join("") +
        '</div>' +
        '<h3 style="margin-top:1.4rem"><span class="step-no">2</span> Transfer ke salah satu tujuan</h3>' +
        '<div class="pay-list">' +
          TUJUAN_BAYAR.map(function (t, i) {
            return '<div class="pay"><div><small>' + esc(t.nama) + '</small><b>' + esc(t.nomor) + '</b><span>a.n. ' + esc(t.atasNama) + '</span></div>' +
              '<button type="button" class="btn btn-light btn-sm" data-salin="' + i + '">Salin</button></div>';
          }).join("") +
        '</div>' +
        '<p class="total">Total transfer: <b id="totalBayar">' + rupiah(PILIHAN_BULAN[0] * HARGA_BULANAN) + '</b></p>' +
      '</div>' +

      '<div class="card-box"><h3><span class="step-no">3</span> Kirim bukti transfer</h3>' +
        '<form id="bayarForm" class="form" novalidate>' +
          '<div class="field"><label for="bukti">Foto / screenshot bukti transfer</label><input type="file" id="bukti" accept="image/*,application/pdf"></div>' +
          '<div class="field"><label for="catatan">Catatan (opsional)</label><input id="catatan" placeholder="Contoh: transfer dari rekening a.n. ayah"></div>' +
          '<button type="submit" class="btn btn-green btn-block" id="bayarBtn">Kirim bukti pembayaran</button>' +
          '<p class="form-info" id="bayarInfo"></p>' +
        '</form>' +
        (WA_ADMIN ? '<a class="wa-link" target="_blank" rel="noopener" href="https://wa.me/' + WA_ADMIN + '?text=' +
          encodeURIComponent("Assalamu'alaikum, saya " + namaPengguna() + " (" + pengguna.email + ") sudah mengirim bukti langganan TSTC.") +
          '">💬 Konfirmasi lewat WhatsApp admin</a>' : "") +
      '</div>' +
    '</div>' +
    '<p class="section-label">Riwayat pembayaran</p><div id="riwayat" class="file-list"><p class="loading">Memuat…</p></div>';
  app.innerHTML = html;

  // pilih lama langganan
  let bulan = PILIHAN_BULAN[0];
  app.querySelectorAll(".plan").forEach(function (b) {
    b.onclick = function () {
      bulan = Number(b.dataset.bulan);
      app.querySelectorAll(".plan").forEach(function (x) { x.classList.toggle("active", x === b); });
      document.getElementById("totalBayar").textContent = rupiah(bulan * HARGA_BULANAN);
    };
  });
  // salin nomor
  app.querySelectorAll("[data-salin]").forEach(function (b) {
    b.onclick = function () {
      const nomor = TUJUAN_BAYAR[b.dataset.salin].nomor;
      if (navigator.clipboard) navigator.clipboard.writeText(nomor);
      b.textContent = "Tersalin ✓";
      setTimeout(function () { b.textContent = "Salin"; }, 1500);
    };
  });

  // kirim bukti
  const form = document.getElementById("bayarForm");
  const info = document.getElementById("bayarInfo");
  const btn = document.getElementById("bayarBtn");
  form.onsubmit = async function (e) {
    e.preventDefault();
    const file = document.getElementById("bukti").files[0];
    const catatan = document.getElementById("catatan").value.trim();
    const tampil = function (t, j) { info.textContent = t; info.className = "form-info " + j; };
    if (!file) return tampil("Pilih foto bukti transfer terlebih dahulu.", "error");
    if (file.size > 10 * 1024 * 1024) return tampil("Ukuran file maksimal 10 MB.", "error");

    btn.disabled = true; btn.textContent = "Mengirim…";
    const path = pengguna.id + "/" + Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const up = await db.storage.from("bukti").upload(path, file, { contentType: file.type || undefined });
    if (up.error) { btn.disabled = false; btn.textContent = "Kirim bukti pembayaran"; return tampil("Gagal mengunggah: " + up.error.message, "error"); }
    const { error } = await db.from("pembayaran").insert({ bulan: bulan, jumlah: bulan * HARGA_BULANAN, bukti_path: path, catatan: catatan });
    btn.disabled = false; btn.textContent = "Kirim bukti pembayaran";
    if (error) return tampil("Gagal menyimpan: " + error.message, "error");
    form.reset();
    tampil("Bukti terkirim ✓ Admin akan memeriksa dan mengaktifkan langganan Anda.", "success");
    muatRiwayat();
  };

  muatRiwayat();
}

async function muatRiwayat() {
  const box = document.getElementById("riwayat");
  if (!box) return;
  const { data, error } = await db.from("pembayaran").select("*").eq("user_id", pengguna.id).order("created_at", { ascending: false });
  if (error) { box.innerHTML = '<div class="empty">Gagal memuat: ' + esc(error.message) + '</div>'; return; }
  if (!data.length) { box.innerHTML = '<div class="empty"><span class="ic">🧾</span>Belum ada pembayaran.</div>'; return; }
  box.innerHTML = data.map(function (p, i) {
    return '<div class="file" style="animation-delay:' + i * 0.04 + 's"><span class="ic">🧾</span>' +
      '<div class="txt"><b>' + p.bulan + ' bulan · ' + rupiah(p.jumlah) + '</b><small>Dikirim ' + tanggal(p.created_at) + '</small></div>' +
      pillStatus(p.status) + '</div>';
  }).join("");
}

function pillStatus(st) {
  const label = { menunggu: "⏳ Diperiksa", diterima: "✅ Diterima", ditolak: "❌ Ditolak" }[st] || st;
  return '<span class="pill ' + (st === "diterima" ? "ok" : st === "ditolak" ? "no" : "wait") + '">' + label + '</span>';
}

// ---------- 8d. ADMIN: PEMBAYARAN MASUK ----------
async function halamanPembayaran() {
  app.innerHTML =
    '<nav class="crumbs"><a href="#">🏠 Dashboard</a><span class="sep">›</span><span class="now">Pembayaran</span></nav>' +
    '<div class="page-head"><div><h1>💳 Pembayaran</h1><p>Periksa bukti transfer, lalu terima untuk mengaktifkan langganan.</p></div></div>' +
    '<div id="listBayar" class="file-list"><p class="loading">Memuat…</p></div>';

  const [bayar, anggota] = await Promise.all([
    db.from("pembayaran").select("*").order("status", { ascending: false }).order("created_at", { ascending: false }),
    db.from("anggota").select("id, nama, email"),
  ]);
  const box = document.getElementById("listBayar");
  if (!box) return;
  if (bayar.error) { box.innerHTML = '<div class="empty">Gagal memuat: ' + esc(bayar.error.message) + '<br>Pastikan <b>supabase-langganan.sql</b> sudah dijalankan.</div>'; return; }
  if (!bayar.data.length) { box.innerHTML = '<div class="empty"><span class="ic">💳</span>Belum ada pembayaran masuk.</div>'; return; }

  const orang = {};
  (anggota.data || []).forEach(function (a) { orang[a.id] = a; });
  // yang menunggu tampil paling atas
  const list = bayar.data.sort(function (a, b) { return (a.status === "menunggu" ? 0 : 1) - (b.status === "menunggu" ? 0 : 1); });

  box.innerHTML = list.map(function (p, i) {
    const a = orang[p.user_id] || { nama: "", email: "(tidak diketahui)" };
    return '<div class="file" style="animation-delay:' + i * 0.04 + 's">' +
      '<span class="avatar">' + esc((a.nama || a.email).charAt(0).toUpperCase()) + '</span>' +
      '<div class="txt"><b>' + esc(a.nama || a.email) + ' · ' + p.bulan + ' bln · ' + rupiah(p.jumlah) + '</b>' +
      '<span>' + esc(a.email) + (p.catatan ? ' — “' + esc(p.catatan) + '”' : "") + '</span>' +
      '<small>' + tanggal(p.created_at) + ' · ' + pillStatus(p.status) + '</small></div>' +
      '<div class="acts wrap">' +
        '<button class="btn btn-light btn-sm" data-lihat="' + i + '">Bukti ↗</button>' +
        (p.status === "menunggu"
          ? '<button class="btn btn-green btn-sm" data-terima="' + i + '">Terima ✓</button>' +
            '<button class="btn-icon" data-tolak="' + i + '" aria-label="Tolak">✕</button>'
          : "") +
      '</div></div>';
  }).join("");

  box.querySelectorAll("[data-lihat]").forEach(function (b) {
    b.onclick = async function () {
      const tab = window.open("", "_blank");
      const { data, error } = await db.storage.from("bukti").createSignedUrl(list[b.dataset.lihat].bukti_path, 600);
      if (error) { if (tab) tab.close(); alert("Gagal membuka bukti: " + error.message); return; }
      if (tab) tab.location.href = data.signedUrl; else location.href = data.signedUrl;
    };
  });
  box.querySelectorAll("[data-terima]").forEach(function (b) {
    b.onclick = async function () {
      const p = list[b.dataset.terima];
      if (!confirm("Terima pembayaran " + rupiah(p.jumlah) + " dan aktifkan langganan " + p.bulan + " bulan?")) return;
      b.disabled = true;
      const { error } = await db.rpc("terima_pembayaran", { p_id: p.id });
      if (error) alert("Gagal: " + error.message);
      halamanPembayaran();
    };
  });
  box.querySelectorAll("[data-tolak]").forEach(function (b) {
    b.onclick = async function () {
      const p = list[b.dataset.tolak];
      if (!confirm("Tolak pembayaran ini?")) return;
      const { error } = await db.from("pembayaran").update({ status: "ditolak", diproses_at: new Date().toISOString() }).eq("id", p.id);
      if (error) alert("Gagal: " + error.message);
      halamanPembayaran();
    };
  });
}

// ---------- 8e. ADMIN: DAFTAR ANGGOTA ----------
async function halamanAnggota() {
  app.innerHTML =
    '<nav class="crumbs"><a href="#">🏠 Dashboard</a><span class="sep">›</span><span class="now">Anggota</span></nav>' +
    '<div class="page-head"><div><h1>👥 Anggota</h1><p>Semua yang sudah mendaftar beserta status langganannya.</p></div></div>' +
    '<div class="stat-row" id="ringkas"></div>' +
    '<div id="daftarAnggota" class="file-list"><p class="loading">Memuat…</p></div>';

  const { data, error } = await db.from("anggota").select("*").order("created_at", { ascending: false });
  const box = document.getElementById("daftarAnggota");
  if (!box) return;
  if (error) { box.innerHTML = '<div class="empty">Gagal memuat: ' + esc(error.message) + '<br>Pastikan <b>supabase-langganan.sql</b> sudah dijalankan.</div>'; return; }

  const sekarang = new Date();
  const aktif = data.filter(function (a) { return a.aktif_sampai && new Date(a.aktif_sampai) > sekarang; }).length;
  document.getElementById("ringkas").innerHTML =
    '<div class="mini"><b>' + data.length + '</b><span>Anggota</span></div>' +
    '<div class="mini"><b>' + aktif + '</b><span>Premium aktif</span></div>' +
    '<div class="mini"><b>' + (data.length - aktif) + '</b><span>Gratis</span></div>';

  if (!data.length) { box.innerHTML = '<div class="empty"><span class="ic">👥</span>Belum ada anggota.</div>'; return; }
  box.innerHTML = data.map(function (a, i) {
    const on = a.aktif_sampai && new Date(a.aktif_sampai) > sekarang;
    return '<div class="file" style="animation-delay:' + i * 0.03 + 's">' +
      '<span class="avatar">' + esc((a.nama || a.email).charAt(0).toUpperCase()) + '</span>' +
      '<div class="txt"><b>' + esc(a.nama || "(tanpa nama)") + '</b><span>' + esc(a.email) + '</span>' +
      '<small>' + (on ? '<span class="pill ok">⭐ Premium s.d. ' + tanggal(a.aktif_sampai) + '</span>' : '<span class="pill">Gratis</span>') + '</small></div>' +
      '<div class="acts wrap">' +
        '<button class="btn btn-light btn-sm" data-tambah="' + i + '">+1 bulan</button>' +
        (on ? '<button class="btn-icon" data-stop="' + i + '" aria-label="Hentikan langganan">⏹</button>' : "") +
      '</div></div>';
  }).join("");

  box.querySelectorAll("[data-tambah]").forEach(function (b) {
    b.onclick = async function () {
      const a = data[b.dataset.tambah];
      if (!confirm("Tambah 1 bulan Premium untuk " + (a.nama || a.email) + "?")) return;
      const { error } = await db.rpc("tambah_langganan", { p_user: a.id, p_bulan: 1 });
      if (error) alert("Gagal: " + error.message);
      halamanAnggota();
    };
  });
  box.querySelectorAll("[data-stop]").forEach(function (b) {
    b.onclick = async function () {
      const a = data[b.dataset.stop];
      if (!confirm("Hentikan langganan " + (a.nama || a.email) + " sekarang?")) return;
      const { error } = await db.rpc("hentikan_langganan", { p_user: a.id });
      if (error) alert("Gagal: " + error.message);
      halamanAnggota();
    };
  });
}

// ---------- 9. TAMBAH FILE (ADMIN) ----------
const modal = document.getElementById("modal");
const upForm = document.getElementById("uploadForm");
const upInfo = document.getElementById("upInfo");
const upBtn = document.getElementById("upBtn");
let folderTujuan = "";
let sumber = "file";

function bukaModal(folder, nama) {
  folderTujuan = folder;
  document.getElementById("modalFolder").textContent = nama;
  upForm.reset();
  upInfo.textContent = "";
  modal.classList.add("open");
}
document.getElementById("modalClose").onclick = function () { modal.classList.remove("open"); };
modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("open"); });

document.querySelectorAll(".seg button").forEach(function (b) {
  b.onclick = function () {
    sumber = b.dataset.sumber;
    document.querySelectorAll(".seg button").forEach(function (x) { x.classList.toggle("active", x === b); });
    document.getElementById("boxFile").hidden = sumber !== "file";
    document.getElementById("boxLink").hidden = sumber !== "link";
  };
});

function tebakJenis(nama) {
  const ext = (nama.split(".").pop() || "").toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["doc", "docx", "txt", "rtf", "xls", "xlsx"].includes(ext)) return "dokumen";
  if (["ppt", "pptx", "key"].includes(ext)) return "slide";
  if (["jpg", "jpeg", "png", "gif", "webp", "heic"].includes(ext)) return "gambar";
  if (["mp4", "mov", "m4v"].includes(ext)) return "video";
  if (/youtu/.test(nama)) return "video";
  return sumber === "link" ? "web" : "dokumen";
}

upForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const judul = document.getElementById("upJudul").value.trim();
  const ket = document.getElementById("upKet").value.trim();
  let jenis = document.getElementById("upJenis").value;
  const file = document.getElementById("upFile").files[0];
  const link = document.getElementById("upLink").value.trim();

  if (!judul) return info("Judul wajib diisi.", "error");
  if (sumber === "file" && !file) return info("Pilih file terlebih dahulu.", "error");
  if (sumber === "link" && !/^https?:\/\//.test(link)) return info("Link harus diawali https://", "error");
  if (sumber === "file" && file.size > 50 * 1024 * 1024) return info("Ukuran file maksimal 50 MB.", "error");

  upBtn.disabled = true;
  upBtn.textContent = "Menyimpan…";
  const baris = { folder: folderTujuan, judul: judul, keterangan: ket };

  if (sumber === "file") {
    if (jenis === "auto") jenis = tebakJenis(file.name);
    const namaAman = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = folderTujuan + "/" + Date.now() + "-" + namaAman;
    info("Mengunggah file…", "");
    const up = await db.storage.from(BUCKET).upload(path, file, { contentType: file.type || undefined });
    if (up.error) return selesai("Gagal mengunggah: " + up.error.message, "error");
    baris.path = path;
  } else {
    if (jenis === "auto") jenis = tebakJenis(link);
    baris.url = link;
  }
  baris.jenis = jenis;

  const { error } = await db.from("files").insert(baris);
  if (error) {
    if (baris.path) await db.storage.from(BUCKET).remove([baris.path]); // batalkan file yang terlanjur naik
    return selesai("Gagal menyimpan: " + error.message, "error");
  }
  selesai("Berhasil disimpan ✓", "success");
  await hitungFile();
  setTimeout(function () { modal.classList.remove("open"); tampilkan(); }, 600);
});

function info(t, j) { upInfo.textContent = t; upInfo.className = "form-info " + j; }
function selesai(t, j) { upBtn.disabled = false; upBtn.textContent = "Simpan"; info(t, j); }

// Mencegah judul berisi kode HTML
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}
