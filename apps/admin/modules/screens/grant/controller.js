// ============================================
// СТРАНИЦА "ДОСТУП" — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class GrantScreen {
  constructor(app) {
    this.app = app;
  }
  
  async getElement() {
    // Проверяем право на grantForm (Дать допуск)
    const res = await API.checkPermission(this.app.user?.telegram_id, 'grantForm');
    const showGrantForm = res.hasAccess;
    
    // Загружаем список видимых сотрудников
    const usersRes = await API.getVisibleUsers(this.app.user?.telegram_id);
    const users = usersRes.success ? usersRes.users : [];
    
    return render(
      (screen) => this.app.navigateTo(screen),
      showGrantForm,
      users,
      (user) => this.app.navigateTo('grant-user', false, user),
      (user) => this.app.navigateTo('grant-permissions', false, user)
    );
  }
}
