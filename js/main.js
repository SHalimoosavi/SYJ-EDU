/**
 * SYJ EDUCATE — shared site behavior
 * Theme toggle (persisted), mobile nav, terminal build-log animation,
 * active-nav marking, and small progressive enhancements.
 * No dependencies. Safe to load on every page.
 */
(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var THEME_KEY = "syj-theme";
  var root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    var toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    });
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* ignore */ }
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(stored || (prefersLight ? "light" : "dark"));

    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isLight = root.getAttribute("data-theme") === "light";
        var next = isLight ? "dark" : "light";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      });
    });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Mark current nav link ---------- */
  function markActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Footer year ---------- */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Terminal build-log animation (hero signature element) ---------- */
  var BUILD_LOG = [
    { t: "cmd", text: "$ syj deploy learning-track --track=ai-engineering" },
    { t: "muted", text: "Resolving dependencies..." },
    { t: "add", text: "+ 12 lessons, 6 projects, 3 assessments" },
    { t: "add", text: "+ FastAPI reference service scaffolded" },
    { t: "rem", text: "- removed deprecated tutorial (v1 OSINT lab)" },
    { t: "cmd", text: "$ git commit -m \"ship: production RAG pipeline\"" },
    { t: "muted", text: "1 file changed, 240 insertions(+), 12 deletions(-)" },
    { t: "add", text: "build passed · deployed to learners worldwide" }
  ];

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function typeTerminal(el) {
    if (!el) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.innerHTML = BUILD_LOG.map(function (l) {
        return '<div class="line ' + l.t + '">' + escapeHtml(l.text) + "</div>";
      }).join("");
      return;
    }

    var lineIndex = 0, charIndex = 0;
    el.innerHTML = "";

    function step() {
      if (lineIndex >= BUILD_LOG.length) {
        setTimeout(function () {
          el.innerHTML = "";
          lineIndex = 0;
          charIndex = 0;
          step();
        }, 2600);
        return;
      }
      var current = BUILD_LOG[lineIndex];
      var lineEl = el.querySelector(".line.current");
      if (!lineEl) {
        lineEl = document.createElement("div");
        lineEl.className = "line current " + current.t;
        el.appendChild(lineEl);
      }
      charIndex++;
      lineEl.textContent = current.text.slice(0, charIndex);
      if (charIndex >= current.text.length) {
        lineEl.classList.remove("current");
        var caret = document.createElement("span");
        caret.className = "caret";
        el.appendChild(caret);
        setTimeout(function () {
          caret.remove();
          lineIndex++;
          charIndex = 0;
          step();
        }, 420);
      } else {
        setTimeout(step, 18 + Math.random() * 22);
      }
    }
    step();
  }

  /* ---------- Animated stat counters ---------- */
  function initCounters() {
    var stats = document.querySelectorAll("[data-count]");
    if (!stats.length) return;
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function animate(el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (reduced) { el.textContent = target.toLocaleString(); return; }
      var duration = 900, startTime = null;
      function frame(ts) {
        if (!startTime) startTime = ts;
        var progress = Math.min((ts - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(frame);
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      stats.forEach(function (el) { observer.observe(el); });
    } else {
      stats.forEach(animate);
    }
  }

  /* ---------- Static form stub (no backend yet) ---------- */
  function initForms() {
    document.querySelectorAll("form[data-static-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector("[data-form-status]");
        if (note) {
          note.textContent = "Thanks — this form isn't wired to a backend yet. Reach us via GitHub Discussions in the meantime.";
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    initNav();
    markActiveNav();
    setYear();
    typeTerminal(document.querySelector("[data-terminal]"));
    initCounters();
    initForms();
  });
})();
