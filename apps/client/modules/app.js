// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.currentScreen = null;
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this)
    };
  }
  
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.currentScreen = screenName;
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Добавляем навигацию на главную и "ещё"
    if (screenName === 'home' || screenName === 'more') {
      this.addBottomNav(screenName);
    }
    
    // Скрываем кнопку "Назад" на главной и "ещё"
    if (screenName === 'home' || screenName === 'more') {
      hideBackButton(this.tg);
    }
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
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
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
