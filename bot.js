const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN_BOT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

const bot = new Telegraf(BOT_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// HTTP-сервер для Render
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is running'));
app.listen(port, () => console.log(`Server on port ${port}`));

// === КОМАНДЫ ===
bot.start(async (ctx) => {
    await ctx.reply('👑 Добро пожаловать в Evseenko Majesty!', Markup.inlineKeyboard([
        [Markup.button.webApp('🚀 Открыть', WEBAPP_URL)]
    ]));
});

bot.command('balance', async (ctx) => {
    await ctx.reply('💰 Баланс: 0 ₽\n🎁 Бонусы: 0');
});

bot.command('admin_panel', async (ctx) => {
    await ctx.reply('🔐 Панель сотрудника', Markup.inlineKeyboard([
        [Markup.button.webApp('Открыть', 'https://evseenkomajesty.ru/admin')]
    ]));
});

// === ЗАПУСК ===
bot.launch().then(() => console.log('✅ Бот запущен'));
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
