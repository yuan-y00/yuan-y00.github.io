(function () {
  var storageKey = "yuan-portfolio-theme";
  var root = document.documentElement;
  var savedTheme = window.localStorage.getItem(storageKey);

  if (savedTheme === "dark" || savedTheme === "light") {
    root.dataset.theme = savedTheme;
  }

  var themeButton = document.querySelector("[data-theme-toggle]");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      window.localStorage.setItem(storageKey, nextTheme);
    });
  }

  var filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  var projectCards = Array.from(document.querySelectorAll("[data-categories]"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter;
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      projectCards.forEach(function (card) {
        var categories = card.dataset.categories || "";
        card.hidden = filter !== "all" && !categories.includes(filter);
      });
    });
  });

  var canUsePointer = window.matchMedia("(pointer: fine)").matches;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canUsePointer && !reduceMotion) {
    document.body.classList.add("has-pointer");
    var nextX = window.innerWidth / 2;
    var nextY = window.innerHeight / 2;
    var raf = null;

    function updatePointerVars() {
      root.style.setProperty("--mouse-x", nextX + "px");
      root.style.setProperty("--mouse-y", nextY + "px");
      raf = null;
    }

    window.addEventListener("pointermove", function (event) {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(updatePointerVars);
    });

    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(900px) rotateX(" +
          (-y * 4).toFixed(2) +
          "deg) rotateY(" +
          (x * 5).toFixed(2) +
          "deg) translateY(-2px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }

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
      { threshold: 0.16 }
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
