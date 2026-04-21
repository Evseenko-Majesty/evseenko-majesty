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
    this.authenticate();  // ← Запускаем авторизацию
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
  
  async authenticate() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (!tgUser) {
      console.log('Не в Telegram');
      return;
    }
    
    const result = await API.auth(tgUser);
    
    if (result.success) {
      this.app.user = result.user;
      console.log('Пользователь сохранён:', result.user);
      
      // Через 2 секунды переходим на главную
      setTimeout(() => {
        this.app.navigateTo('home');
      }, 2000);
    } else {
      console.error('Ошибка авторизации:', result.error);
    }
  }
}
