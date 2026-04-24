// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

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
      this.showBlocked('Откройте через Telegram');
      return;
    }
    
    const result = await API.auth(tgUser);
    
    if (!result.success) {
      this.showBlocked('Ошибка сервера');
      return;
    }
    
    const role = result.role || 'client';
    
    // Проверяем доступ
    if (role === 'owner' || role === 'staff' || role === 'partner') {
      this.app.user = result.user;
      this.app.user.role = role;
      setTimeout(() => this.app.navigateTo('home'), 1000);
    } else {
      this.showBlocked('У вас нет доступа к этой панели');
    }
  }
  
  showBlocked(message) {
    const modal = Modal(
      'Доступ запрещён',
      message,
      'Закрыть',
      () => window.Telegram.WebApp.close()
    );
    document.body.appendChild(modal);
  }
}
