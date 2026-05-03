// ============================================
// ГЛАВНЫЙ ФАЙЛ КЛИЕНТСКОГО ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';
import { BottomNav } from '/shared/components/BottomNav.js';
import { BackButton } from '/shared/components/BackButton.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.screenHistory = [];
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this),
      profile: new ProfileScreen(this)
    };
    
    this.navItems = [
      { id: 'home', label: 'Главная', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21h14M5 21v-13M19 21v-13M9 21v-8h6v8M2 10l10-8 10 8"/></svg>' },
      { id: 'more', label: 'Ещё', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14M5 12h14M5 19h14"/></svg>' }
    ];
    
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
    
    if (screenName === 'home' || screenName === 'splash') {
      this.tg.BackButton.hide();
    } else {
      this.tg.BackButton.show();
    }
    
    // Кнопка "Назад" для ПК fullscreen
    const existingBack = document.querySelector('.page-back-btn');
    if (existingBack) existingBack.remove();
    
    if (this.tg.isDesktopFullscreen && screenName !== 'home' && screenName !== 'splash') {
      const backBtn = BackButton(() => {
        if (this.screenHistory.length > 1) {
          this.screenHistory.pop();
          const prev = this.screenHistory[this.screenHistory.length - 1];
          this.navigateTo(prev, true);
        }
      });
      this.container.appendChild(backBtn);
    }
    // Кнопка "Развернуть" — показываем когда НЕ fullscreen на ПК
if (!this.tg.isExpanded && !(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))) {
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
    
    if (screenName === 'home' || screenName === 'more') {
      this.container.appendChild(BottomNav(this.navItems, screenName, (id) => this.navigateTo(id)));
    }
    
    if (screen.onMount) screen.onMount();
  }
  
  start() { this.navigateTo('splash'); }
}

const app = new App();
app.start();
