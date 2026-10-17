'use strict';
(() => {
  const root = document.documentElement;
  const intro = document.querySelector('.face-intro');
  const skip = document.querySelector('#skip-intro');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timer;
  const finish = () => {
    clearTimeout(timer);
    root.classList.remove('intro-ready');
    intro.hidden = true;
    document.removeEventListener('keydown', interrupt);
    document.removeEventListener('pointerdown', interrupt);
    if (document.activeElement === skip) document.querySelector('.menu-item').focus({preventScroll:true});
  };
  const interrupt = () => finish();
  if (!root.classList.contains('intro-ready')) { finish(); return; }
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', interrupt);
  document.addEventListener('pointerdown', interrupt);
  window.addEventListener('hashchange', finish, {once:true});
  reduced.addEventListener('change', event => { if (event.matches) finish(); });
  intro.addEventListener('animationend', event => { if (event.target === intro) finish(); });
  timer = setTimeout(finish, 3200);
})();
