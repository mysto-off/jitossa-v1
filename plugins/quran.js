// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// Quran - 114 Surah + Single Select

// ==========================================
// معلومات القناة
// ==========================================

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

// ==========================================
// أسماء السور
// ==========================================

const surahNames = [
    'الفاتحة',
    'البقرة',
    'آل عمران',
    'النساء',
    'المائدة',
    'الأنعام',
    'الأعراف',
    'الأنفال',
    'التوبة',
    'يونس',
    'هود',
    'يوسف',
    'الرعد',
    'إبراهيم',
    'الحجر',
    'النحل',
    'الإسراء',
    'الكهف',
    'مريم',
    'طه',
    'الأنبياء',
    'الحج',
    'المؤمنون',
    'النور',
    'الفرقان',
    'الشعراء',
    'النمل',
    'القصص',
    'العنكبوت',
    'الروم',
    'لقمان',
    'السجدة',
    'الأحزاب',
    'سبأ',
    'فاطر',
    'يس',
    'الصافات',
    'ص',
    'الزمر',
    'غافر',
    'فصلت',
    'الشورى',
    'الزخرف',
    'الدخان',
    'الجاثية',
    'الأحقاف',
    'محمد',
    'الفتح',
    'الحجرات',
    'ق',
    'الذاريات',
    'الطور',
    'النجم',
    'القمر',
    'الرحمن',
    'الواقعة',
    'الحديد',
    'المجادلة',
    'الحشر',
    'الممتحنة',
    'الصف',
    'الجمعة',
    'المنافقون',
    'التغابن',
    'الطلاق',
    'التحريم',
    'الملك',
    'القلم',
    'الحاقة',
    'المعارج',
    'نوح',
    'الجن',
    'المزمل',
    'المدثر',
    'القيامة',
    'الإنسان',
    'المرسلات',
    'النبأ',
    'النازعات',
    'عبس',
    'التكوير',
    'الانفطار',
    'المطففين',
    'الانشقاق',
    'البروج',
    'الطارق',
    'الأعلى',
    'الغاشية',
    'الفجر',
    'البلد',
    'الشمس',
    'الليل',
    'الضحى',
    'الشرح',
    'التين',
    'العلق',
    'القدر',
    'البينة',
    'الزلزلة',
    'العاديات',
    'القارعة',
    'التكاثر',
    'العصر',
    'الهمزة',
    'الفيل',
    'قريش',
    'الماعون',
    'الكوثر',
    'الكافرون',
    'النصر',
    'المسد',
    'الإخلاص',
    'الفلق',
    'الناس'
]

// ==========================================
// Handler
// ==========================================

