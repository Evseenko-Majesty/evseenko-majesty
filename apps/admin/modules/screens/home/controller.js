// ============================================
// ГЛАВНАЯ — ЛОГИКА
// ============================================

import { render } from './view.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
}
