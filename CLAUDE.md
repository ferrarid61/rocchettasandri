# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview
Static multi-page website for Rocchetta Sandri, a historical village in the Italian Apennines. Bilingual support (Italian/English) with automatic deployment via FTP.

## Common Commands
1. **View the site**: Open `index.html` directly in a browser (no build step required)
2. **Frontend development**: Use the `frontend-design` skill for UI improvements
3. **Testing**: No automated tests - manually verify changes in browser
4. **Image optimization**: `python optimize_images.py --input <image> --type hero|lightbox|thumbnail|sidebar [--output-dir <dir>]` (requires Pillow; outputs WebP with size-appropriate suffix, e.g. `name_lightbox.webp`)
5. **Deployment**: Automatic via GitHub Actions on push to `main`

## Architecture

### Site Structure
- **Root directory**: Italian version (primary)
- **`/en/` directory**: English translations

### JavaScript Features
- Modular lightbox factory `createLightbox(config)` in `script.js` is initialized per gallery (gallery, territory, etc.) — new lightboxes reuse it by passing container/item selectors

### Assets
- `images/` - Optimized web images (JPG, PNG, JPEG)
- `audio/` - Podcast and audio content (MP3, M4A, MP4)
- `materiali/` - Source materials (gitignored, not deployed)
- `documenti/` - Source documents (e.g. manuscript transcription PDFs)

## Development Guidelines

### Adding New Pages
1. Create HTML file in root (Italian) and `/en/` (English)
2. Include both `style.css` and `pages.css`
3. Use consistent navbar structure with links back to `index.html`
4. Add Google Analytics tracking code before `</head>`
5. Follow existing hero section pattern with appropriate background image
6. In `/en/` pages, reference shared assets with `../` prefixes (`../style.css`, `../pages.css`, `../script.js`, `../images/...`) and link the language switcher back to the Italian page (e.g. `../memorie.html`)

## Deployment
- **Analytics**: Google Analytics G-79RTDE95ZK (installed on all 44 HTML files — keep new pages in sync)

## Important Notes
- No build tools or package managers - pure HTML/CSS/JS; all CDN dependencies load via unpkg.com