const handler = async (
    m,
    {
        conn,
        text,
        usedPrefix,
        command
    }
) => {

    try {

        // ==========================================
        // السورة المختارة من القائمة
        // ==========================================

        const match = command.match(
            /^quransurah([0-9]{1,3})$/i
        )

        if (match) {

            const surahNumber = Number(match[1])

            if (
                surahNumber < 1 ||
                surahNumber > 114
            ) {
                return conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *رقـم الـسـورة غـيـر صـحـيـح.*

📖 اخـتـر سـورة مـن 1 إلـى 114.`,
                        contextInfo: newsletter
                    },
                    { quoted: m }
                )
            }

            const surahName =
                surahNames[surahNumber - 1]

            await m.react('⏳')

            // ==========================================
            // رابط الصوت
            // ==========================================

            const audioUrl =
                `https://server11.mp3quran.net/shatri/${String(surahNumber).padStart(3, '0')}.mp3`

            try {

                await conn.sendMessage(
                    m.chat,
                    {
                        audio: {
                            url: audioUrl
                        },

                        mimetype: 'audio/mpeg',

                        fileName:
                            `سورة_${surahName}.mp3`,

                        ptt: false,

                        contextInfo: newsletter
                    },
                    {
                        quoted: m
                    }
                )

                await m.react('✅')

            } catch (e) {

                console.error(
                    'Quran Audio Error:',
                    e
                )

                await m.react('❌')

                await conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *فـشـل تـحـمـيـل سـورة ${surahName}.*

🔄 حـاول مـرة أخـرى.`,
                        contextInfo: newsletter
                    },
                    {
                        quoted: m
                    }
                )
            }

            return
        }

        // ==========================================
        // دعم كتابة رقم السورة مباشرة
        // مثال: .quran 36
        // ==========================================

        if (text?.trim()) {

            const number =
                Number(text.trim())

            if (
                Number.isInteger(number) &&
                number >= 1 &&
                number <= 114
            ) {

                const surahName =
                    surahNames[number - 1]

                const audioUrl =
                    `https://server11.mp3quran.net/shatri/${String(number).padStart(3, '0')}.mp3`

                await m.react('⏳')

                try {

                    await conn.sendMessage(
                        m.chat,
                        {
                            audio: {
                                url: audioUrl
                            },

                            mimetype: 'audio/mpeg',

                            fileName:
                                `سورة_${surahName}.mp3`,

                            ptt: false,

                            contextInfo: newsletter
                        },
                        {
                            quoted: m
                        }
                    )

                    await m.react('✅')

                } catch (e) {

                    console.error(
                        'Quran Direct Error:',
                        e
                    )

                    await m.react('❌')

                    await conn.sendMessage(
                        m.chat,
                        {
                            text:
`❌ *فـشـل تـحـمـيـل سـورة ${surahName}.*

🔄 حـاول مـرة أخـرى.`,
                            contextInfo: newsletter
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
        // إنشاء قائمة السور
        // ==========================================

        const rows =
            surahNames.map(
                (name, index) => {

                    return {
                        title:
                            `📖 ${index + 1}. سورة ${name}`,

                        description:
                            '🎙️ أبو بكر الشاطري',

                        id:
                            `${usedPrefix}quransurah${index + 1}`
                    }

                }
            )

        // ==========================================
        // تقسيم السور
        // ==========================================

        const sections = []

        for (
            let i = 0;
            i < rows.length;
            i += 10
        ) {

            const part =
                rows.slice(
                    i,
                    i + 10
                )

            sections.push({
                title:
                    `📖 السور ${i + 1} - ${Math.min(i + 10, 114)}`,

                rows: part
            })
        }

        // ==========================================
        // النص بدون أي إطار
        // ==========================================

        const caption =
`📖 *الـقـرآن الـكـريـم*

📚 *جـمـيـع سـور الـقـرآن الـكـريـم*

🔢 عـدد الـسـور: *114*
🎙️ الـقـارئ: *أبـو بـكـر الـشـاطـري*

👇 اضـغـط عـلـى الـزر
واخـتـر الـسـورة الـتـي تـريـد الاسـتـمـاع إلـيـهـا.

> 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`

        // ==========================================
        // إرسال القائمة بالزر
        // ==========================================

        await conn.sendButton(
            m.chat,
            {

                text: caption,

                footer: {
                    text:
                        '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
                },

                buttons: [
                    {
                        name:
                            'single_select',

                        buttonParamsJson:
                            JSON.stringify({
                                title:
                                    '📖 اخـتـر الـسـورة',

                                sections
                            })
                    }
                ],

                headerType: 1,

                contextInfo:
                    newsletter
            },
            {
                quoted: m
            }
        )

        await m.react('✅')

    } catch (e) {

        console.error(
            'Quran Handler Error:',
            e
        )

        await m.react('❌')

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ *حـدث خـطـأ غـيـر مـتـوقـع.*

🔄 حـاول مـرة أخـرى.`,
                contextInfo: newsletter
            },
            {
                quoted: m
            }
        )
    }
}

// ==========================================
// الأوامر
// ==========================================

handler.help = [
    'صوت_القران',
    'quran'
]

handler.tags = [
    'ادوات',
    'tools'
]

handler.command =
    /^(صوت_القران|quran|quransurah[0-9]{1,3})$/i

handler.limit = false
handler.register = false

export default handler
