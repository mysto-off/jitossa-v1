import moment from 'moment-timezone'

// ==========================================
// WEATHER MA - 175 MOROCCAN CITIES
// ==========================================

const channelName = 'WEATHER MA'
const instagram = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'
const CHANNEL_ID = '120363410733859643@newsletter'

const newsletter = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: CHANNEL_ID,
        newsletterName: instagram
    }
}

const instaLink = `https://instagram.com/${instagram}`

// ==========================================
// 175 مدينة مغربية
// ==========================================

const moroccanCities = [

    // الرباط - سلا - القنيطرة
    { name: 'الرباط', api: 'Rabat' },
    { name: 'سلا', api: 'Sale' },
    { name: 'القنيطرة', api: 'Kenitra' },
    { name: 'تمارة', api: 'Temara' },
    { name: 'الصخيرات', api: 'Skhirat' },
    { name: 'الخميسات', api: 'Khemisset' },
    { name: 'تيفلت', api: 'Tiflet' },
    { name: 'الرماني', api: 'Rommani' },
    { name: 'سيدي قاسم', api: 'Sidi Kacem' },
    { name: 'سيدي سليمان', api: 'Sidi Slimane' },
    { name: 'سيدي يحيى الغرب', api: 'Sidi Yahya El Gharb' },
    { name: 'سوق الأربعاء', api: 'Souk El Arbaa' },
    { name: 'مشرع بلقصيري', api: 'Mechra Bel Ksiri' },
    { name: 'سيدي علال التازي', api: 'Sidi Allal Tazi' },
    { name: 'عين عودة', api: 'Ain El Aouda' },

    // الدار البيضاء - سطات
    { name: 'الدار البيضاء', api: 'Casablanca' },
    { name: 'المحمدية', api: 'Mohammedia' },
    { name: 'النواصر', api: 'Nouaceur' },
    { name: 'مديونة', api: 'Mediouna' },
    { name: 'تيط مليل', api: 'Tit Mellil' },
    { name: 'دار بوعزة', api: 'Dar Bouazza' },
    { name: 'بنسليمان', api: 'Benslimane' },
    { name: 'بوزنيقة', api: 'Bouznika' },
    { name: 'برشيد', api: 'Berrechid' },
    { name: 'سطات', api: 'Settat' },
    { name: 'بن أحمد', api: 'Ben Ahmed' },
    { name: 'البروج', api: 'El Borouj' },
    { name: 'الجديدة', api: 'El Jadida' },
    { name: 'أزمور', api: 'Azemmour' },
    { name: 'سيدي بنور', api: 'Sidi Bennour' },
    { name: 'الزمامرة', api: 'Zemamra' },
    { name: 'أولاد فرج', api: 'Ouled Frej' },
    { name: 'حد السوالم', api: 'Had Soualem' },
    { name: 'السوالم', api: 'Soualem' },
    { name: 'الشلالات', api: 'Challalat' },

    // فاس - مكناس
    { name: 'فاس', api: 'Fes' },
    { name: 'مكناس', api: 'Meknes' },
    { name: 'صفرو', api: 'Sefrou' },
    { name: 'إفران', api: 'Ifrane' },
    { name: 'أزرو', api: 'Azrou' },
    { name: 'الحاجب', api: 'El Hajeb' },
    { name: 'مولاي يعقوب', api: 'Moulay Yacoub' },
    { name: 'تاونات', api: 'Taounate' },
    { name: 'تازة', api: 'Taza' },
    { name: 'جرسيف', api: 'Guercif' },
    { name: 'بولمان', api: 'Boulemane' },
    { name: 'ميسور', api: 'Missour' },
    { name: 'عين تاوجطات', api: 'Ain Taoujdate' },
    { name: 'البهاليل', api: 'El Menzel' },
    { name: 'رباط الخير', api: 'Ribate El Kheir' },
    { name: 'أوطاط الحاج', api: 'Outat El Haj' },

    // طنجة - تطوان - الحسيمة
    { name: 'طنجة', api: 'Tangier' },
    { name: 'تطوان', api: 'Tetouan' },
    { name: 'العرائش', api: 'Larache' },
    { name: 'القصر الكبير', api: 'Ksar El Kebir' },
    { name: 'أصيلة', api: 'Asilah' },
    { name: 'شفشاون', api: 'Chefchaouen' },
    { name: 'وزان', api: 'Ouazzane' },
    { name: 'الفنيدق', api: 'Fnideq' },
    { name: 'المضيق', api: 'Mdiq' },
    { name: 'مرتيل', api: 'Martil' },
    { name: 'واد لو', api: 'Oued Laou' },
    { name: 'الحسيمة', api: 'Al Hoceima' },
    { name: 'إمزورن', api: 'Imzouren' },
    { name: 'بني بوعياش', api: 'Bni Bouayach' },
    { name: 'ترجيست', api: 'Targuist' },
    { name: 'الدريوش', api: 'Driouch' },
    { name: 'ميضار', api: 'Midar' },
    { name: 'باب برد', api: 'Bab Berred' },
    { name: 'باب تازة', api: 'Bab Taza' },
    { name: 'الجبهة', api: 'Jebha' },

    // الشرق
    { name: 'وجدة', api: 'Oujda' },
    { name: 'الناظور', api: 'Nador' },
    { name: 'بركان', api: 'Berkane' },
    { name: 'تاوريرت', api: 'Taourirt' },
    { name: 'جرادة', api: 'Jerada' },
    { name: 'فجيج', api: 'Figuig' },
    { name: 'زايو', api: 'Zaio' },
    { name: 'سلوان', api: 'Selouane' },
    { name: 'العروي', api: 'Al Aaroui' },
    { name: 'أحفير', api: 'Ahfir' },
    { name: 'السعيدية', api: 'Saidia' },
    { name: 'بني درار', api: 'Bni Drar' },
    { name: 'دبدو', api: 'Debdou' },
    { name: 'عين بني مطهر', api: 'Ain Bni Mathar' },
    { name: 'عين الركادة', api: 'Ain Erreggada' },

    // مراكش - آسفي
    { name: 'مراكش', api: 'Marrakesh' },
    { name: 'آسفي', api: 'Safi' },
    { name: 'الصويرة', api: 'Essaouira' },
    { name: 'قلعة السراغنة', api: 'Kelaat Sraghna' },
    { name: 'اليوسفية', api: 'Youssoufia' },
    { name: 'ابن جرير', api: 'Ben Guerir' },
    { name: 'شيشاوة', api: 'Chichaoua' },
    { name: 'الشماعية', api: 'Chemaia' },
    { name: 'آيت أورير', api: 'Ait Ourir' },
    { name: 'تحناوت', api: 'Tahannaout' },
    { name: 'إمنتانوت', api: 'Imintanoute' },
    { name: 'مجاط', api: 'Mjate' },
    { name: 'تامنصورت', api: 'Tamansourt' },
    { name: 'الصهريج', api: 'Sidi Rahhal' },

    // بني ملال - خنيفرة
    { name: 'بني ملال', api: 'Beni Mellal' },
    { name: 'خنيفرة', api: 'Khenifra' },
    { name: 'خريبكة', api: 'Khouribga' },
    { name: 'الفقيه بن صالح', api: 'Fquih Ben Salah' },
    { name: 'أزيلال', api: 'Azilal' },
    { name: 'دمنات', api: 'Demnate' },
    { name: 'قصبة تادلة', api: 'Kasba Tadla' },
    { name: 'أبي الجعد', api: 'Bejaad' },
    { name: 'مريرت', api: 'Mrirert' },
    { name: 'زاوية الشيخ', api: 'Zaouiat Cheikh' },
    { name: 'سوق السبت', api: 'Souk Sebt' },
    { name: 'أفورار', api: 'Afourer' },
    { name: 'وادي زم', api: 'Oued Zem' },
    { name: 'أولاد عياد', api: 'Ouled Ayad' },
    { name: 'قصبة تادلة', api: 'Kasba Tadla' },

    // سوس ماسة
    { name: 'أكادير', api: 'Agadir' },
    { name: 'إنزكان', api: 'Inezgane' },
    { name: 'أيت ملول', api: 'Ait Melloul' },
    { name: 'الدشيرة الجهادية', api: 'Dcheira El Jihadia' },
    { name: 'بيوكرى', api: 'Biougra' },
    { name: 'تارودانت', api: 'Taroudant' },
    { name: 'تيزنيت', api: 'Tiznit' },
    { name: 'تافراوت', api: 'Tafraoute' },
    { name: 'أولاد تايمة', api: 'Ouled Teima' },
    { name: 'أولاد برحيل', api: 'Ouled Berhil' },
    { name: 'إغرم', api: 'Igherm' },
    { name: 'طاطا', api: 'Tata' },
    { name: 'إسافن', api: 'Issafen' },
    { name: 'سبت الكردان', api: 'Sebt El Guerdane' },
    { name: 'الكردان', api: 'El Guerdane' },
    { name: 'بلفاع', api: 'Biougra' },
    { name: 'أملن', api: 'Ammeln' },

    // درعة تافيلالت
    { name: 'الرشيدية', api: 'Errachidia' },
    { name: 'ورزازات', api: 'Ouarzazate' },
    { name: 'ميدلت', api: 'Midelt' },
    { name: 'تنغير', api: 'Tinghir' },
    { name: 'زاكورة', api: 'Zagora' },
    { name: 'الريش', api: 'Er-Rich' },
    { name: 'الريصاني', api: 'Rissani' },
    { name: 'أرفود', api: 'Erfoud' },
    { name: 'بوذنيب', api: 'Boudnib' },
    { name: 'النيف', api: 'Alnif' },
    { name: 'قلعة مكونة', api: 'Kalaat M Gouna' },
    { name: 'بومالن دادس', api: 'Boumalne Dades' },
    { name: 'أكدز', api: 'Agdz' },
    { name: 'محاميد الغزلان', api: 'Mhamid' },
    { name: 'تنزولين', api: 'Tinzouline' },

    // كلميم واد نون
    { name: 'كلميم', api: 'Guelmim' },
    { name: 'طانطان', api: 'Tan-Tan' },
    { name: 'سيدي إفني', api: 'Sidi Ifni' },
    { name: 'آسا', api: 'Assa' },
    { name: 'الزاك', api: 'Zag' },

    // العيون الساقية الحمراء
    { name: 'العيون', api: 'Laayoune' },
    { name: 'السمارة', api: 'Smara' },
    { name: 'بوجدور', api: 'Boujdour' },
    { name: 'طرفاية', api: 'Tarfaya' },

    // الداخلة وادي الذهب
    { name: 'الداخلة', api: 'Dakhla' },
    { name: 'أوسرد', api: 'Aousserd' },

    // مدن إضافية
    { name: 'مولاي بوسلهام', api: 'Moulay Bousselham' },
    { name: 'سيدي علال البحراوي', api: 'Sidi Allal El Bahraoui' },
    { name: 'مرس الخير', api: 'Mers El Kheir' },
    { name: 'مشرع بن عبو', api: 'Mchraa Ben Abbou' },
    { name: 'أولاد عبو', api: 'Ouled Abbou' },
    { name: 'سيدي إسماعيل', api: 'Sidi Ismail' },
    { name: 'أولاد سعيد', api: 'Ouled Said' },
    { name: 'القصر المجاز', api: 'Ksar Majaz' },
    { name: 'أقشور', api: 'Akchour' },
    { name: 'زومي', api: 'Zoumi' },
    { name: 'مقريصات', api: 'Mokrissat' },
    { name: 'بليونش', api: 'Belyounech' },
    { name: 'اسطيحة', api: 'Stehat' },
    { name: 'سيدي أحمد أو موسى', api: 'Sidi Ahmed Ou Moussa' },
    { name: 'إيمنتانوت', api: 'Imintanoute' },
    { name: 'أملن', api: 'Ammeln' }
]

