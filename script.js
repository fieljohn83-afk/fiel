
// John Fiel E-Portfolio — interactive features

const yearElement = document.getElementById("year");
const themeButton = document.getElementById("theme-btn");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const pageLinks = document.querySelectorAll('a[href^="#"]');
const emailAddress = "jfiel_260000000248@uic.edu.ph";
const emailPopupTrigger = document.getElementById("email-popup-trigger");
const emailModal = document.getElementById("email-modal");
const emailModalClose = document.getElementById("email-modal-close");
const modalCopyEmail = document.getElementById("modal-copy-email");
const emailModalStatus = document.getElementById("email-modal-status");

// Automatically display the current year.
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Show the email address in a focused dialog from the contact button.
const closeEmailModal = () => {
  if (!emailModal) return;
  emailModal.hidden = true;
  document.body.style.overflow = "";
};

if (emailPopupTrigger && emailModal) {
  emailPopupTrigger.addEventListener("click", () => {
    emailModal.hidden = false;
    document.body.style.overflow = "hidden";
    emailModalClose?.focus();
  });

  emailModalClose?.addEventListener("click", closeEmailModal);
  emailModal.querySelector("[data-close-email-modal]")?.addEventListener("click", closeEmailModal);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !emailModal.hidden) closeEmailModal();
  });
}

if (modalCopyEmail) {
  modalCopyEmail.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      modalCopyEmail.textContent = "Copied!";
      if (emailModalStatus) emailModalStatus.textContent = "Email copied to your clipboard.";
    } catch {
      if (emailModalStatus) emailModalStatus.textContent = "Please select the email address and copy it manually.";
    }

    window.setTimeout(() => {
      modalCopyEmail.textContent = "Copy Email";
      if (emailModalStatus) emailModalStatus.textContent = "";
    }, 2600);
  });
}

// Switch between the midnight theme and a light theme.
if (themeButton) {
  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    if (themeIcon) {
      themeIcon.textContent = isLight ? "☾" : "☼";
    }

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
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Smooth navigation to in-page sections.
pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId
      ? document.querySelector(targetId)
      : null;

    if (!targetId || targetId === "#" || !target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    history.replaceState(null, "", targetId);
  });
});

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const active =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", active);
          });
        }
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}
// Back to Top button.
const backTopButton = document.querySelector(".back-top");

if (backTopButton) {
  backTopButton.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    history.replaceState(null, "", window.location.pathname);
  });
}
