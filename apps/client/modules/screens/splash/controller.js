// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// Авторизация через сервер, переход на главную
// ============================================

import { render } from './view.js';
import { AuthAPI } from '/shared/js/api/auth.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    // Ждём окончания анимации, потом авторизуемся
    setTimeout(() => this.authenticate(), 2000);
  }
  
  async authenticate() {
    // Получаем данные пользователя из Telegram
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (tgUser) {
      // Отправляем данные на сервер
      const result = await AuthAPI.login(tgUser);
      if (result.success) {
        this.app.user = result.user;
      }
    }
    
    // Переход на главную
    setTimeout(() => this.app.navigateTo('home'), 600);
  }
}
