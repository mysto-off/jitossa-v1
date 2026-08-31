let handler = async (m, { conn }) => {
    await conn.relayMessage(
      m.chat,
      {
        messageContextInfo: {
          messageSecret: "LhY3DmZsvkjpOYg3eZ1/EKUqVG7CkQk9O9LukkVmesM="
        },
        botForwardedMessage: {
          message: {
            richResponseMessage: {
              messageType: 1,
              submessages: [
                {
                  messageType: 2,
                  messageText: "MEGUMIN NEON PONG"
                }
              ],
              unifiedResponse: {
                data: Buffer.from(JSON.stringify({
                  "response_id": "4962df66-f8ec-4b6d-a067-9d30faa6b0d5",
                  "sections": [
                    {
                      "view_model": {
                        "primitive": {
                          "__typename": "GenAIaeacdsnwHtmlPrimitive",
                          "payload": "<style>*{-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;box-sizing:border-box}body{margin:0;background:transparent;font-family:Arial,sans-serif;color:#e8edf0;touch-action:manipulation}.wrap{width:100%;max-width:620px;margin:auto;padding:16px}.card{background:rgba(29,40,47,.97);border:1px solid rgba(255,255,255,.13);border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.35)}.head{padding:17px 20px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;gap:12px}.brand{font-size:10px;letter-spacing:1.5px;color:rgba(255,255,255,.42)}.title{font-size:21px;font-weight:bold;color:#fff}.stats{display:flex;gap:15px;text-align:right}.value{font:700 18px monospace;color:#fff}.label{font-size:8px;color:rgba(255,255,255,.38);letter-spacing:1px}.main{padding:16px}.board{position:relative;background:rgba(4,9,12,.35);border:1px solid rgba(255,255,255,.09);border-radius:12px;overflow:hidden}.board canvas{display:block;width:100%;height:auto}.controls{display:flex;gap:8px;margin-top:10px;justify-content:center}.button{min-height:45px;border:1px solid rgba(255,255,255,.15);border-radius:9px;color:#fff;font-weight:bold;font-size:12px;background:rgba(255,255,255,.07);padding:0 16px}.primary{background:linear-gradient(135deg,rgba(124,84,227,.75),rgba(58,125,191,.7));border-color:rgba(158,133,255,.65)}.status{text-align:center;font:10px monospace;color:rgba(255,255,255,.45);margin-top:10px;min-height:12px}.overlay{position:absolute;inset:0;background:rgba(8,14,18,.82);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;z-index:5}.overlay.hidden{display:none}.overlay-title{font-size:25px;font-weight:bold;letter-spacing:1px}.overlay-sub{font-size:11px;color:rgba(255,255,255,.52);margin-top:8px}.board{touch-action:none}.button{touch-action:none}.move{min-width:72px;font-size:18px}</style><body><div class=\"wrap\"><div class=\"card\"><div class=\"head\"><div><div class=\"brand\">MEGUMIN ARCADE</div><div class=\"title\">NEON PONG</div></div><div class=\"stats\"><div><div class=\"label\">VOCÊ</div><div class=\"value\" id=\"player\">00</div></div><div><div class=\"label\">CPU</div><div class=\"value\" id=\"cpu\">00</div></div></div></div><div class=\"main\"><div class=\"board\" id=\"board\"><canvas id=\"game\" width=\"560\" height=\"300\"></canvas><div class=\"overlay\" id=\"overlay\"><div class=\"overlay-title\" id=\"overTitle\">NEON PONG</div><div class=\"overlay-sub\" id=\"overSub\">PRIMEIRO A 5 VENCE</div><button class=\"button primary\" id=\"start\" style=\"margin-top:15px\">COMEÇAR</button></div></div><div class=\"controls\"><button class=\"button move\" data-move=\"up\">&#9650;</button><button class=\"button move\" data-move=\"down\">&#9660;</button></div><div class=\"status\">ARRASTE OU MOVA SUA RAQUETE</div></div></div></div><script>const c=document.getElementById('game'),x=c.getContext('2d'),boardEl=document.getElementById('board'),overlay=document.getElementById('overlay'),playerEl=document.getElementById('player'),cpuEl=document.getElementById('cpu');let playerY=120,cpuY=120,ball,ps=0,cs=0,playing=false,last=0,move=0;function ui(){playerEl.textContent=String(ps).padStart(2,'0');cpuEl.textContent=String(cs).padStart(2,'0')}function serve(dir){ball={x:280,y:150,vx:dir*3.2,vy:(Math.random()*3)-1.5}}function reset(){playerY=120;cpuY=120;ps=0;cs=0;serve(Math.random()>.5?1:-1);playing=true;last=0;overlay.classList.add('hidden');ui()}function finish(won){playing=false;document.getElementById('overTitle').textContent=won?'VOCÊ VENCEU':'CPU VENCEU';document.getElementById('overSub').textContent='PLACAR '+ps+' × '+cs;document.getElementById('start').textContent='JOGAR NOVAMENTE';overlay.classList.remove('hidden')}function point(cpu){if(cpu)cs++;else ps++;ui();if(ps>=5||cs>=5)return finish(ps>=5);serve(cpu?-1:1)}function update(dt){playerY=Math.max(0,Math.min(240,playerY+move*4.5*dt));cpuY+=Math.max(-2.6,Math.min(2.6,ball.y-(cpuY+30)))*dt;cpuY=Math.max(0,Math.min(240,cpuY));ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;if(ball.y<7){ball.y=7;ball.vy=Math.abs(ball.vy)}if(ball.y>293){ball.y=293;ball.vy=-Math.abs(ball.vy)}if(ball.vx<0&&ball.x<31&&ball.x>18&&ball.y>playerY&&ball.y<playerY+60){ball.x=31;ball.vx=Math.abs(ball.vx)*1.015;ball.vy+=(ball.y-(playerY+30))*.06}if(ball.vx>0&&ball.x>529&&ball.x<542&&ball.y>cpuY&&ball.y<cpuY+60){ball.x=529;ball.vx=-Math.abs(ball.vx)*1.015;ball.vy+=(ball.y-(cpuY+30))*.06}if(ball.x<-12)point(true);if(ball.x>572)point(false)}function draw(){x.fillStyle='#07131a';x.fillRect(0,0,560,300);x.setLineDash([8,10]);x.strokeStyle='rgba(255,255,255,.18)';x.beginPath();x.moveTo(280,0);x.lineTo(280,300);x.stroke();x.setLineDash([]);x.shadowBlur=12;x.shadowColor='#58d3ff';x.fillStyle='#e8f8ff';x.fillRect(18,playerY,10,60);x.shadowColor='#ff6ea8';x.fillRect(532,cpuY,10,60);x.shadowColor='#ffd166';x.beginPath();x.arc(ball.x,ball.y,7,0,Math.PI*2);x.fill();x.shadowBlur=0}function loop(t){if(!last)last=t;const dt=Math.min((t-last)/16.67,2);last=t;if(playing)update(dt);draw();requestAnimationFrame(loop)}function pointY(e){const rect=c.getBoundingClientRect();return(e.clientY-rect.top)*300/rect.height}let dragPointer=null;function releaseDrag(e){if(dragPointer===e.pointerId){dragPointer=null;if(boardEl.hasPointerCapture?.(e.pointerId))boardEl.releasePointerCapture(e.pointerId)}}boardEl.addEventListener('pointerdown',e=>{if(e.target.closest?.('#start'))return;e.preventDefault();e.stopPropagation();dragPointer=e.pointerId;if(boardEl.setPointerCapture)boardEl.setPointerCapture(e.pointerId);if(playing)playerY=Math.max(0,Math.min(240,pointY(e)-30))});boardEl.addEventListener('pointermove',e=>{if(playing&&dragPointer===e.pointerId){e.preventDefault();playerY=Math.max(0,Math.min(240,pointY(e)-30))}});boardEl.addEventListener('pointerup',releaseDrag);boardEl.addEventListener('pointercancel',releaseDrag);boardEl.addEventListener('lostpointercapture',()=>{dragPointer=null});document.querySelectorAll('[data-move]').forEach(b=>{const dir=b.dataset.move==='up'?-1:1;b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();if(b.setPointerCapture)b.setPointerCapture(e.pointerId);move=dir});const release=()=>{move=0};b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release)});document.addEventListener('pointerup',()=>move=0);document.addEventListener('contextmenu',e=>{if(e.target.closest?.('button,canvas'))e.preventDefault()});document.getElementById('start').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();reset()});serve(1);ui();requestAnimationFrame(loop);</script></body>",
                          "trusted_sources": [
                            "nixel.dev"
                          ]
                        },
                        "__typename": "GenAISingleLayoutViewModel"
                      }
                    }
                  ]
                })).toString('base64')
              },
              contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedAiBotMessageInfo: {
                  botJid: "867051314767696@bot"
                },
                forwardOrigin: 4
              }
            }
          }
        }
      },
      {}
    )
}
handler.help = ['بونج,'arcade','pong']
handler.tags = ['game']
handler.command = /^(بونج|arcade|pong)$/i
handler.limit = true
export default handler
