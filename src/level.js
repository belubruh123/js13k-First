// tiny tile map + collision helpers
import {hit} from './util.js';
const raw=[
'################',
'#..............#',
'#..K.......D...#',
'#..............#',
'#....G.........#',
'#........T.....#',
'#P.............#',
'################'
];
export class Level{
 constructor(){
  this.t=16;this.map=raw.map(r=>r.split(''));this.h=this.map.length;this.w=this.map[0].length;
  this.guards=[];this.torches=[];
  for(let y=0;y<this.h;y++)for(let x=0;x<this.w;x++){
   const c=this.map[y][x];
   if(c=='P'){this.start={x:x*this.t,y:y*this.t};this.map[y][x]='.';}
   if(c=='G'){this.guards.push({x:x*this.t,y:y*this.t,dir:1});this.map[y][x]='.';}

   if(c=='T'){this.torches.push({x:x*this.t,y:y*this.t});this.map[y][x]='.';}
  }
 }
 solid(px,py){const x=Math.floor(px/this.t),y=Math.floor(py/this.t);return this.map[y]&&this.map[y][x]=='#';}
 collide(r){const t=this.t;for(let y=r.y;y<r.y+r.h;y+=t)for(let x=r.x;x<r.x+r.w;x+=t)if(this.solid(x,y))return 1;return 0;}

}
export const level=new Level();
