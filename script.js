// John Fiel E-Portfolio — interactive features

const yearElement = document.getElementById("year");
const themeButton = document.getElementById("theme-btn");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");

// Automatically display the current year.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Switch between the midnight theme and a light theme.
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    if (themeIcon) themeIcon.textContent = isLight ? "☾" : "☼";
    themeButton.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme"
    );
  });
}

// Mobile navigation menu.
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));

// PREMIUM SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    // Respect accessibility preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }

    const headerOffset = 90;
    const startPosition = window.scrollY;
    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    const distance = targetPosition - startPosition;
    const duration = 1000;
    let startTime = null;

    // Smooth acceleration and deceleration
    function easeInOutQuint(t) {
      return t < 0.5
        ? 16 * t * t * t * t * t
        : 1 - Math.pow(-2 * t + 2, 5) / 2;
    }

    function animateScroll(currentTime) {
      if (startTime === null) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuint(progress);

      window.scrollTo(
        0,
        startPosition + distance * easedProgress
      );

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);

    // Update the URL without causing another jump
    history.pushState(null, "", targetId);
  });
});
}
