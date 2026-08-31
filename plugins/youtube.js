/*
YouTube Downloader
MP3 + MP4
LION BOT 🇲🇦
*/

import axios from 'axios'

// ==========================================
// معلومات قناة البوت
// ==========================================

const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const channelId = '120363410733859643@newsletter'

const channelInfo = {
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: channelId,
        newsletterName: channelName,
        serverMessageId: -1
    }
}

const YT_REGEX = /(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i

const HEADERS = {
    accept: 'application/json',
    'content-type': 'application/json',
    origin: 'https://ssvid.cc',
    referer: 'https://ssvid.cc/',
    'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36'
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function cleanFileName(name) {
    return String(name || 'YouTube').replace(/[\/:*?"<>|]/g, '').slice(0, 100)
}

async function convertYT(url, type) {
    let data
    if (type === 'mp3') {
        data = { url, audio: { bitrate: '128k' }, output: { type: 'audio', format: 'mp3' } }
    } else if (type === 'mp4') {
        data = { url, video: { quality: '720p' }, output: { type: 'video', format: 'mp4' } }
    } else {
        throw new Error('صيغة التحميل غير صحيحة')
    }

    const init = await axios.post('https://hub.convert1s.com/api/download', data, { headers: HEADERS, timeout: 20000 })
    const result = init.data || {}
    if (!result.statusUrl) throw new Error(result.message || 'لم يتم الحصول على رابط المعالجة')

    let converted = null
    for (let attempt = 1; attempt <= 20; attempt++) {
        const status = await axios.get(result.statusUrl, { headers: HEADERS, timeout: 15000 })
        const info = status.data || {}
        if (info.status === 'completed') { converted = info; break }
        if (info.status === 'failed' || info.status === 'error') throw new Error(info.message || 'فشل تحويل الملف')
        await sleep(1500)
    }
    if (!converted) throw new Error('انتهى وقت التحويل')
    if (!converted.downloadUrl) throw new Error('لم يرجع السيرفر رابط التحميل')

    return {
        title: converted.title || result.title || 'YouTube',
        duration: converted.duration || result.duration || '',
        downloadUrl: converted.downloadUrl
    }
}

async function sendFormatMenu(m, conn, url, usedPrefix) {
    const rows = [
        { title: '🎵 تـحـمـيـل MP3', description: 'تحـميـل الصـوت', id: `${usedPrefix}ytmp3 ${url}` },
        { title: '🎬 تـحـمـيـل MP4', description: 'تحـميـل الـفيـديو', id: `${usedPrefix}ytmp4 ${url}` }
    ]

    await conn.sendButton(m.chat, {
        text: `🎬 تحـمـيل مــن يــوتــيـوب\nالـرجـاء اخـتـيـار صـيـغـة الـتـحـمـيـل\n🎵 MP3\n🎬 MP4`,
        footer: channelName,
        buttons: [{
            name: 'single_select',
            buttonParamsJson: JSON.stringify({ title: 'اضــغـط هـــــنـا', sections: [{ title: 'صـيـغ الـتـحـمـيـل', rows }] })
        }],
        messageParamsJson: JSON.stringify({ bottom_sheet: { list_title: 'قـائـمـة الـتـحـمـيـل', button_title: 'اضـغـط هـنـا', in_thread_buttons_limit: 1 } }),
        contextInfo: channelInfo
    }, { quoted: m })
}

// ==========================================
// Handler
// ==========================================

let handler = async (m, { usedPrefix, command, text, conn }) => {
    const input = text?.trim() || ''

    // يقبل youtube و يوتيوب
    if (/^(yt|youtube|يوتيوب)$/i.test(command)) {
        if (!input || !YT_REGEX.test(input)) {
            return conn.sendMessage(m.chat, {
                text: `🎬 تحـمـيل مــن يـوتـيـوب\n\nالـرجـاء إدخـال رابـط يـوتـيـوب و اخــتـــار طــريــقـــة تحـميــل\n\n📌 مـثـال\n${usedPrefix}يوتيوب https://youtu.be/NJMEtaDTVtA`,
                contextInfo: channelInfo
            }, { quoted: m })
        }
        try {
            await m.react('🔁')
            await sendFormatMenu(m, conn, input, usedPrefix)
            await m.react('✅')
        } catch (e) {
            console.error('YouTube Menu Error:', e)
            await m.react('❌')
            await conn.sendMessage(m.chat, { text: `❌ حـدث خـطـأ\n\n${e.message || e}`, contextInfo: channelInfo }, { quoted: m })
        }
        return
    }

    if (/^(ytmp3)$/i.test(command)) {
        if (!input || !YT_REGEX.test(input)) return
        try {
            await m.react('⏳')
            const result = await convertYT(input, 'mp3')
            const fileName = cleanFileName(result.title) + '.mp3'
            await conn.sendMessage(m.chat, { audio: { url: result.downloadUrl }, mimetype: 'audio/mpeg', fileName, ptt: false }, { quoted: m })
            await m.react('✅')
        } catch (e) {
            console.error('MP3 Error:', e)
            await m.react('❌')
            await conn.sendMessage(m.chat, { text: `❌ فـشـل تـحـمـيـل MP3\n${e.message || e}`, contextInfo: channelInfo }, { quoted: m })
        }
        return
    }

    if (/^(ytmp4)$/i.test(command)) {
        if (!input || !YT_REGEX.test(input)) return
        try {
            await m.react('⏳')
            const result = await convertYT(input, 'mp4')
            const fileName = cleanFileName(result.title) + '.mp4'
            await conn.sendMessage(m.chat, { video: { url: result.downloadUrl }, mimetype: 'video/mp4', fileName, caption: result.title }, { quoted: m })
            await m.react('✅')
        } catch (e) {
            console.error('MP4 Error:', e)
            await m.react('❌')
            await conn.sendMessage(m.chat, { text: `❌ فـشـل تـحـمـيـل MP4\n\n${e.message || e}`, contextInfo: channelInfo }, { quoted: m })
        }
        return
    }
}

handler.help = [
    'youtube', 
    'يوتيوب'
]
handler.tags = [
    'downloader'
]
handler.command = /^(youtube|yt|يوتيوب|ytmp3|ytmp4)$/i // <-- زدت يوتيوب هنا
handler.limit = false

export default handler
