// =========================================================
// TSTC WEBSITE — HALAMAN UTAMA
// Urutan: (1) muat isi dari editor admin / terjemahan → (2) jalankan interaksi
// (email klub & kunci Supabase diatur di js/config.js)
// =========================================================

// Bagian halaman yang bisa diubah lewat editor admin
const BAGIAN_EDIT = ["home", "about", "vision", "programs", "achievements", "belajar-online", "member", "roadmap", "gallery", "contact"];
const BAHASA_AKTIF = window.BAHASA || "en";
const header = document.getElementById("header");

// ===== 1. PILIHAN BAHASA (ID / EN / AR) =====
document.querySelectorAll("[data-lang]").forEach(function (b) {
  b.classList.toggle("active", b.dataset.lang === BAHASA_AKTIF);
  b.addEventListener("click", function () {
    try { localStorage.setItem("bahasa", b.dataset.lang); } catch (e) {}
    // ?lang= juga dipakai, agar tetap berfungsi walau penyimpanan browser diblokir
    const url = new URL(location.href);
    url.searchParams.set("lang", b.dataset.lang);
    url.searchParams.delete("edit");
    location.href = url.pathname + url.search + location.hash;
  });
});

// ===== 2. MUAT ISI HALAMAN (hasil editor admin) + TERJEMAHAN =====
async function muatIsi() {
  let simpanan = {};
  if (db) {
    try {
      const hasil = await Promise.race([
        db.from("konten_halaman").select("bagian, html").eq("bahasa", BAHASA_AKTIF),
        new Promise(function (r) { setTimeout(function () { r({ data: null }); }, 2500); }),
      ]);
      (hasil.data || []).forEach(function (r) { simpanan[r.bagian] = r.html; });
    } catch (e) { /* tetap pakai isi bawaan */ }
  }

  BAGIAN_EDIT.forEach(function (id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (simpanan[id]) el.innerHTML = simpanan[id];       // isi buatan admin
    else terjemahkan(el, BAHASA_AKTIF);                  // isi bawaan + kamus
  });
  // bagian yang tidak diedit (menu, footer, dll.) selalu diterjemahkan
  ["header", "mobileMenu"].forEach(function (id) { terjemahkan(document.getElementById(id), BAHASA_AKTIF); });
  document.querySelectorAll("footer, .lightbox").forEach(function (el) { terjemahkan(el, BAHASA_AKTIF); });

  document.documentElement.classList.remove("i18n-loading");
}

// ===== 3. MENU HP / IPAD =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
menuToggle.addEventListener("click", function () {
  const buka = mobileMenu.classList.toggle("open");
  menuToggle.textContent = buka ? "✕" : "☰";
  header.classList.add("solid");
});
mobileMenu.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

// ===== 4. HEADER BERUBAH SAAT DIGULIR + TOMBOL KE ATAS =====
const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.setAttribute("aria-label", "Back to top");
toTop.textContent = "↑";
document.body.appendChild(toTop);
toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
function cekGulir() {
  header.classList.toggle("scrolled", window.scrollY > 40);
  toTop.classList.toggle("show", window.scrollY > 700);
}
window.addEventListener("scroll", cekGulir);
cekGulir();

// ===== 5. SLIDESHOW FOTO DI HOME =====
// Ganti / tambah nama foto di daftar ini sesuai keinginan
const fotoHero = ["images/foto-21.jpg", "images/foto-01.jpg", "images/foto-20.jpg", "images/foto-09.jpg"];
function jalankanSlideshow() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const slides = fotoHero.map(function (src) {
    const div = document.createElement("div");
    div.className = "hero-slide";
    div.style.backgroundImage = "url('" + src + "')";
    hero.prepend(div);
    return div;
  });
  let urutan = 0;
  slides[0].classList.add("show");
  setInterval(function () {
    slides[urutan].classList.remove("show");
    urutan = (urutan + 1) % slides.length;
    slides[urutan].classList.add("show");
  }, 5500);
}

// ===== 6. MUNCUL SAAT DIGULIR =====
function jalankanReveal() {
  const target = document.querySelectorAll(
    ".section-head, .about-photos, .about-text, .vision-card, .sub-title, .mission, .value, " +
    ".feature, .step, .tags li, .stat, .honor, .partner, .member-card, .price-card, .milestone, .gallery figure, .contact-card"
  );
  const pengamat = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        pengamat.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  target.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    pengamat.observe(el);
  });
}

// ===== 7. ANGKA PRESTASI BERHITUNG =====
function jalankanCounter() {
  const box = document.querySelector(".stats");
  if (!box) return;
  let sudah = false;
  new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || sudah) return;
    sudah = true;
    box.querySelectorAll(".stat b").forEach(function (el) {
      const target = Number(el.dataset.target || el.textContent.replace(/\D/g, "")) || 0;
      const mulai = performance.now();
      function jalan(tm) {
        const p = Math.min((tm - mulai) / 1600, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(jalan);
      }
      requestAnimationFrame(jalan);
    });
  }, { threshold: 0.3 }).observe(box);
}

