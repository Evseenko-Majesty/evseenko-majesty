// ============================================
// ВЫБОР ГОРОДА — ЛОГИКА
// ============================================

import { render } from './view.js';
import { Modal } from '/shared/components/Modal.js';
import { UsersAPI } from '/shared/js/api/users.js';

export class CitySelectScreen {
  constructor(app) { this.app = app; }
  
  async getElement() {
    return await render(async (city) => {
      // Сохраняем в базу (чтобы было на всех устройствах)
      if (this.app.user?.telegram_id) {
        await UsersAPI.updateCity(this.app.user.telegram_id, city.id);
      }
      
      // Сохраняем локально (для быстрого доступа)
      localStorage.setItem('selectedCity', JSON.stringify(city));
      
      // Показываем модальное окно
      document.body.appendChild(Modal(
        'Готово',
        `Город "${city.name}" сохранён`,
        'Ок',
        () => {
          this.app.navigateTo('profile');
        }
      ));
    });
  }
}
