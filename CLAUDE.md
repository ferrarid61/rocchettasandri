# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview
Static multi-page website for Rocchetta Sandri, a historical village in the Italian Apennines. Bilingual support (Italian/English) with automatic deployment via FTP.

## Common Commands
1. **View the site**: Open `index.html` directly in a browser (no build step required)
2. **Frontend development**: Use the `frontend-design` skill for UI improvements
3. **Testing**: No automated tests - manually verify changes in browser
4. **Deployment**: Automatic via GitHub Actions on push to `main` branch

## Architecture

### Site Structure
- **Root directory**: Italian version (primary)
- **`/en/` directory**: English translations
- **20 content pages** covering history, traditions, notable figures, and local attractions
- Each page follows consistent template: navbar, hero, content sections, footer

### Key Files
- `index.html` - Main landing page with all sections
- `style.css` - Global styles, design tokens, component styles
- `pages.css` - Shared styles for subpages
- `script.js` - All JavaScript (navbar, lightboxes, map, scroll effects)
- Subpages: `don-nino.html`, `chiesa.html`, `oratorio.html`, etc.

### CSS Architecture
- `style.css`: Design tokens (colors, fonts, spacing), global components, homepage-specific styles
- `pages.css`: Subpage hero sections, breadcrumbs, content layouts
- Color palette: gold (#E8A020), terracotta (#C1440E), cream (#FBF5E8), stone (#2B2318)
- Fonts: Outfit (headings), Lora (body text)

### JavaScript Features
- Sticky navbar with scroll shadow
- Mobile hamburger menu
- Smooth scroll to anchors
- Intersection Observer for scroll-reveal animations
- Three separate lightbox implementations (gallery, historical photos, territory)
- Leaflet map (coordinates: 44.2511, 10.8402)
- Keyboard navigation and focus trapping in lightboxes

### Assets
- `images/` - Optimized web images (JPG, PNG, JPEG)
- `audio/` - Podcast and audio content (MP3, M4A, MP4)
- `materiali/` - Source materials (gitignored, not deployed)

## Development Guidelines

### Adding New Pages
1. Create HTML file in root (Italian) and `/en/` (English)
2. Include both `style.css` and `pages.css`
3. Use consistent navbar structure with links back to `index.html`
4. Add Google Analytics tracking code before `</head>`
5. Follow existing hero section pattern with appropriate background image

### Gallery Images
- Add images to `images/` folder
- Use `data-caption` for lightbox captions
- Follow existing `gallery-item` or `epoca-item` structure
- Include descriptive `alt` text for accessibility

### Map Integration
- Leaflet.js v1.9.4 via CDN
- Map container ID: `mapid`
- Custom marker with gradient styling
- Scroll wheel zoom disabled by default

## Deployment
- **Trigger**: Push to `main` branch
- **Method**: FTP deploy via GitHub Actions
- **Excluded**: `.git/`, `.claude/`, `materiali/`, `node_modules/`, markdown files
- **Analytics**: Google Analytics G-79RTDE95ZK (installed on all 40 HTML files)

## Important Notes
- No build tools or package managers - pure HTML/CSS/JS
- All CDN dependencies loaded via unpkg.com
- Responsive design with mobile-first approach
- Accessibility: ARIA labels, keyboard navigation, focus management
- Images use `loading="lazy"` for performance
