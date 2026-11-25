// =========================================================
// EDITOR WEB KHUSUS ADMIN (landing page)
// Tombol ✏️ kecil di pojok kanan bawah — hanya muncul untuk admin.
// Isi yang disimpan berlaku per bahasa (Indonesia / English / العربية).
// =========================================================

// Kumpulan kotak yang isinya bisa ditambah / dihapus / dipindah
const DAFTAR_ITEM = [
  ".hero-stats", ".info-grid", ".mission-grid", ".values", ".bento", ".cycle", ".tags",
  ".stats", ".honors", ".partners", ".member-grid", ".pricing", ".price-card ul",
  ".timeline", "#gallery-grid", ".contact-info",
].join(", ");

const NAMA_BAHASA = { id: "Indonesia", en: "English", ar: "العربية" };
const KATEGORI_FOTO = ["awards", "projects", "learning"];
let editorAktif = false;
let adaPerubahan = false;

async function siapkanEditor() {
  const cek = await db.rpc("is_admin");
  if (cek.data !== true) return; // bukan admin: tidak ada apa-apa

  document.body.classList.add("ada-editor");
  const fab = document.createElement("button");
  fab.id = "ed-fab";
  fab.title = "Editor halaman (admin)";
  fab.textContent = "✏️";
  fab.onclick = function () { if (!editorAktif) mulaiEdit(); };
  document.body.appendChild(fab);
}

// ---------- MASUK MODE EDIT ----------
function mulaiEdit() {
  editorAktif = true;
  document.body.classList.add("mode-edit");
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  document.querySelectorAll("#gallery-grid figure.hide").forEach(function (f) { f.classList.remove("hide"); });

  // Panel alat
  const panel = document.createElement("div");
  panel.id = "ed-panel";
  panel.innerHTML =
    '<div class="ed-head"><b>✏️ Mode Edit</b><span>Bahasa: ' + NAMA_BAHASA[BAHASA_AKTIF] + '</span></div>' +
    '<p class="ed-help">Ketuk <b>teks</b> untuk mengubah. Ketuk <b>foto</b> untuk mengganti. ' +
    'Pakai tombol kecil di tiap kotak: ◀ ▶ pindah, ⧉ gandakan, 🗑 hapus, 🏷 kategori foto.</p>' +
    '<div class="ed-btns">' +
      '<button class="ed-save">💾 Simpan</button>' +
      '<button class="ed-cancel">✕ Batal</button>' +
      '<button class="ed-reset" title="Hapus semua perubahan untuk bahasa ini">↺ Kembalikan isi awal</button>' +
    '</div><p class="ed-status"></p>';
  document.body.appendChild(panel);
  panel.querySelector(".ed-save").onclick = simpan;
  panel.querySelector(".ed-cancel").onclick = function () {
    if (adaPerubahan && !confirm("Buang semua perubahan yang belum disimpan?")) return;
    adaPerubahan = false;
    location.reload();
  };
  panel.querySelector(".ed-reset").onclick = kembalikanAwal;

  BAGIAN_EDIT.forEach(function (id) {
    const sec = document.getElementById(id);
    if (!sec) return;
    aktifkanTeks(sec);
    sec.querySelectorAll(DAFTAR_ITEM).forEach(aktifkanDaftar);
    sec.querySelectorAll("img").forEach(function (img) {
      if (img.closest(".brand")) return;
      img.classList.add("ed-img");
    });
  });

  document.addEventListener("input", tandaiBerubah, true);
  document.addEventListener("click", cegahKlik, true);
  window.addEventListener("beforeunload", function (e) {
    if (adaPerubahan) { e.preventDefault(); e.returnValue = ""; }
  });
}

function tandaiBerubah(e) {
  if (e.target.closest && e.target.closest("[contenteditable]")) adaPerubahan = true;
}

// Saat mode edit: link & tombol halaman tidak berpindah, foto bisa diganti
function cegahKlik(e) {
  if (!editorAktif) return;
  const el = e.target;
  if (el.closest("#ed-panel, #ed-fab, .ed-tools, .ed-add")) return;
  const sec = el.closest(BAGIAN_EDIT.map(function (id) { return "#" + id; }).join(","));
  if (!sec) return;
  if (el.classList.contains("ed-img")) { e.preventDefault(); e.stopPropagation(); gantiFoto(el); return; }
  if (el.closest("a, button")) e.preventDefault();
}

