// ============================================
// УПРАВЛЕНИЕ ПРАВАМИ
// ============================================

import { supabase } from '../config/supabase.js';

// Обновить роль пользователя
export async function updateUserRole(req, res) {
  const { user_id, role } = req.body;
  const granted_by = req.headers['granted-by'];
  
  // Проверяем, что выдающий — owner
  const { data: owner } = await supabase
    .from('users')
    .select('role')
    .eq('telegram_id', granted_by)
    .single();
  
  if (!owner || owner.role !== 'owner') {
    return res.status(403).json({ error: 'Только владелец может менять роли' });
  }
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('telegram_id', user_id)
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
