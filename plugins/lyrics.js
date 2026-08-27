//تـرجـمـة وتـعـديـل: نـورديـن
//بـلـوغـيـن: Izuku-mi | بـحـث عـن كـلـمـات الاغـانـي (نـسـخـة بـالأزرار)

// ============================================
// Description: Search song lyrics using LrcLib API + Button Selection
// ============================================

// ─── مـعـلـومـات الـقـنـاة ─────────────────────────────────────────────
const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const CHANNEL_ID = '120363410733859643@newsletter' // <-- حـط هـنـا مـعـرف الـقـنـاة ديـالـك
const newsletter = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_ID,
        newsletterName: channelName
    }
}

import axios from 'axios';

// ==========================================
// بـحـث عـن الأغـانـي (قـائـمـة نـتـائـج)
// ==========================================

async function searchLyricsList(title) {
    if (!title) throw new Error('*❌ الـرجـاء ادخـال اسـم الاغـنـيـة اولـا*');

    const { data } = await axios.get(`https://lrclib.net/api/search?q=${encodeURIComponent(title)}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 15000
    });

    if (!data || !data.length) throw new Error('*❌ لـم يـتـم الـعـثـور عـلـى نـتـائـج لـهـذه الاغـنـيـة*');

    return data.slice(0, 10);
}

// ==========================================
// جـلـب أغـنـيـة مـحـددة عـبـر الـ ID
// ==========================================

async function getLyricsById(id) {
    const { data: song } = await axios.get(`https://lrclib.net/api/get/${id}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        timeout: 15000
    });

    if (!song) throw new Error('*❌ لـم يـتـم الـعـثـور عـلـى هـذه الاغـنـيـة*');

    const lyricsRaw = song.plainLyrics || song.syncedLyrics;

    if (song.instrumental) throw new Error('*🎼 هـذه الاغـنـيـة آلـيـة (بـدون كـلـمـات)*');
    if (!lyricsRaw) throw new Error('*❌ تـم الـعـثـور عـلـى الاغـنـيـة ولـكـن لا تـوجـد كـلـمـات*');

    // Remove timestamps [00:00.00] and clean text
    const cleanLyrics = lyricsRaw.replace(/\[.*?\]/g, '').trim();

    const minutes = Math.floor(song.duration / 60);
    const seconds = Math.floor(song.duration % 60);
    const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return {
        trackName: song.trackName,
        artistName: song.artistName,
        albumName: song.albumName,
        duration,
        lyrics: cleanLyrics
    };
}

// ==========================================
// Handler
// ==========================================

let handler = async (m, { conn, text, usedPrefix, command }) => {

    try {

        // ==========================================
        // تـم اخـتـيـار أغـنـيـة مـن الـقـائـمـة
        // ==========================================

        const idMatch = command.match(/^lyricsget([0-9]+)$/i);

        if (idMatch) {

            const songId = idMatch[1];

            await m.react('⏳');

            try {
                const res = await getLyricsById(songId);

                let caption = `*🎤 ${res.trackName}*\n`;
                caption += `*🎙️ الـمـغـنـي:* ${res.artistName}\n`;
                if (res.albumName) caption += `*💿 الـالـبـوم:* ${res.albumName}\n`;
                caption += `*⏰ الـمـدة:* ${res.duration}\n`;
                caption += `------------------------\n\n`;
                caption += res.lyrics;

                if (caption.length > 4000) {
                    await conn.sendMessage(m.chat, {
                        text: caption.slice(0, 4000) + '\n\n*...يـتـبـع*',
                        contextInfo: newsletter
                    }, { quoted: m });
                } else {
                    await conn.sendMessage(m.chat, {
                        text: caption,
                        contextInfo: newsletter
                    }, { quoted: m });
                }

                await m.react('✅');

            } catch (e) {
                console.log('[LYRICS GET ERROR]', e.message);
                await m.react('❌');
                await conn.sendMessage(m.chat, {
                    text: `${e.message}`,
                    contextInfo: newsletter
                }, { quoted: m });
            }

            return;
        }

        // ==========================================
        // بـحـث جـديـد
        // ==========================================

        if (!text) return conn.sendMessage(m.chat, {
            text: `*🎵 بـحـث عـن كـلـمـات الاغـانـي - مـجـانـي*

*📌 الـطـريـقـة:* ${usedPrefix + command} اسـم الاغـنـيـة
*📌 مـثـال:* 
${usedPrefix + command} Bohemian Rhapsody
${usedPrefix + command} عـمـرو ديـاب تـمـالـي مـعـاك`,
            contextInfo: newsletter
        }, { quoted: m });

        await m.react('🎵');
        let msg = await conn.sendMessage(m.chat, {
            text: '*🔍 جـاري الـبـحـث عـن الـكـلـمـات...*',
            contextInfo: newsletter
        }, { quoted: m });

        const results = await searchLyricsList(text);

        await conn.sendMessage(m.chat, { delete: msg.key }).catch(() => {});

        // ==========================================
        // بـنـاء قـائـمـة الاخـتـيـار بـالـزر
        // ==========================================

        const rows = results.map((song) => {

            const minutes = Math.floor(song.duration / 60);
            const seconds = Math.floor(song.duration % 60);
            const duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

            return {
                title: `🎤 ${song.trackName}`,
                description: `🎙️ ${song.artistName}${song.albumName ? ' • 💿 ' + song.albumName : ''} • ⏰ ${duration}`,
                id: `${usedPrefix}lyricsget${song.id}`
            };
        });

        const caption =
`*🎵 نـتـائـج الـبـحـث عـن:* ${text}

🔢 عـدد الـنـتـائـج: *${rows.length}*

👇 اضـغـط عـلـى الـزر
واخـتـر الاغـنـيـة الـتـي تـريـدهـا.

> 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`;

        await conn.sendButton(
            m.chat,
            {
                text: caption,

                footer: {
                    text: '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
                },

                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: '🎵 اخـتـر الاغـنـيـة',
                            sections: [
                                {
                                    title: `📖 نـتـائـج الـبـحـث`,
                                    rows
                                }
                            ]
                        })
                    }
                ],

                headerType: 1,

                contextInfo: newsletter
            },
            { quoted: m }
        );

        await m.react('✅');

    } catch (e) {
        console.log('[LYRICS ERROR]', e.message);
        await m.react('❌');
        await conn.sendMessage(m.chat, {
            text: `${e.message}`,
            contextInfo: newsletter
        }, { quoted: m });
    }
};

handler.help = ['بحث_اغاني <اسـم الاغـنـيـة>'];
handler.tags = ['ادوات'];
handler.command = /^(lyrics|بحث_اغاني|lyricsget[0-9]+)$/i;
handler.limit = false
handler.register = false

export default handler;
