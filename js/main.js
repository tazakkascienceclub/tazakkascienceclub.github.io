// =========================================================
// TSTC WEBSITE — INTERAKSI HALAMAN UTAMA
// (email klub & kunci Supabase diatur di js/config.js)
// =========================================================

// ===== 1. MENU HP / IPAD =====
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

// ===== 2. HEADER BERUBAH SAAT DIGULIR + TOMBOL KE ATAS =====
const header = document.getElementById("header");
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

// ===== 3. SLIDESHOW FOTO DI HOME =====
// Ganti / tambah nama foto di daftar ini sesuai keinginan
const fotoHero = ["images/foto-21.jpg", "images/foto-01.jpg", "images/foto-20.jpg", "images/foto-09.jpg"];
const hero = document.querySelector(".hero");
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

// ===== 4. MUNCUL SAAT DIGULIR =====
const targetMuncul = document.querySelectorAll(
  ".section-head, .about-photos, .about-text, .vision-card, .sub-title, .mission, .value, " +
  ".feature, .step, .tags li, .stat, .honor, .partner, .member-card, .milestone, .gallery img, .contact-card"
);
targetMuncul.forEach(function (el, i) {
  el.classList.add("reveal");
  el.style.transitionDelay = (i % 4) * 0.08 + "s";
});

const pengamat = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      pengamat.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
targetMuncul.forEach(function (el) { pengamat.observe(el); });

// ===== 5. ANGKA PRESTASI BERHITUNG =====
const counters = document.querySelectorAll(".stat b");
let sudahHitung = false;
new IntersectionObserver(function (entries) {
  if (!entries[0].isIntersecting || sudahHitung) return;
  sudahHitung = true;
  counters.forEach(function (el) {
    const target = Number(el.dataset.target);
    const mulai = performance.now();
    function jalan(t) {
      const p = Math.min((t - mulai) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); // melambat di akhir
      if (p < 1) requestAnimationFrame(jalan);
    }
    requestAnimationFrame(jalan);
  });
}, { threshold: 0.3 }).observe(document.querySelector(".stats"));

// ===== 6. FILTER GALERI =====
const filterButtons = document.querySelectorAll(".filter");
const photos = document.querySelectorAll("#gallery-grid img");
filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    photos.forEach(function (img) {
      const cocok = btn.dataset.filter === "all" || img.dataset.cat === btn.dataset.filter;
      img.classList.toggle("hide", !cocok);
    });
  });
});

// ===== 7. LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
let current = 0;
function visiblePhotos() {
  return Array.from(photos).filter(function (img) { return !img.classList.contains("hide"); });
}
function showPhoto(i) {
  const list = visiblePhotos();
  current = (i + list.length) % list.length;
  lbImg.src = list[current].src;
  lbImg.alt = lbCaption.textContent = list[current].alt;
}
photos.forEach(function (img) {
  img.addEventListener("click", function () {
    showPhoto(visiblePhotos().indexOf(img));
    lightbox.classList.add("open");
  });
});
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

// ===== 8. FORMULIR KONTAK (membuka aplikasi email) =====
const form = document.getElementById("contactForm");
const info = document.getElementById("formInfo");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) return showInfo("Please fill in all fields.", "error");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showInfo("Please enter a valid email address.", "error");
  const subject = encodeURIComponent("Message from " + name + " (TSTC website)");
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">");
  window.location.href = "mailto:" + CLUB_EMAIL + "?subject=" + subject + "&body=" + body;
  showInfo("Thank you, " + name + "! Your email app is opening.", "success");
  form.reset();
});
function showInfo(text, type) { info.textContent = text; info.className = "form-info " + type; }

// ===== 9. TOMBOL LOGIN BERUBAH JADI "PORTAL" JIKA SUDAH LOGIN =====
if (db) {
  db.auth.getSession().then(function (res) {
    if (res.data.session) {
      document.querySelectorAll(".js-login-btn").forEach(function (b) {
        b.textContent = "Portal →";
        b.href = "portal.html";
      });
      document.querySelectorAll(".lock, .badge-lock").forEach(function (l) { l.remove(); });
    }
  });
}
