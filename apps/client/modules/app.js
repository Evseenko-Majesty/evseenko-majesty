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
    this.isNavigating = false;  // ← Защита от повторных вызовов
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this),
      profile: new ProfileScreen(this)
    };
  }
  
  navigateTo(screenName) {
    if (this.isNavigating) {
      console.warn('⚠️ Уже выполняется переход, игнорирую:', screenName);
      return;
    }
    
    this.isNavigating = true;
    console.log('➡️ navigateTo:', screenName, 'стек:', new Error().stack);
    
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
        console.log('⬅️ BACK из:', this.currentScreen);
        this.isNavigating = false;  // Сбрасываем перед переходом
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
    
    setTimeout(() => { this.isNavigating = false; }, 100);
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();

// Для отладки из консоли
window.app = app;