// ==========================================
// Weather Codes
// ==========================================

const weatherCodes = {
    0: '🌞 صـافـي',
    1: '🌤️ غـائـم جـزئـيـا',
    2: '⛅ غـائـم جـزئـيـا',
    3: '☁️ غـائـم',
    45: '🌫️ ضـبـاب',
    48: '🌫️ ضـبـاب كـثـيـف',
    51: '🌦️ رذاذ خـفـيـف',
    53: '🌦️ رذاذ',
    55: '🌧️ رذاذ كـثـيـف',
    61: '🌧️ مـطـر خـفـيـف',
    63: '🌧️ مـطـر',
    65: '🌧️ مـطـر غـزيـر',
    71: '🌨️ ثـلـج خـفـيـف',
    73: '🌨️ ثـلـج',
    75: '🌨️ ثـلـج كـثـيـف',
    95: '⛈️ عـاصـفـة',
    96: '⛈️ عـاصـفـة مـع بـرد',
    99: '⛈️ عـاصـفـة شـديـدة'
}

// ==========================================
// تنظيف اسم المدينة للمقارنة
// ==========================================

function normalizeCity(value = '') {
    return String(value)
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s'’`.-]/g, '')
        .trim()
}

// ==========================================
// البحث عن المدينة
// ==========================================

