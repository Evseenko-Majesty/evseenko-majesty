// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.currentScreen = null;
    
    // Все экраны приложения
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this)
    };
  }
  
  // Переход между экранами
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.currentScreen = screenName;
    
    // Очищаем контейнер
    this.container.innerHTML = '';
    
    // Добавляем содержимое экрана
    this.container.appendChild(screen.getElement());
    
    // Добавляем нижнюю навигацию для главной и "ещё"
    if (screenName === 'home' || screenName === 'more') {
      this.addBottomNav(screenName);
    }
    
    // Запускаем логику экрана
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  // Нижняя навигация
  addBottomNav(currentScreen) {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    
    const items = [
      { id: 'home', label: 'Главная' },
      { id: 'more', label: 'Ещё' }
    ];
    
    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'bottom-nav__item';
      if (item.id === currentScreen) {
        btn.classList.add('active');
      }
      btn.textContent = item.label;
      btn.addEventListener('click', () => this.navigateTo(item.id));
      nav.appendChild(btn);
    });
    
    this.container.appendChild(nav);
  }
  
  // Запуск приложения
  start() {
    this.navigateTo('splash');
  }
}

// Старт
const app = new App();
app.start();
