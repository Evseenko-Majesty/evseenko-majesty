// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    this.positionBrandName();
    setTimeout(() => this.checkAccess(), 2500);  // После анимации
  }
  
  positionBrandName() {
    const logo = document.querySelector('.splash .logo');
    const brandName = document.querySelector('.splash .brand-name');
    if (!logo || !brandName) return;
    const logoRect = logo.getBoundingClientRect();
    const gap = 3;
    const topPosition = logoRect.bottom + (window.innerHeight * gap / 100);
    brandName.style.top = topPosition + 'px';
  }
  
  async checkAccess() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    // Не в Telegram — гость
    if (!tgUser) {
      this.app.user = {
        first_name: 'Гость',
        is_guest: true
      };
      setTimeout(() => this.app.navigateTo('home'), 1000);
      return;
    }
    
    // В Telegram — пробуем подключиться к серверу
    const result = await API.auth(tgUser);
    
    if (result.success) {
      this.app.user = result.user;
    } else {
      // Сервер недоступен — гость с данными из Telegram
      this.app.user = {
        ...tgUser,
        is_guest: true,
        server_error: true
      };
    }
    
    setTimeout(() => this.app.navigateTo('home'), 1000);
  }
}
