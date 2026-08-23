(function () {
  var root = document.documentElement;
  root.classList.add("js-enabled");

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
  var fontLabel = document.querySelector("#font-label");

  function syncFontButton() {
    var label = root.dataset.font === "serif" ? "衬线" : "无衬线";
    if (fontLabel) {
      fontLabel.textContent = label;
    } else if (fontButton) {
      fontButton.textContent = "字体 " + label;
    }
  }

  syncFontButton();

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      window.localStorage.setItem(themeKey, nextTheme);
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

  var hamburger = document.querySelector(".hamburger");
  var navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("active");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var cursorDot = document.querySelector("#cursorDot");
  var cursorRing = document.querySelector("#cursorRing");

  if (finePointer && !reduceMotion && cursorDot && cursorRing) {
    root.classList.add("has-custom-cursor");
    document.body.classList.add("has-pointer");

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var dotX = targetX;
    var dotY = targetY;
    var ringX = targetX;
    var ringY = targetY;

    function renderCursor() {
      dotX += (targetX - dotX) * 0.72;
      dotY += (targetY - dotY) * 0.72;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      cursorDot.style.transform = "translate(" + dotX + "px, " + dotY + "px) translate(-50%, -50%)";
      cursorRing.style.transform = "translate(" + ringX + "px, " + ringY + "px) translate(-50%, -50%)";
      window.requestAnimationFrame(renderCursor);
    }

    window.addEventListener("pointermove", function (event) {
      targetX = event.clientX;
      targetY = event.clientY;
    });

    document.querySelectorAll("a, button, .cad-photo-wrap").forEach(function (item) {
      item.addEventListener("pointerenter", function () {
        document.body.classList.add("cursor-hover");
      });
      item.addEventListener("pointerleave", function () {
        document.body.classList.remove("cursor-hover");
      });
    });

    window.requestAnimationFrame(renderCursor);
  }

  var srItems = Array.from(document.querySelectorAll(".sr"));

  function revealItem(item) {
    item.classList.add("sr-visible");
  }

  function revealVisibleItems() {
    srItems.forEach(function (item) {
      if (item.classList.contains("sr-visible")) return;
      var rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.12) {
        revealItem(item);
      }
    });
  }

  if ("IntersectionObserver" in window && !reduceMotion) {
    var srObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealItem(entry.target);
            srObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "12% 0px 12% 0px", threshold: 0 }
    );

    srItems.forEach(function (item) {
      srObserver.observe(item);
    });
  } else {
    srItems.forEach(function (item) {
      revealItem(item);
    });
  }

  revealVisibleItems();
  window.addEventListener("scroll", revealVisibleItems, { passive: true });
  window.addEventListener("resize", revealVisibleItems);

  var filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  var galleryItems = Array.from(document.querySelectorAll(".cad-photo-wrap[data-category]"));

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.dataset.filter || "all";
      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      galleryItems.forEach(function (item) {
        var categories = item.dataset.category || "";
        item.classList.toggle("cad-filtered-out", filter !== "all" && !categories.includes(filter));
      });
    });
  });

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
  });

  var sidebar = document.querySelector("#scroll-sidebar");
  var sidebarFill = document.querySelector("#sidebar-fill");
  var sidebarDots = Array.from(document.querySelectorAll(".sdot[data-target]"));
  var trackedSections = sidebarDots
    .map(function (dot) {
      return document.getElementById(dot.dataset.target);
    })
    .filter(Boolean);

  function updateSidebar() {
    if (!sidebar || !trackedSections.length) return;

    var scrollY = window.scrollY || window.pageYOffset;
    var docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    sidebar.classList.toggle("visible", scrollY > 240);

    if (sidebarFill) {
      sidebarFill.style.height = Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) + "%";
    }

    var current = trackedSections[0].id;
    trackedSections.forEach(function (section) {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.42) {
        current = section.id;
      }
    });

    sidebarDots.forEach(function (dot) {
      dot.classList.toggle("active", dot.dataset.target === current);
    });
  }

  sidebarDots.forEach(function (dot) {
    dot.addEventListener("click", function () {
      var section = document.getElementById(dot.dataset.target);
      if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", updateSidebar, { passive: true });
  window.addEventListener("resize", updateSidebar);
  updateSidebar();

  var modal = document.querySelector("#photo-modal");
  var modalImage = document.querySelector("#pm-img");
  var modalTitle = document.querySelector("#pm-title");
  var modalDesc = document.querySelector("#pm-desc");
  var modalTools = document.querySelector("#pm-tools-list");
  var modalLink = document.querySelector("#pm-link");
  var lastFocused = null;

  function closeProjectModal() {
    if (!modal || !modalImage) return;
    modal.classList.remove("open");
    modal.classList.remove("media-wide");
    modal.setAttribute("aria-hidden", "true");
    modalImage.removeAttribute("src");
    modalImage.alt = "";
    if (lastFocused) lastFocused.focus();
  }

  function openProjectModal(card) {
    if (!modal || !modalImage || !modalTitle || !modalDesc || !modalTools) return;
    lastFocused = document.activeElement;
    var copy = card.querySelector(".modal-copy");
    var title = card.dataset.title || card.innerText.trim();
    var desc = copy ? copy.innerText.trim() : "";
    var image = card.dataset.image || "";
    var tools = (card.dataset.tools || "").split("|").filter(Boolean);

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.src = image;
    modalImage.alt = title;
    modal.classList.toggle("media-wide", card.dataset.modalLayout === "wide");
    modalTools.innerHTML = "";
    tools.forEach(function (tool) {
      var tag = document.createElement("span");
      tag.className = "pm-tool-tag";
      tag.textContent = tool;
      modalTools.appendChild(tag);
    });

    if (modalLink) {
      if (card.dataset.link) {
        modalLink.href = card.dataset.link;
        modalLink.style.display = "";
      } else {
        modalLink.style.display = "none";
      }
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    var closeButton = modal.querySelector(".pm-close");
    if (closeButton) closeButton.focus();
  }

  galleryItems.forEach(function (card) {
    card.tabIndex = 0;
    card.addEventListener("click", function (event) {
      if (event.target.closest(".loop-handle")) return;
      openProjectModal(card);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(card);
      }
    });
  });

  if (modal) {
    modal.querySelectorAll("[data-modal-close]").forEach(function (closer) {
      closer.addEventListener("click", closeProjectModal);
    });
  }

  var lightbox = document.querySelector("[data-lightbox-root]");
  var lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  var closeButton = document.querySelector("[data-lightbox-close]");
  var lastLightboxFocus = null;

  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.removeAttribute("src");
    if (lastLightboxFocus) lastLightboxFocus.focus();
  }

  document.querySelectorAll("[data-lightbox-src]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;
      lastLightboxFocus = button;
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
    if (event.key === "Escape") {
      closeProjectModal();
      closeLightbox();
    }
  });
})();
