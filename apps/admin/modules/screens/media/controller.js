// ============================================
// СТРАНИЦА "МЕДИА" — ЛОГИКА
// ============================================

import { render } from './view.js';

export class MediaScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
}
