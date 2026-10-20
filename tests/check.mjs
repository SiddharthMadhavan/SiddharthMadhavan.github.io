import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const html = await read('index.html');
const classic = await read('classic.html');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
const scenes = [...html.matchAll(/<section class="scene [^"]*" id="([^"]+)"/g)].map(match => match[1]);
assert.deepEqual(scenes, ['home','projects','skills','about','contact'], 'Five exclusive full-screen scenes');
for (const id of scenes) assert(ids.includes(id), `Missing scene: ${id}`);
assert.equal((html.match(/class="menu-item/g)||[]).length, 4, 'Four home menu destinations');
const anchors = source => new Set([...source.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]));
const current = anchors(html);
for (const link of anchors(classic)) assert(current.has(link), `Original link lost: ${link}`);
for (const match of html.matchAll(/\b(?:src|href)="([^"#:]+)"/g)) {
  const path = match[1];
  if (!/^[a-z]+:/i.test(path)) await access(new URL(path.split('?')[0], root));
}
assert(html.includes('<html lang="en">'), 'Language must be declared');
assert(html.includes('<noscript>'), 'No-JavaScript fallback must exist');
const css = await read('scenes.css');
assert(css.includes('prefers-reduced-motion'), 'Respect OS motion preference');
assert(css.includes(':focus-visible'), 'Visible keyboard focus required');
assert.equal((await read('CNAME')).trim(), 'siddharthmadhavan.tech');
assert(html.includes('Nothing is sent from this website.'), 'Honest mailto composer');
console.log('PASS: five scenes, unique IDs, preserved original links, local assets, CNAME, no-JS fallback, reduced motion, keyboard focus.');
