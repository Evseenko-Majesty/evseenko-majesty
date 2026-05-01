import express from 'express';          // Фреймворк сервера
import cors from 'cors';                // Разрешает запросы с Vercel
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());          // Разрешаем запросы отовсюду
app.use(express.json());  // Учим понимать JSON

// Проверка что сервер жив
app.get('/', (req, res) => res.send('OK'));

// Все запросы на /api/auth идут в authRoutes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Порт ${PORT}`));
