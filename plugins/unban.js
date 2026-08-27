// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// فك الحظر

const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const CHANNEL_ID = '120363410733859643@newsletter'

const channelContext = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_ID,
        newsletterName: channelName
    }
}

let handler = async (m, { conn, text }) => {

    if (!text) {
        return conn.sendMessage(
            m.chat,
            {
                text: '*مـن تريـد فـك الـحـظـر عـنـه؟*',
                contextInfo: channelContext
            },
            { quoted: m }
        )
    }

    let who

    if (m.isGroup) {
        who = m.mentionedJid?.[0]
    } else {
        who = m.chat
    }

    if (!who) {
        return conn.sendMessage(
            m.chat,
            {
                text: '*مـنـشـن الـشـخـص*',
                contextInfo: channelContext
            },
            { quoted: m }
        )
    }

    // إنشاء بيانات المستخدم إذا لم تكن موجودة
    global.db.data.users[who] =
        global.db.data.users[who] || {}

    // فك الحظر
    global.db.data.users[who].banned = false

    const number = who.split('@')[0]

    await conn.sendMessage(
        m.chat,
        {
            text:
`*✅ تـم فـك الـحـظـر عـن* @${number}

> 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`,

            mentions: [who],

            contextInfo: {
                ...channelContext,
                mentionedJid: [who]
            }
        },
        {
            quoted: m
        }
    )

    await m.react('✅')
}

handler.help = [
    'unban @tag'
]

handler.tags = [
    'owner'
]

handler.command =
    /^(الغاء|unbanuser)$/i

handler.owner = true

export default handler
