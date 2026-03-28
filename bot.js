const express = require('express');
const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

const bot = new Telegraf(BOT_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const app = express();
app.use(express.json());

// === API: ПОЛУЧИТЬ/СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ ===
app.post('/api/user', async (req, res) => {
    const { telegram_id, first_name, username } = req.body;
    
    if (!telegram_id) {
        return res.status(400).json({ error: 'telegram_id required' });
    }
    
    try {
        // Проверяем, есть ли пользователь
        let { data: user } = await supabase
            .from('majesty_users')
            .select('*')
            .eq('telegram_id', telegram_id)
            .single();
        
        // Если нет — создаём
        if (!user) {
            const { data: newUser, error } = await supabase
                .from('majesty_users')
                .insert({
                    telegram_id: telegram_id,
                    first_name: first_name || 'Пользователь',
                    username: username,
                    role: 'client'
                })
                .select()
                .single();
            
            if (error) throw error;
            user = newUser;
        } else {
            // Обновляем время последнего входа
            await supabase
                .from('majesty_users')
                .update({ last_login: new Date() })
                .eq('telegram_id', telegram_id);
        }
        
        res.json({
            success: true,
            user: {
                id: user.telegram_id,
                name: user.first_name,
                role: user.role
            }
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// === КОМАНДА /start ===
bot.start(async (ctx) => {
    await ctx.replyWithMarkdown(
        `👑 *Evseenko Majesty*\n\n` +
        `👇 Открой личный кабинет`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🚀 Открыть', WEBAPP_URL)]
        ])
    );
});

// === ПИНГ ===
app.get('/', (req, res) => res.send('OK'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server on port ${port}`));

bot.launch().then(() => console.log('✅ Bot started'));