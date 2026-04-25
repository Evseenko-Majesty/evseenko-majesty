// ============================================
// ВЫДАЧА ПРАВ ПОЛЬЗОВАТЕЛЮ — ЛОГИКА
// ============================================

import { render } from './view.js';

export class GrantUserScreen {
  constructor(app, selectedUser) {
    this.app = app;
    this.selectedUser = selectedUser;
  }
  
  getElement() {
    return render(this.selectedUser);
  }
}