async function findMoroccanCity(city) {

    const search = String(city || '').trim()

    if (!search) return null

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?` +
        `name=${encodeURIComponent(search)}` +
        `&count=10` +
        `&language=ar` +
        `&format=json` +
        `&countryCode=MA`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Geocoding API Error')
    }

    const data = await response.json()

    if (!data?.results?.length) {
        return null
    }

    const wanted = normalizeCity(search)

    // مطابقة دقيقة أولاً
    let result = data.results.find(x =>
        normalizeCity(x.name) === wanted &&
        String(x.country_code || '').toUpperCase() === 'MA'
    )

    // ثم مطابقة مع اسم المدينة الموجود في القائمة
    if (!result) {
        const listCity = moroccanCities.find(x =>
            normalizeCity(x.name) === wanted ||
            normalizeCity(x.api) === wanted
        )

        if (listCity) {
            result = data.results.find(x =>
                normalizeCity(x.name) === normalizeCity(listCity.api) ||
                normalizeCity(x.name) === normalizeCity(listCity.name)
            )
        }
    }

    // أي نتيجة مغربية صحيحة
    if (!result) {
        result = data.results.find(x =>
            String(x.country_code || '').toUpperCase() === 'MA'
        )
    }

    return result || null
}

// ==========================================
// إرسال الطقس
// ==========================================

async function getWeather(m, conn, city, _p) {

    await conn.sendMessage(m.chat, {
        react: {
            text: '⏳',
            key: m.key
        }
    })

    try {

        const result = await findMoroccanCity(city)

        if (!result) {

            await conn.sendMessage(m.chat, {
                react: {
                    text: '❌',
                    key: m.key
                }
            })

            return conn.sendMessage(m.chat, {
                text:
`❌ *الـمـديـنـة غـيـر مـوجـودة*

📍 اكتب اسم مدينة مغربية صحيحة.`,

                contextInfo: newsletter

            }, {
                quoted: m
            })
        }

        const latitude = result.latitude
        const longitude = result.longitude

        const name =
            result.name ||
            city

        const country =
            result.country ||
            'Morocco'

        // ==================================
        // Weather API
        // ==================================

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min` +
            `&timezone=Africa%2FCasablanca`

        const weatherRes = await fetch(weatherUrl)

        if (!weatherRes.ok) {
            throw new Error('Weather API Error')
        }

        const w = await weatherRes.json()

        if (!w?.current || !w?.daily) {
            throw new Error('Invalid weather response')
        }

        const weather =
            weatherCodes[w.current.weather_code] ||
            '☁️ غـيـر مـعـروف'

        const date =
            moment()
                .tz('Africa/Casablanca')
                .format('DD/MM/YYYY HH:mm')

        // ==================================
        // النتيجة
        // ==================================

        let txt =
`*🌤️ الـطـقـس فـي ${name}* 🌤️

📍 *الـبـلـد*: ${country}
🌡️ *الـحـرارة*: ${w.current.temperature_2m}°C
☁️ *الـحـالـة*: ${weather}
💧 *الـرطـوبـة*: ${w.current.relative_humidity_2m}%
💨 *الـريـاح*: ${w.current.wind_speed_10m} km/h
🔥 *الـعـظـمـى*: ${w.daily.temperature_2m_max?.[0]}°C
❄️ *الـصـغـرى*: ${w.daily.temperature_2m_min?.[0]}°C
📅 *الـتـحـديـث*: ${date}

> ${instagram}`

        await conn.sendMessage(m.chat, {

            text: txt,

            footer: {
                text: channelName
            },

            buttons: [
                {
                    name: 'quick_reply',

                    buttonParamsJson:
                        JSON.stringify({
                            display_text: '🌤️ بـحـث جـديـد',
                            id: `${_p}الـطـقـس`
                        })
                }
            ],

            contextInfo: newsletter

        }, {
            quoted: m,
            mentions: [m.sender]
        })

        await conn.sendMessage(m.chat, {
            react: {
                text: '✅',
                key: m.key
            }
        })

    } catch (e) {

        console.log('Weather Error:', e)

        await conn.sendMessage(m.chat, {
            react: {
                text: '❌',
                key: m.key
            }
        })

        return conn.sendMessage(m.chat, {

            text:
`❌ *حـدث خـطـأ أثـنـاء جـلـب الـطـقـس*

تـأكـد مـن الاتـصـال بـالإنـتـرنـت
وأن اسـم الـمـديـنـة صـحـيـح.`,

            contextInfo: newsletter

        }, {
            quoted: m
        })
    }
}

