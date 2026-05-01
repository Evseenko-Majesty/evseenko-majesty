import { supabase } from '../config/supabase.js';  // Подключение к базе

export async function authUser(req, res) {
  // Достаём данные, которые прислал клиент
  const { telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  try {
    // Ищем пользователя в базе по telegram_id
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();  // Ожидаем одну запись
    
    if (existingUser) {
      // Пользователь уже есть — обновляем данные
      const { data: updatedUser } = await supabase
        .from('users')
        .update({ first_name, last_name, username, photo_url, last_login: new Date() })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      return res.json({ success: true, user: updatedUser });
    }
    
    // Новый пользователь — создаём
    const { data: newUser } = await supabase
      .from('users')
      .insert({ telegram_id, first_name, last_name, username, photo_url, role: 'client', created_at: new Date(), last_login: new Date() })
      .select()
      .single();
    
    res.json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
// ============================================
// ГЕНЕРАЦИЯ ТОКЕНА ДЛЯ БРАУЗЕРА
// ============================================

// Хранилище токенов (временное, потом в базу)
const tokens = {};

// Создать токен для браузера
export async function createBrowserToken(req, res) {
  const token = Math.random().toString(36).substring(2, 15);  // Случайный токен
  
  // Сохраняем (пока в памяти, потом в базу)
  tokens[token] = {
    created: new Date(),
    used: false
  };
  
  res.json({ success: true, token });
}

// Привязать токен к пользователю (вызывается из бота)
export async function bindToken(req, res) {
  const { token, telegram_id, first_name, last_name, username, photo_url } = req.body;
  
  if (!tokens[token]) {
    return res.json({ success: false, error: 'Токен не найден' });
  }
  
  if (tokens[token].used) {
    return res.json({ success: false, error: 'Токен уже использован' });
  }
  
  // Авторизуем пользователя (как при обычном входе)
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('telegram_id', telegram_id)
    .single();
  
  let user;
  if (existingUser) {
    const { data: updatedUser } = await supabase
      .from('users')
      .update({ first_name, last_name, username, photo_url, last_login: new Date() })
      .eq('telegram_id', telegram_id)
      .select()
      .single();
    user = updatedUser;
  } else {
    const { data: newUser } = await supabase
      .from('users')
      .insert({ telegram_id, first_name, last_name, username, photo_url, role: 'client', created_at: new Date(), last_login: new Date() })
      .select()
      .single();
    user = newUser;
  }
  
  // Привязываем токен
  tokens[token].used = true;
  tokens[token].user = user;
  
  res.json({ success: true });
}

// Проверить токен (браузер опрашивает)
export async function checkToken(req, res) {
  const { token } = req.query;
  
  if (!tokens[token]) {
    return res.json({ success: false, error: 'Токен не найден' });
  }
  
  if (tokens[token].used && tokens[token].user) {
    const user = tokens[token].user;
    delete tokens[token];  // Удаляем использованный токен
    return res.json({ success: true, user });
  }
  
  res.json({ success: false, error: 'Ожидание' });
}
