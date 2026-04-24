// ============================================
// ТОЧКА ВХОДА — ЗАПУСК СЕРВЕРА
// ============================================

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

// Проверка
app.get('/', (req, res) => {
  res.send('Evseenko Majesty Server OK');
});

// Подключаем маршруты
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
