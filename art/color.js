function hex(h){h=h.replace('#','');const n=parseInt(h,16);return[n>>16&255,n>>8&255,n&255]}
function mix(h,t,a){const p=hex(h),q=hex(t);return'#'+p.map((v,i)=>Math.round(v+(q[i]-v)*a).toString(16).padStart(2,'0')).join('')}
const L=(h,a)=>mix(h,'#ffffff',a), D=(h,a)=>mix(h,'#000000',a);
const A=(h,a)=>{const[r,g,b]=hex(h);return`rgba(${r},${g},${b},${a})`};
function rr(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
