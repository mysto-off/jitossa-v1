
import yts from 'yt-search';

// ==========================================
// معلومات قناة البوت
// ==========================================

const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦';
const channelId = '120363410733859643@newsletter';

// ==========================================
// معلومات القناة
// ==========================================

const channelInfo = {
    isForwarded: true,
    forwardingScore: 1,

    forwardedNewsletterMessageInfo: {
        newsletterJid: channelId,
        newsletterName: channelName,
        serverMessageId: -1
    }
};

// ==========================================
// البحث عن الأغاني
// ==========================================

let handler = async (m, { usedPrefix, command, text, conn }) => {

    // ==========================================
    // رسالة الاستعمال
    // ==========================================

    if (!text) {
        await conn.sendMessage(
            m.chat,
            {
                text:
`📥 *الـرجـاء إدخـال اســم الأغـنـية وسـأقـوم بـتحـمله لـك فــوراً*

*📌 مـثـال :* ${usedPrefix}تحميل_اغنية سـورة الـبقـرة`,

                contextInfo: channelInfo
            },
            { quoted: m }
        );

        return;
    }

    await m.react('🌟');

    try {

        // البحث
        const search = await yts(text);

        const results = search.videos.slice(0, 10);

        if (!results.length) {
            await m.react('❌');

            return conn.sendMessage(
                m.chat,
                {
                    text: '❌ لـم يـتـم العـثـور عـلـى أي أغـنيـة.',
                    contextInfo: channelInfo
                },
                { quoted: m }
            );
        }

        // أول نتيجة
        const first = results[0];

        // ==========================================
        // إنشاء قائمة الأغاني
        // ==========================================

        const songs = results.map((item) => ({
            title: item.title,

            description:
                `🕛 ${item.timestamp} | 👤 ${item.author?.name || 'Unknown'}`,

            id: `${usedPrefix}ytmp3 ${item.url}`
        }));

        // ==========================================
        // إرسال الصورة + القائمة
        // ==========================================

        await conn.sendButton(
            m.chat,
            {
                image: { url: first.thumbnail },

                caption:
`🎵 *نـتائــج البـحـــث*

🔎 البــحــث : ${text}

🎧 *اخـتر الأغـنـية الـتـي تـريـد تـحـمـيلـهــا بـصـيغــة MP3 فـقــط.*`,

                footer: global.namebot,

                buttons: [
                    {
                        name: 'single_select',

                        buttonParamsJson: JSON.stringify({
                            title: '🎵 اضــغــط هـنــا',

                            sections: [
                                {
                                    title: '🎧 اخــتـر الأغـنــية',

                                    rows: songs
                                }
                            ]
                        })
                    }
                ],

                messageParamsJson: JSON.stringify({
                    bottom_sheet: {
                        list_title: '🎵 قــائــمــة الأغــانــي',
                        button_title: 'اضــغــط هــنــا',
                        in_thread_buttons_limit: 1
                    }
                }),

                // 📢 القناة
                contextInfo: channelInfo
            },

            { quoted: m }
        );

        await m.react('✅');

    } catch (e) {

        console.error(e);

        await m.react('❌');

        await conn.sendMessage(
            m.chat,
            {
                text: `❌ حــدث خــطــأ:\n${e.message || e}`,
                contextInfo: channelInfo
            },
            { quoted: m }
        );
    }
};

// ==========================================
// إعدادات الأمر
// ==========================================

handler.help = ['تحميل_اغنية'];
handler.tags = ['downloader'];

handler.command =
    /^(play|youtubesearch|تحميل_اغنية)$/i;

handler.limit = false;

export default handler;
