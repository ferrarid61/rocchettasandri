/* script.js – Rocchetta Sandri */

/* ── Navbar: sticky shadow + hamburger ─────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.navbar__links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  hamburger.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
});

/* Close mobile menu on link click */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Apri menu');
  });
});

/* ── Smooth scroll ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Scroll reveal ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Lightbox ───────────────────────────────────────────── */
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightbox-img');
const lightboxCap    = document.getElementById('lightbox-caption');
const lightboxClose  = document.getElementById('lightbox-close');
const lightboxPrev   = document.getElementById('lightbox-prev');
const lightboxNext   = document.getElementById('lightbox-next');

const galleryItems   = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex     = 0;
let previouslyFocused = null;

// All focusable elements inside the lightbox for focus trap
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function getFocusableInLightbox() {
  return Array.from(lightbox.querySelectorAll(FOCUSABLE)).filter(
    el => !el.hasAttribute('disabled') && el.offsetParent !== null
  );
}

function openLightbox(index) {
  currentIndex = index;
  const item = galleryItems[index];
  lightboxImg.src = item.getAttribute('href');
  lightboxImg.alt = item.querySelector('img').alt;
  lightboxCap.textContent = item.getAttribute('data-caption');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Store where focus was before opening
  previouslyFocused = document.activeElement;

  // Move focus inside lightbox
  requestAnimationFrame(() => lightboxClose.focus());
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 350);

  // Restore focus to the element that opened the lightbox
  if (previouslyFocused) previouslyFocused.focus();
}

function showImage(index) {
  currentIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentIndex];
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = item.getAttribute('href');
    lightboxImg.alt = item.querySelector('img').alt;
    lightboxCap.textContent = item.getAttribute('data-caption');
    lightboxImg.style.opacity = '1';
  }, 200);
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openLightbox(index);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

// Close on backdrop click
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation + focus trap
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
    return;
  }

  if (e.key === 'ArrowLeft') { showImage(currentIndex - 1); return; }
  if (e.key === 'ArrowRight') { showImage(currentIndex + 1); return; }

  // Focus trap: keep Tab cycling inside the lightbox
  if (e.key === 'Tab') {
    const focusable = getFocusableInLightbox();
    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

/* ── Lightbox foto d'epoca ──────────────────────────────── */
const lightboxEpoca       = document.getElementById('lightbox-epoca');
const lightboxEpocaImg    = document.getElementById('lightbox-epoca-img');
const lightboxEpocaCap    = document.getElementById('lightbox-epoca-caption');
const lightboxEpocaClose  = document.getElementById('lightbox-epoca-close');
const lightboxEpocaPrev   = document.getElementById('lightbox-epoca-prev');
const lightboxEpocaNext   = document.getElementById('lightbox-epoca-next');
const lightboxEpocaFs     = document.getElementById('lightbox-epoca-fullscreen');

const epocaItems          = Array.from(document.querySelectorAll('.epoca-item'));
let epocaIndex            = 0;
let epocaPreviouslyFocused = null;

function getFocusableInEpocaLightbox() {
  return Array.from(lightboxEpoca.querySelectorAll(FOCUSABLE)).filter(
    el => !el.hasAttribute('disabled') && el.offsetParent !== null
  );
}

function openEpocaLightbox(index) {
  epocaIndex = index;
  const item = epocaItems[index];
  lightboxEpocaImg.src = item.getAttribute('href');
  lightboxEpocaImg.alt = item.querySelector('img').alt;
  lightboxEpocaCap.textContent = item.getAttribute('data-caption');
  lightboxEpoca.classList.add('active');
  document.body.style.overflow = 'hidden';

  epocaPreviouslyFocused = document.activeElement;
  requestAnimationFrame(() => lightboxEpocaClose.focus());
}

function closeEpocaLightbox() {
  // Esci dal fullscreen se attivo
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }

  lightboxEpoca.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxEpocaImg.src = ''; }, 350);

  if (epocaPreviouslyFocused) epocaPreviouslyFocused.focus();
}

function showEpocaImage(index) {
  epocaIndex = (index + epocaItems.length) % epocaItems.length;
  const item = epocaItems[epocaIndex];
  lightboxEpocaImg.style.opacity = '0';
  setTimeout(() => {
    lightboxEpocaImg.src = item.getAttribute('href');
    lightboxEpocaImg.alt = item.querySelector('img').alt;
    lightboxEpocaCap.textContent = item.getAttribute('data-caption');
    lightboxEpocaImg.style.opacity = '1';
  }, 200);
}

epocaItems.forEach((item, index) => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openEpocaLightbox(index);
  });
});

lightboxEpocaClose.addEventListener('click', closeEpocaLightbox);
lightboxEpocaPrev.addEventListener('click', () => showEpocaImage(epocaIndex - 1));
lightboxEpocaNext.addEventListener('click', () => showEpocaImage(epocaIndex + 1));

// Fullscreen
function toggleEpocaFullscreen() {
  if (!document.fullscreenElement) {
    lightboxEpoca.requestFullscreen().catch(err => {
      console.log(`Errore fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

lightboxEpocaFs.addEventListener('click', toggleEpocaFullscreen);

// Aggiorna icona quando cambia stato fullscreen
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    lightboxEpocaFs.textContent = '⛶';
    lightboxEpocaFs.setAttribute('aria-label', 'Esci da schermo intero');
  } else {
    lightboxEpocaFs.textContent = '⛶';
    lightboxEpocaFs.setAttribute('aria-label', 'Schermo intero');
  }
});

lightboxEpoca.addEventListener('click', e => {
  if (e.target === lightboxEpoca) closeEpocaLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightboxEpoca.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeEpocaLightbox();
    return;
  }

  if (e.key === 'ArrowLeft') { showEpocaImage(epocaIndex - 1); return; }
  if (e.key === 'ArrowRight') { showEpocaImage(epocaIndex + 1); return; }

  if (e.key === 'Tab') {
    const focusable = getFocusableInEpocaLightbox();
    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.key === 'Tab' && e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (e.key === 'Tab') {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
});

/* ── Leaflet map ────────────────────────────────────────── */
const LAT = 44.2511;
const LNG = 10.8402;

const map = L.map('mapid', { scrollWheelZoom: false }).setView([LAT, LNG], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19
}).addTo(map);

const icon = L.divIcon({
  className: '',
  html: `<div style="
    background:linear-gradient(135deg,#E8A020,#C1440E);
    width:36px; height:36px;
    border-radius:50% 50% 50% 0;
    transform:rotate(-45deg);
    border:3px solid #fff;
    box-shadow:0 4px 12px rgba(0,0,0,.3);
  "></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38]
});

L.marker([LAT, LNG], { icon })
  .addTo(map)
  .bindPopup(`
    <strong>Rocchetta Sandri</strong><br>
    Sestola (MO), Emilia-Romagna<br>
    <small>Alt. ~660 m s.l.m.</small>
  `, { maxWidth: 200 })
  .openPopup();
