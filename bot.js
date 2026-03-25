
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

// === КОМАНДА /start ===
bot.start(async (ctx) => {
    const user = ctx.from;
    const firstName = user.first_name;

    try {
        const { data: existingUser } = await supabase
            .from('majesty_users')
            .select('*')
            .eq('telegram_id', user.id)
            .single();

        if (!existingUser) {
            await supabase.from('majesty_users').insert({
                telegram_id: user.id,
                first_name: firstName,
                role: 'client',
                balance: 0,
                bonus_points: 0
            });
        }

        await ctx.replyWithMarkdown(
            `👑 *Evseenko Majesty*\n\n` +
            `Привет, ${firstName}!\n\n` +
            `👇 Открой личный кабинет`,
            Markup.inlineKeyboard([
                [Markup.button.webApp('🚀 Открыть', WEBAPP_URL)]
            ])
        );
    } catch (error) {
        console.error('Ошибка:', error);
        await ctx.reply('⚠️ Ошибка. Попробуй позже.');
    }
});

// === КОМАНДА /balance ===
bot.command('balance', async (ctx) => {
    const telegramId = ctx.from.id;
    try {
        const { data: user } = await supabase
            .from('majesty_users')
            .select('balance, bonus_points')
            .eq('telegram_id', telegramId)
            .single();

        if (!user) {
            await ctx.reply('⚠️ Напиши /start');
            return;
        }

        await ctx.replyWithMarkdown(
            `💰 *Баланс:* ${user.balance} ₽\n` +
            `🎁 *Бонусы:* ${user.bonus_points}`
        );
    } catch (error) {
        await ctx.reply('⚠️ Ошибка');
    }
});

// === ЗАПУСК ===
bot.launch({
    dropPendingUpdates: true
}).then(() => {
    console.log('✅ Бот запущен');
}).catch((err) => {
    console.error('❌ Ошибка:', err);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
