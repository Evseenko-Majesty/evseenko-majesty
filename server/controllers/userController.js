import { supabase } from '../config/supabase.js';

export async function searchUsers(req, res) {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.json({ success: true, users: [] });
  }
  
  try {
    const isNumber = !isNaN(query);
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`first_name.ilike.%${query}%,username.ilike.%${query}%`)
      .limit(10);
    
    if (error) throw error;
    
    let result = data || [];
    
    if (isNumber) {
      const { data: byId } = await supabase
        .from('users')
        .select('*')
        .eq('telegram_id', parseInt(query));
      
      if (byId && byId.length > 0) {
        if (!result.find(u => u.telegram_id === byId[0].telegram_id)) {
          result.unshift(byId[0]);
        }
      }
    }
    
    res.json({ success: true, users: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
