// ============================================
// СТРАНИЦА "ДОСТУП" — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class GrantScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
  const div = render(
    this.app.user,
    [],
    (screen) => this.app.navigateTo(screen),
    (user) => this.app.navigateTo('grant-user', false, user),
    (user) => this.app.navigateTo('grant-permissions', false, user)
  );
  this.loadUsers(div);
  return div;
}

async loadUsers(div) {
  const result = await API.getStaffUsers();
  if (result.success && result.users.length > 0) {
    this.app.container.innerHTML = '';
    const updatedDiv = render(
      this.app.user,
      result.users,
      (screen) => this.app.navigateTo(screen),
      (user) => this.app.navigateTo('grant-user', false, user),
      (user) => this.app.navigateTo('grant-permissions', false, user)
    );
    this.app.container.appendChild(updatedDiv);
  }
}
}
