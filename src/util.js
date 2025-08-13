// helpers: RNG, AABB, misc. Short names aid minification.
export let seed=1;
export const rnd=n=>(seed=seed*16807%2147483647)/2147483647*n;
export const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export const lerp=(a,b,t)=>a+(b-a)*t;
