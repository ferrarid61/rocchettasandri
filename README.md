# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands
- **Build**: `npm run build` (if a build script is defined) or simply open `index.html` in a browser to view the site.
- **Dev server**: `npx serve .` or `python -m http.server` to preview changes locally.
- **Lint**: `npm run lint` (ESLint configured) or `prettier --check .` to check formatting.
- **Format**: `prettier --write .` to auto‑format code.
- **Test**: `npm test` (if a test suite exists) – otherwise note that no formal test suite is currently configured.
- **Git**: `git status`, `git add .`, `git commit -m "…"`, `git push` for version control.
- **Deploy**: Copy the `index.html`, associated CSS/JS, and `images/` folder to the hosting directory; can be done with `rsync`, `scp`, or manually via the file explorer.

## Development Workflow
1. **Branch**: `git checkout -b feature/your-feature` to create an isolated branch.
2. **Make changes**: Primarily UI tweaks or new components – use the `frontend-design` skill for any UI/UX work.
3. **Preview**: Serve the site with the dev server and verify the changes in a browser.
4. **Code quality**: Run lint/format commands; ensure they pass before committing.
5. **Testing (if added)**: Execute `npm test` to confirm any new tests still pass.
6. **Pull request**: Open a PR, request review, and address feedback.

## Code Architecture
- **Static site**: Single‑page application with `index.html` as the entry point; no build toolchain (e.g., Webpack) is currently used.
- **Styling**: Global CSS lives in `style.css`; class names follow a simple BEM‑like pattern.
- **JavaScript**: Plain ES6+ script embedded in the HTML or in separate `.js` files; handles DOM manipulation, navbar behavior, scroll‑reveal animations, Lightbox modal, and Leaflet map initialization.
- **Map**: Leaflet.js (v1.9.4) loaded via CDN; a custom marker is placed at coordinates `44.2511, 10.8402`.
- **Images**: Stored in the `images/` directory; referenced in HTML and used by the Lightbox gallery.
- **Dependencies**: Only external libraries loaded via CDN (Leaflet). No framework (React, Vue, etc.) is currently employed.
- **Future roadmap**: When modularization or additional UI complexity is needed, consider introducing a bundler or framework; apply the `frontend-design` skill for component creation and styling.

## Frontend Design Skill
Use the `frontend-design` skill for any UI/UX modifications, new pages, components, dashboards, or styling improvements. The skill produces production‑grade, visually distinct code and avoids generic AI aesthetics.

## PDF Handling
- **Reading/inspection**: Use the `pdf-reading` skill to extract or examine PDF content.
- **Creation/editing**: Use the `pdf` skill for creating, merging, splitting, or modifying PDF files.

## Configuration Skills
- **update-config**: Adjust `settings.json` (e.g., theme, model selection, permissions) as needed.
- **keybindings-help**: Customize keyboard shortcuts via `~/.claude/keybindings.json`.

## Skills Overview
- **frontend-design**: UI creation and styling.
- **pdf**: Create or edit PDF files.
- **pdf-reading**: Read/inspect PDFs.
- **pptx**: Manage PowerPoint decks.
- **deep-research**: Conduct multi‑source research.
- **update-config**: Modify Claude Code settings.
- **keybindings-help**: Customize keyboard shortcuts.
- **verify**: Test that a change works as intended.
- **code-review**: Review diffs for correctness and simplification.
- **simplify**: Refactor for readability and efficiency.
- **loop**: Run recurring tasks.
- **run**: Launch the application to verify changes.
- **init**: Initialize or update CLAUDE.md.
- **review** / **security-review**: Pull‑request workflow steps.