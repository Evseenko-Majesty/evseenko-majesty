// ============================================
// ЛОГИКА АВТОРИЗАЦИИ
// ============================================

import { supabase } from '../config/supabase.js';

export async function authUser(req, res) {
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    // Проверяем, есть ли пользователь
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();
    
    if (existingUser) {
      // Обновляем данные
      const { data: updatedUser } = await supabase
        .from('users')
        .update({
          first_name,
          last_name,
          username,
          photo_url,
          last_login: new Date()
        })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      return res.json({ success: true, user: updatedUser });
    }
    
    // Создаём нового
    const { data: newUser } = await supabase
      .from('users')
      .insert({
        telegram_id,
        first_name,
        last_name,
        username,
        photo_url,
        created_at: new Date(),
        last_login: new Date()
      })
      .select()
      .single();
    
    res.json({ success: true, user: newUser });
    
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
