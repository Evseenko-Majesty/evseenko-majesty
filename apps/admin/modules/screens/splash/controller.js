// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    // Без проверки — просто переходим на главную через 2 секунды
    setTimeout(() => {
      this.app.navigateTo('home');
    }, 2000);
  }
}
