// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { ErrorModal } from '/shared/components/ErrorModal.js';

const STATUS_TEXTS = [
  'Подключение',
  'Проверка доступа', 
  'Авторизация',
  'Загрузка данных'
];

export class SplashScreen {
  
  constructor(app) {
    this.app = app;
    this.statusCard = null;
    this.statusText = null;
    this.statusIndicator = null;
    this.step = 0;
    this.interval = null;
    this.isRetrying = false;  // Чтобы не запускать повторно при ретрае
  }
  
  getElement() {
    const { div, statusCard, statusText, statusIndicator } = render();
    this.statusCard = statusCard;
    this.statusText = statusText;
    this.statusIndicator = statusIndicator;
    return div;
  }
  
  onMount() {
    // Ждём окончания анимации контента
    setTimeout(() => {
      this.startStatusAnimation();
      this.authenticate();
    }, 2500);
  }
  
  startStatusAnimation() {
    this.interval = setInterval(() => {
      this.step = (this.step + 1) % STATUS_TEXTS.length;
      this.statusText.style.opacity = '0';
      setTimeout(() => {
        this.statusText.textContent = STATUS_TEXTS[this.step];
        this.statusText.style.opacity = '1';
      }, 150);
    }, 800);
  }
  
  async authenticate() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    // 1. Не в Telegram — показываем окно с переходом
    if (!tgUser) {
      clearInterval(this.interval);
      this.showError('Откройте приложение');
      
      const modal = ErrorModal(
        'Не в Telegram',
        'Откройте приложение через Telegram Mini App',
        'Перейти в приложение',
        () => {
          // Открыть бота в Telegram
          window.open('https://t.me/evseenko_bot', '_blank');
        }
      );
      document.body.appendChild(modal);
      return;
    }
    
    // 2. Отправляем запрос на сервер
    const result = await API.auth(tgUser);
    
    if (result.success) {
      // 3. Успех — зелёная галочка, переход на главную
      this.app.user = result.user;
      clearInterval(this.interval);
      this.showSuccess();
      setTimeout(() => this.app.navigateTo('home'), 1500);
      
    } else {
      // 4. Ошибка сервера — красный крестик + окно с повтором
      clearInterval(this.interval);
      this.showError('Ошибка');
      
      const modal = ErrorModal(
        'Ошибка соединения',
        'Не удалось подключиться к серверу',
        'Повторить',
        () => {
          // Перезагружаем страницу (или можно вызвать authenticate заново)
          window.location.reload();
        }
      );
      document.body.appendChild(modal);
    }
  }
  
  showSuccess() {
    this.statusCard.classList.add('status-card--success');
    this.statusIndicator.innerHTML = `
      <use href="/shared/assets/icons/sprite.svg#status-success"></use>
    `;
    this.statusText.textContent = 'Готово';
    this.statusText.style.opacity = '1';
  }
  
  showError(text) {
    this.statusCard.classList.add('status-card--error');
    this.statusIndicator.innerHTML = `
      <use href="/shared/assets/icons/sprite.svg#status-error"></use>
    `;
    this.statusText.textContent = text;
    this.statusText.style.opacity = '1';
  }
}
