import { render } from './view.js';              // HTML экрана
import { AuthAPI } from '/shared/js/api/auth.js'; // API авторизации
import { Modal } from '/shared/components/Modal.js'; // Модальное окно

export class SplashScreen {
  constructor(app) {
    this.app = app;  // Ссылка на приложение (для переходов)
  }
  
  getElement() { return render(); }
  
  onMount() {
    // Ждём 2.5 секунды (анимация), потом проверяем доступ
    setTimeout(() => this.checkAccess(), 2500);
  }
  
  async checkAccess() {
    // Пытаемся получить данные пользователя из Telegram
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (!tgUser) {
      // Не в Telegram — показываем модальное окно
      document.body.appendChild(Modal(
        'Только в Telegram',
        'Приложение доступно только через Telegram',
        'Перейти в Telegram',
        () => window.open('https://t.me/Evseenko_Majesty_Bot', '_blank')
      ));
      return;  // Не идём дальше
    }
    
    // В Telegram — отправляем данные на сервер
    const result = await AuthAPI.login(tgUser);
    if (result.success) {
      this.app.user = result.user;  // Сохраняем пользователя
    }
    
    // Переходим на главную
    setTimeout(() => this.app.navigateTo('home'), 500);
  }
}
