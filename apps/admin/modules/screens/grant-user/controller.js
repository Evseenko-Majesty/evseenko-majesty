// ============================================
// ВЫДАЧА РОЛИ — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

// Кто какую роль может давать
const ROLE_GRANT = {
  owner: ['owner', 'staff', 'partner'],
  staff: ['staff', 'partner'],
  partner: ['partner']
};

export class GrantUserScreen {
  constructor(app, selectedUser) {
    this.app = app;
    this.selectedUser = selectedUser;
    this.selectedRole = null;
  }
  
  getElement() {
    // Какие роли может давать текущий пользователь
    const myRole = this.app.user?.role || 'client';
    const allRoles = ROLE_GRANT[myRole] || [];
    
    // Исключаем текущую роль выбранного пользователя
    const availableRoles = allRoles.filter(r => r !== this.selectedUser.role);
    
    return render(
      this.selectedUser,
      availableRoles,
      (role) => { this.selectedRole = role; },
      () => this.saveRole()
    );
  }
  
  async saveRole() {
    if (!this.selectedRole) {
      alert('Выберите роль');
      return;
    }
    
    const result = await API.updateUserRole(
      this.selectedUser.telegram_id,
      this.selectedRole,
      this.app.user?.telegram_id
    );
    
    if (result.success) {
      document.body.appendChild(Modal(
        'Готово',
        `Роль "${this.selectedRole}" назначена`,
        'Ок',
        () => this.app.navigateTo('grant')
      ));
    } else {
      alert('Ошибка: ' + (result.error || 'Неизвестная ошибка'));
    }
  }
}
