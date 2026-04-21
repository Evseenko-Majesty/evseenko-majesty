// ============================================
// СЕРВЕР EVSEENKO MAJESTY
// Принимает запросы от клиента, работает с базой данных
// ============================================

// 1. Подключаем библиотеки
import express from 'express';           // Фреймворк для сервера
import cors from 'cors';                 // Разрешает запросы с других доменов
import { createClient } from '@supabase/supabase-js';  // Клиент для базы данных
import dotenv from 'dotenv';             // Читает переменные из .env файла

// 2. Загружаем переменные окружения
dotenv.config();

// 3. Создаём приложение Express
const app = express();

// 4. Включаем CORS (чтобы клиент с Vercel мог обращаться к серверу на Render)
app.use(cors());

// 5. Учим сервер понимать JSON в теле запроса
app.use(express.json());

// 6. Подключаемся к Supabase (база данных)
//    SUPABASE_URL и SUPABASE_KEY будут в переменных окружения на Render
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 7. Проверочный маршрут — просто чтобы убедиться что сервер жив
app.get('/', (req, res) => {
  res.send('Evseenko Majesty Server OK');
});

// 8. Главный маршрут — авторизация пользователя
//    Клиент отправляет POST запрос на /api/auth с данными из Telegram
app.post('/api/auth', async (req, res) => {
  
  // Достаём данные из тела запроса
  const { 
    telegram_id, 
    first_name, 
    last_name, 
    username, 
    photo_url 
  } = req.body;
  
  try {
    // 9. Проверяем, есть ли уже такой пользователь в базе
    const { data: existingUser } = await supabase
      .from('users')                      // Таблица users
      .select('*')                        // Выбрать все поля
      .eq('telegram_id', telegram_id)     // Где telegram_id совпадает
      .single();                          // Ожидаем одну запись
    
    // 10. Если пользователь уже существует — ОБНОВЛЯЕМ его данные
    if (existingUser) {
      const { data: updatedUser } = await supabase
        .from('users')
        .update({
          first_name: first_name,
          last_name: last_name,
          username: username,
          photo_url: photo_url,
          last_login: new Date()          // Обновляем время последнего входа
        })
        .eq('telegram_id', telegram_id)
        .select()
        .single();
      
      // Отправляем ответ клиенту
      return res.json({ 
        success: true, 
        user: updatedUser 
      });
    }
    
    // 11. Если пользователь новый — СОЗДАЁМ запись
    const { data: newUser } = await supabase
      .from('users')
      .insert({
        telegram_id: telegram_id,
        first_name: first_name,
        last_name: last_name,
        username: username,
        photo_url: photo_url,
        created_at: new Date(),           // Дата регистрации
        last_login: new Date()            // Дата первого входа
      })
      .select()
      .single();
    
    // Отправляем ответ клиенту
    res.json({ 
      success: true, 
      user: newUser 
    });
    
  } catch (error) {
    // 12. Если что-то пошло не так — отправляем ошибку
    console.error('Ошибка сервера:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// 13. Запускаем сервер
//     PORT берётся из переменных окружения (Render сам его назначает)
//     Если переменной нет — используем 3001 для локальной разработки
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
