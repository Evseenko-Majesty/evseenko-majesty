// ============================================
// ЗАГРУЗОЧНЫЙ ЭКРАН — ЛОГИКА
// ============================================

import { render } from './view.js';
import { API } from '/shared/js/api.js';
import { Modal } from '/shared/components/Modal.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
    this.statusDiv = null;
    this.statusIcon = null;
    this.statusText = null;
  }
  
  getElement() {
    const { div, statusDiv, statusIcon, statusText } = render();
    this.statusDiv = statusDiv;
    this.statusIcon = statusIcon;
    this.statusText = statusText;
    return div;
  }
  
  onMount() {
    this.positionBrandName();
    setTimeout(() => this.checkAccess(), 2500);
  }
  
  positionBrandName() {
    const logo = document.querySelector('.splash .logo');
    const brandName = document.querySelector('.splash .brand-name');
    if (!logo || !brandName) return;
    const logoRect = logo.getBoundingClientRect();
    const topPosition = logoRect.bottom + (window.innerHeight * 3 / 100);
    brandName.style.top = topPosition + 'px';
  }
  
  async checkAccess() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    // Не в Telegram — гость
    if (!tgUser) {
      this.showSuccess();
      this.app.user = { first_name: 'Гость', is_guest: true };
      setTimeout(() => this.app.navigateTo('home'), 1000);
      return;
    }
    
    // В Telegram — пробуем сервер
    const result = await API.auth(tgUser);
    
    if (result.success) {
      this.showSuccess();
      this.app.user = result.user;
      setTimeout(() => this.app.navigateTo('home'), 1000);
    } else {
      this.showError();
    }
  }
  
  showSuccess() {
    this.statusDiv.classList.add('status-card--success');
    this.statusIcon.innerHTML = '<use href="/shared/assets/icons/sprite.svg#status-success"></use>';
    this.statusText.textContent = 'Готово';
  }
  
  showError() {
    this.statusDiv.classList.add('status-card--error');
    this.statusIcon.innerHTML = '<use href="/shared/assets/icons/sprite.svg#status-error"></use>';
    this.statusText.textContent = 'Ошибка';
    
    const modal = Modal(
      'Ошибка соединения',
      'Не удалось подключиться к серверу',
      'Повторить',
      () => window.location.reload()
    );
    document.body.appendChild(modal);
  }
}
