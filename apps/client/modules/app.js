// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// Управляет экранами и навигацией
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

class App {
  constructor() {
    // Инициализация Telegram
    this.tg = initTelegram();
    
    this.root = document.getElementById('root');
    this.user = null;
    this.currentScreen = null;
    // Все экраны приложения
    this.screens = {
      splash: new SplashScreen(this)
    };
  }
  
    // Переход на другой экран
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.currentScreen = screenName;
    
    this.root.innerHTML = '';
    this.root.appendChild(screen.getElement());
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
