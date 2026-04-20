// ============================================
// ГЛАВНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render(this.app.user);   // ← Передаём user из app
  }
  
  onMount() {
    // Пока пусто
  }
}
