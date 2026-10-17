'use strict';
(() => {
  const links = [...document.querySelectorAll('.menu-item')];
  const dialog = document.querySelector('#detail-dialog');
  const sections = [...dialog.querySelectorAll('.section')];
  const close = document.querySelector('#close-panel');
  const description = document.querySelector('#selection-description');
  const motion = document.querySelector('#motion-toggle');
  let selected = 0;
  let openedFromMenu = false;
  let lastTrigger = null;
  const select = (index, focus = false) => {
    selected = (index + links.length) % links.length;
    links.forEach((link, i) => {
      link.classList.toggle('is-selected', i === selected);
      if (i === selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    description.textContent = links[selected].dataset.description;
    document.querySelector('.side-number').textContent = String(selected + 1).padStart(2, '0');
    if (focus) links[selected].focus({ preventScroll: true });
  };
  const syncRoute = () => {
    const id = location.hash.slice(1);
    const target = sections.find(section => section.id === id);
    if (!target) {
      if (dialog.open) dialog.close();
      return;
    }
    sections.forEach(section => { section.hidden = section !== target; });
    const index = links.findIndex(link => link.hash === location.hash);
    if (index >= 0) select(index);
    document.querySelector('#detail-name').textContent = links[selected].textContent.trim().replace(/0\d$/, '').trim();
    if (!dialog.open) dialog.showModal();
    document.querySelector('.detail-scroll').scrollTop = 0;
    close.focus();
  };
  const dismiss = () => {
    if (!dialog.open) return;
    dialog.close();
    if (openedFromMenu) {
      openedFromMenu = false;
      history.back();
    } else {
      history.replaceState(null, '', location.pathname + location.search);
    }
    (lastTrigger || links[selected]).focus({ preventScroll: true });
  };
  links.forEach((link, index) => {
    link.addEventListener('pointerenter', () => { if (!dialog.open) select(index); });
    link.addEventListener('focus', () => select(index));
    link.addEventListener('click', () => {
      openedFromMenu = !location.hash;
      lastTrigger = link;
      if (link.hash === location.hash) syncRoute();
    });
  });
  document.querySelector('.identity a').addEventListener('click', event => {
    openedFromMenu = !location.hash;
    lastTrigger = event.currentTarget;
    if (location.hash === '#persona') syncRoute();
  });
  close.addEventListener('click', dismiss);
  dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dismiss();
  });
  dialog.addEventListener('close', () => {
    if (!location.hash) (lastTrigger || links[selected]).focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', syncRoute);
  document.addEventListener('keydown', event => {
    if (dialog.open || event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.key.toLowerCase();
    if (['arrowdown', 'arrowup'].includes(key) || (['s', 'w'].includes(key) && event.target.closest('.menu'))) {
      event.preventDefault();
      select(selected + (key === 'arrowdown' || key === 's' ? 1 : -1), true);
    } else if (event.key === 'Enter' && (event.target === document.body || event.target === document.documentElement)) {
      event.preventDefault(); links[selected].click();
    }
  });
  const setMotion = reduced => {
    document.body.classList.toggle('reduce-motion', reduced);
    motion.setAttribute('aria-pressed', String(reduced));
    motion.querySelector('span').textContent = reduced ? 'On' : 'Off';
  };
  try { setMotion(localStorage.getItem('portfolio-reduce-motion') === 'true'); } catch { setMotion(false); }
  motion.addEventListener('click', () => {
    const reduced = motion.getAttribute('aria-pressed') !== 'true';
    setMotion(reduced);
    try { localStorage.setItem('portfolio-reduce-motion', String(reduced)); } catch { /* Private browsing can disable storage. */ }
  });
  select(0);
  syncRoute();
})();
