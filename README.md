# Siddharth Madhavan: Portfolio Reload

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

Content was updated from the owner-supplied resume in October 2026, with existing project links and previously public contact details retained. The text-first `classic.html` view contains the same updated professional content. Obsolete planning and awaiting-results labels were removed; GPA values not reconfirmed in the newer resume were omitted. LinkedIn access was unavailable during this update, so no facts are claimed to have been extracted from the live profile.

The portrait is generated from the owner's supplied photo, delivered as a compressed transparent WebP. The water effects, favicon, and interface code are original. The reference repository has no declared license; its source, video, fonts, and game assets were not copied. Background music (`assets/color-your-night.mp3`, Color Your Night) was subsequently supplied by the owner for inclusion on this site; it is not an original or open-licensed asset. This is an independent fan-inspired portfolio, not an official ATLUS/SEGA product.

## Files

- `index.html`: semantic portfolio shell and content
- `style.css`: responsive visual interface, animation, and accessibility preferences
- `app.js`: menu selection, hash navigation, dialog behavior, motion settings
- `intro.js`: skippable face-close-up opening
- `classic.html`: text-first current portfolio
- `assets/`: generated portrait and original favicon

## Checks

`node --check app.js` and `node --check music.js` validate JavaScript syntax. `node tests/music.mjs` checks playback state, synchronized controls, stored mute preference, and handled autoplay rejection. `node tests/check.mjs` verifies local assets, all eight menu destinations, unique IDs, preservation of the original links, and accessibility hooks. No runtime dependencies or build pipeline are required. Review mobile layout and menu behavior before merging a design change.

## Music

Color Your Night starts after the first user interaction, subject to browser playback rules. The persistent Play/Mute/Unmute button is available on both the menu and every detail panel. Muting pauses playback and is remembered locally. Blocked playback leaves a Play button; no autoplay rejection is unhandled. The MP3 uses preload=none so visitors who keep music muted do not download it automatically.

## Face opening

A 2.8-second white-and-blue face close-up pulls back into the menu. Any pointer or keyboard input skips it immediately; an explicit Skip Intro button is also available. Reduced-motion preferences and direct section links bypass it. The portrait is an original AI-generated likeness based on the owner’s supplied photo. `node tests/intro.mjs` covers bypass, skipping, focus recovery, animation completion, timeout fallback, and motion preference changes.

## Project and menu update

Additional project summaries were checked against the owner’s public GitHub repositories in October 2026: VredeFort, Thermal Watch, CHIP-8 / LAN Pong, RepoSense, Web Log Analysis V4, and Restaurant Analytics Dashboard. Team and upstream-starter attribution is retained; prototype work is not presented as validated production performance. Both portfolio views contain the same twelve projects. The settled portrait retains the opening’s opaque white-and-blue treatment; pointer and keyboard selection use an original red/white angular slash, disabled motion effects respect reduced-motion settings. The approved intro asset and animation are unchanged.
