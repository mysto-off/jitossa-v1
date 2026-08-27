// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// قفل الشات

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

    // قفل الشات
    global.db.data.chats[m.chat].isBanned = true

    await conn.sendMessage(
        m.chat,
        {
            text: '*✅ تـم قـفـل الـشـات بـنـجـاح*',
            contextInfo: newsletter
        },
        {
            quoted: m
        }
    )

    await m.react('✅')
}

handler.help = [
    'banchat'
]

handler.tags = [
    'owner'
]

handler.command =
    /^(banchat|قفل_شات)$/i

handler.owner = true
handler.group = true

export default handler
