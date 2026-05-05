import { supabase } from '../config/supabase.js';

// Список городов (все)
export async function getCities(req, res) {
  const { data, error } = await supabase.from('cities').select('*').order('name');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, cities: data });
}

// Поиск города
export async function searchCities(req, res) {
  const { query } = req.query;
  if (!query || query.length < 1) return res.json({ success: true, cities: [] });
  
  const { data, error } = await supabase.from('cities').select('*').ilike('name', `${query}%`).order('name').limit(20);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, cities: data });
}