// Elemen yang berisi teks langsung → bisa diketik
function aktifkanTeks(akar) {
  const pilih = "h1, h2, h3, h4, p, li, span, b, strong, small, label, a, div, td, th, blockquote";
  const semua = Array.from(akar.querySelectorAll(pilih));
  if (akar.matches && akar.matches(pilih)) semua.unshift(akar);
  semua.forEach(function (el) {
    if (el.closest("[contenteditable], .ed-tools, .ed-add, button, .hero-slide, select")) return;
    const punyaTeks = Array.from(el.childNodes).some(function (n) { return n.nodeType === 3 && n.nodeValue.trim(); });
    if (!punyaTeks) return;
    el.setAttribute("contenteditable", "true");
    el.setAttribute("spellcheck", "false");
  });
}

// ---------- TAMBAH / HAPUS / PINDAH ITEM ----------
function aktifkanDaftar(wadah) {
  if (wadah.dataset.edSiap) return;
  wadah.dataset.edSiap = "1";
  const item = itemDari(wadah);
  if (item.length) wadah._contoh = bersihkan(item[0].cloneNode(true)); // cadangan jika semua dihapus
  item.forEach(pasangAlat);

  const add = document.createElement("button");
  add.className = "ed-add";
  add.type = "button";
  add.textContent = "＋ Tambah";
  add.onclick = function () {
    const daftar = itemDari(wadah);
    const sumber = daftar.length ? daftar[daftar.length - 1] : null;
    const baru = sumber ? bersihkan(sumber.cloneNode(true)) : (wadah._contoh ? wadah._contoh.cloneNode(true) : null);
    if (!baru) return;
    wadah.appendChild(baru);
    siapkanItemBaru(baru);
    baru.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  wadah.insertAdjacentElement("afterend", add);
}

function itemDari(wadah) {
  return Array.from(wadah.children).filter(function (c) {
    return !c.classList.contains("ed-add") && !c.classList.contains("ed-tools") && c.tagName !== "H2" && !c.classList.contains("kicker") && !c.classList.contains("section-lead") && !c.classList.contains("section-title");
  });
}

function siapkanItemBaru(el) {
  aktifkanTeks(el);
  el.querySelectorAll("img").forEach(function (img) { img.classList.add("ed-img"); });
  if (el.tagName === "IMG") el.classList.add("ed-img");
  el.querySelectorAll(DAFTAR_ITEM).forEach(function (w) { delete w.dataset.edSiap; aktifkanDaftar(w); });
  pasangAlat(el);
  adaPerubahan = true;
}

function pasangAlat(el) {
  el.classList.add("ed-item");
  const alat = document.createElement("div");
  alat.className = "ed-tools";
  alat.setAttribute("contenteditable", "false");
  let html =
    '<button type="button" data-a="kiri" title="Pindah ke depan">◀</button>' +
    '<button type="button" data-a="kanan" title="Pindah ke belakang">▶</button>' +
    '<button type="button" data-a="gandakan" title="Gandakan">⧉</button>' +
    '<button type="button" data-a="hapus" title="Hapus">🗑</button>';
  if (el.tagName === "FIGURE") html += '<button type="button" data-a="kategori" title="Kategori foto">🏷</button>';
  alat.innerHTML = html;
  alat.addEventListener("click", function (e) {
    const b = e.target.closest("button");
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    const a = b.dataset.a;
    if (a === "hapus") {
      if (confirm("Hapus kotak ini?")) { el.remove(); adaPerubahan = true; }
    } else if (a === "gandakan") {
      const baru = bersihkan(el.cloneNode(true));
      el.insertAdjacentElement("afterend", baru);
      siapkanItemBaru(baru);
    } else if (a === "kiri" && el.previousElementSibling) {
      el.parentNode.insertBefore(el, el.previousElementSibling); adaPerubahan = true;
    } else if (a === "kanan" && el.nextElementSibling && !el.nextElementSibling.classList.contains("ed-add")) {
      el.parentNode.insertBefore(el.nextElementSibling, el); adaPerubahan = true;
    } else if (a === "kategori") {
      const i = KATEGORI_FOTO.indexOf(el.dataset.cat);
      el.dataset.cat = KATEGORI_FOTO[(i + 1) % KATEGORI_FOTO.length];
      adaPerubahan = true;
    }
  });
  el.appendChild(alat);
}

// ---------- GANTI FOTO ----------
function gantiFoto(img) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.onchange = async function () {
    const file = input.files[0];
    if (!file) return;
    status("Mengunggah foto…");
    try {
      const blob = await kecilkanFoto(file, 1600);
      const path = "halaman/" + Date.now() + ".jpg";
      const up = await db.storage.from("publik").upload(path, blob, { contentType: "image/jpeg" });
      if (up.error) throw up.error;
      const url = db.storage.from("publik").getPublicUrl(path).data.publicUrl;
      img.src = url;
      img.removeAttribute("srcset");
      adaPerubahan = true;
      status("Foto diganti ✓ (jangan lupa Simpan)");
    } catch (err) {
      status("Gagal mengunggah: " + (err.message || err), true);
    }
  };
  input.click();
}

