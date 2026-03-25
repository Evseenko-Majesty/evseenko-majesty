const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
const express = require('express');
require('dotenv').config();

// --- КЛЮЧИ ---
const BOT_TOKEN = process.env.TOKEN_BOT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

// --- ПОДКЛЮЧЕНИЯ ---
const bot = new Telegraf(BOT_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- HTTP-СЕРВЕР ДЛЯ RENDER ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Evseenko Majesty Bot is running!');
});

app.listen(port, () => {
    console.log(`🌐 HTTP-сервер запущен на порту ${port}`);
});

// --- КОМАНДА /start ---
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

            await ctx.replyWithMarkdown(
                `👑 *Добро пожаловать в Evseenko Majesty!*\n\n` +
                `Привет, ${firstName}! Твой путь только начинается.\n\n` +
                `👇 *Открой личный кабинет*`,
                Markup.inlineKeyboard([
                    [Markup.button.webApp('🚀 Личный кабинет', WEBAPP_URL)]
                ])
            );
        } else {
            await ctx.replyWithMarkdown(
                `👑 *С возвращением!*\n\n` +
                `Привет, ${firstName}!\n\n` +
                `💰 Баланс: ${existingUser.balance} ₽\n` +
                `🎁 Бонусы: ${existingUser.bonus_points}\n\n` +
                `👇 *Личный кабинет*`,
                Markup.inlineKeyboard([
                    [Markup.button.webApp('🚀 Открыть', WEBAPP_URL)]
                ])
            );
        }
    } catch (error) {
        console.error('Ошибка:', error);
        await ctx.reply('⚠️ Ошибка. Попробуй позже.');
    }
});

// --- КОМАНДА /balance ---
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

// --- КОМАНДА /admin_panel ---
bot.command('admin_panel', async (ctx) => {
    const userId = ctx.from.id;
    
    const { data: user } = await supabase
        .from('majesty_users')
        .select('role')
        .eq('telegram_id', userId)
        .single();
    
    const staffRoles = ['master', 'admin', 'owner'];
    
    if (user && staffRoles.includes(user.role)) {
        await ctx.replyWithMarkdown(
            `🔐 *Панель сотрудника*\n\n` +
            `👇 Нажмите кнопку, чтобы открыть панель`,
            Markup.inlineKeyboard([
                [Markup.button.webApp('🔐 Открыть панель', 'https://evseenkomajesty.ru/admin')]
            ])
        );
    } else {
        await ctx.reply('⛔ У вас нет доступа к панели сотрудника');
    }
});

// --- ЗАПУСК БОТА ---
bot.launch().then(() => {
    console.log('✅ Бот Evseenko Majesty запущен!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
