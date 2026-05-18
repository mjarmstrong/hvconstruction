(() => {
  "use strict";

  // ----- Sticky header shadow on scroll --------------------------------------
  const header = document.querySelector("[data-site-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Mobile nav drawer ---------------------------------------------------
  const toggle  = document.querySelector("[data-nav-toggle]");
  const drawer  = document.querySelector("[data-mobile-nav]");
  const closeBtn = document.querySelector("[data-nav-close]");
  let lastFocused = null;

  const openNav = () => {
    if (!drawer || !toggle) return;
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-nav-open");
    // Focus the close button so Esc + Tab work intuitively
    setTimeout(() => closeBtn && closeBtn.focus(), 50);
  };

  const closeNav = () => {
    if (!drawer || !toggle) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-nav-open");
    if (lastFocused) lastFocused.focus();
  };

  if (toggle && drawer) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      open ? closeNav() : openNav();
    });
    closeBtn && closeBtn.addEventListener("click", closeNav);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) closeNav();
    });
    // Close after navigating to in-page link
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  }

  // ----- Gallery filter (Our Work) -------------------------------------------
  const filterEls = document.querySelectorAll("[data-filter]");
  const items     = document.querySelectorAll("[data-tags]");

  if (filterEls.length && items.length) {
    filterEls.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterEls.forEach((b) => b.classList.toggle("is-active", b === btn));
        items.forEach((item) => {
          const tags = (item.dataset.tags || "").split(" ");
          const match = filter === "all" || tags.includes(filter);
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }
})();
