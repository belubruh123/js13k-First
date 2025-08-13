// player controller with simple physics and tail sway
export class Cat{
 constructor(lvl){this.w=12;this.h=12;this.x=lvl.start.x;this.y=lvl.start.y;this.vx=0;this.vy=0;this.tail=0;}
 update(inp,lvl){const g=.4,spd=1.5,jmp=6;this.tail+=.1;
  this.vx=(inp.r-inp.l)*spd;
  if(inp.u&&this.onGround)this.vy=-jmp;
  this.vy+=g;
  let nx=this.x+this.vx,ny=this.y+this.vy;
  if(lvl.collide({x:nx,y:this.y,w:this.w,h:this.h}))nx=this.x;
  if(lvl.collide({x:nx,y:ny,w:this.w,h:this.h})){
    if(this.vy>0){ny=Math.floor((this.y+this.h)/lvl.t)*lvl.t-this.h;this.onGround=1;}this.vy=0;
  }else this.onGround=0;
  this.x=nx;this.y=ny;
 }
 get rect(){return{x:this.x,y:this.y,w:this.w,h:this.h};}
}
