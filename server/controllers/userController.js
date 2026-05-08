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
export async function searchUsers(req, res) {
  const { query } = req.query;
  if (!query || query.length < 2) return res.json({ success: true, users: [] });
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`first_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    res.json({ success: true, users: data || [] });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
