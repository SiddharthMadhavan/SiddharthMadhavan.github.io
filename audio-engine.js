'use strict';
(() => {
  let context, mediaSource;
  window.PortfolioAudio = {
    async context() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      if (!context) {
        context = new AudioContext();
        mediaSource = context.createMediaElementSource(document.querySelector('#background-music'));
        mediaSource.connect(context.destination);
      }
      if (context.state === 'suspended') await context.resume();
      return context;
    }
  };
})();
