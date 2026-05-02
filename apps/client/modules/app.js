// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { BottomNav } from '/shared/components/BottomNav.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this)
    };
    
    this.navItems = [
      { 
        id: 'home', 
        label: 'Главная',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21h14M5 21v-13M19 21v-13M9 21v-8h6v8M2 10l10-8 10 8"/></svg>'
      },
      { 
        id: 'more', 
        label: 'Ещё',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14M5 12h14M5 19h14"/></svg>'
      }
    ];
  }
  
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Нижняя навигация
    if (screenName === 'home' || screenName === 'more') {
      this.container.appendChild(
        BottomNav(this.navItems, screenName, (id) => this.navigateTo(id))
      );
    }
    
    if (screen.onMount) screen.onMount();
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
