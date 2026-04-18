// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// Управляет экранами и навигацией
// ============================================

import { SplashScreen } from './screens/splash/controller.js';

class App {
  constructor() {
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
  
  // Запуск приложения
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
