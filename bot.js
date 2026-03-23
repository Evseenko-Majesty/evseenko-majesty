const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const BOT_TOKEN = process.env.TOKEN_BOT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

const bot = new Telegraf(BOT_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
        await ctx.reply('⚠️ Ошибка. Попробуй позже.');
    }
});

bot.command('balance', async (ctx) => {
    const { data: user } = await supabase
        .from('majesty_users')
        .select('balance, bonus_points')
        .eq('telegram_id', ctx.from.id)
        .single();

    if (!user) {
        await ctx.reply('⚠️ Напиши /start');
        return;
    }

    await ctx.replyWithMarkdown(
        `💰 *Баланс:* ${user.balance} ₽\n` +
        `🎁 *Бонусы:* ${user.bonus_points}`
    );
});

bot.launch().then(() => {
    console.log('✅ Бот запущен!');
});
