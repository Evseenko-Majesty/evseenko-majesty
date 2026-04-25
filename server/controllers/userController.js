// ============================================
// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
// ============================================

import { supabase } from '../config/supabase.js';

export async function searchUsers(req, res) {
  const { query } = req.query;
  
  try {
    let result;
    
    if (query && query.length >= 2) {
      // Поиск по имени или username
      result = await supabase
        .from('users')
        .select('*')
        .or(`first_name.ilike.%${query}%,username.ilike.%${query}%`)
        .limit(10);
    } else {
      // Все пользователи
      result = await supabase
        .from('users')
        .select('*')
        .limit(10);
    }
    
    if (result.error) {
      return res.status(500).json({ success: false, error: result.error.message });
    }
    
    res.json({ 
      success: true, 
      total: result.data.length,
      users: result.data 
    });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
