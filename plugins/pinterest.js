// © 𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦
// Pinterest Search - 7 Images + Single Select
// Channel + اختيار صورة واحدة بدون إرسال النتائج مسبقاً

const MAX_RESULTS = 7
const CACHE_TIME = 60 * 60 * 1000
const SEARCH_TIMEOUT = 15000

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

const pinterestCache = new Map()

// تنظيف النتائج القديمة
function cleanCache() {

    const now = Date.now()

    for (const [key, value] of pinterestCache.entries()) {

        if (
            !value ||
            now - value.time > CACHE_TIME
        ) {
            pinterestCache.delete(key)
        }

    }
}

// ==========================================
// Session
// ==========================================

async function getSession() {

    const res = await fetch(
        'https://id.pinterest.com/',
        {
            headers: {
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/148.0.0.0 Safari/537.36',

                'accept-language':
                    'en-US,en;q=0.9'
            },

            signal:
                AbortSignal.timeout(
                    SEARCH_TIMEOUT
                )
        }
    )

    const cookies =
        res.headers.getSetCookie?.() || []

    const cookieHeader =
        cookies
            .map(c => c.split(';')[0])
            .join('; ')

    const csrf =
        cookies
            .find(c =>
                c.startsWith('csrftoken=')
            )
            ?.match(
                /csrftoken=([^;]+)/
            )?.[1] || ''

    return {
        cookies: cookieHeader,
        csrf
    }
}

// ==========================================
// Pinterest Search
// ==========================================

async function searchPinterest(
    query,
    limit = 7
) {

    const session =
        await getSession()

    const data = {

        options: {
            query,

            scope: 'pins',

            page_size: limit,

            refine_search_with_filters: true
        },

        context: {}

    }

    const sourceUrl =
        `/search/pins/?q=${encodeURIComponent(
            query
        )}`

    const url =
        `https://id.pinterest.com/resource/BaseSearchResource/get/?` +
        `source_url=${encodeURIComponent(
            sourceUrl
        )}` +
        `&data=${encodeURIComponent(
            JSON.stringify(data)
        )}` +
        `&_=${Date.now()}`

    const res =
        await fetch(
            url,
            {
                headers: {

                    'accept':
                        'application/json, text/javascript, */*, q=0.01',

                    'accept-language':
                        'en-US,en;q=0.9',

                    'user-agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/148.0.0.0 Safari/537.36',

                    'referer':
                        `https://id.pinterest.com${sourceUrl}`,

                    'x-requested-with':
                        'XMLHttpRequest',

                    'x-app-version':
                        '6d51d5a',

                    'x-pinterest-appstate':
                        'active',

                    'x-pinterest-pws-handler':
                        'www/search/[scope].js',

                    'x-pinterest-source-url':
                        sourceUrl,

                    ...(session.csrf
                        ? {
                            'x-csrftoken':
                                session.csrf
                        }
                        : {}),

                    ...(session.cookies
                        ? {
                            cookie:
                                session.cookies
                        }
                        : {})
                },

                signal:
                    AbortSignal.timeout(
                        SEARCH_TIMEOUT
                    )
            }
        )

    if (!res.ok) {

        throw new Error(
            `HTTP ${res.status}`
        )
    }

    const json =
        await res.json()

    const payload =
        json?.resource_response?.data

    if (!payload) {
        return []
    }

    const results =
        Array.isArray(payload)
            ? payload
            : payload.results || []

    return results

        .filter(
            pin => pin?.id
        )

        .map(pin => ({

            title:
                pin.title ||
                pin.grid_title ||
                '',

            image:
                pin.images?.orig?.url ||
                pin.images?.['736x']?.url ||
                pin.images?.['564x']?.url ||
                pin.images?.['474x']?.url ||
                null,

            username:
                pin.pinner?.username ||
                '',

            fullName:
                pin.pinner?.full_name ||
                '',

            url:
                `https://id.pinterest.com/pin/${pin.id}/`

        }))

        .filter(
            pin => pin.image
        )

        .slice(
            0,
            limit
        )
}

// ==========================================
// إنشاء ID للجلسة
// ==========================================

