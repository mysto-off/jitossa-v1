// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// حظر مستخدم

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

let handler = async (m, { conn, text }) => {

    if (!text) {
        return conn.sendMessage(
            m.chat,
            {
                text:
`*❌ مـن تـريـد حـظـره؟*

*مـثـال:* .حظر @user`,
                contextInfo: newsletter
            },
            { quoted: m }
        )
    }

    let الشخص

    if (m.isGroup) {
        الشخص = m.mentionedJid?.[0]
    } else {
        الشخص = m.chat
    }

    if (!الشخص) {
        return conn.sendMessage(
            m.chat,
            {
                text: '*❌ ديـر مـنـشـن لـلـشـخـص*',
                contextInfo: newsletter
            },
            { quoted: m }
        )
    }

    // تأكد أن المستخدم موجود في قاعدة البيانات
    global.db.data.users[الشخص] =
        global.db.data.users[الشخص] || {}

    // حظر المستخدم
    global.db.data.users[الشخص].banned = true

    const number = الشخص.split('@')[0]

    await conn.sendMessage(
        m.chat,
        {
            text:
`*✅ تـم حـظـر الـمـسـتـخـدم* @${number} *بـنـجـاح*`,

            mentions: [الشخص],

            contextInfo: {
                ...newsletter,
                mentionedJid: [الشخص]
            }
        },
        { quoted: m }
    )

    await m.react('✅')
}

handler.help = [
    'حظر @tag',
    'ban @tag'
]

handler.tags = [
    'owner'
]

handler.command =
    /^(حظر|ban(user)?)$/i

handler.owner = true

export default handler
