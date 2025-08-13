// rendering routines: shapes, parallax, flicker
import {rnd} from './util.js';
export function draw(ctx,cat,guards,lvl,state,flash){
 const w=ctx.canvas.width,h=ctx.canvas.height,cam=cat.x-w/2;
 ctx.fillStyle='#001';ctx.fillRect(0,0,w,h);
 ctx.fillStyle='#012';ctx.fillRect(-cam*.3,0,w,h);
 ctx.fillStyle='#023';ctx.fillRect(-cam*.6,20,w,h-20);
 for(let y=0;y<lvl.h;y++)for(let x=0;x<lvl.w;x++)if(lvl.map[y][x]=='#'){
  ctx.fillStyle='#334';ctx.fillRect(x*lvl.t-cam,y*lvl.t,lvl.t,lvl.t);}
 if(!lvl.key.got){ctx.fillStyle='#fc0';ctx.fillRect(lvl.key.x-cam+4,lvl.key.y+4,8,8);}
 ctx.fillStyle=lvl.door.open?'#2a2':'#642';ctx.fillRect(lvl.door.x-cam,lvl.door.y,lvl.t,lvl.t);
 for(const t of lvl.torches){ctx.save();ctx.globalAlpha=.5+rnd(.5);ctx.fillStyle='#fa0';ctx.beginPath();ctx.arc(t.x-cam+8,t.y+8,8,0,7);ctx.fill();ctx.restore();}
 ctx.fillStyle='#000';ctx.fillRect(cat.x-cam,cat.y,cat.w,cat.h);
 ctx.strokeStyle='#000';ctx.beginPath();const tx=cat.x-cam+cat.w/2,ty=cat.y+cat.h/2;ctx.moveTo(tx,ty);ctx.lineTo(tx+8*Math.sin(cat.tail),ty+4*Math.cos(cat.tail));ctx.stroke();
 for(const g of guards){ctx.fillStyle='#aa8';ctx.fillRect(g.x-cam,g.y,g.w,g.h);ctx.save();ctx.translate(g.x-cam+g.w/2,g.y+g.h/2);ctx.rotate(g.dir>0?0:Math.PI);ctx.fillStyle='rgba(255,255,200,.2)';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(60,20);ctx.lineTo(60,-20);ctx.fill();ctx.restore();if(g.seen)ctx.fillText('!',g.x-cam+4,g.y-4);}
 if(flash){ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(0,0,w,h);}
 ctx.fillStyle='#fff';ctx.font='10px sans-serif';
 if(state=='start'){ctx.fillText('Arrows/WASD move, Space jump',20,40);ctx.fillText('Grab key, avoid guards, reach door',20,60);}
 if(state=='win'){ctx.fillText('Heist complete! Press R',20,40);}
}
