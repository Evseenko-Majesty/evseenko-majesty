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
    let telegram_id = req.params.telegram_id;
    
    // Проверяем, есть ли пользователь
    let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', telegram_id)
        .single();
    
    // Если нет — создаём
    if (!data) {
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ telegram_id: telegram_id, balance: 0, bonus: 0 }])
            .select()
            .single();
        
        if (!insertError) {
            data = newUser;
        }
    }
    
    res.json({ balance: data?.balance || 0, bonus: data?.bonus || 0 });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API on port ${port}`);
});