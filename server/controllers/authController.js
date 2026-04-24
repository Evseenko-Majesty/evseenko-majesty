// ============================================
// ЛОГИКА АВТОРИЗАЦИИ
// ============================================

import { supabase } from '../config/supabase.js';

export async function authUser(req, res) {
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();
    
    if (existingUser) {
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
      
      // Возвращаем роль
      return res.json({ 
        success: true, 
        user: updatedUser,
        role: updatedUser.role 
      });
    }
    
    const { data: newUser } = await supabase
      .from('users')
      .insert({
        telegram_id,
        first_name,
        last_name,
        username,
        photo_url,
        role: 'client',
        created_at: new Date(),
        last_login: new Date()
      })
      .select()
      .single();
    
    res.json({ 
      success: true, 
      user: newUser,
      role: 'client'
    });
    
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
