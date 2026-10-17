'use strict';
(() => {
  const audio = document.querySelector('#background-music');
  const buttons = [...document.querySelectorAll('.music-toggle')];
  const record = document.querySelector('.vinyl-control');
  const status = document.querySelector('#music-status');
  let muted = false, userPaused = false, pending = false, attempt = 0;
  try { muted = localStorage.getItem('portfolio-music-muted') === 'true'; userPaused = localStorage.getItem('portfolio-music-paused') === 'true'; } catch {}
  audio.volume = .35; audio.muted = muted;
  const save = () => { try { localStorage.setItem('portfolio-music-muted', String(muted)); localStorage.setItem('portfolio-music-paused', String(userPaused)); } catch {} };
  const render = () => {
    const playing = !audio.paused && !muted;
    buttons.forEach(button => {
      button.querySelector('[data-music-label]').textContent = muted ? 'UNMUTE' : 'MUTE';
      button.setAttribute('aria-label', muted ? 'Unmute all audio' : 'Mute all audio');
      button.setAttribute('aria-pressed', String(muted));
    });
    record.classList.toggle('is-playing', playing);
    record.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    record.setAttribute('aria-pressed', String(playing));
    record.querySelector('[data-record-action]').textContent = playing ? 'Ⅱ' : '▶︎';
    record.querySelector('[data-record-label]').textContent = playing ? 'PAUSE' : 'PLAY';
  };
  const play = async () => {
    if (muted || userPaused || pending || !audio.paused) return;
    const token = ++attempt; pending = true;
    try {
      await window.PortfolioAudio.context();
      if (muted || userPaused || token !== attempt) return;
      await audio.play();
      if (muted || userPaused) audio.pause();
    } catch { status.textContent = 'Select the record to play music.'; }
    finally { if (token === attempt) pending = false; render(); }
  };
  record.addEventListener('click', () => {
    if (!audio.paused && !muted) { userPaused = true; ++attempt; pending = false; audio.pause(); }
    else { userPaused = false; muted = false; audio.muted = false; void play(); }
    save(); render();
  });
  buttons.forEach(button => button.addEventListener('click', () => {
    muted = !muted; audio.muted = muted;
    if (muted) { ++attempt; pending = false; audio.pause(); status.textContent = 'All audio muted.'; }
    else if (!userPaused) void play();
    save(); render();
  }));
  const interact = event => {
    if (!event.isTrusted || event.target.closest('.music-toggle, .vinyl-control')) return;
    if (!muted && !userPaused) void play();
  };
  document.addEventListener('pointerdown', interact);
  document.addEventListener('keydown', interact);
  audio.addEventListener('play', render); audio.addEventListener('pause', render);
  audio.addEventListener('error', () => { pending = false; render(); status.textContent = 'Music is unavailable right now.'; });
  render();
})();
