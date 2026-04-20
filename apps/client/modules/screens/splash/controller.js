// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// Управляет анимацией статуса, проверкой сервера, переходом
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';

// Этапы статуса (меняются по очереди)
const STATUS_TEXTS = [
  'Подключение',
  'Проверка доступа', 
  'Авторизация',
  'Загрузка данных'
];

export class SplashScreen {
  
  // Конструктор — вызывается при создании экрана
  constructor(app) {
    this.app = app;                        // Ссылка на главное приложение
    
    // Ссылки на элементы статус-карточки (заполнятся в getElement)
    this.statusCard = null;                // Сама капсула
    this.statusText = null;               // Текст внутри
    this.statusIndicator = null;          // Иконка внутри
    
    // Для анимации смены текста
    this.step = 0;                        // Текущий индекс в STATUS_TEXTS
    this.interval = null;                 // ID интервала (чтобы потом остановить)
  }
  
  // Возвращает HTML экрана и сохраняет ссылки на элементы
  getElement() {
    const { div, statusCard, statusText, statusIndicator } = render();
    
    // Сохраняем ссылки для управления
    this.statusCard = statusCard;
    this.statusText = statusText;
    this.statusIndicator = statusIndicator;
    
    return div;
  }
  
  onMount() {
  // Ждём пока закончится анимация логотипа и названия (примерно 2.5 секунды)
  setTimeout(() => {
    this.startStatusAnimation();
    this.authenticate();
  }, 2500);  // Задержка в миллисекундах (2.5 секунды)
}
  
  // Анимация смены текста статуса
  startStatusAnimation() {
    this.interval = setInterval(() => {
      // Переходим к следующему тексту (по кругу)
      this.step = (this.step + 1) % STATUS_TEXTS.length;
      
      // Плавно скрываем
      this.statusText.style.opacity = '0';
      
      // Через 150ms меняем текст и плавно показываем
      setTimeout(() => {
        this.statusText.textContent = STATUS_TEXTS[this.step];
        this.statusText.style.opacity = '1';
      }, 150);
      
    }, 800); // Каждые 0.8 секунд
  }
  
  // Проверка сервера и авторизация
async authenticate() {
  
  // Получаем данные пользователя из Telegram
  const tgUser = this.app.tg.initDataUnsafe?.user;
  
  // Если не в Telegram — показываем ошибку
  if (!tgUser) {
    this.showError('Откройте приложение через Telegram');
    return;
  }
  
  // Отправляем запрос на сервер
  const result = await API.auth(tgUser);
  
  if (result.success) {
    // Успех — сохраняем пользователя, останавливаем анимацию
    this.app.user = result.user;
    clearInterval(this.interval);
    this.showSuccess();
    
    // Через секунду переходим на главный экран
    setTimeout(() => this.app.navigateTo('home'), 1000);
    
  } else {
    // Ошибка — показываем ошибку с текстом
    this.showError(result.error || 'Ошибка соединения');
  }
}
  
  // Показать успешное завершение
  showSuccess() {
    // Меняем класс (становится зелёным)
    this.statusCard.classList.add('status-card--success');
    
    // Меняем иконку на галочку
    this.statusIndicator.innerHTML = `
      <use href="/shared/assets/icons/sprite.svg#status-success"></use>
    `;
    
    // Меняем текст
    this.statusText.textContent = 'Готово';
    this.statusText.style.opacity = '1';
  }
  
  // Показать ошибку
showError(message) {
  // Останавливаем анимацию текста
  clearInterval(this.interval);
  
  // Меняем класс (становится красным)
  this.statusCard.classList.add('status-card--error');
  
  // Меняем иконку на крестик
  this.statusIndicator.innerHTML = `
    <use href="/shared/assets/icons/sprite.svg#status-error"></use>
  `;
  
  // Меняем текст на переданное сообщение
  this.statusText.textContent = message;
  this.statusText.style.opacity = '1';
  
  // Здесь будет показ окна с кнопкой "Повторить"
  console.log('Ошибка:', message);
}
}
