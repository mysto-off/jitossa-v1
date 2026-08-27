// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// Aljazeera News - FAST 30 News + Single Select
// بدون تصميم + بدون صورة

const RSS_URL = 'https://www.aljazeera.net/rss'

const MAX_NEWS = 30
const CACHE_TIME = 60 * 1000
const FETCH_TIMEOUT = 7000

// ==========================================
// القناة
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
// Cache
// ==========================================

let newsCache = {
    data: [],
    time: 0
}

// ==========================================
// Handler
// ==========================================

const handler = async (m, { conn, usedPrefix: _p, command }) => {

    try {

        // ==========================================
        // اختيار خبر
        // ==========================================

        const match = command.match(
            /^aljazeeranews([1-9]|[12][0-9]|30)$/i
        )

        if (match) {

            const selected = Number(match[1])

            await m.react('📰')

            const news = await fetchAljazeeraNews()

            if (!news.length || !news[selected - 1]) {

                await m.react('❌')

                return conn.sendMessage(
                    m.chat,
                    {
                        text:
                            `❌ لـم يـتـم الـعـثـور عـلـى الـخـبـر رقـم ${selected}.`,
                        contextInfo: newsletter
                    },
                    {
                        quoted: m
                    }
                )

            }

            const item = news[selected - 1]

            let text = ''

            text += `📰 ${item.title}\n\n`

            text += `*📅 الـتــاريخ :* ${formatDate(item.date)}\n`

            text += `*🏷️ المـصـدر : الجـزيـرة*\n\n`

            if (item.desc) {

                text += `*📝 الـتفـاصـيـل :*\n`
                text += `${item.desc}\n\n`

            }

            text += `*🔗 الـرابـط :*\n`
            text += `${item.link}\n\n`

            text += `📰 الـخبـر ${selected} مــن ${Math.min(
                MAX_NEWS,
                news.length
            )} خـبـر`

            await conn.sendMessage(
                m.chat,
                {
                    text,
                    contextInfo: newsletter
                },
                {
                    quoted: m
                }
            )

            await m.react('✅')

            return
        }

        // ==========================================
        // جلب الأخبار
        // ==========================================

        await m.react('🔍')

        const news = await fetchAljazeeraNews()

        if (!news.length) {

            await m.react('❌')

            return conn.sendMessage(
                m.chat,
                {
                    text:
                        '❌ لـم أستطع جـلـب أخـبـار الـجـزيـرة حـالـياً.',
                    contextInfo: newsletter
                },
                {
                    quoted: m
                }
            )

        }

        // ==========================================
        // إنشاء القائمة
        // ==========================================

        const rows = news
            .slice(0, MAX_NEWS)
            .map((item, index) => {

                let title = String(
                    item.title || ''
                )
                    .replace(/\n/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim()

                if (title.length > 60) {
                    title =
                        title.slice(0, 57) + '...'
                }

                return {

                    title:
                        `📰 الخبر ${index + 1}`,

                    description:
                        title,

                    id:
                        `${_p}aljazeeranews${index + 1}`
                }

            })

        // ==========================================
        // تقسيم الأخبار
        // ==========================================

        const sections = []

        for (
            let i = 0;
            i < rows.length;
            i += 10
        ) {

            const part =
                rows.slice(i, i + 10)

            if (part.length) {

                sections.push({

                    title:
                        `الأخبار ${i + 1} - ${Math.min(
                            i + 10,
                            rows.length
                        )}`,

                    rows: part

                })

            }

        }

        // ==========================================
        // النص البسيط
        // ==========================================

        const caption =
`*📰 أخـبار الجـزيــرة*

تـم جـلـب ${news.length} خـبـراً.

اضـغـط عـلـى الـزر لاخـتـيار الخـبر الـذي تـريـد قـراءتــه.

𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`

        // ==========================================
        // إرسال بدون صورة
        // ==========================================

        await conn.sendButton(
            m.chat,
            {

                text: caption,

                footer: '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦',

                buttons: [
                    {
                        name: 'single_select',

                        buttonParamsJson:
                            JSON.stringify({

                                title:
                                    '📰 اخــتـر الــخـبر',

                                sections

                            })
                    }
                ],

                headerType: 1,

                contextInfo: newsletter

            },
            {
                quoted: m
            }
        )

        await m.react('✅')

    } catch (e) {

        console.error(
            'Aljazeera Error:',
            e
        )

        await m.react('❌')

        await conn.sendMessage(
            m.chat,
            {
                text:
                    `❌ خـطـأ:\n${e.message || 'خطأ غير معروف'}`,
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
    'اخبار_الجزيرة',
    'aljazeera'
]

handler.tags = [
    'aj'
]

handler.command =
    /^(aj|اخبار_الجزيرة|aljazeera|aljazeeranews([1-9]|[12][0-9]|30))$/i

handler.limit = false
handler.register = false

export default handler


// ==========================================
// جلب الأخبار
// ==========================================

async function fetchAljazeeraNews() {

    // ==========================================
    // Cache
    // ==========================================

    if (
        newsCache.data.length &&
        Date.now() - newsCache.time < CACHE_TIME
    ) {

        return newsCache.data
    }

    try {

        const res = await fetch(
            RSS_URL,
            {
                headers: {

                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',

                    'accept':
                        'application/rss+xml, application/xml, text/xml, */*'

                },

                signal:
                    AbortSignal.timeout(
                        FETCH_TIMEOUT
                    )
            }
        )

        if (!res.ok) {

            throw new Error(
                `HTTP ${res.status}`
            )

        }

        const xml =
            await res.text()

        const items =
            xml.match(
                /<item[\s\S]*?<\/item>/gi
            ) || []

        const news = []

        for (const item of items) {

            if (
                news.length >= MAX_NEWS
            ) {
                break
            }

            const title =
                getTag(
                    item,
                    'title'
                )

            const link =
                getTag(
                    item,
                    'link'
                )

            let desc =
                getTag(
                    item,
                    'description'
                )

            desc =
                cleanHTML(desc)

            if (desc.length > 700) {

                desc =
                    desc.slice(0, 700) +
                    '...'
            }

            const date =
                getTag(
                    item,
                    'pubDate'
                )

            if (
                title &&
                link &&
                link.startsWith('http')
            ) {

                news.push({

                    title:
                        decodeHTMLEntities(
                            title
                        ),

                    link,

                    desc:
                        decodeHTMLEntities(
                            desc
                        ),

                    date

                })

            }

        }

        newsCache = {

            data: news,

            time: Date.now()

        }

        return news

    } catch (e) {

        console.log(
            'Aljazeera RSS Error:',
            e.message
        )

        // إذا فشل الاتصال، استعمل Cache القديم
        if (newsCache.data.length) {
            return newsCache.data
        }

        return []

    }

}


// ==========================================
// استخراج Tag
// ==========================================

function getTag(xml, tag) {

    const match =
        xml.match(
            new RegExp(
                `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
                'i'
            )
        )

    if (!match) {
        return ''
    }

    return cleanXML(
        match[1]
    )

}


// ==========================================
// تنظيف XML
// ==========================================

function cleanXML(text) {

    return String(text)

        .replace(
            /<!\[CDATA\[([\s\S]*?)\]\]>/gi,
            '$1'
        )

        .replace(
            /<[^>]+>/g,
            ''
        )

        .replace(
            /\s+/g,
            ' '
        )

        .trim()

}


// ==========================================
// تنظيف HTML
// ==========================================

function cleanHTML(text) {

    return String(text)

        .replace(
            /<script[\s\S]*?<\/script>/gi,
            ''
        )

        .replace(
            /<style[\s\S]*?<\/style>/gi,
            ''
        )

        .replace(
            /<[^>]+>/g,
            ' '
        )

        .replace(
            /\s+/g,
            ' '
        )

        .trim()

}


// ==========================================
// فك HTML Entities
// ==========================================

function decodeHTMLEntities(text) {

    return String(text)

        .replace(
            /&amp;/g,
            '&'
        )

        .replace(
            /&quot;/g,
            '"'
        )

        .replace(
            /&#39;/g,
            "'"
        )

        .replace(
            /&apos;/g,
            "'"
        )

        .replace(
            /&lt;/g,
            '<'
        )

        .replace(
            /&gt;/g,
            '>'
        )

        .replace(
            /&#(\d+);/g,
            (_, dec) =>
                String.fromCharCode(
                    Number(dec)
                )
        )

        .replace(
            /&#x([0-9a-f]+);/gi,
            (_, hex) =>
                String.fromCharCode(
                    parseInt(hex, 16)
                )
        )

}


// ==========================================
// التاريخ
// ==========================================

function formatDate(date) {

    if (!date) {
        return 'غـيـر مـتـوفـر'
    }

    try {

        const d =
            new Date(date)

        if (
            isNaN(
                d.getTime()
            )
        ) {
            return date
        }

        return d.toLocaleString(
            'ar-MA',
            {

                timeZone:
                    'Africa/Casablanca',

                year:
                    'numeric',

                month:
                    '2-digit',

                day:
                    '2-digit',

                hour:
                    '2-digit',

                minute:
                    '2-digit'

            }
        )

    } catch {

        return date

    }

            }
