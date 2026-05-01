// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';

const tg = initTelegram();
const container = document.getElementById('app');

// Все экраны
const screens = {
  splash: new SplashScreen(null),
  home: new HomeScreen(null)
};

// Показываем загрузочный
container.appendChild(screens.splash.getElement());
