/* ═══════════════════════════════════════════════════════════════
   PUNEET DULARIA — Portfolio JS
   Handles: nav scroll, mobile menu, active links, scroll reveal
═══════════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. NAV: scrolled state ─────────────────────────────────── */
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 24) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run on load


/* ── 2. MOBILE MENU ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close menu on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hamburger.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


/* ── 3. ACTIVE NAV LINK (intersection-based) ─────────────────── */
const sections    = document.querySelectorAll('section[id]');
const navLinkEls  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, {
  rootMargin: `-${Math.floor(window.innerHeight * 0.35)}px 0px -${Math.floor(window.innerHeight * 0.35)}px 0px`,
  threshold: 0
});

sections.forEach(section => sectionObserver.observe(section));


/* ── 4. SCROLL REVEAL ────────────────────────────────────────── */
const revealEls = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback for old browsers
  revealEls.forEach(el => el.classList.add('is-visible'));
}


/* ── 5. SMOOTH SCROLL — offset for fixed nav ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const offset = nav.offsetHeight + 8;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ── 6. YEAR AUTO-UPDATE (optional: if you add a year span) ──── */
// Automatically update the copyright year when the page loads.
// The footer already shows 2026; this is a guard for future use.
const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
