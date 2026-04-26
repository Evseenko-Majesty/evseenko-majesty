// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

// Разрешённые роли
const ALLOWED_ROLES = ['owner', 'staff', 'partner'];

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    setTimeout(() => this.checkAccess(), 2500);
  }
  
  async checkAccess() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    // Не в Telegram
    if (!tgUser) {
      document.body.appendChild(Modal(
        'Ошибка',
        'Откройте через Telegram',
        'Закрыть',
        () => window.Telegram.WebApp.close()
      ));
      return;
    }
    
    // Проверяем пользователя
    const result = await API.auth(tgUser);
    
    if (!result.success) {
      document.body.appendChild(Modal(
        'Ошибка',
        'Сервер недоступен',
        'Повторить',
        () => window.location.reload()
      ));
      return;
    }
    
    this.app.user = result.user;
    
    // Проверяем роль
    if (!ALLOWED_ROLES.includes(result.user?.role)) {
      document.body.appendChild(Modal(
        'Доступ запрещён',
        'У вас нет доступа к этой панели',
        'Закрыть',
        () => window.Telegram.WebApp.close()
      ));
      return;
    }
    
    // Доступ разрешён — переход на главную
    setTimeout(() => this.app.navigateTo('home'), 1000);
  }
}
