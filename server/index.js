const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    'https://dgqlbvajznobyitubazo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncWxidmFqem5vYnlpdHViYXpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mzg1MjcyMSwiZXhwIjoyMDg5NDI4NzIxfQ.iTNnvDhM7cZ5W5oWpTMVNLfbAAtZKZAq_mjhzqSAzUc'
);

// API: получить баланс и бонусы (с авторегистрацией)
app.get('/api/user/:telegram_id', async (req, res) => {
    const telegram_id = req.params.telegram_id;
    
    // 1. Пытаемся найти пользователя
    let { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegram_id)
        .single();
    
    // 2. Если не найден — создаём
    if (!user) {
        console.log(`👤 Создаём нового пользователя: ${telegram_id}`);
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ telegram_id, balance: 0, bonus: 0 }])
            .select()
            .single();
        
        if (!insertError && newUser) {
            user = newUser;
        }
    }
    
    // 3. Возвращаем баланс и бонусы
    res.json({ 
        balance: user?.balance || 0, 
        bonus: user?.bonus || 0 
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API на порту ${port}`);
});