function createSessionId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .slice(2, 10)
    )
}

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

        cleanCache()

        // ==========================================
        // اختيار الصورة
        // ==========================================

        const match =
            command.match(
                /^pinselect_([a-z0-9]+)_(1|2|3|4|5|6|7)$/i
            )

        if (match) {

            const sessionId =
                match[1]

            const selected =
                Number(match[2])

            const cached =
                pinterestCache.get(
                    sessionId
                )

            if (!cached) {

                await m.react('❌')

                return conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *انـتـهـت صـلاحـيـة الـقـائـمـة.*

🔄 اسـتـخـدم الأمـر مـن جـديـد.`
                    },
                    {
                        quoted: m
                    }
                )
            }

            // التأكد أن القائمة لن تكون قديمة
            if (
                Date.now() -
                cached.time >
                CACHE_TIME
            ) {

                pinterestCache.delete(
                    sessionId
                )

                await m.react('❌')

                return conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *انـتـهـت صـلاحـيـة الـقـائـمـة.*

🔄 ابـحـث مـن جـديـد.`
                    },
                    {
                        quoted: m
                    }
                )
            }

            const pin =
                cached.results[
                    selected - 1
                ]

            if (!pin) {

                await m.react('❌')

                return conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *لـم يـتـم الـعـثـور عـلـى الـصـورة رقـم ${selected}.*`
                    },
                    {
                        quoted: m
                    }
                )
            }

            await m.react('📥')

            // ==========================================
            // Caption
            // ==========================================

            let caption =
`📌 *صـورة بـنـتـرست*

🖼️ *رقـم الـصـورة:* ${selected}/${cached.results.length}

`

            if (pin.title) {

                caption +=
                    `📝 *الـعـنـوان:*\n${pin.title}\n\n`
            }

            if (pin.fullName) {

                caption +=
                    `👤 *الـحـسـاب:* ${pin.fullName}`

                if (pin.username) {

                    caption +=
                        ` (@${pin.username})`
                }

                caption += '\n\n'
            }

            caption +=
`🔗 *رابـط الـصـورة:*
${pin.url}

> ${channelName}`

            // ==========================================
            // إرسال الصورة المختارة
            // ==========================================

            try {

                await conn.sendMessage(
                    m.chat,
                    {
                        image: {
                            url: pin.image
                        },

                        caption,

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
                    'Pinterest Image Error:',
                    e
                )

                await conn.sendMessage(
                    m.chat,
                    {
                        text:
`❌ *مـا قـدرتـش نـرسـل الـصـورة.*

🔗 ${pin.url}`,

                        contextInfo:
                            newsletter
                    },
                    {
                        quoted: m
                    }
                )

                await m.react('❌')
            }

            return
        }

        // ==========================================
        // التحقق من البحث
        // ==========================================

        if (!text?.trim()) {

            return conn.sendMessage(
                m.chat,
                {
                    text:
`📌 *طـريـقـة الاسـتـخـدام:*

${usedPrefix}${command} <كـلـمـة الـبـحـث>

*أمـثـلـة:*

• ${usedPrefix}${command} تـصـمـيـم
• ${usedPrefix}${command} خـلـفـيـات انـمـي
• ${usedPrefix}${command} سيارات
• ${usedPrefix}${command} ديكور

🖼️ سـيـتـم عـرض 7 صـور لـلاخـتـيـار.`,

                    contextInfo:
                        newsletter
                },
                {
                    quoted: m
                }
            )
        }

        const query =
            text.trim()

        await m.react('🔍')

        // ==========================================
        // البحث
        // ==========================================

        let results

        try {

            results =
                await searchPinterest(
                    query,
                    MAX_RESULTS
                )

        } catch (e) {

            console.error(
                'Pinterest Search Error:',
                e
            )

            await m.react('❌')

            return conn.sendMessage(
                m.chat,
                {
                    text:
`❌ *فـشـل الاتـصـال بـبـنـتـرست.*

🔄 جـرب مـرة أخـرى بـعـد قـلـيـل.`,

                    contextInfo:
                        newsletter
                },
                {
                    quoted: m
                }
            )
        }

        // ==========================================
        // لا توجد نتائج
        // ==========================================

        if (
            !results ||
            !results.length
        ) {

            await m.react('❌')

            return conn.sendMessage(
                m.chat,
                {
                    text:
`😕 *مـا لـقـيـنـاش نـتـائـج لـ:*

"${query}"

🔄 جـرب كـلـمـة بـحـث خـرى.`,

                    contextInfo:
                        newsletter
                },
                {
                    quoted: m
                }
            )
        }

        // ==========================================
        // إنشاء جلسة
        // ==========================================

        const sessionId =
            createSessionId()

        pinterestCache.set(
            sessionId,
            {
                results,
                query,
                time: Date.now()
            }
        )

        // ==========================================
        // Rows
        // ==========================================

        const rows =
            results.map(
                (pin, index) => {

                    let title =
                        String(
                            pin.title || ''
                        )
                            .replace(
                                /\n/g,
                                ' '
                            )
                            .replace(
                                /\s+/g,
                                ' '
                            )
                            .trim()

                    if (!title) {

                        title =
                            'صـورة مـن بـنـتـرست'
                    }

                    if (
                        title.length > 55
                    ) {

                        title =
                            title.slice(
                                0,
                                52
                            ) + '...'
                    }

                    return {

                        title:
                            `🖼️ الـصـورة ${index + 1}`,

                        description:
                            title,

                        id:
                            `${usedPrefix}pinselect_${sessionId}_${index + 1}`
                    }
                }
            )

        // ==========================================
        // Sections
        // ==========================================

        const sections = [

            {
                title:
                    `📌 نـتـائـج: ${query}`,

                rows
            }

        ]

        // ==========================================
        // القائمة
        // ==========================================

        const caption =
`📌 *بـحـث بـنـتـرست*

🔎 *الـبـحـث:*
${query}

🖼️ *الـنـتـائـج:* ${results.length} صـور

👇 اضـغـط عـلـى الـقـائـمـة واخـتـر الـصـورة الـتـي تـريـدهـا.

> ${channelName}`

        await conn.sendButton(
            m.chat,
            {

                text:
                    caption,

                footer: {
                    text:
                        channelName
                },

                buttons: [

                    {
                        name:
                            'single_select',

                        buttonParamsJson:
                            JSON.stringify({

                                title:
                                    '🖼️ اخـتـر الـصـورة',

                                sections
                            })
                    }

                ],

                headerType:
                    1,

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
            'Pinterest Handler Error:',
            e
        )

        await m.react('❌')

        await conn.sendMessage(
            m.chat,
            {
                text:
`❌ *حـدث خـطـأ غـيـر مـتـوقـع.*

${e.message || 'Unknown Error'}`,

                contextInfo:
                    newsletter
            },
            {
                quoted: m
            }
        )
    }
}

// ==========================================
// Commands
// ==========================================

handler.help = [
    'بينترست <النص>',
    'pinterest <النص>'
]

handler.tags = [
    'tools'
]

handler.command =
    /^(بينترست|pinterest|pinselect_[a-z0-9]+_(1|2|3|4|5|6|7))$/i

handler.limit = true

export default handler
