// ============================================
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { supabase } from '../config/supabase.js';

export async function searchUsers(req, res) {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.json({ success: true, users: [] });
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`first_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    
    res.json({ success: true, users: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
