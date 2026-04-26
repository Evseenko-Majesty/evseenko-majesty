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
  }
  
  getElement() {
    const div = render(this.selectedUser);
    
    const roleList = div.querySelector('.grant-user__role-list');
    const saveBtn = div.querySelector('.grant-user__save-btn');
    
    saveBtn.addEventListener('click', async () => {
      const selected = roleList.querySelector('.grant-user__role-card.selected');
      if (!selected) {
        alert('Выберите роль');
        return;
      }
      
      const newRole = selected.dataset.selected;
      const grantedBy = this.app.user?.telegram_id;
      
      saveBtn.textContent = 'Сохранение...';
      saveBtn.disabled = true;
      
      const result = await API.updateUserRole(this.selectedUser.telegram_id, newRole, grantedBy);
      
      if (result.success) {
        const modal = Modal(
          'Готово',
          `Роль "${newRole}" назначена`,
          'Ок',
          () => this.app.navigateTo('grant')
        );
        document.body.appendChild(modal);
      } else {
        alert('Ошибка: ' + (result.error || 'Неизвестная ошибка'));
      }
      
      saveBtn.textContent = 'Сохранить';
      saveBtn.disabled = false;
    });
    
    return div;
  }
}
