// ==========================================
// ❌⭕ ميزة اكس او نكسل - النسخة الزرقاء
// الأمر:.اكس_او
// ضد البوت + عداد النقاط
// ==========================================

let handler = async (m, { conn }) => {

    const data = Buffer.from(JSON.stringify({
        "response_id": "xo-nixel-blue-v1",
        "sections": [{
            "view_model": {
                "primitive": {
                    "__typename": "GenAIaeacdsnwHtmlPrimitive",
                    "payload": "<style>*{box-sizing:border-box;user-select:none;-webkit-tap-highlight-color:transparent}</style><body style=\"margin:0;background:transparent;color:#fff;font-family:Arial\"><div style=\"width:100%;max-width:420px;margin:auto;padding:16px\"><div style=\"background:rgba(0,150,255,.08);backdrop-filter:blur(16px);border:1px solid rgba(0,150,255,.25);border-radius:20px;padding:20px;box-shadow:0 0 30px rgba(0,150,255,.2)\"><div style=\"text-align:center;margin-bottom:16px\"><div style=\"font-size:11px;color:rgba(0,200,255,.7);letter-spacing:1.5px\">لعبة نيكسيل</div><div style=\"font-size:24px;font-weight:bold;color:#00d4ff;text-shadow:0 0 10px rgba(0,212,255,.5)\">❌⭕ اكس او</div><div id=\"turn\" style=\"font-size:13px;color:#00a8ff;margin-top:6px;font-weight:bold\">الدور: X</div></div><div id=\"board\" style=\"display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px\"></div><div style=\"display:flex;gap:8px;margin-bottom:12px\"><button id=\"reset\" style=\"flex:1;padding:11px;border:none;border-radius:12px;background:linear-gradient(135deg,#0096ff,#00d4ff);color:#fff;font-weight:bold;font-size:14px;cursor:pointer\">🔄 لعبة جديدة</button></div><div id=\"score\" style=\"text-align:center;font-size:12px;color:rgba(0,200,255,.7)\">انت: 0 | البوت: 0 | تعادل: 0</div></div></div><script>let board,turn='X',gameOver=false,score={x:0,o:0,draw:0};const boardEl=document.getElementById('board'),turnEl=document.getElementById('turn'),scoreEl=document.getElementById('score');function init(){board=Array(9).fill('');gameOver=false;turn='X';render();updateTurn()}function render(){boardEl.innerHTML='';board.forEach((cell,i)=>{const div=document.createElement('div');div.style.cssText='aspect-ratio:1;background:rgba(0,150,255,.05);border:2px solid rgba(0,150,255,.2);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold;cursor:pointer;transition:.2s';div.onmouseover=()=>{if(!cell)div.style.background='rgba(0,150,255,.15)'};div.onmouseout=()=>{if(!cell)div.style.background='rgba(0,150,255,.05)'};div.innerHTML=cell==='X'?'<span style=\"color:#00d4ff;text-shadow:0 0 15px #00d4ff\">X</span>':cell==='O'?'<span style=\"color:#00ffea;text-shadow:0 0 15px #00ffea\">O</span>':'';div.onclick=()=>play(i);boardEl.appendChild(div)})}function updateTurn(){turnEl.textContent=gameOver?'انتهت اللعبة':`الدور: ${turn}`;turnEl.style.color=turn==='X'?'#00d4ff':'#00ffea'}function play(i){if(gameOver||board[i])return;board[i]=turn;render();if(checkWin()){gameOver=true;turnEl.textContent=`🎉 ${turn} فاز!`;score[turn==='X'?'x':'o']++;updateScore();return}if(board.every(c=>c)){gameOver=true;turnEl.textContent='🤝 تعادل';score.draw++;updateScore();return}turn=turn==='X'?'O':'X';updateTurn();if(turn==='O')setTimeout(botMove,500)}function botMove(){let empty=board.map((v,i)=>v===''?i:null).filter(v=>v!==null);if(!empty.length)return;let move=empty[Math.floor(Math.random()*empty.length)];board[move]='O';render();if(checkWin()){gameOver=true;turnEl.textContent='🤖 البوت فاز';score.o++;updateScore();return}if(board.every(c=>c)){gameOver=true;turnEl.textContent='🤝 تعادل';score.draw++;updateScore();return}turn='X';updateTurn()}function checkWin(){const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];return wins.some(([a,b,c])=>board[a]&&board[a]===board[b]&&board[a]===board[c])}function updateScore(){scoreEl.textContent=`انت: ${score.x} | البوت: ${score.o} | تعادل: ${score.draw}`}document.getElementById('reset').onclick=init;init()</script></body>",
                    "trusted_sources": ["nixel.dev"]
                },
                "__typename": "GenAISingleLayoutViewModel"
            }
        }]
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
                    submessages: [{ messageType: 2, messageText: "❌⭕ اكس او نيكسيل" }],
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
handler.help = ['اكس_او']
handler.tags = ['لعبة']
handler.command = /^(اكس_او|xo|x_o)$/i // يقبل العربي والانجليزي
handler.limit = false

export default handler
