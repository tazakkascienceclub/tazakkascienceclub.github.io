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
    nama: "Belajar", ikon: "📚", warna: "#14a37f",
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
    nama: "Ujian", ikon: "📝", warna: "#dc2626",
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

  // Admin atau santri?
  const cek = await db.rpc("is_admin");
  isAdmin = cek.data === true;

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

function namaPengguna() {
  const meta = pengguna.user_metadata || {};
  return meta.nama || meta.name || pengguna.email.split("@")[0];
}

function isiInfoPengguna() {
  const nama = namaPengguna();
  document.querySelectorAll(".js-nama").forEach(function (el) { el.textContent = nama; });
  document.querySelectorAll(".js-avatar").forEach(function (el) { el.textContent = nama.charAt(0).toUpperCase(); });
  document.querySelectorAll(".js-role").forEach(function (el) {
    el.textContent = isAdmin ? "ADMIN" : "SANTRI";
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

  if (!node) dashboard();
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
  return '<a class="folder" href="' + href + '" style="--warna:' + (n.warna || warna) + ';animation-delay:' + i * 0.06 + 's">' +
    '<span class="ic">' + n.ikon + '</span><h3>' + n.nama + '</h3><p>' + n.deskripsi + '</p>' +
    '<span class="count">' + jumlah + ' item</span></a>';
}

// ---------- 5. DASHBOARD ----------
async function dashboard() {
  let html =
    '<div class="welcome"><h1>Assalamu\'alaikum, ' + esc(namaPengguna()) + ' 👋</h1>' +
    '<p>' + (isAdmin ? "Anda masuk sebagai <b>Admin</b>: bisa menambah dan menghapus file di setiap folder." : "Selamat datang di Portal Anggota TSTC. Pilih menu untuk mulai belajar.") + '</p></div>' +
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
