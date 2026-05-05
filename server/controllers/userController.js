// ============================================
// КОНТРОЛЛЕР ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { supabase } from '../config/supabase.js';

// Обновить город пользователя
export async function updateCity(req, res) {
  const { telegram_id, city_id } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ city_id })
      .eq('telegram_id', telegram_id)
      .select()
      .single();
    
    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
