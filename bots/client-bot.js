const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN not set');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);

bot.start(async (ctx) => {
    const user = ctx.from;
    console.log('🤖 /start from', user.id, user.first_name);
    
    await ctx.replyWithMarkdown(
        `👑 *Evseenko Majesty*\n\n` +
        `Привет, ${user.first_name}!\n\n` +
        `👇 Открой личный кабинет`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Открыть', WEBAPP_URL)]
        ])
    );
});

bot.launch().then(() => {
    console.log('✅ Бот запущен');
}).catch((err) => {
    console.error('❌ Ошибка запуска бота:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
