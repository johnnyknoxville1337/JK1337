(function () {
  function detectColorScheme() {
    var theme = "light";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
    if (localStorage.getItem("theme")) {
      theme = localStorage.getItem("theme");
    }
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute("data-theme");
    var next = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    detectColorScheme();
  }

  function injectToggle() {
    var nav = document.querySelector(".site-nav .trigger, .site-nav");
    if (!nav) return;
    var btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "theme-toggle");
    btn.setAttribute("aria-label", "Theme wechseln");
    btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "\u2600" : "\u263D";
    btn.addEventListener("click", function () {
      toggleTheme();
      btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "\u2600" : "\u263D";
    });
    nav.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      detectColorScheme();
      injectToggle();
    });
  } else {
    detectColorScheme();
    injectToggle();
  }

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      localStorage.removeItem("theme");
      detectColorScheme();
      var btn = document.querySelector(".theme-toggle");
      if (btn) btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "\u2600" : "\u263D";
    });
  }
})();
