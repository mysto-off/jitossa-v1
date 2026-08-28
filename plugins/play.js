// ==========================================
// بحث يوتيوب بدون أي مكتبة إضافية
// ==========================================

// معلومات قناة البوت
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
// بحث يوتيوب باستعمال fetch فقط
// لا تحتاج yt-search
// ==========================================

async function youtubeSearch(query) {
    const url =
        'https://www.youtube.com/results?search_query=' +
        encodeURIComponent(query);

    const response = await fetch(url, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`YouTube HTTP ${response.status}`);
    }

    const html = await response.text();

    const results = [];

    // استخراج بيانات الفيديو من صفحة يوتيوب
    const regex =
        /"videoRenderer":\{"videoId":"([^"]+)".*?"title":\{"runs":\[\{"text":"([^"]*)"/g;

    let match;

    while ((match = regex.exec(html)) !== null && results.length < 10) {
        const videoId = match[1];
        const title = match[2]
            .replace(/\\u0026/g, '&')
            .replace(/\\"/g, '"');

        if (!videoId || !title) continue;

        // منع التكرار
        if (results.some(v => v.videoId === videoId)) continue;

        results.push({
            videoId,
            title,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail:
                `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        });
    }

    return results;
}

// ==========================================
// الأمر
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

*📌 مـثـال :* ${usedPrefix}تحميل_اغنية سـورة الـبـقـرة`,

                contextInfo: channelInfo
            },
            { quoted: m }
        );

        return;
    }

    await m.react('🌟');

    try {

        // ==========================================
        // البحث في يوتيوب
        // ==========================================

        const results = await youtubeSearch(text);

        if (!results.length) {

            await m.react('❌');

            return conn.sendMessage(
                m.chat,
                {
                    text:
`❌ *لـم يـتـم العـثـور عـلـى أي أغـنيـة.*

🔎 الـبـحـث : ${text}`,

                    contextInfo: channelInfo
                },
                { quoted: m }
            );
        }

        // ==========================================
        // أول نتيجة
        // ==========================================

        const first = results[0];

        // ==========================================
        // إنشاء القائمة
        // ==========================================

        const songs = results.map((item, index) => ({
            title: `${index + 1}. ${item.title}`,

            description:
                `🎵 YouTube | اضغط لاختيار هذه الأغنية`,

            id: `${usedPrefix}ytmp3 ${item.url}`
        }));

        // ==========================================
        // إرسال النتائج
        // ==========================================

        await conn.sendButton(
            m.chat,
            {
                image: {
                    url: first.thumbnail
                },

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

                contextInfo: channelInfo
            },

            { quoted: m }
        );

        await m.react('✅');

    } catch (e) {

        console.error('YouTube Search Error:', e);

        await m.react('❌');

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ *حــدث خــطــأ أثـنــاء الـبـحــث.*

📌 الـخـطـأ :
${e.message || e}`,

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
    /^(play|تحميل_اغنية)$/i;

handler.limit = false;

export default handler;
