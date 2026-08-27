/*
  YouTube Downloader
  MP3 + MP4
  JITOSSA BOT 🇲🇦
*/

import axios from 'axios'

// ==========================================
// مـعـلـومـات قـنـاة الـبـوت
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

// ==========================================
// Yـوـتـيـوـب
// ==========================================

const YT_REGEX =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i

// ==========================================
// Hـeـaـdـeـrـs
// ==========================================

const HEADERS = {
    accept: 'application/json',
    'content-type': 'application/json',
    origin: 'https://ssvid.cc',
    referer: 'https://ssvid.cc/',
    'user-agent':
        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36'
}

// ==========================================
// انـتـظـار
// ==========================================

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms))

// ==========================================
// تـنـظـيـف اسـم الـمـلـف
// ==========================================

function cleanFileName(name) {
    return String(name || 'YouTube')
        .replace(/[\\/:*?"<>|]/g, '')
        .slice(0, 100)
}

// ==========================================
// تـحـويـل Yـوـتـيـوـب
// ==========================================

async function convertYT(url, type) {

    let data

    // ======================================
    // MـPـ3
    // ======================================

    if (type === 'mp3') {

        data = {
            url,

            audio: {
                bitrate: '128k'
            },

            output: {
                type: 'audio',
                format: 'mp3'
            }
        }

    }

    // ======================================
    // MـPـ4
    // ======================================

    else if (type === 'mp4') {

        data = {
            url,

            video: {
                quality: '720p'
            },

            output: {
                type: 'video',
                format: 'mp4'
            }
        }

    }

    else {
        throw new Error('صـيـغـة الـتـحـمـيـل غـيـر صـحـيـحـة.')
    }

    // ======================================
    // بـدايـة الـتـحـويـل
    // ======================================

    const init = await axios.post(
        'https://hub.convert1s.com/api/download',
        data,
        {
            headers: HEADERS,
            timeout: 20000
        }
    )

    const result = init.data || {}

    if (!result.statusUrl) {
        throw new Error(
            result.message ||
            'لـم يـتـم الـحـصـول عـلـى رابـط الـمـعـالـجـة.'
        )
    }

    // ======================================
    // مـتـابـعـة الـتـحـويـل
    // ======================================

    let converted = null

    const maxAttempts = 20

    for (
        let attempt = 1;
        attempt <= maxAttempts;
        attempt++
    ) {

        const status = await axios.get(
            result.statusUrl,
            {
                headers: HEADERS,
                timeout: 15000
            }
        )

        const info = status.data || {}

        if (info.status === 'completed') {
            converted = info
            break
        }

        if (
            info.status === 'failed' ||
            info.status === 'error'
        ) {
            throw new Error(
                info.message ||
                'فـشـل تـحـويـل الـمـلـف.'
            )
        }

        await sleep(1500)
    }

    // ======================================
    // الـتـحـقـق مـن الـنـتـيـجـة
    // ======================================

    if (!converted) {
        throw new Error(
            'انـتـهـى وقـت الـتـحـويـل، حـاول مـرة أخـرى.'
        )
    }

    if (!converted.downloadUrl) {
        throw new Error(
            'لـم يـرجـع الـسـيـرفـر رابـط الـتـحـمـيـل.'
        )
    }

    return {
        title:
            converted.title ||
            result.title ||
            'YouTube',

        duration:
            converted.duration ||
            result.duration ||
            '',

        downloadUrl:
            converted.downloadUrl
    }
}

// ==========================================
// قـائـمـة الـتـحـمـيـل
// ==========================================

async function sendFormatMenu(
    m,
    conn,
    url,
    usedPrefix
) {

    const rows = [

        {
            title: '🎵 تـحـمـيـل MP3',

            description:
                'تـحـمـيـل الـصـوت بـصـيـغـة MP3',

            id:
                `${usedPrefix}ytmp3 ${url}`
        },

        {
            title: '🎬 تـحـمـيـل MP4',

            description:
                'تـحـمـيـل الـفـيـديـو بـصـيـغـة MP4',

            id:
                `${usedPrefix}ytmp4 ${url}`
        }

    ]

    await conn.sendButton(
        m.chat,
        {

            text:
`تـحـمـيـل مـن يـوتـيـوب

الـرجـاء اخـتـيـار صـيـغـة الـتـحـمـيـل

🎵 MP3
🎬 MP4`,

            footer:
                'JITOSSA BOT 🇲🇦',

            buttons: [

                {
                    name: 'single_select',

                    buttonParamsJson:
                        JSON.stringify({

                            title:
                                'اخـتـيـار الـصـيـغـة',

                            sections: [

                                {
                                    title:
                                        'صـيـغ الـتـحـمـيـل',

                                    rows
                                }

                            ]

                        })
                }

            ],

            messageParamsJson:
                JSON.stringify({

                    bottom_sheet: {

                        list_title:
                            'قـائـمـة الـتـحـمـيـل',

                        button_title:
                            'اضـغـط هـنـا',

                        in_thread_buttons_limit: 1

                    }

                }),

            // مـعـرف الـقـنـاة فـي الـقـائـمـة فـقـط
            contextInfo: channelInfo

        },

        {
            quoted: m
        }
    )
}

// ==========================================
// Hـaـnـdـlـeـr
// ==========================================

let handler = async (
    m,
    {
        usedPrefix,
        command,
        text,
        conn
    }
) => {

    const input = text?.trim() || ''

    // ======================================
    // YـT
    // ======================================

    if (/^(yt|youtube)$/i.test(command)) {

        if (
            !input ||
            !YT_REGEX.test(input)
        ) {

            return conn.sendMessage(
                m.chat,
                {
                    text:
`الـرجـاء ادخـال رابـط يـوتـيـوب

📌 مـثـال:

${usedPrefix}yt https://youtu.be/NJMEtaDTVtA`,

                    contextInfo: channelInfo
                },
                {
                    quoted: m
                }
            )
        }

        try {

            await m.react('🔁')

            await sendFormatMenu(
                m,
                conn,
                input,
                usedPrefix
            )

            await m.react('✅')

        } catch (e) {

            console.error(
                'YouTube Menu Error:',
                e
            )

            await m.react('❌')

            await conn.sendMessage(
                m.chat,
                {
                    text:
`حـدث خـطـأ

${e.message || e}`,

                    contextInfo: channelInfo
                },
                {
                    quoted: m
                }
            )
        }

        return
    }

    // ======================================
    // MـPـ3
    // ======================================

    if (/^(ytmp3)$/i.test(command)) {

        if (
            !input ||
            !YT_REGEX.test(input)
        ) {
            return
        }

        try {

            await m.react('⏳')

            const result =
                await convertYT(
                    input,
                    'mp3'
                )

            const fileName =
                cleanFileName(
                    result.title
                ) + '.mp3'

            // =================================
            // الـصـوت بـدون مـعـرف الـقـنـاة
            // وبـدون contextInfo
            // =================================

            await conn.sendMessage(
                m.chat,
                {
                    audio: {
                        url:
                            result.downloadUrl
                    },

                    mimetype:
                        'audio/mpeg',

                    fileName,

                    ptt: false
                },
                {
                    quoted: m
                }
            )

            await m.react('✅')

        } catch (e) {

            console.error(
                'MP3 Error:',
                e
            )

            await m.react('❌')

            await conn.sendMessage(
                m.chat,
                {
                    text:
`فـشـل تـحـمـيـل MP3

${e.message || e}`,

                    contextInfo:
                        channelInfo
                },
                {
                    quoted: m
                }
            )
        }

        return
    }

    // ======================================
    // MـPـ4
    // ======================================

    if (/^(ytmp4)$/i.test(command)) {

        if (
            !input ||
            !YT_REGEX.test(input)
        ) {
            return
        }

        try {

            await m.react('⏳')

            const result =
                await convertYT(
                    input,
                    'mp4'
                )

            const fileName =
                cleanFileName(
                    result.title
                ) + '.mp4'

            // =================================
            // الـفـيـديـو بـدون مـعـرف الـقـنـاة
            // وبـدون contextInfo
            // =================================

            await conn.sendMessage(
                m.chat,
                {
                    video: {
                        url:
                            result.downloadUrl
                    },

                    mimetype:
                        'video/mp4',

                    fileName,

                    caption:
                        result.title
                },
                {
                    quoted: m
                }
            )

            await m.react('✅')

        } catch (e) {

            console.error(
                'MP4 Error:',
                e
            )

            await m.react('❌')

            await conn.sendMessage(
                m.chat,
                {
                    text:
`فـشـل تـحـمـيـل MP4

${e.message || e}`,

                    contextInfo:
                        channelInfo
                },
                {
                    quoted: m
                }
            )
        }

        return
    }
}

// ==========================================
// الأوامـر
// ==========================================

handler.help = [
    'يوتيوب',
    'youtube',
    'ytmp3',
    'ytmp4'
]

handler.tags = [
    'downloader'
]

handler.command =
    /^(يوتيوب|youtube|ytmp3|ytmp4)$/i

handler.limit = false

export default handler
