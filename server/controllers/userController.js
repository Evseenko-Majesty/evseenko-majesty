export async function searchUsers(req, res) {
  const { query } = req.query;
  
  console.log('Поисковой запрос:', query);
  
  if (!query || query.length < 2) {
    return res.json({ success: true, users: [] });
  }
  
  try {
    // Сначала проверим всех пользователей
    const { data: allUsers, error: allError } = await supabase
      .from('users')
      .select('*')
      .limit(5);
    
    console.log('Все пользователи (первые 5):', allUsers);
    
    // Теперь поиск
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .ilike('first_name', `%${query}%`)
      .limit(10);
    
    console.log('Результат поиска:', data);
    
    if (error) {
      console.error('Ошибка поиска:', error);
      throw error;
    }
    
    res.json({ success: true, users: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