// Perkecil foto agar website tetap ringan
function kecilkanFoto(file, maks) {
  return new Promise(function (resolve, reject) {
    const url = URL.createObjectURL(file);
    const im = new Image();
    im.onload = function () {
      const skala = Math.min(1, maks / Math.max(im.width, im.height));
      const c = document.createElement("canvas");
      c.width = Math.round(im.width * skala);
      c.height = Math.round(im.height * skala);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(function (b) { b ? resolve(b) : reject(new Error("Foto tidak bisa diproses")); }, "image/jpeg", 0.82);
    };
    im.onerror = function () { reject(new Error("Format foto tidak didukung")); };
    im.src = url;
  });
}

// ---------- SIMPAN ----------
function bersihkan(el) {
  el.querySelectorAll(".ed-tools, .ed-add, .hero-slide").forEach(function (x) { x.remove(); });
  const semua = [el].concat(Array.from(el.querySelectorAll("*")));
  semua.forEach(function (x) {
    x.removeAttribute("contenteditable");
    x.removeAttribute("spellcheck");
    x.removeAttribute("data-ed-siap");
    x.classList.remove("ed-item", "ed-img", "reveal", "visible", "hide");
    if (x.style) x.style.transitionDelay = "";
    if (x.getAttribute("style") === "") x.removeAttribute("style");
    if (x.getAttribute("class") === "") x.removeAttribute("class");
  });
  return el;
}

async function simpan() {
  status("Menyimpan…");
  const baris = BAGIAN_EDIT.map(function (id) {
    const sec = document.getElementById(id);
    if (!sec) return null;
    // angka prestasi: simpan angka yang diketik sebagai target hitungan
    sec.querySelectorAll(".stat b").forEach(function (b) {
      b.dataset.target = parseInt(b.textContent.replace(/\D/g, ""), 10) || 0;
    });
    const salinan = bersihkan(sec.cloneNode(true));
    return { bagian: id, bahasa: BAHASA_AKTIF, html: salinan.innerHTML.trim(), updated_at: new Date().toISOString() };
  }).filter(Boolean);

  const { error } = await db.from("konten_halaman").upsert(baris, { onConflict: "bagian,bahasa" });
  if (error) return status("Gagal menyimpan: " + error.message, true);
  adaPerubahan = false;
  status("Tersimpan ✓ untuk bahasa " + NAMA_BAHASA[BAHASA_AKTIF]);
  setTimeout(function () { location.reload(); }, 900);
}

async function kembalikanAwal() {
  if (!confirm("Hapus semua perubahan editor untuk bahasa " + NAMA_BAHASA[BAHASA_AKTIF] + " dan kembali ke isi awal?")) return;
  const { error } = await db.from("konten_halaman").delete().eq("bahasa", BAHASA_AKTIF);
  if (error) return status("Gagal: " + error.message, true);
  adaPerubahan = false;
  location.reload();
}

function status(teks, salah) {
  const el = document.querySelector("#ed-panel .ed-status");
  if (!el) return;
  el.textContent = teks;
  el.classList.toggle("err", !!salah);
}
