// main loop, menu, and state handling
import {Cat} from './cat.js';
import {level} from './level.js';
import {makeGuards,updateGuards} from './guards.js';
import {draw} from './draw.js';
const c=document.getElementById('c'),ctx=c.getContext('2d');
c.width=320;c.height=180;
let inp={l:0,r:0,u:0},state='menu',flash=0,introTimer=0;
let cat=new Cat(level),guards=makeGuards(level);
function reset(){cat=new Cat(level);guards=makeGuards(level);state='menu';}
function startGame(){cat=new Cat(level);guards=makeGuards(level);cat.y-=40;cat.vy=0;cat.onGround=0;introTimer=60;state='intro';}
document.addEventListener('keydown',e=>{
 const k=e.key;
 if(state=='play'){
  if(k=='ArrowLeft'||k=='a')inp.l=1;
  if(k=='ArrowRight'||k=='d')inp.r=1;
  if(k=='ArrowUp'||k=='w'||k==' ')inp.u=1;
  if(k=='m')reset();
 }
 if(state=='menu'){
  if(k=='Enter'||k==' ')startGame();
  if(k=='h'||k=='H')state='help';
 }
 else if(state=='help' && k=='Escape')state='menu';
 else if(state=='intro' && (k==' '||k=='Enter'))introTimer=0;
 else if(state=='win'){
  if(k=='r')startGame();
  if(k=='m')reset();
 }
});
document.addEventListener('keyup',e=>{
 const k=e.key;
 if(state=='play'){
  if(k=='ArrowLeft'||k=='a')inp.l=0;
  if(k=='ArrowRight'||k=='d')inp.r=0;
  if(k=='ArrowUp'||k=='w'||k==' ')inp.u=0;
 }
});
let last=0,acc=0,step=16;function loop(t){acc+=t-last;last=t;while(acc>step){
 if(state=='play'){
  cat.update(inp,level);
  if(level.collect(cat.rect))state='win';
  if(updateGuards(guards,level,cat))flash=5;
 }
 else if(state=='intro'){
  updateGuards(guards,level,{x:-999,y:-999,w:0,h:0});
  cat.update({l:0,r:0,u:0},level);
  if(cat.onGround&&--introTimer<=0)state='play';
 }
 acc-=step;
 }
 draw(ctx,cat,guards,level,state,flash);
 if(flash)flash--;
 requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
