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
    
    const positionInput = div.querySelector('.permissions-input');
    const saveBtn = div.querySelector('.permissions-save-btn');
    
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
    const accessCheckbox = div.querySelector('.permissions-toggle__checkbox');
const accessSaveBtn = div.querySelectorAll('.permissions-save-btn')[1]; // Вторая кнопка

// Загружаем текущее право
this.loadGrantAccess(accessCheckbox);

accessSaveBtn.addEventListener('click', async () => {
  const hasAccess = accessCheckbox.checked;
  // Тут вызов API для сохранения права grant
  alert(hasAccess ? 'Доступ выдан' : 'Доступ убран');
});
    
    return div;
  }
}
