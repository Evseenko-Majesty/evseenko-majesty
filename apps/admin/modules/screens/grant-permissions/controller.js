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
    
    // Сохранение должности
    const positionInput = div.querySelector('.permissions-input');
    const saveBtn = div.querySelector('.permissions-save-btn');
    
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const position = positionInput.value.trim();
        const result = await API.updateUserPosition(this.selectedUser.telegram_id, position);
        
        if (result.success) {
          this.selectedUser.position = position;
          const positionEl = div.querySelector('.user-detail-card__position');
          if (positionEl) positionEl.textContent = position;
          alert('Сохранено');
        } else {
          alert('Ошибка');
        }
      });
    }
    
    // Сохранение доступа к странице "Доступ"
    const accessCheckbox = div.querySelector('.permissions-toggle__checkbox');
    const accessSaveBtn = div.querySelectorAll('.permissions-save-btn')[1];
    
    if (accessSaveBtn) {
      accessSaveBtn.addEventListener('click', async () => {
        const hasAccess = accessCheckbox.checked;
        
        const result = await API.togglePermission(
          this.app.user.telegram_id,
          this.selectedUser.telegram_id,
          'page',
          'grant',
          hasAccess ? 'grant' : 'revoke'
        );
        
        if (result.success) {
          alert(hasAccess ? 'Доступ выдан' : 'Доступ убран');
        } else {
          alert('Ошибка');
        }
      });
    }
    
    return div;
  }
}
