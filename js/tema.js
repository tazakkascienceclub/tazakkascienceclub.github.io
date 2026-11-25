// =========================================================
// TEMA GELAP/TERANG + BAHASA (dimuat paling awal di <head>)
// =========================================================
(function () {
  var html = document.documentElement;

  // ----- Tema -----
  var tema = null;
  try { tema = localStorage.getItem("tema"); } catch (e) {}
  if (!tema) tema = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  html.setAttribute("data-theme", tema);

  function ikonTema() {
    var gelap = html.getAttribute("data-theme") === "dark";
    document.querySelectorAll(".js-theme-btn").forEach(function (b) {
      b.textContent = gelap ? "☀️" : "🌙";
      b.title = gelap ? "Tema terang" : "Tema gelap";
    });
  }

  window.gantiTema = function () {
    var baru = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", baru);
    try { localStorage.setItem("tema", baru); } catch (e) {}
    ikonTema();
  };

  // ----- Bahasa (hanya untuk halaman yang punya atribut data-i18n) -----
  if (html.hasAttribute("data-i18n")) {
    var bahasa = null;
    try { bahasa = localStorage.getItem("bahasa"); } catch (e) {}
    if (!bahasa) {
      var nav = (navigator.language || "en").slice(0, 2);
      bahasa = nav === "id" || nav === "ar" ? nav : "en";
    }
    window.BAHASA = bahasa;
    html.lang = bahasa;
    html.dir = bahasa === "ar" ? "rtl" : "ltr";
    // sembunyikan sebentar agar tidak berkedip saat diterjemahkan
    html.classList.add("i18n-loading");
    setTimeout(function () { html.classList.remove("i18n-loading"); }, 3000);
  }

  document.addEventListener("DOMContentLoaded", function () {
    ikonTema();
    document.querySelectorAll(".js-theme-btn").forEach(function (b) {
      b.addEventListener("click", window.gantiTema);
    });
  });
})();
