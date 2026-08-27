// Prayer Times plugin - No dependencies
// تـعـديـل : نـورديـن
// نسخة محسنة: المدن المغربية + القرى + اختيار من القائمة
// API: Open-Meteo + AlAdhan

// ==========================================
// معلومات القناة
// ==========================================

const channelName = ''
const instagram = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦'

const newsletter = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363410733859643@newsletter',
        newsletterName: `${instagram}`
    }
}

// ==========================================
// المدن والبلدات المغربية
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
    { name: 'مولاي بوسلهام', api: 'Moulay Bousselham' },
    { name: 'عين عودة', api: 'Ain El Aouda' },
    { name: 'مرس الخير', api: 'Mers El Kheir' },
    { name: 'سيدي علال البحراوي', api: 'Sidi Allal El Bahraoui' },

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
    { name: 'ابن أحمد', api: 'Ben Ahmed' },
    { name: 'البروج', api: 'El Borouj' },
    { name: 'الجديدة', api: 'El Jadida' },
    { name: 'أزمور', api: 'Azemmour' },
    { name: 'سيدي بنور', api: 'Sidi Bennour' },
    { name: 'الزمامرة', api: 'Zemamra' },
    { name: 'البئر الجديد', api: 'Bir Jdid' },
    { name: 'حد السوالم', api: 'Had Soualem' },
    { name: 'السوالم', api: 'Soualem' },
    { name: 'أولاد فرج', api: 'Ouled Frej' },
    { name: 'سيدي إسماعيل', api: 'Sidi Ismail' },
    { name: 'أولاد عبو', api: 'Ouled Abbou' },
    { name: 'مشرع بن عبو', api: 'Mchraa Ben Abbou' },

    // فاس - مكناس
    { name: 'فاس', api: 'Fes' },
    { name: 'مكناس', api: 'Meknes' },
    { name: 'تازة', api: 'Taza' },
    { name: 'صفرو', api: 'Sefrou' },
    { name: 'إفران', api: 'Ifrane' },
    { name: 'أزرو', api: 'Azrou' },
    { name: 'الحاجب', api: 'El Hajeb' },
    { name: 'بولمان', api: 'Boulemane' },
    { name: 'ميسور', api: 'Missour' },
    { name: 'تاونات', api: 'Taounate' },
    { name: 'قرية با محمد', api: 'Qasbat Ba Mohammed' },
    { name: 'عين تاوجطات', api: 'Ain Taoujdate' },
    { name: 'الحاج قدور', api: 'El Haj Kaddour' },
    { name: 'مولاي يعقوب', api: 'Moulay Yacoub' },
    { name: 'البهاليل', api: 'El Bahalil' },
    { name: 'رباط الخير', api: 'Ribate El Kheir' },
    { name: 'أوطاط الحاج', api: 'Outat El Haj' },
    { name: 'تيسة', api: 'Tissa' },
    { name: 'قرية با محمد', api: 'Karia Ba Mohamed' },

    // طنجة - تطوان - الحسيمة
    { name: 'طنجة', api: 'Tangier' },
    { name: 'تطوان', api: 'Tetouan' },
    { name: 'العرائش', api: 'Larache' },
    { name: 'الحسيمة', api: 'Al Hoceima' },
    { name: 'شفشاون', api: 'Chefchaouen' },
    { name: 'وزان', api: 'Ouazzane' },
    { name: 'القصر الكبير', api: 'Ksar El Kebir' },
    { name: 'أصيلة', api: 'Asilah' },
    { name: 'الفنيدق', api: 'Fnideq' },
    { name: 'مرتيل', api: 'Martil' },
    { name: 'المضيق', api: 'Mdiq' },
    { name: 'باب برد', api: 'Bab Berred' },
    { name: 'باب تازة', api: 'Bab Taza' },
    { name: 'أجدير', api: 'Ajdir' },
    { name: 'إمزورن', api: 'Imzouren' },
    { name: 'بني بوعياش', api: 'Bni Bouayach' },
    { name: 'ترجيست', api: 'Targuist' },
    { name: 'الدريوش', api: 'Driouch' },
    { name: 'ميضار', api: 'Midar' },
    { name: 'واد لو', api: 'Oued Laou' },
    { name: 'الجبهة', api: 'Jebha' },
    { name: 'اسطيحة', api: 'Stehat' },
    { name: 'بليونش', api: 'Belyounech' },
    { name: 'زومي', api: 'Zoumi' },
    { name: 'مقريصات', api: 'Mokrissat' },
    { name: 'أقشور', api: 'Akchour' },

    // الشرق
    { name: 'وجدة', api: 'Oujda' },
    { name: 'الناظور', api: 'Nador' },
    { name: 'بركان', api: 'Berkane' },
    { name: 'تاوريرت', api: 'Taourirt' },
    { name: 'جرادة', api: 'Jerada' },
    { name: 'فجيج', api: 'Figuig' },
    { name: 'جرسيف', api: 'Guercif' },
    { name: 'زايو', api: 'Zaio' },
    { name: 'سلوان', api: 'Selouane' },
    { name: 'العروي', api: 'Al Aaroui' },
    { name: 'أحفير', api: 'Ahfir' },
    { name: 'السعيدية', api: 'Saidia' },
    { name: 'عين بني مطهر', api: 'Ain Bni Mathar' },
    { name: 'بني درار', api: 'Bni Drar' },
    { name: 'دبدو', api: 'Debdou' },
    { name: 'كرسيف', api: 'Guercif' },
    { name: 'بوعرفة', api: 'Bouarfa' },
    { name: 'عين الركادة', api: 'Ain Erreggada' },

    // مراكش - آسفي
    { name: 'مراكش', api: 'Marrakesh' },
    { name: 'آسفي', api: 'Safi' },
    { name: 'الصويرة', api: 'Essaouira' },
    { name: 'قلعة السراغنة', api: 'Kelaat Sraghna' },
    { name: 'الرحامنة', api: 'Rehamna' },
    { name: 'شيشاوة', api: 'Chichaoua' },
    { name: 'ابن جرير', api: 'Ben Guerir' },
    { name: 'اليوسفية', api: 'Youssoufia' },
    { name: 'الشماعية', api: 'Chemaia' },
    { name: 'آيت أورير', api: 'Ait Ourir' },
    { name: 'تحناوت', api: 'Tahannaout' },
    { name: 'إمنتانوت', api: 'Imintanoute' },
    { name: 'مجاط', api: 'Mjate' },
    { name: 'منارة', api: 'Menara' },

    // سوس ماسة
    { name: 'أكادير', api: 'Agadir' },
    { name: 'إنزكان', api: 'Inezgane' },
    { name: 'أيت ملول', api: 'Ait Melloul' },
    { name: 'الدشيرة الجهادية', api: 'Dcheira El Jihadia' },
    { name: 'بيوكرى', api: 'Biougra' },
    { name: 'اشتوكة آيت باها', api: 'Chtouka Ait Baha' },
    { name: 'بلفاع', api: 'Belfaa' },
    { name: 'أولاد تايمة', api: 'Ouled Teima' },
    { name: 'تارودانت', api: 'Taroudant' },
    { name: 'تيزنيت', api: 'Tiznit' },
    { name: 'تافراوت', api: 'Tafraoute' },
    { name: 'إغرم', api: 'Igherm' },
    { name: 'طاطا', api: 'Tata' },
    { name: 'إسافن', api: 'Issafen' },
    { name: 'فم الحصن', api: 'Foum Zguid' },
    { name: 'أولاد برحيل', api: 'Ouled Berhil' },
    { name: 'سبت الكردان', api: 'Sebt El Guerdane' },
    { name: 'الكردان', api: 'El Guerdane' },
    { name: 'أملن', api: 'Ammeln' },

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
    { name: 'أوسرد', api: 'Aousserd' }
]

