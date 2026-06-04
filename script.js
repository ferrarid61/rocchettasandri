/* script.js – Rocchetta Sandri */

/* ── Navbar: sticky shadow + hamburger ─────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.querySelector('.navbar__links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close mobile menu on link click */
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
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

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCap.textContent = caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 350);
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    openLightbox(item.getAttribute('href'), item.getAttribute('data-caption'));
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

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
