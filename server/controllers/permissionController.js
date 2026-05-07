import { supabase } from '../config/supabase.js';

export async function checkPermission(req, res) {
  const { user_id, permission } = req.query;
  const { data } = await supabase.from('user_permissions').select('*')
    .eq('user_id', user_id).eq('permission_value', permission).eq('status', 'active');
  res.json({ success: true, hasAccess: data && data.length > 0 });
}
