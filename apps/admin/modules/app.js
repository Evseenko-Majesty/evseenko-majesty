// ============================================
// EMajesty Core — ГЛАВНЫЙ ФАЙЛ АДМИН-ПАНЕЛИ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';

class AdminApp {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.screenHistory = [];
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this)
    };
    
    this.tg.BackButton.onClick(() => {
      if (this.screenHistory.length > 1) {
        this.screenHistory.pop();
        const prev = this.screenHistory[this.screenHistory.length - 1];
        this.navigateTo(prev, true);
      }
    });
  }
  
  navigateTo(screenName, fromBack = false) {
    if (!fromBack) {
      this.screenHistory.push(screenName);
    }
    
    const screen = this.screens[screenName];
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    if (screenName !== 'splash') {
      this.tg.BackButton.show();
    } else {
      this.tg.BackButton.hide();
    }
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new AdminApp();
app.start();
