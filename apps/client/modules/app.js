// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { SplashScreen } from './screens/splash/controller.js';

class App {
  constructor() {
    this.container = document.getElementById('app');  // Находим контейнер из HTML
    this.user = null;  // Данные пользователя (пока пусто)
    
    // Все экраны приложения
    this.screens = {
      splash: new SplashScreen(this)
    };
  }
  
  // Переход на другой экран
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.container.innerHTML = '';                     // Очищаем контейнер
    this.container.appendChild(screen.getElement());   // Показываем новый экран
    
    if (screen.onMount) {
      screen.onMount();  // Запускаем логику экрана
    }
  }
  
  // Запуск приложения
  start() {
    this.navigateTo('splash');  // Первый экран - загрузочный
  }
}

// Создаём и запускаем приложение
const app = new App();
app.start();
