// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// إعداد رسائل المجموعة

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

let handler = async (m, { conn, usedPrefix, command, text }) => {

    if (!text) {
        return conn.sendMessage(
            m.chat,
            {
                text:
`*❌ وايـن هـو الـنـص؟*

*مـثـال:*
${usedPrefix + command} مـرحـبـا @user

*@user* = مـنـشـن الـعـضـو
*@subject* = اسـم الـمـجـمـوعـة
*@desc* = وصـف الـمـجـمـوعـة`,
                contextInfo: newsletter
            },
            { quoted: m }
        )
    }

    // تأكد من وجود بيانات الشات
    global.db.data.chats[m.chat] =
        global.db.data.chats[m.chat] || {}

    const chat = global.db.data.chats[m.chat]

    let message = ''
    let setting = ''

    switch (command) {

        case 'رسالة_الترحيب':
            chat.sWelcome = text
            message = 'رسـالـة الـتـرحـيـب'
            setting = chat.sWelcome
            break

        case 'رسالة_المغادرة':
            chat.sBye = text
            message = 'رسـالـة الـمـغـادرة'
            setting = chat.sBye
            break

        case 'رسالة_الترقية':
            chat.sPromote = text
            message = 'رسـالـة الـتـرقـيـة'
            setting = chat.sPromote
            break

        case 'رسالة_التنزيل':
            chat.sDemote = text
            message = 'رسـالـة الـتـنـزيـل'
            setting = chat.sDemote
            break

        default:
            return
    }

    await conn.sendMessage(
        m.chat,
        {
            text:
`*✅ تـم تـعـيـيـن ${message} بـنـجـاح*

📝 *الـرسـالـة:*
${setting}

> 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`,

            contextInfo: newsletter
        },
        { quoted: m }
    )

    await m.react('✅')
}

handler.help = [
    'رسالة_الترحيب',
    'رسالة_المغادرة',
    'رسالة_الترقية',
    'رسالة_التنزيل'
]

handler.tags = [
    'group'
]

handler.command =
    /^(رسالة_الترحيب|رسالة_المغادرة|رسالة_الترقية|رسالة_التنزيل)$/i

handler.group = true
handler.admin = true

export default handler
