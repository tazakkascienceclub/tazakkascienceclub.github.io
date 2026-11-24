// =========================================================
// HALAMAN BELAJAR - FOLDER MATA PELAJARAN
// =========================================================
//
// CARA MENAMBAH ISI:
// Cari mata pelajarannya di bawah, lalu tambahkan satu baris di
// dalam kurung [ ] pada bagian "materi" atau "aplikasi", contoh:
//
//   { judul: "Bab 1 - Eksponen", keterangan: "Ringkasan + contoh soal", link: "belajar/matematika/materi/bab1-eksponen.pdf", jenis: "pdf" },
//
// - judul      : nama yang tampil
// - keterangan : penjelasan singkat (boleh dikosongkan: "")
// - link       : alamat file di GitHub (folder belajar/...) ATAU alamat web
//                (Google Drive, YouTube, dll.)
// - jenis      : "pdf", "video", "dokumen", "slide", atau "web" (mengatur ikon)
//
// Jangan lupa tanda koma ( , ) di akhir setiap baris.
// =========================================================

const DATA_BELAJAR = {

  matematika: {
    nama: "Matematika",
    ikon: "📐",
    warna: "#0b5d4b",
    deskripsi: "Aljabar, geometri, kalkulus, dan statistika",
    materi: [
      // contoh: { judul: "Bab 1 - Eksponen", keterangan: "Ringkasan materi", link: "belajar/matematika/materi/bab1.pdf", jenis: "pdf" },
    ],
    aplikasi: [
      { judul: "GeoGebra Classic", keterangan: "Menggambar grafik, geometri, dan aljabar secara interaktif", link: "https://www.geogebra.org/classic", jenis: "web" },
      { judul: "Desmos Graphing Calculator", keterangan: "Kalkulator grafik online yang mudah dipakai", link: "https://www.desmos.com/calculator", jenis: "web" },
    ],
  },

  fisika: {
    nama: "Fisika",
    ikon: "⚛️",
    warna: "#1d4ed8",
    deskripsi: "Gerak, gaya, energi, listrik, dan gelombang",
    materi: [
    ],
    aplikasi: [
      { judul: "PhET Simulasi Fisika", keterangan: "Simulasi interaktif gratis dari University of Colorado", link: "https://phet.colorado.edu/en/simulations/filter?subjects=physics", jenis: "web" },
      { judul: "The Physics Classroom", keterangan: "Penjelasan konsep fisika dan latihan interaktif", link: "https://www.physicsclassroom.com", jenis: "web" },
    ],
  },

  kimia: {
    nama: "Kimia",
    ikon: "⚗️",
    warna: "#b45309",
    deskripsi: "Struktur atom, ikatan, reaksi, dan larutan",
    materi: [
    ],
    aplikasi: [
      { judul: "PhET Simulasi Kimia", keterangan: "Simulasi atom, molekul, dan reaksi kimia", link: "https://phet.colorado.edu/en/simulations/filter?subjects=chemistry", jenis: "web" },
      { judul: "Ptable", keterangan: "Tabel periodik interaktif", link: "https://ptable.com", jenis: "web" },
      { judul: "MolView", keterangan: "Melihat bentuk molekul dalam 3D", link: "https://molview.org", jenis: "web" },
    ],
  },

  biologi: {
    nama: "Biologi",
    ikon: "🧬",
    warna: "#15803d",
    deskripsi: "Sel, genetika, ekologi, dan sistem tubuh",
    materi: [
    ],
    aplikasi: [
      { judul: "PhET Simulasi Biologi", keterangan: "Simulasi seleksi alam, gen, dan sel saraf", link: "https://phet.colorado.edu/en/simulations/filter?subjects=biology", jenis: "web" },
      { judul: "Learn.Genetics", keterangan: "Belajar genetika dan sel dengan animasi interaktif", link: "https://learn.genetics.utah.edu", jenis: "web" },
    ],
  },
};

// Dua folder di dalam setiap mata pelajaran
const SUBFOLDER = {
  materi:   { nama: "Materi",   ikon: "📖", deskripsi: "Ringkasan, modul, dan bahan bacaan" },
  aplikasi: { nama: "Aplikasi", ikon: "💻", deskripsi: "Aplikasi dan simulasi untuk praktik" },
};

// Ikon untuk tiap jenis file
const IKON_JENIS = { pdf: "📄", video: "🎬", dokumen: "📝", slide: "📊", web: "🌐" };

