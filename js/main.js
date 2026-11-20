// =========================================================
// TSTC WEBSITE - INTERAKSI
// =========================================================

// ===== 1. MENU DI HP / IPAD (buka-tutup) =====
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("open");
});

// Tutup menu setelah salah satu link disentuh
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

// ===== 2. ANGKA PRESTASI "BERHITUNG" NAIK =====
// Berjalan sekali, saat bagian Achievements terlihat di layar
const counters = document.querySelectorAll(".stat b");
let counted = false;

function runCounters() {
  counters.forEach(function (el) {
    const target = Number(el.dataset.target);
    let now = 0;
    const step = Math.max(1, Math.ceil(target / 60)); // ±60 langkah
    const timer = setInterval(function () {
      now += step;
      if (now >= target) { now = target; clearInterval(timer); }
      el.textContent = now;
    }, 25);
  });
}

const statsBox = document.querySelector(".stats");
if ("IntersectionObserver" in window) {
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      runCounters();
    }
  }, { threshold: 0.3 }).observe(statsBox);
} else {
  runCounters(); // browser lama: langsung tampilkan
}

// ===== 3. FILTER GALERI =====
const filterButtons = document.querySelectorAll(".filter");
const photos = document.querySelectorAll("#gallery-grid img");

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // pindahkan tanda "active" ke tombol yang disentuh
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    const pilihan = btn.dataset.filter;
    photos.forEach(function (img) {
      const cocok = pilihan === "all" || img.dataset.cat === pilihan;
      img.classList.toggle("hide", !cocok);
    });
  });
});

// ===== 4. LIGHTBOX (foto besar) =====
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCaption = document.getElementById("lbCaption");
let current = 0;

// hanya foto yang sedang tampil (sesuai filter)
function visiblePhotos() {
  return Array.from(photos).filter(function (img) { return !img.classList.contains("hide"); });
}

function showPhoto(index) {
  const list = visiblePhotos();
  current = (index + list.length) % list.length; // berputar dari akhir ke awal
  lbImg.src = list[current].src;
  lbImg.alt = list[current].alt;
  lbCaption.textContent = list[current].alt;
}

photos.forEach(function (img) {
  img.addEventListener("click", function () {
    showPhoto(visiblePhotos().indexOf(img));
    lightbox.classList.add("open");
  });
});

document.getElementById("lbClose").addEventListener("click", function () { lightbox.classList.remove("open"); });
document.getElementById("lbPrev").addEventListener("click", function () { showPhoto(current - 1); });
document.getElementById("lbNext").addEventListener("click", function () { showPhoto(current + 1); });

// sentuh area gelap di luar foto untuk menutup
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

// geser (swipe) kiri/kanan di iPad / HP
let startX = 0;
lightbox.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; });
lightbox.addEventListener("touchend", function (e) {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) showPhoto(current - 1);
  if (diff < -50) showPhoto(current + 1);
});

// ===== 5. VALIDASI FORMULIR KONTAK =====
// ⚠️ GANTI alamat email di bawah ini dengan email klub Anda
const CLUB_EMAIL = "email-klub@gmail.com";

const form = document.getElementById("contactForm");
const info = document.getElementById("formInfo");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // jangan muat ulang halaman

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    showInfo("Please fill in all fields.", "error");
  } else if (!emailPattern.test(email)) {
    showInfo("Please enter a valid email address.", "error");
  } else {
    // Membuka aplikasi email pengunjung, sudah terisi pesan, ditujukan ke CLUB_EMAIL
    const subject = encodeURIComponent("Message from " + name + " (TSTC website)");
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">");
    window.location.href = "mailto:" + CLUB_EMAIL + "?subject=" + subject + "&body=" + body;
    showInfo("Thank you, " + name + "! Your email app is opening to send the message.", "success");
    form.reset();
  }
});

function showInfo(text, type) {
  info.textContent = text;
  info.className = "form-info " + type;
}
