'use strict';
(() => {
  const music = document.querySelector('#background-music');
  const buffers = new Map(), pending = new Map(), active = new Set();
  let unlocked = false, serial = 0;
  const load = async name => {
    if (buffers.has(name)) return buffers.get(name);
    if (!pending.has(name)) pending.set(name, (async () => {
      const context = await window.PortfolioAudio.context().catch(() => null);
      if (!context) return null;
      const response = await fetch(`assets/menu-${name}.wav`);
      if (!response.ok) throw new Error('Effect unavailable');
      const buffer = await context.decodeAudioData(await response.arrayBuffer());
      buffers.set(name, buffer); return buffer;
    })().catch(() => null));
    return pending.get(name);
  };
  const unlock = event => {
    if (!event.isTrusted || unlocked) return;
    unlocked = true;
    void load('hover'); void load('select');
  };
  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
  const stop = () => { for (const source of active) { try { source.stop(); } catch {} } active.clear(); };
  document.addEventListener('portfolio:sound', async event => {
    const name = event.detail === 'close' ? 'select' : event.detail;
    if (!['hover', 'select'].includes(name) || !unlocked || music.muted) return;
    const token = ++serial;
    const buffer = await load(name);
    if (!buffer || music.muted || token !== serial) return;
    const context = await window.PortfolioAudio.context().catch(() => null);
    if (!context || music.muted) return;
    stop();
    const source = context.createBufferSource(), gain = context.createGain();
    source.buffer = buffer; gain.gain.value = .45;
    source.connect(gain); gain.connect(context.destination);
    active.add(source);
    source.onended = () => { active.delete(source); source.disconnect(); gain.disconnect(); };
    source.start();
  });
  document.addEventListener('click', event => {
    if (event.target.closest('.music-toggle') && music.muted) { ++serial; stop(); }
  });
})();
