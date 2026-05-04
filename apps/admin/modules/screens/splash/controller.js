// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { AuthAPI } from '/shared/js/api/auth.js';
import { Modal } from '/shared/components/Modal.js';

const ALLOWED_ROLES = ['owner', 'staff', 'partner'];

export class SplashScreen {
  constructor(app) { this.app = app; }
  
  getElement() { return render(); }
  
  onMount() {
    setTimeout(() => this.checkAccess(), 2500);
  }
  
  async checkAccess() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (!tgUser) {
      document.body.appendChild(Modal(
        'Только в Telegram',
        'Приложение доступно только через Telegram',
        'Перейти в Telegram',
        () => window.open('https://t.me/EvseenkoMajestyBot', '_blank')
      ));
      return;
    }
    
    const result = await AuthAPI.login(tgUser);
    
    if (!result.success) {
      document.body.appendChild(Modal('Ошибка', 'Сервер недоступен', 'Повторить', () => window.location.reload()));
      return;
    }
    
    if (!ALLOWED_ROLES.includes(result.user?.role)) {
      document.body.appendChild(Modal('Доступ запрещён', 'У вас нет доступа', 'Закрыть', () => this.app.tg.close()));
      return;
    }
    
    this.app.user = result.user;
    setTimeout(() => this.app.navigateTo('home'), 500);
  }
}
