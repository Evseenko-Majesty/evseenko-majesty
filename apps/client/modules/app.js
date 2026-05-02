// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';

// Инициализация Telegram
const tg = initTelegram();

// Контейнер для экранов
const container = document.getElementById('app');

// Пока пусто — просто проверяем что работает
container.innerHTML = '<h1 style="color: gold; text-align: center; padding-top: 30vh;">Загрузка...</h1>';