// ==========================================
// تنظيف اسم المدينة
// ==========================================

function cleanCityName(city) {

    return String(city || '')
        .trim()
        .replace(/[ـ]/g, '')
        .replace(/\s+/g, ' ')
}

// ==========================================
// البحث عن إحداثيات المدينة داخل المغرب
// ==========================================

async function getCoordinates(city) {

    const cityClean = cleanCityName(city)

    const url =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityClean)}&count=10&language=ar&format=json`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Geocoding API Error')
    }

    const data = await response.json()

    if (!data || !Array.isArray(data.results)) {
        return null
    }

    // نحاول اختيار نتيجة من المغرب فقط
    const moroccoResult = data.results.find(item => {

        const countryCode =
            String(item.country_code || '').toUpperCase()

        const country =
            String(item.country || '').toLowerCase()

        return (
            countryCode === 'MA' ||
            country.includes('morocco') ||
            country.includes('maroc') ||
            country.includes('المغرب')
        )
    })

    return moroccoResult || null
}

// ==========================================
// جلب أوقات الصلاة بالإحداثيات
// ==========================================

async function getPrayerByCoordinates(latitude, longitude) {

    const url =
        `https://api.aladhan.com/v1/timings?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&method=2`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Prayer API Error')
    }

    const json = await response.json()

    if (
        !json ||
        json.code !== 200 ||
        !json.data ||
        !json.data.timings
    ) {
        return null
    }

    return json.data
}

