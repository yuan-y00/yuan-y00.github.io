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