// ===== 8. GALERI: FILTER + LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
let fotoTampil = [];
let current = 0;

function showPhoto(i) {
  current = (i + fotoTampil.length) % fotoTampil.length;
  lbImg.src = fotoTampil[current].src;
  lbImg.alt = lbCaption.textContent = fotoTampil[current].alt;
}

function jalankanGaleri() {
  const tombol = document.querySelectorAll(".filter");
  const fig = function () { return Array.from(document.querySelectorAll("#gallery-grid figure")); };
  tombol.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (document.body.classList.contains("mode-edit")) return;
      tombol.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      fig().forEach(function (f) {
        f.classList.toggle("hide", btn.dataset.filter !== "all" && f.dataset.cat !== btn.dataset.filter);
      });
    });
  });
  // klik foto (memakai delegasi agar foto baru dari editor ikut berfungsi)
  const grid = document.getElementById("gallery-grid");
  if (grid) grid.addEventListener("click", function (e) {
    if (document.body.classList.contains("mode-edit")) return;
    const img = e.target.closest("img");
    if (!img) return;
    fotoTampil = fig().filter(function (f) { return !f.classList.contains("hide"); }).map(function (f) { return f.querySelector("img"); });
    showPhoto(fotoTampil.indexOf(img));
    lightbox.classList.add("open");
  });
}
document.getElementById("lbClose").onclick = function () { lightbox.classList.remove("open"); };
document.getElementById("lbPrev").onclick = function () { showPhoto(current - 1); };
document.getElementById("lbNext").onclick = function () { showPhoto(current + 1); };
lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.classList.remove("open"); });
let startX = 0;
lightbox.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; });
lightbox.addEventListener("touchend", function (e) {
  const d = e.changedTouches[0].clientX - startX;
  if (d > 50) showPhoto(current - 1);
  if (d < -50) showPhoto(current + 1);
});

// ===== 9. FORMULIR KONTAK (membuka aplikasi email) =====
function jalankanKontak() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const info = document.getElementById("formInfo");
  const showInfo = function (text, type) { info.textContent = text; info.className = "form-info " + type; };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (document.body.classList.contains("mode-edit")) return;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    if (!name || !email || !message) return showInfo(t("Please fill in all fields."), "error");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showInfo(t("Please enter a valid email address."), "error");
    const subject = encodeURIComponent("Message from " + name + " (TSTC website)");
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">");
    window.location.href = "mailto:" + CLUB_EMAIL + "?subject=" + subject + "&body=" + body;
    showInfo(t("Thank you") + ", " + name + "! " + t("Your email app is opening."), "success");
    form.reset();
  });
}

// ===== 10. TOMBOL LOGIN → PORTAL JIKA SUDAH LOGIN =====
async function cekLogin() {
  if (!db) return null;
  const res = await db.auth.getSession();
  const sesi = res.data.session;
  if (sesi) {
    document.querySelectorAll(".js-login-btn").forEach(function (b) { b.textContent = t("Portal →"); b.href = "portal.html"; });
    document.querySelectorAll(".lock").forEach(function (l) { l.remove(); });
    document.querySelectorAll(".js-daftar-btn").forEach(function (b) { b.remove(); });
  }
  return sesi;
}

// ===== JALANKAN SEMUA =====
// Setiap bagian dijalankan terpisah: jika satu gagal, yang lain tetap berjalan
function coba(nama, fungsi) {
  try { return fungsi(); } catch (e) { console.error("[TSTC] " + nama + ":", e); }
}

(async function mulai() {
  try { await muatIsi(); } catch (e) { console.error("[TSTC] muatIsi:", e); }
  document.documentElement.classList.remove("i18n-loading");
  coba("slideshow", jalankanSlideshow);
  coba("reveal", jalankanReveal);
  coba("counter", jalankanCounter);
  coba("galeri", jalankanGaleri);
  coba("kontak", jalankanKontak);

  let sesi = null;
  try { sesi = await cekLogin(); } catch (e) { console.error("[TSTC] login:", e); }

  // Editor admin (js/editor.js) dijalankan setelah semua script termuat
  const jalankanEditor = function () {
    if (sesi && typeof siapkanEditor === "function") siapkanEditor(sesi);
    else if (new URLSearchParams(location.search).get("edit") === "1") {
      alert(sesi ? "Editor gagal dimuat. Muat ulang halaman ini." : "Silakan login sebagai admin terlebih dahulu.");
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", jalankanEditor);
  else jalankanEditor();
})();
