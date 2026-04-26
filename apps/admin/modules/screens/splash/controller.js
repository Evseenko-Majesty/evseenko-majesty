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
    // Пока просто загрузка, потом добавим проверку
  }
}
