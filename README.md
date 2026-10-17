# Siddharth Madhavan — Portfolio Reload

A dependency-free, responsive portfolio inspired by the visual language of the Persona 3 Reload pause menu and [deltea's browser recreation](https://github.com/deltea/p3r-pause-menu).

## Preview

Serve this directory with any static HTTP server, for example `python3 -m http.server 8000`, then open http://localhost:8000. No build, package installation, or API keys are needed. GitHub Pages can serve the repository directly after review and merge.

## Navigation

- Click a menu item, or use Up/Down (W/S) and Enter.
- Escape, the close button, and browser Back return from a detail panel.
- Direct links such as `/#projects`, `/#education`, and `/#contact` remain supported.
- Native modal focus containment, visible focus rings, and a text-first `classic.html` alternative are included.
- System contains a reduced-motion toggle. OS reduced-motion settings are always honored.

## Content and assets

Existing project descriptions, results, education, coursework, and contact details were retained from the previous homepage, also preserved in `classic.html`. Content labeled current/awaiting results reflects the existing portfolio and should be reviewed for freshness.

The portrait is generated from the owner's supplied photo, delivered as a compressed transparent WebP. The water effects, favicon, and interface code are original. The reference repository has no declared license; its source, video, fonts, music, and game assets were not copied. This is an independent fan-inspired portfolio, not an official ATLUS/SEGA product.

## Files

- `index.html`: semantic portfolio shell and content
- `style.css`: responsive visual interface, animation, and accessibility preferences
- `app.js`: menu selection, hash navigation, dialog behavior, motion settings
- `classic.html`: text-first original portfolio
- `assets/`: generated portrait and original favicon

## Checks

`node --check app.js` validates JavaScript syntax. `node tests/check.mjs` verifies local assets, all eight menu destinations, unique IDs, preservation of the original links, and accessibility hooks. No runtime dependencies or build pipeline are required. Review mobile layout and menu behavior before merging a design change.
