// ==========================================
// 🎮 ميزة لعبة الديناصور المتوازن
// الأمر: .ديناصور او .dino
// متوسط فاللول و كتصعاب تدريجيا
// ==========================================

let handler = async (m, { conn }) => {

    const data = Buffer.from(JSON.stringify({
        "response_id": "nixel-dino-balanced-ar",
        "sections": [
            {
                "view_model": {
                    "primitive": {
                        "__typename": "GenAIaeacdsnwHtmlPrimitive",
                        "payload": "<style>*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}</style>\n<body style=\"margin:0;background:transparent;font-family:Arial,sans-serif;color:#eee;touch-action:manipulation;cursor:pointer\">\n<div style=\"width:100%;max-width:720px;margin:auto;padding:16px;box-sizing:border-box\">\n<div style=\"background:rgba(0,200,150,.08);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(0,220,180,.25);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,200,150,.25)\">\n<div style=\"padding:18px 20px;border-bottom:1px solid rgba(0,220,180,.2);display:flex;justify-content:space-between;align-items:center\">\n<div><div style=\"font-size:11px;letter-spacing:1.5px;color:#00e6b8\">لعبة الديناصور</div><div style=\"font-size:22px;font-weight:bold;color:#fff\">NIXEL DINO PRO</div></div>\n<div style=\"text-align:right\"><div id=\"score\" style=\"font-size:20px;font-weight:bold;color:#fff;text-shadow:0 0 10px rgba(0,220,180,.85);transition:transform.15s\">00000</div><div id=\"best\" style=\"font-size:11px;color:rgba(255,255,255,.4);margin-top:2px\">أفضل نتيجة 00000</div></div>\n</div>\n<div style=\"padding:20px\">\n<canvas id=\"game\" width=\"680\" height=\"220\" style=\"width:100%;height:auto;background:linear-gradient(to bottom,#0a1a1a,#0f2a2a);border:1px solid rgba(0,220,180,.2);border-radius:12px;display:block\"></canvas>\n<div id=\"status\" style=\"text-align:center;margin-top:12px;font-size:13px;color:#00e6b8\">السرعة 5.0x | الوضع المتوازن</div>\n</div></div></div>\n<script>\nconst c=document.getElementById('game'),x=c.getContext('2d'),scoreEl=document.getElementById('score'),bestEl=document.getElementById('best'),statusEl=document.getElementById('status');\nconst GY=180;\nlet d,o,birds,clouds,particles,ambient,trail,score,best=0,speed,gameOver,last,shake,flash,runT,spawnTimer,milestone,squash,isDucking=false;\nfunction loadBest(){let vals=[];try{let v=localStorage.getItem('dino_best_ar');if(v)vals.push(parseInt(v,10))}catch(e){}return vals.length?Math.max(...vals.filter(v=>!isNaN(v))):0}\nfunction saveBest(v){let val=String(Math.floor(v));try{localStorage.setItem('dino_best_ar',val)}catch(e){}}\nbest=loadBest();\nfunction reset(){d={x:65,y:142,w:30,h:32,vy:0,jumping:false,duck:false};o=[];birds=[];clouds=[{x:120,y:40,w:50,s:.3},{x:350,y:60,w:70,s:.2},{x:520,y:35,w:45,s:.35},{x:650,y:80,w:55,s:.18}];particles=[];trail=[];if(!ambient){ambient=[];for(let i=0;i<20;i++)ambient.push({x:Math.random()*c.width,y:Math.random()*c.height,r:.5+Math.random()*1.8,vx:.1+Math.random()*.25,ph:Math.random()*10})}score=0;speed=5;gameOver=false;last=0;shake=0;flash=0;runT=0;milestone=0;squash=1;spawnTimer=65+Math.random()*25;isDucking=false;bestEl.textContent='أفضل نتيجة '+String(Math.floor(best)).padStart(5,'0');statusEl.textContent='السرعة 5.0x | الوضع المتوازن'}\nfunction burst(px,py,n,col,spd){for(let i=0;i<n;i++)particles.push({x:px,y:py,vx:(Math.random()-.5)*spd,vy:-Math.random()*spd,life:1,col,size:2+Math.random()*2})}\nfunction jumpDino(){if(gameOver){reset();return}if(!d.jumping&&!isDucking){d.jumping=true;d.vy=-14;squash=.75;burst(d.x+15,d.y+32,10,'255,255,255',4)}}\nfunction duck(press){if(gameOver)return;isDucking=press;d.duck=press;d.h=press?20:32;d.y=press?154:142}\nfunction cactus(){let h=26+Math.random()*26;o.push({type:'cactus',x:c.width+25,y:GY-h,w:18+Math.random()*8,h});if(Math.random()<.22){o.push({type:'cactus',x:c.width+25+35+Math.random()*10,y:GY-(20+Math.random()*18),w:18,h:20+Math.random()*18})}}\nfunction bird(){let birdY=[GY-90,GY-70,GY-50][Math.floor(Math.random()*3)];birds.push({x:c.width+30,y:birdY,w:36,h:26,flap:0})}\nfunction hit(a,b){return a.x+4<b.x+b.w&&a.x+a.w-4>b.x&&a.y+3<b.y+b.h&&a.y+a.h>b.y}\nfunction drawTrail(){trail.forEach((p,i)=>{x.fillStyle='rgba(0,220,180,'+(.2*(i/trail.length))+')';x.fillRect(p.x,p.y,30,32)})}\nfunction drawDino(){x.save();let cx=d.x+15,cy=d.y+16;x.translate(cx,cy);x.scale(1/squash,squash);x.translate(-cx,-cy);x.fillStyle='#e0fffa';x.fillRect(d.x,d.y,30,32);x.fillRect(d.x+24,d.y+6,14,18);x.fillStyle='#00e6b8';x.fillRect(d.x+32,d.y+9,4,4);x.fillStyle='#e0fffa';let leg=d.jumping?9:9+Math.sin(runT*.5)*4;if(d.duck){x.fillRect(d.x+5,d.y+30,8,6);x.fillRect(d.x+19,d.y+30,8,6)}else{x.fillRect(d.x+6,d.y+32,7,leg);x.fillRect(d.x+20,d.y+32,7,leg)}x.restore()}\nfunction drawCactus(q){x.save();x.shadowColor='rgba(0,220,180,.4)';x.shadowBlur=10;x.fillStyle='#00d4aa';x.fillRect(q.x,q.y,q.w,q.h);x.fillRect(q.x-8,q.y+q.h*0.4,8,6);x.fillRect(q.x+q.w,q.y+q.h*0.6,8,6);x.restore()}\nfunction drawBird(b){x.save();x.shadowColor='rgba(0,240,200,.5)';x.shadowBlur=10;x.fillStyle='#00e6b8';let wing=Math.sin(b.flap)*6;x.fillRect(b.x,b.y,b.w,b.h);x.fillRect(b.x-10,b.y+wing,10,5);x.fillRect(b.x+b.w,b.y-wing,10,5);x.restore()}\nfunction drawParticles(){particles.forEach(p=>{x.fillStyle='rgba('+p.col+','+Math.max(p.life,0)+')';x.fillRect(p.x,p.y,p.size,p.size)})}\nfunction drawAmbient(){ambient.forEach(p=>{let a=.12+Math.sin(runT*.05+p.ph)*.08;x.fillStyle='rgba(100,255,220,'+a+')';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()})}\nfunction draw(){x.clearRect(0,0,c.width,c.height);x.save();if(shake>0)x.translate((Math.random()-.5)*shake,(Math.random()-.5)*shake);drawAmbient();x.fillStyle='rgba(255,255,255,.3)';clouds.forEach(q=>{let b=Math.sin(runT*.03+q.x)*2;x.fillRect(q.x,q.y+b,q.w,6);x.fillRect(q.x+12,q.y+b-6,q.w*.45,12)});x.strokeStyle='rgba(0,220,180,.3)';x.lineWidth=2.5;x.setLineDash([12,9]);x.lineDashOffset=-runT*speed*.55;x.beginPath();x.moveTo(0,GY);x.lineTo(c.width,GY);x.stroke();x.setLineDash([]);drawTrail();drawDino();o.forEach(drawCactus);birds.forEach(drawBird);drawParticles();if(flash>0){x.fillStyle='rgba(0,200,150,'+(flash*.3)+')';x.fillRect(0,0,c.width,c.height)}x.restore();if(gameOver){x.fillStyle='rgba(0,20,20,.75)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#00e6b8';x.textAlign='center';x.font='bold 26px Arial';x.fillText('انتهت اللعبة',c.width/2,95);x.font='14px Arial';x.fillStyle='#fff';x.fillText('النتيجة: '+Math.floor(score),c.width/2,125);x.fillText('اضغط للعب مرة اخرى',c.width/2,150);x.textAlign='left'}}\nfunction loop(t){if(!last)last=t;let dt=Math.min((t-last)/16.67,2);last=t;runT+=dt;if(!gameOver){d.y+=d.vy*dt;d.vy+=.8*dt;if(d.y>= (d.duck?154:142)){if(d.jumping){burst(d.x+15,GY,10,'255,255,255',3.5);squash=1.35}d.y=(d.duck?154:142);d.vy=0;d.jumping=false}if(d.jumping)trail.push({x:d.x,y:d.y});if(trail.length>6)trail.shift();if(!d.jumping)trail.length=0;squash+=(1-squash)*.18*dt;if(!d.jumping&&Math.floor(runT)%8===0&&Math.random()<.35)burst(d.x+7,GY-2,1,'255,255,255',1.5);ambient.forEach(p=>{p.x-=p.vx*dt;if(p.x<-4)p.x=c.width+4});spawnTimer-=dt;if(spawnTimer<=0){if(Math.random()<0.65)cactus();else bird();spawnTimer=Math.max(38,60-speed*1.6)+Math.random()*22}o.forEach(q=>q.x-=speed*dt);o=o.filter(q=>q.x>-50);birds.forEach(b=>{b.x-=speed*1.2*dt;b.flap+=0.4*dt});birds=birds.filter(b=>b.x>-60);clouds.forEach(q=>{q.x-=q.s*dt;if(q.x<-90)q.x=c.width+Math.random()*120});particles.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=.32*dt;p.life-=.035*dt});particles=particles.filter(p=>p.life>0);speed=Math.min(14,speed+.003*dt);score+=dt*.7;if(score>best)best=score;if(Math.floor(score/250)>milestone){milestone=Math.floor(score/250);scoreEl.style.transform='scale(1.35)';setTimeout(()=>scoreEl.style.transform='scale(1)',150)}scoreEl.textContent=String(Math.floor(score)).padStart(5,'0');bestEl.textContent='أفضل نتيجة '+String(Math.floor(best)).padStart(5,'0');statusEl.textContent='السرعة '+speed.toFixed(1)+'x | الوضع المتوازن';for(const q of o)if(hit(d,q)){gameOver=true;shake=15;flash=1;saveBest(best);burst(d.x+15,d.y+16,20,'0,220,180',5)}for(const b of birds)if(hit(d,b)){gameOver=true;shake=15;flash=1;saveBest(best);burst(d.x+15,d.y+16,20,'0,220,180',5)}}\nif(shake>0)shake=Math.max(0,shake-.65*dt);if(flash>0)flash=Math.max(0,flash-.055*dt);draw();requestAnimationFrame(loop)}\ndocument.addEventListener('pointerdown',jumpDino);document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();jumpDino()}if(e.code==='ArrowDown'){duck(true)}});document.addEventListener('keyup',e=>{if(e.code==='ArrowDown'){duck(false)}});reset();requestAnimationFrame(loop);\n</script></body>",
                        "trusted_sources": ["nixel.dev"]
                    },
                    "__typename": "GenAISingleLayoutViewModel"
                }
            }
        ]
    })).toString('base64')

    await conn.relayMessage(m.chat, {
        messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
        },
        botForwardedMessage: {
            message: {
                richResponseMessage: {
                    messageType: 1,
                    submessages: [{ messageType: 2, messageText: "🎮 لعبة الديناصور المتوازن" }],
                    unifiedResponse: { data },
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardOrigin: 4
                    }
                }
            }
        }
    }, {})

}

// ==========================================
// إعدادات الميزة
// ==========================================
handler.help = ['ديناصور', 'dino']
handler.tags = ['لعبة']
handler.command = /^(ديناصور|dino)$/i
handler.limit = false

export default handler
