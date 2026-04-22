// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram, showBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';

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
  }
  
  navigateTo(screenName) {
    console.log('navigateTo:', screenName);
    this.currentScreen = screenName;
    const screen = this.screens[screenName];
    
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Очищаем старые обработчики
    this.tg.BackButton.offClick();
    hideBackButton(this.tg);
    
    // Кнопка "Назад"
    if (screenName === 'more' || screenName === 'profile') {
      this.tg.BackButton.onClick(() => {
        console.log('BACK from:', this.currentScreen);
        if (this.currentScreen === 'profile') {
          this.navigateTo('more');
        } else if (this.currentScreen === 'more') {
          this.navigateTo('home');
        }
      });
      this.tg.BackButton.show();
    }
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  start() {
    this.navigateTo('splash');
  }
}

// Временно сделаем глобальную функцию для переходов
window.goTo = (screen) => app.navigateTo(screen);

const app = new App();
app.start();
