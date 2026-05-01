import { createClient } from '@supabase/supabase-js';  // Библиотека Supabase
import dotenv from 'dotenv';                             // Читает .env файл

dotenv.config();  // Загружаем переменные из .env

// Создаём подключение к базе
export const supabase = createClient(
  process.env.SUPABASE_URL,   // Адрес базы (из .env)
  process.env.SUPABASE_KEY    // Ключ доступа (из .env)
);
