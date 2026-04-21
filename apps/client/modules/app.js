// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// Пока только запускает приложение
// ============================================

// Подключаем Telegram
import { initTelegram } from '/shared/js/telegram.js';

// Инициализация Telegram (растягивает на весь экран, определяет тему)
const tg = initTelegram();

// Находим контейнер
const container = document.getElementById('app');

// Пока просто выводим текст для проверки
container.innerHTML = '<h1 style="color: white;">Evseenko Majesty</h1>';
