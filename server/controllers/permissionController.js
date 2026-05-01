// ============================================
// УПРАВЛЕНИЕ ПРАВАМИ
// ============================================

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
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('telegram_id', user_id)
      .select()
      .single();
    
    if (error) throw error;
    
    // Автоматически добавляем в видимость
    if (granted_by && String(granted_by) !== String(user_id)) {
      await supabase.from('user_visibility').upsert({
        user_id: parseInt(granted_by),
        target_id: parseInt(user_id),
        granted_by: parseInt(granted_by)
      }, { onConflict: 'user_id,target_id' });
    }
    
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Обновить должность
export async function updateUserPosition(req, res) {
  const { user_id, position } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ position })
      .eq('telegram_id', user_id)
      .select()
      .single();
    
    if (error) throw error;
    
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Выдать/отозвать одно право
export async function togglePermission(req, res) {
  const { user_id, target_id, permission_type, permission_value, action } = req.body;
  
  try {
    if (action === 'grant') {
      await supabase.from('user_permissions').upsert({
        user_id: target_id,
        granted_by: user_id,
        permission_type,
        permission_value,
        status: 'active'
      }, { onConflict: 'user_id,permission_type,permission_value' });
    } else {
      await supabase.from('user_permissions')
        .update({ status: 'revoked' })
        .eq('user_id', target_id)
        .eq('permission_type', permission_type)
        .eq('permission_value', permission_value);
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

// Отозвать все права по типу
export async function revokeAllPermissions(req, res) {
  const { user_id, permission_type } = req.body;
  
  try {
    await supabase.from('user_permissions')
      .update({ status: 'revoked' })
      .eq('user_id', user_id)
      .eq('permission_type', permission_type);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
