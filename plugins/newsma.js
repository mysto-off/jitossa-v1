// NewsMA FAST plugin - 30 News + Single Select
// بدون تصميم + بدون صورة
// تـعـديـل : نـورديـن
// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦

const MAX_NEWS = 30
const RSS_TIMEOUT = 7000
const DETAIL_TIMEOUT = 7000
const NEWS_CACHE_TIME = 60 * 1000
const DETAIL_CACHE_TIME = 10 * 60 * 1000

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
// Cache
// ==========================================

let newsCache = {
    data: [],
    time: 0
}

const detailCache = new Map()

// ==========================================
// Handler
// ==========================================

const handler = async (m, { conn, usedPrefix: _p, command }) => {

    try {

        // ==========================================
        // الخبر المختار
        // ==========================================

        const match = command.match(
            /^newsma([1-9]|[12][0-9]|30)$/i
        )

        if (match) {

            const selected = Number(match[1])

            await m.react('📰')

            const news = await getMoroccoNews()

            if (!news[selected - 1]) {

                await m.react('❌')

                return conn.sendMessage(m.chat, {
                    text:
                        `❌ لـم يـتـم الـعـثـور عـلـى الـخـبـر رقـم ${selected}.`,
                    contextInfo: newsletter
                }, {
                    quoted: m
                })

            }

            const selectedNews =
                news[selected - 1]

            // ==========================================
            // جلب التفاصيل
            // ==========================================

            const item = await getNewsDetail(
                selectedNews.link
            )

            if (!item) {

                await m.react('❌')

                return conn.sendMessage(m.chat, {
                    text:
                        '❌ لـم أستطع جـلـب تـفـاصـيـل هـذا الـخـبـر.',
                    contextInfo: newsletter
                }, {
                    quoted: m
                })

            }

            // ==========================================
            // النص فقط
            // ==========================================

            let text = ''

            text += `📰 ${item.title}\n\n`

            text += `👤 الكـاتب : ${item.author}\n\n`

            text += `📅 الـتاريـخ : ${item.date}\n\n`

            text += `🏷️ التـصـنيـف : ${item.category}\n\n`

            text += `📝 الـخـبر :\n`
            text += `${item.content}\n\n`

            text += `🔗 الـرابــط :\n`
            text += `${item.link}\n\n`

            text +=
                `📰 الــخـبر ${selected} مــن ${Math.min(
                    MAX_NEWS,
                    news.length
                )} خـبــر`

            // ==========================================
            // إرسال النص فقط
            // ==========================================

            await conn.sendMessage(m.chat, {
                text,
                contextInfo: newsletter
            }, {
                quoted: m
            })

            await m.react('✅')

            return
        }

        // ==========================================
        // الأمر الرئيسي
        // ==========================================

        await m.react('⏳')

        const news =
            await getMoroccoNews()

        if (!news.length) {

            await m.react('❌')

            return conn.sendMessage(m.chat, {
                text:
                    '❌ لا تـوجـد أخـبـار مـتـاحـة حـالـيـاً.',
                contextInfo: newsletter
            }, {
                quoted: m
            })

        }

        // ==========================================
        // Rows
        // ==========================================

        const rows = news
            .slice(0, MAX_NEWS)
            .map((item, index) => {

                let title =
                    String(item.title || '')
                        .replace(/\n/g, ' ')
                        .replace(/\s+/g, ' ')
                        .trim()

                if (title.length > 60) {
                    title =
                        title.slice(0, 57) + '...'
                }

                return {
                    title:
                        `🇲🇦 الـــخـبر ${index + 1}`,

                    description:
                        title,

                    id:
                        `${_p}newsma${index + 1}`
                }

            })

        // ==========================================
        // Sections
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
                        `الأخـبـــار ${i + 1} - ${Math.min(
                            i + 10,
                            rows.length
                        )}`,

                    rows: part
                })

            }

        }

        // ==========================================
        // نص بسيط
        // ==========================================

        const caption =
