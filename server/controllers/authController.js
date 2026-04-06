// ============================================
// КОНТРОЛЛЕР АВТОРИЗАЦИИ
// ============================================
const supabase = require('../db/supabase');

// ============================================
// Обработка запроса /api/auth
// ============================================
async function auth(req, res) {
    const { telegram_id, first_name, last_name, username, language_code, photo_url } = req.body;
    
    if (!telegram_id) {
        return res.status(400).json({ error: 'telegram_id required' });
    }
    
    try {
        // 1. Ищем пользователя в базе
        let { data: user } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', telegram_id)
            .single();
        
        // 2. Если не найден — создаём нового
        if (!user) {
            const { data: newUser, error } = await supabase
                .from('users')
                .insert([{
                    telegram_id,
                    first_name,
                    last_name,
                    username,
                    language_code,
                    photo_url,
                    role: 'client',        // по умолчанию клиент
                    balance: 0,
                    bonus_points: 0
                }])
                .select()
                .single();
            
            if (error) throw error;
            user = newUser;
        } else {
            // 3. Если найден — обновляем время последнего входа
            await supabase
                .from('users')
                .update({ last_login: new Date() })
                .eq('telegram_id', telegram_id);
        }
        
        // 4. Возвращаем данные пользователя
        res.json({ success: true, user });
        
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { auth };
