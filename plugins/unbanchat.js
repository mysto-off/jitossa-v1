// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// فتح الشات

// ===== معلومات القناة =====
const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const CHANNEL_ID = '120363410733859643@newsletter'

const newsletter = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_ID,
        newsletterName: channelName
    }
}
// ===========================

let handler = async (m, { conn }) => {

    // تأكد أن الشات موجود في قاعدة البيانات
    global.db.data.chats[m.chat] =
        global.db.data.chats[m.chat] || {}

    // فتح الشات
    global.db.data.chats[m.chat].isBanned = false

    await conn.sendMessage(
        m.chat,
        {
            text: '*✅ تـم فـتـح الـشـات بـنـجـاح*',
            contextInfo: newsletter
        },
        {
            quoted: m
        }
    )

    await m.react('✅')
}

handler.help = [
    'unbanchat'
]

handler.tags = [
    'owner'
]

handler.command =
    /^(unbanchat|فتح_شات)$/i

handler.owner = true
handler.group = true

export default handler
