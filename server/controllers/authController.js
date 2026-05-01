import { supabase } from '../config/supabase.js';  // Подключение к базе

export async function authUser(req, res) {
  // Достаём данные, которые прислал клиент
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    // Ищем пользователя в базе по telegram_id
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();  // Ожидаем одну запись
    
    if (existingUser) {
      // Пользователь уже есть — обновляем данные
      const { data: updatedUser } = await supabase
        .from('users')
        .update({ first_name, last_name, username, photo_url, last_login: new Date() })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      return res.json({ success: true, user: updatedUser });
    }
    
    // Новый пользователь — создаём
    const { data: newUser } = await supabase
      .from('users')
      .insert({ telegram_id, first_name, last_name, username, photo_url, role: 'client', created_at: new Date(), last_login: new Date() })
      .select()
      .single();
    
    res.json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
