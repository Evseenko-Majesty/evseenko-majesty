// ============================================
// ТОЧКА ВХОДА — ЗАПУСК СЕРВЕРА
// ============================================

import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

// Проверка
app.get('/', (req, res) => {
  res.send('Evseenko Majesty Server OK');
});

// Подключаем маршруты
app.use('/api/auth', authRoutes);
// После auth:
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Сервер на порту ${PORT}`));
