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
    setTimeout(() => this.checkAccess(), 2500);
  }
  
  async checkAccess() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (!tgUser) {
      this.showSuccess('✓');
      this.app.user = { first_name: 'Гость', is_guest: true };
      setTimeout(() => this.app.navigateTo('home'), 1000);
      return;
    }
    
    const result = await API.auth(tgUser);
    
    if (result.success) {
      this.showSuccess('✓');
      this.app.user = result.user;
      setTimeout(() => this.app.navigateTo('home'), 1000);
    } else {
      this.showError('✗');
    }
  }
  
  showSuccess(symbol) {
    this.statusDiv.classList.add('status-card--success');
    this.statusIcon.textContent = symbol;
    this.statusText.textContent = 'Готово';
  }
  
  showError(symbol) {
    this.statusDiv.classList.add('status-card--error');
    this.statusIcon.textContent = symbol;
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
