// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;  // Ссылка на приложение для переходов
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    // Через 2.5 секунды переходим на главную
    setTimeout(() => {
      this.app.navigateTo('home');
    }, 2500);
  }
}
