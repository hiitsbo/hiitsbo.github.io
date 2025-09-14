const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Accessibility: Remove nav links from tab order when menu is collapsed (mobile only)
function setNavLinksTabIndex(collapsed) {
  // Check if hamburger is visible (mobile viewport)
  const isMobile = window.getComputedStyle(hamburger).display !== "none";
  navLinks.forEach((link) => {
    if (isMobile && collapsed) {
      link.setAttribute("tabindex", "-1");
    } else {
      link.removeAttribute("tabindex");
    }
  });
}

// Initial state: if menu is not active, remove from tab order and set aria-expanded
setNavLinksTabIndex(!navMenu.classList.contains("active"));
hamburger.setAttribute("aria-expanded", navMenu.classList.contains("active"));

// Update tabIndex on resize (handle viewport changes)
window.addEventListener("resize", function() {
  setNavLinksTabIndex(!navMenu.classList.contains("active"));
});

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  const expanded = navMenu.classList.contains("active");
  hamburger.setAttribute("aria-expanded", expanded);
  setNavLinksTabIndex(!expanded);
});

// Close navbar when link is clicked
navLinks.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
  hamburger.setAttribute("aria-expanded", false);
  setNavLinksTabIndex(true);
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

// Remove updateIconsForTheme, only use CSS for icon visibility

function setBodyThemeClass(theme) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setBodyThemeClass('dark');
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    setBodyThemeClass('light');
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  setBodyThemeClass(currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
} else {
  // Default to light
  setBodyThemeClass('light');
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

// Listen for Escape key to close menu if open
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    if (navMenu.classList.contains("active")) {
      closeMenu();
      // Move focus back to hamburger for accessibility
      hamburger.focus();
    }
  }
});

// Automatically close hamburger menu when clicking or focusing outside

document.addEventListener("mousedown", function(event) {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("focusin", function(event) {
  if (
    navMenu.classList.contains("active") &&
    !navMenu.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    closeMenu();
  }
});

// Add box-shadow to navbar only when scrolled
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
