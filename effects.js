'use strict';
(() => {
  const music = document.querySelector('#background-music');
  const sounds = Object.fromEntries(['hover', 'select', 'close'].map(name => [name, document.querySelector('#sound-' + name)]));
  let unlocked = false;
  const unlock = event => { if (event.isTrusted) unlocked = true; };
  document.addEventListener('pointerdown', unlock, true);
  document.addEventListener('keydown', unlock, true);
  const stop = () => Object.values(sounds).forEach(sound => sound.pause());
  Object.values(sounds).forEach(sound => { sound.volume = .45; });
  document.addEventListener('portfolio:sound', event => {
    const sound = sounds[event.detail];
    if (!sound || !unlocked || music.muted) return;
    stop();
    sound.currentTime = 0;
    void sound.play().catch(() => { /* Browser playback permissions or unavailable asset. */ });
  });
  document.addEventListener('click', event => { if (event.target.closest('.music-toggle') && music.muted) stop(); });
})();
