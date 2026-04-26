import { supabase } from '../config/supabase.js';

// Проверить одно право
export async function checkPermission(req, res) {
  const { user_id, permission } = req.query;
  
  try {
    const { data } = await supabase
      .from('user_permissions')
      .select('*')
      .eq('user_id', user_id)
      .eq('permission_value', permission)
      .eq('status', 'active');
    
    res.json({ success: true, hasAccess: data && data.length > 0 });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Проверить все права по типу
export async function checkPermissionsByType(req, res) {
  const { user_id, type } = req.query;
  
  try {
    const { data } = await supabase
      .from('user_permissions')
      .select('*')
      .eq('user_id', user_id)
      .eq('permission_type', type)
      .eq('status', 'active');
    
    res.json({ success: true, permissions: data || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Обновить роль пользователя
export async function updateUserRole(req, res) {
  const { user_id, role } = req.body;
  const granted_by = req.headers['granted-by'];
  
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