// ==========================================
// إرسال أوقات الصلاة
// ==========================================

async function sendPrayerTimes(
    conn,
    m,
    cityName,
    cityApiName
) {

    await m.react('⏳')

    try {

        // ==================================
        // البحث عن المدينة
        // ==================================

        const coordinates =
            await getCoordinates(cityApiName)

        if (!coordinates) {

            await m.react('❌')

            return conn.sendMessage(
                m.chat,
                {
                    text:
`*❌ الـمـديـنـة غـيـر مـوجـودة*

📍 لم أتمكن من العثور على:
*${cityName}*

حاول كتابة اسم المدينة بشكل أوضح.`,
                    contextInfo: newsletter
                },
                {
                    quoted: m
                }
            )
        }

        // ==================================
        // إحداثيات
        // ==================================

        const latitude =
            coordinates.latitude

        const longitude =
            coordinates.longitude

        // ==================================
        // أوقات الصلاة
        // ==================================

        const data =
            await getPrayerByCoordinates(
                latitude,
                longitude
            )

        if (!data) {

            await m.react('❌')

            return conn.sendMessage(
                m.chat,
                {
                    text:
`*❌ تعذر الحصول على أوقات الصلاة*

📍 المدينة: *${cityName}*

حاول مرة أخرى بعد قليل.`,
                    contextInfo: newsletter
                },
                {
                    quoted: m
                }
            )
        }

        const timings =
            data.timings

        const date =
            data.date?.readable || ''

        const hijri =
            data.date?.hijri?.date || ''

        // ==================================
        // النتيجة
        // ==================================

        let txt =
`*📌 أوقـات الـصـلاة - ${cityName}*

📍 *الـمـديـنـة:* ${coordinates.name || cityName}
🌍 *الـبـلـد:* ${coordinates.country || 'Morocco'}

*📅 الـتـاريـخ:* ${date}
*📆 هـجـري:* ${hijri}

*🌅 الـفـجـر:* ${timings.Fajr}
*☀️ الـشـروق:* ${timings.Sunrise}
*🌞 الـظـهـر:* ${timings.Dhuhr}
*🌤️ الـعـصـر:* ${timings.Asr}
*🌆 الـمـغـرب:* ${timings.Maghrib}
*🌙 الـعـشـاء:* ${timings.Isha}

*مـلاحـظـة:* الأوقـات حـسـب تـوقـيـت الـمـغـرب

> ${instagram}`

        await conn.sendMessage(
            m.chat,
            {
                text: txt,
                contextInfo: newsletter
            },
            {
                quoted: m
            }
        )

        await m.react('✅')

    } catch (e) {

        console.log(
            '[PRAYER ERROR]',
            e
        )

        await m.react('❌')

        await conn.sendMessage(
            m.chat,
            {
                text:
`*❌ حـدث خـطـأ*

تأكد من اتصال الإنترنت وحاول مرة أخرى.`,
                contextInfo: newsletter
            },
            {
                quoted: m
            }
        )
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
        usedPrefix,
        command
    }
) => {

    try {

        const cmd =
            String(command || '')

        // ==================================
        // اختيار المدينة من القائمة
        // ==================================

        const match =
            cmd.match(
                /^prayercity([0-9]+)$/i
            )

        if (match) {

            const cityIndex =
                Number(match[1])

            if (
                !Number.isInteger(cityIndex) ||
                cityIndex < 1 ||
                cityIndex > moroccanCities.length
            ) {

                await m.react('❌')

                return conn.sendMessage(
                    m.chat,
                    {
                        text:
                            `*❌ الـمـديـنـة غـيـر مـوجـودة*`,
                        contextInfo: newsletter
                    },
                    {
                        quoted: m
                    }
                )
            }

            const city =
                moroccanCities[
                    cityIndex - 1
                ]

            return sendPrayerTimes(
                conn,
                m,
                city.name,
                city.api
            )
        }

        // ==================================
        // كتابة اسم المدينة مباشرة
        // ==================================

        const cityText =
            cleanCityName(
                Array.isArray(args)
                    ? args.join(' ')
                    : ''
            )

        if (cityText) {

            return sendPrayerTimes(
                conn,
                m,
                cityText,
                cityText
            )
        }

        // ==================================
        // إنشاء القائمة
        // ==================================

        const rows =
            moroccanCities.map(
                (city, index) => {

                    return {

                        title:
                            `🕌 ${index + 1}. ${city.name}`,

                        description:
                            '📍 اضغط لمعرفة أوقات الصلاة',

                        id:
                            `${usedPrefix}prayercity${index + 1}`
                    }
                }
            )

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
                    `🕌 المدن ${i + 1} - ${Math.min(
                        i + 10,
                        rows.length
                    )}`,

                rows:
                    rows.slice(
                        i,
                        i + 10
                    )
            })
        }

        // ==================================
        // الرسالة
        // ==================================

        const caption =
