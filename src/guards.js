// guard AI: simple patrol + vision cone detection
export const makeGuards=lvl=>lvl.guards.map(p=>({...p,w:12,h:12,seen:0}));
export function updateGuards(gs,lvl,cat){let alert=0;for(const g of gs){
 g.x+=g.dir;
 if(lvl.collide(g))g.x-=g.dir,g.dir*=-1;
 const dx=cat.x-g.x,dy=cat.y-g.y,dist=Math.hypot(dx,dy);
 if(dist<80&&dx*g.dir>0&&Math.abs(Math.atan2(dy,dx))<.5){alert=1;g.seen=20;}
 if(g.seen)g.seen--;}
 return alert;
}
