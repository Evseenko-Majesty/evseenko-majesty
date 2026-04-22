// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram, showBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';
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
      more: new MoreScreen(this),
      profile: new ProfileScreen(this)
    };
    
    this.navItems = [
      { id: 'home', label: 'Главная' },
      { id: 'more', label: 'Ещё' }
    ];
  }
  
  navigateTo(screenName) {
    console.log('navigateTo:', screenName);
    this.currentScreen = screenName;
    const screen = this.screens[screenName];
    
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Кнопка "Назад" — используем this.currentScreen в момент нажатия
    if (screenName === 'more' || screenName === 'profile') {
      showBackButton(this.tg, () => {
        console.log('Back button pressed. Current screen:', this.currentScreen);
        if (this.currentScreen === 'profile') {
          this.navigateTo('more');
        } else if (this.currentScreen === 'more') {
          this.navigateTo('home');
        }
      });
    } else {
      hideBackButton(this.tg);
    }
    
    // Нижняя навигация
    if (screenName === 'home' || screenName === 'more') {
      const nav = BottomNav(this.navItems, screenName, (id) => {
        console.log('BottomNav click:', id);
        this.navigateTo(id);
      });
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
