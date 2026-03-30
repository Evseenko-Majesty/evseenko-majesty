const express = require('express');
const { Telegraf, Markup } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const WEBAPP_URL = 'https://evseenkomajesty.ru/app';

if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN not set');
    process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const app = express();

// === CORS (разрешаем запросы из мини-приложения) ===
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// === API: ПОЛУЧИТЬ/СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ ===
app.post('/api/user', async (req, res) => {
    console.log('📥 POST /api/user', req.body);
    
    const { telegram_id, first_name, username } = req.body;
    
    if (!telegram_id) {
        return res.status(400).json({ error: 'telegram_id required' });
    }
    
    try {
        // Проверяем существующего пользователя
        let { data: user, error: findError } = await supabase
            .from('majesty_users')
            .select('*')
            .eq('telegram_id', telegram_id)
            .single();
        
        if (findError && findError.code !== 'PGRST116') {
            console.error('Find error:', findError);
        }
        
        // Если пользователь не найден — создаём
        if (!user) {
            console.log('👤 Creating new user:', telegram_id);
            const { data: newUser, error: insertError } = await supabase
                .from('majesty_users')
                .insert({
                    telegram_id: telegram_id,
                    first_name: first_name || 'Пользователь',
                    username: username || null,
                    role: 'client'
                })
                .select()
                .single();
            
            if (insertError) {
                console.error('Insert error:', insertError);
                throw insertError;
            }
            user = newUser;
            console.log('✅ User created:', user.id);
        } else {
            // Обновляем время последнего входа
            console.log('👤 Existing user:', user.id);
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
        console.error('Error in /api/user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// === API: БАЛАНС ===
app.get('/api/balance/:telegram_id', async (req, res) => {
    const { telegram_id } = req.params;
    console.log('📊 GET /api/balance', telegram_id);
    
    try {
        const { data: user, error } = await supabase
            .from('majesty_users')
            .select('balance, bonus_points')
            .eq('telegram_id', telegram_id)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Balance error:', error);
            return res.json({ balance: 0, bonus: 0 });
        }
        
        res.json({ 
            balance: user?.balance || 0, 
            bonus: user?.bonus_points || 0 
        });
    } catch (error) {
        console.error('Balance catch:', error);
        res.json({ balance: 0, bonus: 0 });
    }
});

// === КОМАНДА /start ===
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

// === ПИНГ ДЛЯ ПРОВЕРКИ ===
app.get('/', (req, res) => res.send('OK'));

// === ПРОВЕРКА ЗДОРОВЬЯ ===
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// === ЗАПУСК ===
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API сервер запущен на порту ${port}`);
    console.log(`📡 URL: https://evseenko-majesty-bot.onrender.com`);
});

bot.launch().then(() => {
    console.log('✅ Бот запущен (polling)');
}).catch((err) => {
    console.error('❌ Ошибка запуска бота:', err);
});

// === ОБРАБОТКА ОСТАНОВКИ ===
process.once('SIGINT', () => {
    bot.stop('SIGINT');
    process.exit(0);
});
process.once('SIGTERM', () => {
    bot.stop('SIGTERM');
    process.exit(0);
});