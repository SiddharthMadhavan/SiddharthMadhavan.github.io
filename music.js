'use strict';
(() => {
  const audio = document.querySelector('#background-music');
  const buttons = [...document.querySelectorAll('.music-toggle')];
  const status = document.querySelector('#music-status');
  let muted = false;
  let pending = false;
  let attempt = 0;
  try { muted = localStorage.getItem('portfolio-music-muted') === 'true'; } catch { /* Storage can be unavailable. */ }
  audio.volume = 0.35;
  audio.muted = muted;
  const save = () => { try { localStorage.setItem('portfolio-music-muted', String(muted)); } catch { /* Best effort. */ } };
  const render = () => {
    const playing = !audio.paused && !muted;
    const label = muted ? 'UNMUTE' : playing ? 'MUTE' : 'PLAY';
    const action = muted ? 'Unmute all audio' : playing ? 'Mute all audio' : 'Play audio';
    buttons.forEach(button => {
      button.querySelector('[data-music-label]').textContent = label;
      button.setAttribute('aria-label', action);
      button.setAttribute('aria-pressed', String(muted));
      button.title = action + ' · Color Your Night';
    });
  };
  const play = async () => {
    if (muted || pending || !audio.paused) return;
    const token = ++attempt;
    pending = true;
    try {
      await audio.play();
      if (muted) audio.pause();
    } catch (error) {
      if (token === attempt && !muted) status.textContent = error.name === 'NotAllowedError' ? 'Select Play to enable background music.' : 'Music could not play. Select Play to try again.';
    } finally {
      if (token === attempt) pending = false;
      render();
    }
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    if (muted) {
      muted = false; audio.muted = false; save(); render(); void play();
    } else if (!audio.paused || pending) {
      muted = true; audio.muted = true; ++attempt; pending = false; audio.pause(); save(); render();
      status.textContent = 'All audio muted.';
    } else {
      muted = false; audio.muted = false; save(); void play();
    }
  }));
  const interact = event => {
    if (!event.isTrusted || event.target.closest('.music-toggle')) return;
    if (!muted) void play();
  };
  document.addEventListener('pointerdown', interact);
  document.addEventListener('keydown', interact);
  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  audio.addEventListener('error', () => { pending = false; render(); status.textContent = 'Music is unavailable right now.'; });
  render();
})();
