const {chromium}=require('/opt/npm-tools/node_modules/playwright');
const F=[
 ['2-juego',{es:['¡Rompe líneas y haz COMBOS!','Bombas, rayos y bloques arcoíris'],en:['Break lines, chain COMBOS!','Bombs, lightning and rainbow blocks']},'rgba(255,106,26,.45)'],
 ['3-furia',{es:['¡MODO FURIA!','15 segundos de puntos x3'],en:['FURY MODE!','15 seconds of x3 points']},'rgba(255,60,20,.6)'],
 ['4-joyas',{es:['Gráficos que brillan','Joyas, neón, caramelo y más'],en:['Graphics that shine','Gems, neon, candy and more']},'rgba(150,80,255,.45)'],
 ['6-temas',{es:['6 temas para elegir','Cambia el estilo cuando quieras'],en:['6 themes to choose','Change the style anytime']},'rgba(255,150,40,.4)'],
 ['5-caramelo',{es:['Juega sin internet','Gratis y en 10 idiomas'],en:['Play offline','Free, in 10 languages']},'rgba(255,140,200,.45)'],
 ['7-sonidos',{es:['11 packs de sonido','¡Y pon tu propia música MP3!'],en:['11 sound packs','Plus your own MP3 music!']},'rgba(255,190,60,.4)'],
 ['1-menu',{es:['Regalo diario y misiones','Premios todos los días'],en:['Daily gifts and missions','Rewards every day']},'rgba(255,106,26,.45)'],
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const L of['es','en'])for(const[k,t,g]of F){const[h,s]=t[L];
 const lines=h.length>16?2:1;const st=70+lines*92+26, pt=st+90;
 const u=`file://${__dirname}/make.html?h=${encodeURIComponent(h)}&s=${encodeURIComponent(s)}&img=${L}-${k}.png&g=${encodeURIComponent(g)}`;
 await p.goto(u);await p.evaluate(([a,c])=>{document.body.style.setProperty('--st',a+'px');document.body.style.setProperty('--pt',c+'px')},[st,pt]);
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 const H=await p.evaluate(()=>document.getElementById('h').getBoundingClientRect().height);
 await p.evaluate((H)=>{const st=70+H+22;document.body.style.setProperty('--st',st+'px');document.body.style.setProperty('--pt',(st+92)+'px')},H);
 await p.screenshot({path:`${__dirname}/${L}-${k}.png`});}
await b.close()})();
