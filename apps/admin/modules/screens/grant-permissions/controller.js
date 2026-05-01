// ============================================
// ПРАВА ПОЛЬЗОВАТЕЛЯ — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class GrantPermissionsScreen {
  constructor(app, selectedUser) {
    this.app = app;
    this.selectedUser = selectedUser;
  }
  
  getElement() {
    const div = render(this.selectedUser);
    const allSaveBtns = div.querySelectorAll('.permissions-save-btn');
    
    // 0 — Сохранить должность
    const positionInput = div.querySelector('.permissions-input');
    if (allSaveBtns[0]) {
      allSaveBtns[0].addEventListener('click', async () => {
        const position = positionInput.value.trim();
        const result = await API.updateUserPosition(this.selectedUser.telegram_id, position);
        if (result.success) {
          this.selectedUser.position = position;
          div.querySelector('.user-detail-card__position').textContent = position;
          alert('Сохранено');
        } else {
          alert('Ошибка');
        }
      });
    }
    
    // 1 — Сохранить доступ к "Доступ"
    const accessCheckbox = div.querySelectorAll('.permissions-toggle__checkbox')[0];
    if (allSaveBtns[1]) {
      allSaveBtns[1].addEventListener('click', async () => {
        const hasAccess = accessCheckbox.checked;
        await API.togglePermission(
          this.app.user.telegram_id, this.selectedUser.telegram_id,
          'page', 'grant', hasAccess ? 'grant' : 'revoke'
        );
        alert(hasAccess ? 'Доступ выдан' : 'Доступ убран');
      });
    }
    
    // 2 — Сохранить доступ к "Дать допуск"
    const grantFormCheckbox = div.querySelectorAll('.permissions-toggle__checkbox')[1];
    if (allSaveBtns[2]) {
      allSaveBtns[2].addEventListener('click', async () => {
        const hasAccess = grantFormCheckbox.checked;
        await API.togglePermission(
          this.app.user.telegram_id, this.selectedUser.telegram_id,
          'page', 'grantForm', hasAccess ? 'grant' : 'revoke'
        );
        alert(hasAccess ? 'Доступ к "Дать допуск" выдан' : 'Доступ убран');
      });
    }
    
    // 3 — Сохранить роли
    if (allSaveBtns[3]) {
      allSaveBtns[3].addEventListener('click', async () => {
        const rolesContainer = div.querySelector('.permissions-roles');
        const activeRoles = [];
        rolesContainer.querySelectorAll('.permissions-role.active').forEach(btn => {
          activeRoles.push(btn.dataset.role);
        });
        
        await API.revokeAllPermissions(this.selectedUser.telegram_id, 'grant_role');
        for (const role of activeRoles) {
          await API.togglePermission(
            this.app.user.telegram_id, this.selectedUser.telegram_id,
            'grant_role', role, 'grant'
          );
        }
        alert('Роли сохранены');
      });
    }
    
    return div;
  }
}
