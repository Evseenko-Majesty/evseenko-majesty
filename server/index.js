const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к Supabase (замени на свои ключи)
const supabase = createClient(
    'https://ТВОЙ_ПРОЕКТ.supabase.co',
    'ТВОЙ_ANON_KEY'
);

// API: получить баланс и бонусы
app.get('/api/user/:telegram_id', async (req, res) => {
    const telegram_id = req.params.telegram_id;
    
    const { data, error } = await supabase
        .from('users')
        .select('balance, bonus')
        .eq('telegram_id', telegram_id)
        .single();
    
    if (error) {
        return res.json({ balance: 0, bonus: 0 });
    }
    
    res.json({ balance: data.balance, bonus: data.bonus });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ API on port ${port}`);
});