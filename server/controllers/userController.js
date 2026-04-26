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
    // Проверяем, число ли это (ID)
    const isNumber = !isNaN(query);
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    
    // Если ввели число — ищем ещё по ID
    let result = data || [];
    if (isNumber) {
      const { data: byId } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', parseInt(query));
      
      if (byId && byId.length > 0) {
        // Добавляем если ещё нет в результате
        if (!result.find(u => u.telegram_id === byId[0].telegram_id)) {
          result.unshift(byId[0]);
        }
      }
    }
    
    res.json({ success: true, users: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// Получить пользователей с ролями
export async function getStaffUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .not('role', 'is', null)
      .neq('role', 'client');
    
    if (error) throw error;
    
    res.json({ success: true, users: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
