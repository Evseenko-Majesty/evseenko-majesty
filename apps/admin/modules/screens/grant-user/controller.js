// ============================================
// ВЫДАЧА РОЛИ — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

export class GrantUserScreen {
  constructor(app, selectedUser) {
    this.app = app;
    this.selectedUser = selectedUser;
    this.selectedRole = null;
  }
  
  async getElement() {
    // Получаем права текущего пользователя на выдачу ролей
    const res = await API.checkPermissions(this.app.user?.telegram_id, 'grant_role');
    
    // Какие роли может давать
    const availableRoles = [];
    if (res.success && res.permissions) {
      res.permissions.forEach(p => availableRoles.push(p.permission_value));
    }
    
    // Исключаем текущую роль выбранного пользователя
    const filteredRoles = availableRoles.filter(r => r !== this.selectedUser.role);
    
    return render(
      this.selectedUser,
      filteredRoles,
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
