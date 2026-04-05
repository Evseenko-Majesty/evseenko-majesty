const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Простой ответ на любой запрос
app.get('/', (req, res) => {
    res.send('OK');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`✅ Сервер запущен на порту ${port}`);
});
