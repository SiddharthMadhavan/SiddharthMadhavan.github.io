import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../music.js',import.meta.url),'utf8');
function setup(saved={},reject=false){
 const events={},ae={},status={textContent:''};
 const element=()=>({nodes:{},attrs:{},handlers:{},classList:{toggle(){}},querySelector(s){return this.nodes[s]??={}},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,v){this.handlers[k]=v}});
 const buttons=[element(),element()],record=element();
 const audio={paused:true,muted:false,plays:0,async play(){this.plays++;if(reject)throw Error('blocked');this.paused=false;ae.play?.()},pause(){this.paused=true;ae.pause?.()},addEventListener:(k,v)=>ae[k]=v};
 vm.runInNewContext(source,{document:{querySelector:s=>s==='#background-music'?audio:s==='.vinyl-control'?record:status,querySelectorAll:()=>buttons,addEventListener:(k,v)=>events[k]=v},window:{PortfolioAudio:{context:async()=>({})}},localStorage:{getItem:k=>saved[k],setItem:(k,v)=>saved[k]=v}});
 return{events,audio,buttons,record,status};
}
const tick=()=>new Promise(r=>setImmediate(r));const event={isTrusted:true,target:{closest:()=>null}};
let saved={},u=setup(saved);assert(u.audio.paused);u.events.pointerdown(event);await tick();assert(!u.audio.paused);assert.equal(u.audio.plays,1);
u.record.handlers.click();assert(u.audio.paused);assert.equal(saved['portfolio-music-paused'],'true');u.events.pointerdown(event);await tick();assert(u.audio.paused);
u.record.handlers.click();await tick();assert(!u.audio.paused);u.buttons[0].handlers.click();assert(u.audio.muted&&u.audio.paused);assert.equal(saved['portfolio-music-muted'],'true');
u=setup(saved);u.events.pointerdown(event);await tick();assert(u.audio.paused);u.record.handlers.click();await tick();assert(!u.audio.paused&&!u.audio.muted);
u=setup({},true);u.record.handlers.click();await tick();assert(u.audio.paused);assert(u.status.textContent.includes('record'));
console.log('PASS: no autoplay, shared-engine playback, vinyl pause persists across interactions/reload, mute, rejection.');
