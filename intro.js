'use strict';
(() => {
  const root = document.documentElement;
  const intro = document.querySelector('.face-intro');
  const skip = document.querySelector('#skip-intro');
  const portrait = document.querySelector('.portrait-wrap');
  const image = portrait.querySelector('.portrait');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let timer, animation, finished = false;
  const finish = () => {
    finished = true;
    clearTimeout(timer);
    animation?.cancel();
    portrait.style.removeProperty('transform-origin');
    root.classList.remove('intro-ready', 'intro-framed');
    intro.hidden = true;
    document.removeEventListener('keydown', finish);
    document.removeEventListener('pointerdown', finish);
    if (document.activeElement === skip) document.querySelector('.menu-item').focus({preventScroll:true});
  };
  if (!root.classList.contains('intro-ready')) { finish(); return; }
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', finish);
  document.addEventListener('pointerdown', finish);
  window.addEventListener('hashchange', finish, {once:true});
  window.addEventListener('resize', finish, {once:true});
  reduced.addEventListener('change', event => { if (event.matches) finish(); });
  const start = async () => {
    try { await image.decode(); } catch { /* Keep the page usable if an image fails. */ }
    if (finished) return;
    const box = portrait.getBoundingClientRect();
    const fit = Math.min(box.width / image.naturalWidth, box.height / image.naturalHeight);
    const width = image.naturalWidth * fit, height = image.naturalHeight * fit;
    const x = box.width / 2 + (.5 - Number(portrait.dataset.faceX || .60)) * width;
    const y = box.height / 2 + (.5 - Number(portrait.dataset.faceY || .39)) * height;
    const dx = innerWidth / 2 - (box.left + x);
    const dy = innerHeight / 2 - (box.top + y);
    portrait.style.transformOrigin = `${x}px ${y}px`;
    root.classList.add('intro-framed');
    const scale = innerWidth <= 600 ? 2.15 : 2.45;
    const closeup = `translate(${dx}px, ${dy}px) scale(${scale})`;
    animation = portrait.animate([
      {transform:closeup, offset:0},
      {transform:closeup, offset:.18},
      {transform:'translate(0px, 0px) scale(1)', offset:.9},
      {transform:'translate(0px, 0px) scale(1)', offset:1}
    ], {duration:3000, easing:'cubic-bezier(.22,.68,.15,1)', fill:'both'});
    animation.onfinish = finish;
  };
  void start();
  timer = setTimeout(finish, 3800);
})();
