# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Common Commands
1. **Launch the site**: Open `index.html` in a browser to view the Rocchetta Sandri website.
2. **Frontend development**: Use the `frontend-design` skill for UI improvements, component creation, or layout adjustments.
3. **Map functionality**: Rely on the existing Leaflet.js map implementation (coordinates 44.2511, 10.8402) for location-based features.
4. **Gallery updates**: Add new images to the `images/` folder and create corresponding gallery items in `index.html` following the existing pattern.

## Code Architecture
The project follows a classic single-page application structure:
1. **Frontend**: 
   - HTML/CSS/JS stack for responsive design
   - Sections: Hero, navigation, About, History, Gallery, Territory, Map, Contact
   - Interactive elements: Scroll reveal animations, lightbox modal, map interaction
2. **JavaScript**:
   - Handles DOM manipulations for navbar (sticky scroll, hamburger menu)
   - ScrollReveal for section animations
   - Leaflet map integration with custom marker
3. **Dependencies**:
   - Leaflet.js via CDN (version 1.9.4)
   - CSS module (style.css) for styling

## Key Features
- **Responsive Design**: Mobile-friendly layout with viewport meta tag
- **Interactive UI**: 
  - Smooth scroll anchoring
  - Lightbox gallery with image captions
  - Map marker with location details
- **Content Structure**: 
  - Historical information in timeline format
  - Feature cards for territory highlights
  - Contact information with email link

## Development Notes
1. The site relies on direct browser execution without build tools (no webpack/react presets)
2. All assets (images, styles) are served directly from the public directory
3. The frontend-design skill should be used for any UI/UX modifications
4. The Leaflet map implementation appears complete but could be enhanced with additional layers

## Maintenance
- The .claude directory contains helpful skill definitions for frontend work
- Frontend-design/SKILL.md provides specific implementation guidelines for UI/UX tasks