`*📰 أخـــــبار المـغـــرب*

تـم جـلـب ${news.length} خـبــراً.

اضـغـط علـى الزر لاخـتيـار الـخـبر الـذي تـريـد قـراءتـه.

𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦`

        // ==========================================
        // إرسال بدون صورة
        // ==========================================

        await conn.sendButton(m.chat, {

            text: caption,

            footer:
                '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦',

            buttons: [

                {
                    name: 'single_select',

                    buttonParamsJson:
                        JSON.stringify({

                            title:
                                '🇲🇦 اخــتـــر الخـبـــر',

                            sections

                        })
                }

            ],

            headerType: 1,

            contextInfo: newsletter

        }, {
            quoted: m
        })

        await m.react('✅')

    } catch (e) {

        console.error(
            'NewsMA FAST Error:',
            e
        )

        await m.react('❌')

        await conn.sendMessage(m.chat, {
            text:
                `❌ خـطــأ:\n\n${e.message || 'حدث خطأ غير معروف'}`,
            contextInfo: newsletter
        }, {
            quoted: m
        })

    }

}

// ==========================================
// الأوامر
// ==========================================

handler.help = [
    'newsma',
    'اخبار_المغرب'
]

handler.tags = [
    'morocco'
]

handler.command =
    /^(newsma|اخبار_المغرب|newsma|newsma([1-9]|[12][0-9]|30))$/i

handler.limit = false
handler.register = false

export default handler


// ==========================================
// جلب أخبار المغرب - FAST
// ==========================================

async function getMoroccoNews() {

    // ==========================================
    // Cache
    // ==========================================

    if (
        newsCache.data.length &&
        Date.now() - newsCache.time <
        NEWS_CACHE_TIME
    ) {

        return newsCache.data

    }

    const urls = [
        'https://www.hespress.com/rss',
        'https://www.le360.ma/rss'
    ]

    const HEADERS = {

        'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',

        'Accept':
            'application/rss+xml, application/xml, text/xml, */*'
    }

    // ==========================================
    // جلب المصدرين معاً
    // ==========================================

    const results =
        await Promise.allSettled(

            urls.map(async url => {

                const res =
                    await fetch(url, {

                        headers: HEADERS,

                        signal:
                            AbortSignal.timeout(
                                RSS_TIMEOUT
                            )

                    })

                if (!res.ok) {

                    throw new Error(
                        `HTTP ${res.status}`
                    )

                }

                return res.text()

            })

        )

    const allNews = []

    // ==========================================
    // معالجة النتائج
    // ==========================================

    for (const result of results) {

        if (
            result.status !==
            'fulfilled'
        ) {
            continue
        }

        const xml = result.value

        const items =
            xml.match(
                /<item[\s\S]*?<\/item>/gi
            ) || []

        for (const item of items) {

            if (
                allNews.length >=
                MAX_NEWS * 2
            ) {
                break
            }

            const title =
                item.match(
                    /<title[^>]*>([\s\S]*?)<\/title>/i
                )?.[1]

            const link =
                item.match(
                    /<link[^>]*>([\s\S]*?)<\/link>/i
                )?.[1]

            const pubDate =
                item.match(
                    /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i
                )?.[1]

            if (
                !title ||
                !link
            ) {
                continue
            }

            const cleanTitle =
                decodeHTMLEntities(
                    cleanXML(title)
                )

            const cleanLink =
                cleanXML(link)

            if (
                !cleanTitle ||
                !cleanLink.startsWith('http')
            ) {
                continue
            }

            allNews.push({

                title:
                    cleanTitle,

                link:
                    cleanLink,

                date:
                    pubDate
                        ? formatDate(
                            cleanXML(pubDate)
                        )
                        : 'غـيـر مـتـوفـر'

            })

        }

    }

    // ==========================================
    // إزالة التكرار
    // ==========================================

    const seen = new Set()

    const unique =
        allNews.filter(item => {

            if (
                seen.has(item.link)
            ) {
                return false
            }

            seen.add(item.link)

            return true

        })

    // ==========================================
    // ترتيب الأخبار
    // ==========================================

    unique.sort((a, b) => {

        const da =
            new Date(a.date).getTime()

        const db =
            new Date(b.date).getTime()

        if (
            isNaN(da) ||
            isNaN(db)
        ) {
            return 0
        }

        return db - da

    })

    const finalNews =
        unique.slice(
            0,
            MAX_NEWS
        )

    // ==========================================
    // Cache
    // ==========================================

    newsCache = {

        data:
            finalNews,

        time:
            Date.now()

    }

    return finalNews

}


