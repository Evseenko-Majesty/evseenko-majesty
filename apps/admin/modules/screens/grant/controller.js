// ============================================
// СТРАНИЦА "ДАТЬ ДОСТУП" — ЛОГИКА
// ============================================

import { render } from './view.js';

export class GrantScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render(this.app.user);
  }
}
