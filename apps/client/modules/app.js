// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram, showBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { BottomNav } from '/shared/components/BottomNav.js';

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
    
    this.navItems = [
      { id: 'home', label: 'Главная' },
      { id: 'more', label: 'Ещё' }
    ];
  }
  
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.currentScreen = screenName;
    
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Управление кнопкой "Назад"
    if (screenName === 'more') {
      // На странице "Ещё" показываем кнопку "Назад", возвращает на главную
      showBackButton(this.tg, () => this.navigateTo('home'));
    } else {
      // На остальных экранах скрываем
      hideBackButton(this.tg);
    }
    
    // Навигация
    if (screenName === 'home' || screenName === 'more') {
      const nav = BottomNav(this.navItems, screenName, (id) => this.navigateTo(id));
      this.container.appendChild(nav);
    }
    
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
