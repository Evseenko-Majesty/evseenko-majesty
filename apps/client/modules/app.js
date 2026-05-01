// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    
    // Все экраны приложения
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this)
    };
  }
  
  // Переход на другой экран
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.container.innerHTML = '';                    // Очищаем контейнер
    this.container.appendChild(screen.getElement());  // Вставляем новый экран
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  // Запуск приложения
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
