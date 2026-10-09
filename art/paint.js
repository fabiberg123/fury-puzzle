/* ================= DIBUJO DE BLOQUES ================= */
function bevel(g,x,y,w,r,b,c,t,l,ri,bo){
  g.save();rr(g,x,y,w,w,r);g.clip();g.fillStyle=c;g.fillRect(x,y,w,w);
  const P=(pts,col)=>{g.beginPath();g.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)g.lineTo(pts[i],pts[i+1]);g.closePath();g.fillStyle=col;g.fill()};
  P([x,y,x+w,y,x+w-b,y+b,x+b,y+b],t);P([x+w,y,x+w,y+w,x+w-b,y+w-b,x+w-b,y+b],ri);
  P([x,y+w,x+w,y+w,x+w-b,y+w-b,x+b,y+w-b],bo);P([x,y,x,y+w,x+b,y+w-b,x+b,y+b],l);
  g.restore();
}
function star(g,cx,cy,s,a){g.save();g.globalAlpha=a;g.fillStyle='#fff';g.beginPath();g.moveTo(cx,cy-s);g.quadraticCurveTo(cx,cy,cx+s,cy);g.quadraticCurveTo(cx,cy,cx,cy+s);g.quadraticCurveTo(cx,cy,cx-s,cy);g.quadraticCurveTo(cx,cy,cx,cy-s);g.fill();g.restore()}
function paintBlock(g,s,col,style,seed){
  let m=s*.045,x=m,y=m,w=s-2*m;
  switch(style){
  case 'gloss':{
    rr(g,x,y,w,w,s*.16);g.fillStyle=D(col,.5);g.fill();
    x+=s*.02;y+=s*.02;w-=s*.04;
    bevel(g,x,y,w,s*.14,w*.14,col,L(col,.38),L(col,.16),D(col,.18),D(col,.34));
    const b=w*.14,gr=g.createLinearGradient(0,y+b,0,y+w-b);gr.addColorStop(0,L(col,.14));gr.addColorStop(1,D(col,.06));
    g.fillStyle=gr;rr(g,x+b,y+b,w-2*b,w-2*b,s*.05);g.fill();
    g.fillStyle='rgba(255,255,255,.28)';g.beginPath();g.ellipse(x+w*.42,y+w*.3,w*.26,w*.09,-.35,0,7);g.fill();
    break;}
  case 'gem':{
    rr(g,x,y,w,w,s*.06);g.fillStyle=D(col,.55);g.fill();
    x+=s*.02;y+=s*.02;w-=s*.04;const b=w*.24;
    bevel(g,x,y,w,s*.05,b,col,L(col,.5),L(col,.22),D(col,.22),D(col,.45));
    const gr=g.createLinearGradient(x+b,y+b,x+w-b,y+w-b);gr.addColorStop(0,L(col,.3));gr.addColorStop(.55,col);gr.addColorStop(1,D(col,.15));
    g.fillStyle=gr;g.fillRect(x+b,y+b,w-2*b,w-2*b);
    g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(1,s*.015);g.strokeRect(x+b,y+b,w-2*b,w-2*b);
    star(g,x+b+w*.12,y+b+w*.12,w*.11,.9);
    break;}
  case 'neon':{
    m=s*.14;x=m;y=m;w=s-2*m;
    g.save();g.shadowColor=col;g.shadowBlur=s*.14;
    rr(g,x,y,w,w,s*.12);g.fillStyle=A(col,.2);g.fill();
    g.lineWidth=s*.075;g.strokeStyle=col;g.stroke();g.restore();
    g.lineWidth=s*.03;g.strokeStyle=L(col,.65);rr(g,x,y,w,w,s*.12);g.stroke();
    rr(g,x+w*.3,y+w*.3,w*.4,w*.4,s*.05);g.fillStyle=A(L(col,.5),.55);g.fill();
    break;}
  case 'candy':{
    const r=s*.3;rr(g,x,y+s*.04,w,w-s*.04,r);g.fillStyle=D(col,.18);g.fill();
    const gr=g.createRadialGradient(x+w*.4,y+w*.3,w*.05,x+w*.5,y+w*.45,w*.75);gr.addColorStop(0,L(col,.45));gr.addColorStop(.6,col);gr.addColorStop(1,D(col,.06));
    rr(g,x,y,w,w-s*.08,r);g.fillStyle=gr;g.fill();
    rr(g,x+w*.17,y+w*.12,w*.42,w*.14,w*.07);g.fillStyle='rgba(255,255,255,.75)';g.fill();
    g.beginPath();g.arc(x+w*.72,y+w*.2,w*.05,0,7);g.fill();
    break;}
  case 'bubble':{
    const r=s*.28;const gr=g.createRadialGradient(x+w*.35,y+w*.3,w*.04,x+w*.5,y+w*.5,w*.72);
    gr.addColorStop(0,L(col,.6));gr.addColorStop(.5,col);gr.addColorStop(1,D(col,.35));
    rr(g,x,y,w,w,r);g.fillStyle=gr;g.fill();
    g.lineWidth=s*.03;g.strokeStyle=A(L(col,.6),.7);g.stroke();
    g.fillStyle='rgba(255,255,255,.8)';g.beginPath();g.ellipse(x+w*.32,y+w*.26,w*.13,w*.08,-.6,0,7);g.fill();
    g.beginPath();g.arc(x+w*.55,y+w*.2,w*.035,0,7);g.fill();
    break;}
  case 'wood':{
    rr(g,x,y,w,w,s*.1);g.fillStyle=D(col,.45);g.fill();
    x+=s*.02;y+=s*.02;w-=s*.04;
    g.save();rr(g,x,y,w,w,s*.09);g.clip();
    const gr=g.createLinearGradient(0,y,0,y+w);gr.addColorStop(0,L(col,.12));gr.addColorStop(1,D(col,.12));g.fillStyle=gr;g.fillRect(x,y,w,w);
    g.strokeStyle=A(D(col,.4),.35);g.lineWidth=Math.max(1,s*.018);
    for(let i=0;i<6;i++){g.beginPath();const yy=y+w*(.1+i*.16);for(let k=0;k<=12;k++){const xx=x+w*k/12;const v=yy+Math.sin(k*.9+seed*1.7+i*2.1)*w*.03;k?g.lineTo(xx,v):g.moveTo(xx,v)}g.stroke()}
    g.restore();
    const b=w*.09;
    g.fillStyle='rgba(255,255,255,.2)';g.fillRect(x+b,y,w-2*b,b*.8);
    g.fillStyle='rgba(0,0,0,.25)';g.fillRect(x+b,y+w-b*.8,w-2*b,b*.8);
    break;}
  }
}
