'use strict';
(() => {
 const scenes=[...document.querySelectorAll('.scene')],menu=[...document.querySelectorAll('.menu-item')];
 const aliases={persona:'about',current:'about',achievements:'about',education:'about',coursework:'skills',system:'about'};
 const motion=document.querySelector('#motion-toggle'),os=matchMedia('(prefers-reduced-motion: reduce)');
 let selected=0,current='home',reduced=false,timer,end;
 const sound=detail=>document.dispatchEvent(new CustomEvent('portfolio:sound',{detail}));
 const select=(index,focus=false)=>{const old=selected;selected=(index+menu.length)%menu.length;menu.forEach((a,i)=>{a.classList.toggle('is-selected',i===selected);if(i===selected)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});document.querySelector('#selection-description').textContent=menu[selected].dataset.description;if(old!==selected)sound('hover');if(focus)menu[selected].focus({preventScroll:true})};
 const resolve=()=>{const id=location.hash.slice(1);return aliases[id]||(scenes.some(s=>s.id===id)?id:'home')};
 const show=(id,focus)=>{current=id;document.body.dataset.scene=id;scenes.forEach(s=>{s.hidden=s.id!==id;s.classList.toggle('is-active',s.id===id)});document.querySelectorAll('.scene-nav nav a').forEach(a=>{if(a.hash==='#'+id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});const hash=location.hash.slice(1),chapter=aliases[hash]&&document.getElementById(hash);if(chapter){if(chapter.tagName==='DETAILS')chapter.open=true;chapter.scrollIntoView({block:'start'})}else{const scroll=document.querySelector('#'+id+' .scene-scroll');if(scroll)scroll.scrollTop=0}if(focus){const target=chapter||(id==='home'?menu[selected]:document.querySelector('#'+id+' h2'));if(target.tagName!=='A')target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}};
 const route=(focus=true)=>{const id=resolve();clearTimeout(timer);clearTimeout(end);document.body.classList.remove('is-transitioning');if(id===current){show(id,focus);return}if(reduced||os.matches){show(id,focus);return}void document.body.offsetWidth;document.body.classList.add('is-transitioning');timer=setTimeout(()=>show(id,focus),350);end=setTimeout(()=>document.body.classList.remove('is-transitioning'),850)};
 const back=()=>{if(current==='home')return;sound('close');location.hash='home'};
 menu.forEach((a,i)=>{a.addEventListener('pointerenter',()=>select(i));a.addEventListener('focus',()=>select(i))});
 document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>sound(a.hash==='#home'?'close':'select')));
 document.querySelector('#back-home').addEventListener('click',back);
 document.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey)return;if(e.key==='Escape'){e.preventDefault();back();return}if(current!=='home'||e.target.closest('input,textarea,select,button'))return;if(['ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();select(selected+(e.key==='ArrowDown'?1:-1),true)}if(e.key==='Enter'&&(e.target===document.body||e.target===document.documentElement)){e.preventDefault();menu[selected].click()}});
 const setMotion=value=>{reduced=value;document.body.classList.toggle('reduce-motion',value);motion.setAttribute('aria-pressed',String(value));motion.querySelector('span').textContent=value?'On':'Off';if(reduced||os.matches){clearTimeout(timer);clearTimeout(end);document.body.classList.remove('is-transitioning');show(resolve(),false)}};
 try{setMotion(localStorage.getItem('portfolio-reduce-motion')==='true')}catch{setMotion(false)}
 motion.addEventListener('click',()=>{setMotion(!reduced);try{localStorage.setItem('portfolio-reduce-motion',String(reduced))}catch{}});os.addEventListener('change',()=>setMotion(reduced));
 document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const d=new FormData(form);document.querySelector('#compose-status').textContent='Opening your email app. Review and send there, or use the email link below.';location.href='mailto:siddharth.madhavan2007@gmail.com?subject='+encodeURIComponent('Portfolio collaboration — '+d.get('name'))+'&body='+encodeURIComponent('From: '+d.get('name')+' <'+d.get('email')+'>\n\n'+d.get('message'))});
 window.addEventListener('hashchange',()=>route());select(0);show(resolve(),false);
})();
