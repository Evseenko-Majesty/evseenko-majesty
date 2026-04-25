export async function searchUsers(req, res) {
  try {
    // Получаем всех пользователей без фильтра
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) {
      console.error('Ошибка:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
    
    // Возвращаем всех + количество
    res.json({ 
      success: true, 
      total: data.length,
      users: data 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
