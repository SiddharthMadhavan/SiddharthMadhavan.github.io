import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const read = path => readFile(new URL(path, root), 'utf8');
const html = await read('index.html');
const classic = await read('classic.html');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length, 'HTML IDs must be unique');
const menu = [...html.matchAll(/class="menu-item" href="#([^"]+)"/g)].map(match => match[1]);
assert.equal(menu.length, 8, 'Expected eight menu destinations');
for (const id of menu) assert(ids.includes(id), `Missing section: ${id}`);
const anchors = source => new Set([...source.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(match => match[1]));
const current = anchors(html);
for (const link of anchors(classic)) assert(current.has(link), `Original link lost: ${link}`);
for (const match of html.matchAll(/\b(?:src|href)="([^"#:]+)"/g)) {
  const path = match[1];
  if (!/^[a-z]+:/i.test(path)) await access(new URL(path, root));
}
assert(html.includes('<html lang="en">'), 'Language must be declared');
assert(html.includes('<noscript>'), 'No-JavaScript fallback must exist');
const css = await read('style.css');
assert(css.includes('prefers-reduced-motion'), 'Respect OS motion preference');
assert(css.includes(':focus-visible'), 'Visible keyboard focus required');
console.log('PASS: eight sections, unique IDs, preserved original links, local assets, language, no-JS fallback, reduced motion, keyboard focus.');
