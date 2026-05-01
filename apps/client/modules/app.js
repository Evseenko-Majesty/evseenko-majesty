// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

// Инициализация Telegram
const tg = initTelegram();

// Контейнер для всех экранов
const container = document.getElementById('app');

// Создаём экземпляр загрузочного экрана
const splash = new SplashScreen();

// Вставляем загрузочный экран в контейнер
container.appendChild(splash.getElement());
