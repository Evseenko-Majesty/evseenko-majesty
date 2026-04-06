// ============================================
// ГЛАВНЫЙ ФАЙЛ СЕРВЕРА
// ============================================
const express = require('express');
const cors = require('./middleware/cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors);               // Разрешаем запросы с любых источников
app.use(express.json());     // Позволяем серверу читать JSON

// Подключаем маршруты
app.use('/api', authRoutes);

// Проверка здоровья сервера
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Запуск
app.listen(port, () => {
    console.log(`✅ API сервер запущен на порту ${port}`);
});