`*📌 أوقـات الـصـلاة - الـمـغـرب*

🇲🇦 جميع المدن والبلدات المتوفرة

🔢 عـدد الـمـدن:
*${moroccanCities.length}*

👇 اضـغـط عـلـى الـزر
واخـتـر الـمـديـنـة الـتـي تـريـد مـعـرفـة أوقـات الـصـلاة فـيـهـا.

أو اكتب اسم المدينة مباشرة.

> ${instagram}`

        // ==================================
        // زر القائمة
        // ==================================

        await conn.sendButton(
            m.chat,
            {

                text: caption,

                footer: {
                    text: instagram
                },

                buttons: [

                    {
                        name:
                            'single_select',

                        buttonParamsJson:
                            JSON.stringify({

                                title:
                                    '🕌 اخـتـر الـمـديـنـة',

                                sections:
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

        console.log(
            '[PRAYER HANDLER ERROR]',
            e
        )

        await m.react('❌')

        return conn.sendMessage(
            m.chat,
            {
                text:
                    `*❌ حـدث خـطـأ غـيـر مـتـوقـع*`,
                contextInfo: newsletter
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
    'اوقات_الصلاة',
    'اوقات_الصلاة <المدينة>',
    'اوقات_الصلاة',
    'اوقات_الصلاة <المدينة>',
    'prayer'
]

handler.tags = [
    'islam'
]

handler.command =
    /^(اوقات_الصلاة|prayer|prayercity[0-9]+)$/i

handler.limit = false
handler.register = false

export default handler
