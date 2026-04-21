// ============================================
// СЕРВЕР EVSEENKO MAJESTY
// ============================================

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Проверка что сервер жив
app.get('/', (req, res) => {
  res.send('Evseenko Majesty Server OK');
});

// Авторизация / регистрация пользователя
app.post('/api/auth', async (req, res) => {
  const { 
    telegram_id, 
    first_name, 
    last_name, 
    username, 
    photo_url 
  } = req.body;
  
  try {
    // Проверяем есть ли пользователь
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegram_id)
      .single();
    
    if (existingUser) {
      // Обновляем данные
      const { data: updatedUser } = await supabase
        .from('users')
        .update({
          first_name,
          last_name,
          username,
          photo_url,
          last_login: new Date()
        })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      return res.json({ success: true, user: updatedUser });
    }
    
    // Создаём нового
    const { data: newUser } = await supabase
      .from('users')
      .insert({
        telegram_id,
        first_name,
        last_name,
        username,
        photo_url,
        created_at: new Date(),
        last_login: new Date()
      })
      .select()
      .single();
    
    res.json({ success: true, user: newUser });
    
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
