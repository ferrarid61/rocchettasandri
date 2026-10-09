/* script.js – Rocchetta Sandri */

/* ── Navbar: sticky shadow + hamburger ─────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.navbar__links');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

if (hamburger && navLinks) {
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
}

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

/* ── Lightbox modulare ──────────────────────────────────── */
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function createLightbox(config) {
  const {
    container,
    itemsSelector,
    imgEl,
    captionEl,
    closeEl,
    prevEl,
    nextEl,
    fullscreenEl = null,
    enableFullscreen = false
  } = config;

  if (!container || !closeEl || !imgEl) return;

  const items = Array.from(document.querySelectorAll(itemsSelector));
  let currentIndex = 0;
  let previouslyFocused = null;

  function getFocusable() {
    return Array.from(container.querySelectorAll(FOCUSABLE)).filter(
      el => !el.hasAttribute('disabled') && el.offsetParent !== null
    );
  }

  function open(index) {
    currentIndex = index;
    const item = items[index];
    imgEl.src = item.getAttribute('href');
    imgEl.alt = item.querySelector('img').alt;
    captionEl.textContent = item.getAttribute('data-caption');
    container.classList.add('active');
    document.body.style.overflow = 'hidden';
    previouslyFocused = document.activeElement;
    requestAnimationFrame(() => closeEl.focus());
  }

  function close() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    container.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { imgEl.src = ''; }, 350);
    if (previouslyFocused) previouslyFocused.focus();
  }

  function show(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = item.getAttribute('href');
      imgEl.alt = item.querySelector('img').alt;
      captionEl.textContent = item.getAttribute('data-caption');
      imgEl.style.opacity = '1';
    }, 200);
  }

  items.forEach((item, index) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      open(index);
    });
  });

  closeEl.addEventListener('click', close);
  if (prevEl) prevEl.addEventListener('click', () => show(currentIndex - 1));
  if (nextEl) nextEl.addEventListener('click', () => show(currentIndex + 1));

  if (enableFullscreen && fullscreenEl) {
    fullscreenEl.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
          console.log(`Errore fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        fullscreenEl.textContent = '⛶';
        fullscreenEl.setAttribute('aria-label', 'Esci da schermo intero');
      } else {
        fullscreenEl.textContent = '⛶';
        fullscreenEl.setAttribute('aria-label', 'Schermo intero');
      }
    });
  }

  container.addEventListener('click', e => {
    if (e.target === container) close();
  });

  document.addEventListener('keydown', e => {
    if (!container.classList.contains('active')) return;

    if (e.key === 'Escape') {
      close();
      return;
    }

    if (e.key === 'ArrowLeft') { show(currentIndex - 1); return; }
    if (e.key === 'ArrowRight') { show(currentIndex + 1); return; }

    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (focusable.length === 0) { e.preventDefault(); return; }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
}

// Inizializza i 3 lightbox
createLightbox({
  container: document.getElementById('lightbox'),
  itemsSelector: '.gallery-item',
  imgEl: document.getElementById('lightbox-img'),
  captionEl: document.getElementById('lightbox-caption'),
  closeEl: document.getElementById('lightbox-close'),
  prevEl: document.getElementById('lightbox-prev'),
  nextEl: document.getElementById('lightbox-next'),
  enableFullscreen: false
});

createLightbox({
  container: document.getElementById('lightbox-territorio'),
  itemsSelector: '.feature-card__photo',
  imgEl: document.getElementById('lightbox-territorio-img'),
  captionEl: document.getElementById('lightbox-territorio-caption'),
  closeEl: document.getElementById('lightbox-territorio-close'),
  prevEl: document.getElementById('lightbox-territorio-prev'),
  nextEl: document.getElementById('lightbox-territorio-next'),
  fullscreenEl: document.getElementById('lightbox-territorio-fullscreen'),
  enableFullscreen: true
});

/* ── Leaflet map ────────────────────────────────────────── */
const mapContainer = document.getElementById('mapid');

if (mapContainer && typeof L !== 'undefined') {
  const LAT = 44.2511;
  const LNG = 10.8402;

  const map = L.map('mapid', { scrollWheelZoom: false }).setView([LAT, LNG], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://openstreetmap.fr">OSM France</a>',
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
}