// ==========================================
// Handler
// ==========================================

let handler = async (
    m,
    {
        conn,
        args,
        usedPrefix: _p,
        command
    }
) => {

    try {

        // ==================================
        // اختيار مدينة من القائمة
        // ==================================

        const cityMatch =
            String(command || '')
                .match(/^weathercity([0-9]+)$/i)

        if (cityMatch) {

            const index =
                Number(cityMatch[1]) - 1

            if (
                index < 0 ||
                index >= moroccanCities.length
            ) {

                await conn.sendMessage(m.chat, {
                    react: {
                        text: '❌',
                        key: m.key
                    }
                })

                return conn.sendMessage(m.chat, {
                    text: `❌ *الـمـديـنـة غـيـر مـوجـودة*`,
                    contextInfo: newsletter
                }, {
                    quoted: m
                })
            }

            const selectedCity =
                moroccanCities[index]

            return getWeather(
                m,
                conn,
                selectedCity.api,
                _p
            )
        }

        // ==================================
        // كتابة اسم المدينة مباشرة
        // ==================================

        const city =
            args
                .join(' ')
                .trim()

        if (city) {

            return getWeather(
                m,
                conn,
                city,
                _p
            )
        }

        // ==================================
        // بناء القائمة
        // ==================================

        const rows =
            moroccanCities.map((c, index) => ({
                title:
                    `🌤️ ${index + 1}. ${c.name}`,

                description:
                    '📍 اضـغـط لـمـعـرفـة حـالـة الـطـقـس',

                id:
                    `${_p}weathercity${index + 1}`
            }))

        // ==================================
        // تقسيم القائمة
        // ==================================

        const sections = []

        for (
            let i = 0;
            i < rows.length;
            i += 10
        ) {

            sections.push({

                title:
                    `🌤️ الـمـدن ${i + 1} - ${Math.min(
                        i + 10,
                        rows.length
                    )}`,

                rows:
                    rows.slice(i, i + 10)
            })
        }

        // ==================================
        // الرسالة
        // ==================================

        const caption =
`🌤️ *الـطـقـس فـي الـمـغـرب* 🌤️

🔢 عـدد الـمـدن: *${moroccanCities.length}*

👇 اضـغـط عـلـى الـزر
واخـتـر الـمـديـنـة لـمـعـرفـة حـالـة الـطـقـس.

> ${instagram}`

        // ==================================
        // Single Select
        // ==================================

        await conn.sendButton(
            m.chat,
            {
                text: caption,

                footer: {
                    text: channelName
                },

                buttons: [
                    {
                        name: 'single_select',

                        buttonParamsJson:
                            JSON.stringify({
                                title:
                                    '🌤️ اخـتـر الـمـديـنـة',

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

        console.log('Handler Error:', e)

        await m.react('❌')

        return conn.sendMessage(m.chat, {

            text:
                `❌ *حـدث خـطـأ غـيـر مـتـوقـع*`,

            contextInfo: newsletter

        }, {
            quoted: m
        })
    }
}

// ==========================================
// Commands
// ==========================================

handler.help = [
    'الـطـقـس <المدينة>',
    'حالة_الطقس <المدينة>',
    'weather <city>'
]

handler.tags = ['info']

handler.command =
    /^(الـطـقـس|weather|حالة_الطقس|weathercity[0-9]+)$/i

handler.limit = false
handler.register = false

export default handler
