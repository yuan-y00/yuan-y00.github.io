(function () {
  var root = document.documentElement;
  var themeKey = "yuan-portfolio-theme";
  var fontKey = "yuan-portfolio-font";
  var savedTheme = window.localStorage.getItem(themeKey);
  var savedFont = window.localStorage.getItem(fontKey);

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }

  if (savedFont === "serif" || savedFont === "sans") {
    root.dataset.font = savedFont;
  }

  var themeButton = document.querySelector("[data-theme-toggle]");
  var fontButton = document.querySelector("[data-font-toggle]");

  function syncThemeButton() {
    if (!themeButton) return;
    themeButton.textContent = root.dataset.theme === "dark" ? "☼" : "◐";
  }

  function syncFontButton() {
    if (!fontButton) return;
    fontButton.textContent = root.dataset.font === "serif" ? "Aa SERIF" : "Aa SANS";
  }

  syncThemeButton();
  syncFontButton();

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      window.localStorage.setItem(themeKey, nextTheme);
      syncThemeButton();
    });
  }

  if (fontButton) {
    fontButton.addEventListener("click", function () {
      var nextFont = root.dataset.font === "serif" ? "sans" : "serif";
      root.dataset.font = nextFont;
      window.localStorage.setItem(fontKey, nextFont);
      syncFontButton();
    });
  }

  var filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  var projectCards = Array.from(document.querySelectorAll("[data-categories]"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter || "all";
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      projectCards.forEach(function (card) {
        var categories = card.dataset.categories || "";
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var cursorDot = document.querySelector(".cursor-dot");
  var cursorRing = document.querySelector(".cursor-ring");

  if (finePointer && !reduceMotion && cursorDot && cursorRing) {
    document.body.classList.add("has-pointer");
    root.classList.add("has-custom-cursor");

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var dotX = targetX;
    var dotY = targetY;
    var ringX = targetX;
    var ringY = targetY;

    function renderCursor() {
      dotX += (targetX - dotX) * 0.65;
      dotY += (targetY - dotY) * 0.65;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      root.style.setProperty("--mouse-x", targetX + "px");
      root.style.setProperty("--mouse-y", targetY + "px");
      cursorDot.style.transform = "translate(" + dotX + "px, " + dotY + "px) translate(-50%, -50%)";
      cursorRing.style.transform = "translate(" + ringX + "px, " + ringY + "px) translate(-50%, -50%)";
      window.requestAnimationFrame(renderCursor);
    }

    window.addEventListener("pointermove", function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    document.querySelectorAll("a, button, [data-cursor-label], [data-tilt]").forEach(function (item) {
      item.addEventListener("pointerenter", function () {
        document.body.classList.add("cursor-active");
        cursorRing.dataset.label = item.dataset.cursorLabel || "";
      });
      item.addEventListener("pointerleave", function () {
        document.body.classList.remove("cursor-active");
        cursorRing.dataset.label = "";
      });
    });

    window.requestAnimationFrame(renderCursor);
  }

  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-y * 3.5).toFixed(2) +
          "deg) rotateY(" +
          (x * 4.5).toFixed(2) +
          "deg)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

  document.querySelectorAll("[data-live-loop]").forEach(function (board) {
    var handle = board.querySelector(".loop-handle");
    var dragging = false;

    function moveHandle(event) {
      var rect = board.getBoundingClientRect();
      var x = Math.max(8, Math.min(92, ((event.clientX - rect.left) / rect.width) * 100));
      var y = Math.max(12, Math.min(88, ((event.clientY - rect.top) / rect.height) * 100));
      board.style.setProperty("--handle-x", x.toFixed(1) + "%");
      board.style.setProperty("--handle-y", y.toFixed(1) + "%");
    }

    if (!handle) return;

    handle.addEventListener("pointerdown", function (event) {
      dragging = true;
      handle.setPointerCapture(event.pointerId);
      moveHandle(event);
    });

    handle.addEventListener("pointermove", function (event) {
      if (dragging) moveHandle(event);
    });

    handle.addEventListener("pointerup", function (event) {
      dragging = false;
      handle.releasePointerCapture(event.pointerId);
    });

    handle.addEventListener("pointercancel", function () {
      dragging = false;
    });

    board.addEventListener("pointermove", function (event) {
      if (dragging) moveHandle(event);
    });
  });

  var revealItems = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduceMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("visible");
    });
  }

  var lightbox = document.querySelector("[data-lightbox-root]");
  var lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  var closeButton = document.querySelector("[data-lightbox-close]");
  var lastFocused = null;

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox-src]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;
      lastFocused = button;
      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || "";
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      if (closeButton) closeButton.focus();
    });
  });

  if (closeButton) closeButton.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
})();
