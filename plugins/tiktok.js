// ============== TikTok Downloader Simple ==============
import axios from 'axios'

// ===== معلومات القناة =====
const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const CHANNEL_ID = '120363410733859643@newsletter'
const INSTAGRAM_URL = `https://www.instagram.com/mysto__off`
const newsletter = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_ID,
        newsletterName: channelName
    }
}
// =====================================

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) {
        return conn.sendMessage(m.chat, {
            text: `*📥 تـحـميـل فـيـديـوهـات تـيـك تـوك*\n\n📌 *الامـر:* \`${usedPrefix + command} لـيـنـك\`\n💡 *مـثـال:* \`${usedPrefix + command} https://vt.tiktok.com/xxx\``,
            contextInfo: newsletter
        }, { quoted: m })
    }

    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

    await conn.sendMessage(m.chat, {
        text: `*🔍 يـتـم تحـمـل الفـيديـو مــن تـيـك تـوك*\n\n*📌 تـابـع حـسـابـي استـغـرام*\n\n${INSTAGRAM_URL}`,
        contextInfo: newsletter
    }, { quoted: m })

    try {
        const encodedParams = new URLSearchParams()
        encodedParams.set("url", args[0])
        encodedParams.set("hd", "1")

        const response = await axios({
            method: "POST",
            url: "https://tikwm.com/api/",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                Cookie: "current_language=en",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
            },
            data: encodedParams,
        })

        const res = response.data.data

        if (!res || !res.play) throw new Error('مـا تـلـقـاش الـفـيـديـو')

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        await conn.sendMessage(m.chat, {
            video: { url: res.play },
            caption: `*تـم تحـمـيل الفـيديـو بنـجــاح من تـيـك تـوك 💯✨*`,
            footer: `❀ بـواسـطـة ${channelName} ❀`,
            contextInfo: newsletter
        }, { quoted: m });

    } catch (e) {
        console.error('TikTok Error:', e);
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
        await conn.sendMessage(m.chat, {
            text: `*❌ وقع خطأ:* ${e.message || e}`,
            contextInfo: newsletter
        }, { quoted: m })
    }
}

handler.command = ['tiktok', 'تيكتوك']
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.limit = false
export default handler
