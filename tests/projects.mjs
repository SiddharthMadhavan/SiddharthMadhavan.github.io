import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const [main,classic] = await Promise.all(['index.html','classic.html'].map(p=>readFile(new URL('../'+p,import.meta.url),'utf8')));
const section = s=>s.match(/<section[^>]*id="projects"[^>]*>[\s\S]*?<\/section>/)[0];
const original = section(classic);
assert.equal((section(main).match(/class="project-item /g)||[]).length,12);
for(const p of original.matchAll(/<p\b[^>]*>[\s\S]*?<\/p>/g)) assert(section(main).includes(p[0]), 'Source project paragraph retained: '+p[0]);
for(const a of original.matchAll(/href="([^"]+)"/g)) assert(section(main).includes(a[0]), 'Source project link retained: '+a[1]);
for(const slug of ['vredefort','heatwatch','chip8-emulator','bits-and-bobs-deployment','weblogv3','finalproject1','unveil','fused-into-development']) assert(section(main).includes('https://github.com/SiddharthMadhavan/'+slug));
assert(section(main).includes('not a validated fire alarm'));
assert(section(main).includes('TatHack-Tathva'));
assert(section(main).includes('Team-built'));
assert(section(main).includes('Top 27 of ~250 · Tathack Finals'));
assert(section(main).includes('SIH · Results Awaited'));
console.log('PASS: twelve projects, all original project paragraphs/links, prototype and collaboration attribution.');
for(const content of [main,classic]) {
 assert(content.includes('approximately 10,000 applicants'));
 assert(content.includes('approximately 250 teams'));
}
