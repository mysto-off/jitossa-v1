// ==========================================
// سكريبت GitHub بدون زخرفة
// بدون مكتبات خارجية
// ==========================================

const channelName = '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧 🇲🇦';
const channelId = '120363410733859643@newsletter';

const channelInfo = {
    isForwarded: true,
    forwardingScore: 1,
    forwardedNewsletterMessageInfo: {
        newsletterJid: channelId,
        newsletterName: channelName,
        serverMessageId: -1
    }
};

let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) {
        return conn.sendMessage(m.chat, {
            text: `*GitHub*

*الاستــخــدام :*
${usedPrefix}${command} اسـم المـستـودع

*مــثــال :*
${usedPrefix}${command} gpt

*لـلتحـميل المباشــر :*
${usedPrefix}${command} تحـمــيل الرابــط`,
            contextInfo: channelInfo
        }, { quoted: m });
    }

    // تحميل مباشر
    if (args[0] === 'تحميل' || args[0] === 'dl') {

        if (!args[1]) {
            return m.reply(`❌ *خـطــأ*\n\nالــرابــط غــيـر صـالــح.`);
        }

        let url = args[1];

        await conn.sendMessage(m.chat, {
            react: { text: '⏳', key: m.key }
        });

        try {
            let name = args[2] || url.split('/').pop() || 'file.zip';
            let res = await fetch(url);

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            let data = await res.arrayBuffer();

            await conn.sendMessage(m.chat, {
                document: Buffer.from(data),
                fileName: name,
                mimetype: 'application/zip',
                caption: `*تــم التــحــمـيل*

*تـــم إرسـال الـمـلف بنـجـــاح.*`, // <-- زدت الفاصلة هنا
                footer: '𝗝𝗜𝗧𝗢𝗦𝗦𝗔 𝗕𝗢𝗧',
                contextInfo: channelInfo
            }, { quoted: m });

            await conn.sendMessage(m.chat, {
                react: { text: '✅', key: m.key }
            });

        } catch (e) {
            await conn.sendMessage(m.chat, {
                react: { text: '❌', key: m.key }
            });

            return m.reply(`❌ *خـطـأ*\n\nفـشــل فـي تحـمـيل الـمـلف:\n${e.message}`);
        }
        return;
    }

    // البحث
    let query = args.join(' ');

    await conn.sendMessage(m.chat, {
        react: { text: '🔍', key: m.key }
    });

    try {
        let res = await fetch(
            `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=10`,
            { headers: { 'User-Agent': 'JITOSA-BOT' } }
        );

        let json = await res.json();

        if (!json.items || json.items.length === 0) {
            await conn.sendMessage(m.chat, {
                react: { text: '❌', key: m.key }
            });
            return m.reply(`*لــم يــتــم الــعثـور عـلـى نـتائـج للبـحـث:* ${query}`);
        }

        const first = json.items[0];
        const thumbnail = `https://github.com/${first.owner.login}.png`;

        const repos = json.items.map((repo, index) => {
            let branch = repo.default_branch || 'main';
            return {
                title: `${index + 1}. ${repo.full_name}`,
                description: `Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}`,
                id: `${usedPrefix}${command} تحميل ${repo.html_url}/archive/refs/heads/${branch}.zip ${repo.name}.zip`
            };
        });

        await conn.sendButton(
            m.chat,
            {
                image: { url: thumbnail },
                caption: `*نـــتائـج البــحــث فــي GitHub*

*البحــث :* ${query}
*عـــدد الــنتــائـــج :* ${json.total_count}

اخــتــر المـستــودع الــذي تــريــد تحــميــله.`,
                footer: channelName,
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: 'اخـتــر مــســـتودع',
                            sections: [{ title: 'GitHub Results', rows: repos }]
                        })
                    }
                ],
                messageParamsJson: JSON.stringify({
                    bottom_sheet: {
                        list_title: 'قــائــمــة المــستودعـــات',
                        button_title: 'اضــغــط هــنـــا',
                        in_thread_buttons_limit: 1
                    }
                }),
                contextInfo: channelInfo
            },
            { quoted: m }
        );

        await conn.sendMessage(m.chat, {
            react: { text: '✅', key: m.key }
        });

    } catch (e) {
        console.error('Github Error:', e);
        await conn.sendMessage(m.chat, {
            react: { text: '❌', key: m.key }
        });
        await conn.sendMessage(m.chat, {
            text: `*حدــث خــطــأ أثـنـاء الـبحـث.*

*الـخــطأ:*
${e.message || e}`,
            contextInfo: channelInfo
        }, { quoted: m });
    }
};

handler.help = ['جيتهاب <بحث>'];
handler.tags = ['الادوات'];
handler.command = /^(جيتهاب|gitHub|gi)$/i;
handler.limit = true;

export default handler;
