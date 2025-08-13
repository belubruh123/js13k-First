// main loop & state handling
import {Cat} from './cat.js';
import {level} from './level.js';
import {makeGuards,updateGuards} from './guards.js';
import {draw} from './draw.js';
const c=document.getElementById('c'),ctx=c.getContext('2d');
c.width=320;c.height=180;
let inp={l:0,r:0,u:0},state='start',flash=0;
let cat=new Cat(level),guards=makeGuards(level);
function reset(){cat=new Cat(level);guards=makeGuards(level);state='start';}
document.addEventListener('keydown',e=>{
 const k=e.key; if(k=='ArrowLeft'||k=='a')inp.l=1; if(k=='ArrowRight'||k=='d')inp.r=1; if(k=='ArrowUp'||k=='w'||k==' ')inp.u=1;
 if(state=='start')state='play'; if(state=='win'&&k=='r')reset();});
document.addEventListener('keyup',e=>{const k=e.key;if(k=='ArrowLeft'||k=='a')inp.l=0;if(k=='ArrowRight'||k=='d')inp.r=0;if(k=='ArrowUp'||k=='w'||k==' ')inp.u=0;});
let last=0,acc=0,step=16;function loop(t){acc+=t-last;last=t;while(acc>step){if(state=='play'){cat.update(inp,level);if(level.collect(cat.rect))state='win';if(updateGuards(guards,level,cat))flash=5;}acc-=step;}draw(ctx,cat,guards,level,state,flash);if(flash)flash--;requestAnimationFrame(loop);}requestAnimationFrame(loop);
