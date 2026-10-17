import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const source=await readFile(new URL('../intro.js',import.meta.url),'utf8');
async function setup(active=true){
 const handlers={},wh={},sh={},classes=new Set(active?['intro-ready']:[]);let timer,motion,focused=false,frames,animation;
 const image={naturalWidth:1000,naturalHeight:1400,decode:async()=>{}};
 const portrait={dataset:{},style:{removeProperty(){}},querySelector:()=>image,getBoundingClientRect:()=>({left:-40,top:-80,width:500,height:850}),animate:(f)=>{frames=f;return animation={cancel(){}}}};
 const intro={hidden:false},skip={addEventListener:(k,v)=>sh[k]=v};
 const document={documentElement:{classList:{contains:k=>classes.has(k),add:(...ks)=>ks.forEach(k=>classes.add(k)),remove:(...ks)=>ks.forEach(k=>classes.delete(k))}},activeElement:null,querySelector:s=>s==='.face-intro'?intro:s==='#skip-intro'?skip:s==='.portrait-wrap'?portrait:{focus:()=>focused=true},addEventListener:(k,v)=>handlers[k]=v,removeEventListener:k=>delete handlers[k]};
 vm.runInNewContext(source,{document,window:{addEventListener:(k,v)=>wh[k]=v},innerWidth:1200,innerHeight:760,matchMedia:()=>({addEventListener:(k,v)=>motion=v}),setTimeout:fn=>(timer=fn,1),clearTimeout(){}});await new Promise(resolve=>setImmediate(resolve));
 return{intro,skip,document,handlers,wh,sh,classes,frames,animation,timeout:()=>timer(),motion:()=>motion({matches:true}),focused:()=>focused};
}
assert((await setup(false)).intro.hidden);
for(const action of ['pointerdown','keydown']){const u=await setup();u.handlers[action]();assert(u.intro.hidden);assert(!u.classes.has('intro-ready'));}
let u=await setup();assert.equal(u.frames.at(-1).transform,'translate(0px, 0px) scale(1)');assert.equal(u.frames.length,2);u.animation.onfinish();assert(u.intro.hidden);
u=await setup();u.document.activeElement=u.skip;u.sh.click();assert(u.focused());
for(const action of ['timeout','motion']){u=await setup();u[action]();assert(u.intro.hidden);}
for(const action of ['hashchange','resize']){u=await setup();u.wh[action]();assert(u.intro.hidden);}
console.log('PASS: same-portrait identity endpoint, skip/focus, completion, timeout, reduced motion, hash and resize.');
