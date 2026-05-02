import { supabase } from '../config/supabase.js';  // Подключение к базе

// Авторизация пользователя
export async function authUser(req, res) {
  // Достаём данные, которые прислал клиент
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    // Ищем пользователя по telegram_id
    const { data: existing } = await supabase
      .from('users')                    // Таблица users
      .select('*')                      // Выбрать все поля
      .eq('telegram_id', telegram_id)   // Где telegram_id совпадает
      .single();                        // Ожидаем одну запись
    
    if (existing) {
      // Пользователь уже есть — обновляем данные
      const { data: updated } = await supabase
        .from('users')
        .update({ first_name, last_name, username, photo_url, last_login: new Date() })
        .eq('telegram_id', telegram_id)
        .select().single();
      
      return res.json({ success: true, user: updated });  // Отвечаем клиенту
    }
    
    // Новый пользователь — создаём запись
    const { data: created } = await supabase
      .from('users')
      .insert({ telegram_id, first_name, last_name, username, photo_url, role: 'client', created_at: new Date(), last_login: new Date() })
      .select().single();
    
    res.json({ success: true, user: created });
    
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });  // Ошибка
  }
}
