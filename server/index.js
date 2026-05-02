import express from 'express';          // Фреймворк сервера
import cors from 'cors';                // Разрешает запросы с других доменов
import authRoutes from './routes/auth.js';  // Маршруты авторизации

const app = express();

app.use(cors());          // Разрешаем запросы отовсюду
app.use(express.json());  // Учим сервер понимать JSON в запросах

// Проверка что сервер жив (GET /)
app.get('/', (req, res) => res.send('OK'));

// Все запросы на /api/auth отправляем в authRoutes
app.use('/api/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3001;  // Порт из Render или 3001 локально
app.listen(PORT, () => console.log(`Порт ${PORT}`));
