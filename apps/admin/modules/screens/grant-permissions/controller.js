// ============================================
// ПРАВА ПОЛЬЗОВАТЕЛЯ — ЛОГИКА
// ============================================

import { render } from './view.js';

export class GrantPermissionsScreen {
  constructor(app, selectedUser) {
    this.app = app;
    this.selectedUser = selectedUser;
  }
  
  getElement() {
    return render(this.selectedUser);
  }
}
