(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle (sun button) ---------- */
  function readTheme() {
    try { return localStorage.getItem("dw-theme"); } catch (e) { return null; }
  }
  function saveTheme(value) {
    try { localStorage.setItem("dw-theme", value); } catch (e) { /* storage unavailable */ }
  }
  function applyTheme(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      var dark = theme === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    });
  }

  applyTheme(readTheme());

  document.querySelectorAll(".theme-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
    });
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Work page filters ---------- */
  var filterButtons = document.querySelectorAll("[data-filter]");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-filter");
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      document.querySelectorAll(".card[data-category]").forEach(function (card) {
        var show = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = form.querySelector(".form-status");
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();
      if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Please fill in your name, a valid email and a message.";
        return;
      }
      status.textContent = "Thanks, " + name + "! Your message is ready to send.";
      form.reset();
    });
  }

  /* ---------- Copy email button ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        done();
      }
    });
  });
})();
