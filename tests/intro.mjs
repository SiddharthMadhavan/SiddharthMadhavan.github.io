import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../intro.js', import.meta.url), 'utf8');
function setup(active = true) {
  const handlers = {}, windowHandlers = {}, introHandlers = {}, skipHandlers = {};
  const classes = new Set(active ? ['intro-ready'] : []);
  let timeout, motion, focused = false;
  const intro = { hidden: false, addEventListener: (k, v) => introHandlers[k] = v };
  const skip = { addEventListener: (k, v) => skipHandlers[k] = v };
  const menu = { focus: () => focused = true };
  const document = { documentElement: { classList: {contains: k => classes.has(k), remove: k => classes.delete(k)} }, activeElement: null,
    querySelector: s => s === '.face-intro' ? intro : s === '#skip-intro' ? skip : menu,
    addEventListener: (k, v) => handlers[k] = v, removeEventListener: k => delete handlers[k] };
  vm.runInNewContext(source, {document, window: {addEventListener: (k, v) => windowHandlers[k] = v}, matchMedia: () => ({addEventListener: (k, v) => motion = v}), setTimeout: fn => (timeout = fn, 1), clearTimeout: () => {}});
  return {intro, skip, document, handlers, windowHandlers, introHandlers, skipHandlers, classes, timeout: () => timeout(), motion: () => motion({matches:true}), focused: () => focused};
}
assert(setup(false).intro.hidden);
for (const action of ['pointerdown', 'keydown']) { const ui=setup(); ui.handlers[action](); assert(ui.intro.hidden); assert(!ui.classes.has('intro-ready')); assert(!ui.handlers[action]); }
let ui=setup(); ui.document.activeElement=ui.skip; ui.skipHandlers.click(); assert(ui.focused());
ui=setup(); ui.introHandlers.animationend({target:{}}); assert(!ui.intro.hidden); ui.introHandlers.animationend({target:ui.intro}); assert(ui.intro.hidden);
for (const action of ['timeout', 'motion']) {ui=setup();ui[action]();assert(ui.intro.hidden);}
ui=setup();ui.windowHandlers.hashchange();assert(ui.intro.hidden);
console.log('Intro checks passed: bypass, input skip, focus, completion, fallback, motion, hash.');
