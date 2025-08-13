// rendering routines: shapes, parallax, flicker, menus
import {rnd} from './util.js';
export function draw(ctx,cat,guards,lvl,state,flash){
 const w=ctx.canvas.width,h=ctx.canvas.height;
 if(state=='menu'||state=='help'){
  ctx.fillStyle='#001';ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#fff';ctx.textAlign='left';
  if(state=='menu'){
   ctx.font='16px sans-serif';
   ctx.fillText("Black Cat's Moonlight Heist",20,60);
   ctx.font='10px sans-serif';
   ctx.fillText('Press Enter to start',20,90);
   ctx.fillText('Press H for how to play',20,110);
  }else{
   ctx.font='14px sans-serif';
   ctx.fillText('How to Play',20,40);
   ctx.font='10px sans-serif';
   ctx.fillText('Move: Arrow keys or WASD',20,70);
   ctx.fillText('Jump: Space',20,85);
   ctx.fillText('Steal the Moonlight Diamond and reach the exit',20,100);
   ctx.fillText('Avoid guards and their cones of light',20,115);
   ctx.fillText('Press Esc to return',20,140);
  }
  return;
 }
 const cam=cat.x-w/2;
 ctx.fillStyle='#001';ctx.fillRect(0,0,w,h);
 ctx.fillStyle='#012';ctx.fillRect(-cam*.3,0,w,h);
 ctx.fillStyle='#023';ctx.fillRect(-cam*.6,20,w,h-20);
 for(let y=0;y<lvl.h;y++)for(let x=0;x<lvl.w;x++)if(lvl.map[y][x]=='#'){
  ctx.fillStyle='#334';ctx.fillRect(x*lvl.t-cam,y*lvl.t,lvl.t,lvl.t);}
 if(!lvl.gem.taken){ctx.fillStyle='#fc0';ctx.fillRect(lvl.gem.x-cam+4,lvl.gem.y+4,8,8);}
 ctx.fillStyle=lvl.exit.open?'#2a2':'#642';ctx.fillRect(lvl.exit.x-cam,lvl.exit.y,lvl.t,lvl.t);
 for(const t of lvl.torches){ctx.save();ctx.globalAlpha=.5+rnd(.5);ctx.fillStyle='#fa0';ctx.beginPath();ctx.arc(t.x-cam+8,t.y+8,8,0,7);ctx.fill();ctx.restore();}
 ctx.fillStyle='#000';ctx.fillRect(cat.x-cam,cat.y,cat.w,cat.h);
 ctx.strokeStyle='#000';ctx.beginPath();const tx=cat.x-cam+cat.w/2,ty=cat.y+cat.h/2;ctx.moveTo(tx,ty);ctx.lineTo(tx+8*Math.sin(cat.tail),ty+4*Math.cos(cat.tail));ctx.stroke();
 for(const g of guards){ctx.fillStyle='#aa8';ctx.fillRect(g.x-cam,g.y,g.w,g.h);ctx.save();ctx.translate(g.x-cam+g.w/2,g.y+g.h/2);ctx.rotate(g.dir>0?0:Math.PI);ctx.fillStyle='rgba(255,255,200,.2)';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(60,20);ctx.lineTo(60,-20);ctx.fill();ctx.restore();if(g.seen)ctx.fillText('!',g.x-cam+4,g.y-4);}
 if(flash){ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(0,0,w,h);}
 ctx.fillStyle='#fff';ctx.font='10px sans-serif';
 if(state=='intro'){
  ctx.fillText('Baron Grimalkin hoards the Moonlight Diamond...',20,40);
  ctx.fillText('Nox slips inside to reclaim it.',20,55);
 }
 if(state=='win'){
  ctx.fillText('Moonlight Diamond secured! R=retry M=menu',20,40);
 }
}
