// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

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
    
    if (!tgUser) {
      document.body.appendChild(Modal(
        'Ошибка',
        'Откройте через Telegram',
        'Закрыть',
        () => window.Telegram.WebApp.close()
      ));
      return;
    }
    
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
    await this.app.loadPermissions();  // ← ЗАГРУЖАЕМ ПРАВА
    
    if (!ALLOWED_ROLES.includes(result.user?.role)) {
      document.body.appendChild(Modal(
        'Доступ запрещён',
        'У вас нет доступа к этой панели',
        'Закрыть',
        () => window.Telegram.WebApp.close()
      ));
      return;
    }
    
    setTimeout(() => this.app.navigateTo('home'), 1000);
  }
}
