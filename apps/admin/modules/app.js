// ============================================
// EMAJESTY CORE — ГЛАВНЫЙ ФАЙЛ АДМИН-ПАНЕЛИ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { BackButton } from '/shared/components/BackButton.js';

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
    if (!fromBack) this.screenHistory.push(screenName);
    
    const screen = this.screens[screenName];
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Встроенная кнопка "Назад"
    if (screenName === 'home' || screenName === 'splash') {
      this.tg.BackButton.hide();
    } else {
      this.tg.BackButton.show();
    }
    
    // Кнопка "Назад" для ПК fullscreen
    const existingBack = document.querySelector('.page-back-btn');
    if (existingBack) existingBack.remove();
    
    if (this.tg.isDesktopFullscreen && screenName !== 'home' && screenName !== 'splash') {
      this.container.appendChild(BackButton(() => {
        if (this.screenHistory.length > 1) {
          this.screenHistory.pop();
          const prev = this.screenHistory[this.screenHistory.length - 1];
          this.navigateTo(prev, true);
        }
      }));
    }
    
    // Кнопка "Развернуть" — всегда на ПК
    const existingExpand = document.querySelector('.page-expand-btn');
    if (existingExpand) existingExpand.remove();
    
    if (!(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))) {
      const expandBtn = document.createElement('button');
      expandBtn.className = 'page-expand-btn';
      expandBtn.textContent = '⛶';
      expandBtn.addEventListener('click', () => {
        this.tg.expand();
        if (this.tg.requestFullscreen) {
          try { this.tg.requestFullscreen(); } catch (e) {}
        }
      });
      this.container.appendChild(expandBtn);
    }
    
    if (screen.onMount) screen.onMount();
  }
  
  start() { this.navigateTo('splash'); }
}

const app = new AdminApp();
app.start();