// =========================================================
// BAGIAN DI BAWAH INI TIDAK PERLU DIUBAH
// =========================================================

const isiFolder = document.getElementById("isiFolder");
const breadcrumb = document.getElementById("breadcrumb");

// Membaca lokasi folder dari alamat, contoh: belajar.html#matematika/materi
function tampilkan() {
  const bagian = location.hash.replace("#", "").split("/").filter(Boolean);
  const mapel = DATA_BELAJAR[bagian[0]];
  const sub = mapel ? SUBFOLDER[bagian[1]] : null;

  if (!mapel) {
    halamanUtama();
  } else if (!sub) {
    halamanMapel(bagian[0], mapel);
  } else {
    halamanIsi(bagian[0], mapel, bagian[1], sub);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Tingkat 1: folder Belajar -> daftar mata pelajaran
function halamanUtama() {
  buatBreadcrumb([{ nama: "📁 Belajar" }]);
  let html = '<div class="folder-grid">';
  Object.keys(DATA_BELAJAR).forEach(function (kunci, i) {
    const m = DATA_BELAJAR[kunci];
    const total = m.materi.length + m.aplikasi.length;
    html +=
      '<a class="folder" href="#' + kunci + '" style="--warna:' + m.warna + '; animation-delay:' + i * 0.08 + 's">' +
        '<span class="ikon">' + m.ikon + '</span>' +
        '<h3>' + m.nama + '</h3>' +
        '<p>' + m.deskripsi + '</p>' +
        '<span class="jumlah">' + total + ' item</span>' +
      '</a>';
  });
  isiFolder.innerHTML = html + '</div>';
}

// Tingkat 2: folder mata pelajaran -> Materi & Aplikasi
function halamanMapel(kunci, m) {
  buatBreadcrumb([{ nama: "📁 Belajar", link: "#" }, { nama: m.nama }]);
  let html = '<a class="tombol-kembali" href="#">← Kembali</a><div class="folder-grid">';
  Object.keys(SUBFOLDER).forEach(function (s, i) {
    const f = SUBFOLDER[s];
    html +=
      '<a class="folder" href="#' + kunci + '/' + s + '" style="--warna:' + m.warna + '; animation-delay:' + i * 0.08 + 's">' +
        '<span class="ikon">' + f.ikon + '</span>' +
        '<h3>' + f.nama + '</h3>' +
        '<p>' + f.deskripsi + '</p>' +
        '<span class="jumlah">' + m[s].length + ' item</span>' +
      '</a>';
  });
  isiFolder.innerHTML = html + '</div>';
}

// Tingkat 3: isi folder Materi / Aplikasi -> daftar file & link
function halamanIsi(kunci, m, s, f) {
  buatBreadcrumb([
    { nama: "📁 Belajar", link: "#" },
    { nama: m.nama, link: "#" + kunci },
    { nama: f.nama },
  ]);
  const daftar = m[s];
  let html = '<a class="tombol-kembali" href="#' + kunci + '">← Kembali ke ' + m.nama + '</a>';

  if (daftar.length === 0) {
    html +=
      '<div class="kosong"><span class="ikon">🗂️</span>' +
      '<strong>Folder ini masih kosong.</strong><br>' + f.nama + ' ' + m.nama + ' akan segera ditambahkan.</div>';
  } else {
    html += '<div class="file-list">';
    daftar.forEach(function (item, i) {
      html +=
        '<a class="file" href="' + item.link + '" target="_blank" rel="noopener" style="--warna:' + m.warna + '; animation-delay:' + i * 0.06 + 's">' +
          '<span class="ikon">' + (IKON_JENIS[item.jenis] || "📄") + '</span>' +
          '<span class="teks"><strong>' + item.judul + '</strong><span>' + (item.keterangan || "") + '</span></span>' +
          '<span class="buka">Buka ↗</span>' +
        '</a>';
    });
    html += '</div>';
  }
  isiFolder.innerHTML = html;
}

// Membuat jejak folder: Belajar › Matematika › Materi
function buatBreadcrumb(list) {
  breadcrumb.innerHTML = list.map(function (b) {
    return b.link !== undefined
      ? '<a href="' + b.link + '">' + b.nama + '</a>'
      : '<span class="now">' + b.nama + '</span>';
  }).join('<span class="sep">›</span>');
}

// Jalankan saat halaman dibuka dan setiap kali folder berganti
window.addEventListener("hashchange", tampilkan);
tampilkan();

// Menu di HP / iPad (buka-tutup)
document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("nav").classList.toggle("open");
});
