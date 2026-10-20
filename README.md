# Siddharth Madhavan — Portfolio Reload

A dependency-free portfolio inspired by Persona 3 Reload's visual language, with Siddharth's own content, photo-grounded character artwork and genuine photograph.

## Interface

Five exclusive full-screen scenes: underwater Home, striped Projects, halftone Skills, paper-dossier About, and train-car Contact. Home uses a natural upright portrait with localized blinking and gentle floating. There is no separate tie motion. OS and user reduced-motion settings disable nonessential animation.

The twelve genuine projects retain their descriptions, repository links, team/upstream attribution and prototype limitations. Coursework, experience, achievements and education remain available, alongside the complete text-first `classic.html` view. Legacy hash links remain supported. The existing custom domain is preserved in `CNAME`.

## Preview and checks

Serve this directory with a static HTTP server. No build, package installation, API key or message backend is required.

- `node --check scenes.js`
- `node tests/check.mjs`
- `node tests/projects.mjs`
- `node tests/music.mjs`
- `node tests/effects.mjs`

Click a menu item, or use Up/Down and Enter. Escape returns Home. Tab moves through links and controls. The Contact form composes an email in the visitor's email application; nothing is sent from the site.

## Audio

The persistent vinyl controls music play/pause. Global mute silences music and interface effects. Playback starts after a user gesture, subject to browser rules. Music and effects mix through the shared Web Audio engine; closing uses the select effect. Pause/mute preferences persist locally and blocked playback is handled.

## Source and assets

Current entry files are `index.html`, `scenes.css` and `scenes.js`. `audio-engine.js`, `music.js` and `effects.js` retain the existing audio behavior. Previous interface files `app.js`, `style.css` and `intro.js` remain for reference and are not loaded by the current interface.

Portfolio facts and project attribution come from the owner's prior portfolio/resume and verified public repositories. The revised character illustrations are generated from the owner's supplied photos. The About card uses an owner-supplied genuine photo, cropped only with CSS. Reference video frames were inspected for composition and motion; none are embedded as background imagery. No game source code, footage or fonts were copied. [deltea's pause-menu recreation](https://github.com/deltea/p3r-pause-menu) informed the earlier interface.

Background music (Color Your Night) and interface sound clips were supplied by the owner. They are not claimed as original or open-licensed assets. This independent fan-inspired portfolio is not an official ATLUS/SEGA product.
