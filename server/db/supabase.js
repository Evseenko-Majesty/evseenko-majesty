// ============================================
// ПОДКЛЮЧЕНИЕ К SUPABASE
// ============================================
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Создаём клиент Supabase (один раз для всего сервера)
const supabase = createClient(
    process.env.SUPABASE_URL,    // URL твоего проекта Supabase
    process.env.SUPABASE_KEY     // anon public key
);

module.exports = supabase;