// ==========================================
// تفاصيل الخبر - FAST + CACHE
// ==========================================

async function getNewsDetail(url) {

    const cached =
        detailCache.get(url)

    if (
        cached &&
        Date.now() - cached.time <
        DETAIL_CACHE_TIME
    ) {

        return cached.data

    }

    try {

        const res =
            await fetch(url, {

                headers: {

                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',

                    'Accept':
                        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'

                },

                signal:
                    AbortSignal.timeout(
                        DETAIL_TIMEOUT
                    )

            })

        if (!res.ok) {

            throw new Error(
                `HTTP ${res.status}`
            )

        }

        const html =
            await res.text()

        // ==========================================
        // العنوان
        // ==========================================

        let title =
            html.match(
                /<title[^>]*>([\s\S]*?)<\/title>/i
            )?.[1] ||
            'No Title'

        title =
            decodeHTMLEntities(
                cleanHTML(title)
            )
                .replace(
                    /\s*-\s*Hespress\s*$/i,
                    ''
                )
                .replace(
                    /\s*-\s*LE360\s*$/i,
                    ''
                )
                .trim()

        // ==========================================
        // الكاتب
        // ==========================================

        let author =
            html.match(
                /<meta[^>]+name=["']author["'][^>]+content=["']([^"']+)["']/i
            )?.[1] ||
            'غـيـر مـعـروف'

        author =
            decodeHTMLEntities(
                cleanHTML(author)
            ).trim()

        // ==========================================
        // التاريخ
        // ==========================================

        let date =
            html.match(
                /property=["']article:published_time["'][^>]+content=["']([^"']+)["']/i
            )?.[1] ||

            html.match(
                /content=["']([^"']+)["'][^>]+property=["']article:published_time["']/i
            )?.[1] ||

            ''

        date =
            date
                ? formatDate(date)
                : 'غـيـر مـتـوفـر'

        // ==========================================
        // التصنيف
        // ==========================================

        let category =
            html.match(
                /property=["']article:section["'][^>]+content=["']([^"']+)["']/i
            )?.[1] ||
            'عـام'

        category =
            decodeHTMLEntities(
                cleanHTML(category)
            ).trim()

        // ==========================================
        // محتوى الخبر
        // ==========================================

        let content = ''

        const contentMatch =
            html.match(
                /class=["'][^"']*article-content[^"']*["'][\s\S]*?<\/div>/i
            )

        if (contentMatch) {

            content =
                contentMatch[0]

        } else {

            const paragraphs =
                html.match(
                    /<p[^>]*>[\s\S]*?<\/p>/gi
                ) || []

            content =
                paragraphs
                    .slice(0, 10)
                    .join(' ')

        }

        content =
            cleanHTML(content)

        content =
            decodeHTMLEntities(
                content
            )

        if (!content) {

            content =
                'لـم يـتـم الـعـثـور عـلـى تـفـاصـيـل الـخـبـر.'

        }

        if (content.length > 1200) {

            content =
                content.slice(0, 1200) +
                '...'

        }

        const result = {

            title,

            author,

            date,

            category,

            content,

            link: url

        }

        detailCache.set(
            url,
            {
                data: result,
                time: Date.now()
            }
        )

        return result

    } catch (e) {

        console.error(
            'News Detail Error:',
            e.message
        )

        return null

    }

}


// ==========================================
// تنظيف XML
// ==========================================

function cleanXML(text) {

    return String(text)

        .replace(
            /<!\[CDATA\[([\s\S]*?)\]\]>/g,
            '$1'
        )

        .replace(
            /<[^>]*>/g,
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
            /<noscript[\s\S]*?<\/noscript>/gi,
            ''
        )

        .replace(
            /<[^>]*>/g,
            ' '
        )

        .replace(
            /\s+/g,
            ' '
        )

        .trim()

}


// ==========================================
// التاريخ
// ==========================================

function formatDate(date) {

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


// ==========================================
// HTML Entities
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
