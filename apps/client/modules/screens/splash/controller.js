import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
    this.statusCard = null;
    this.authCompleted = false;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    this.statusCard = document.querySelector('.splash__status');
    
    setTimeout(() => {
      this.authenticate();
    }, 2800);
  }
  
  async authenticate() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (!tgUser) {
      this.showError('Откройте через Telegram');
      return;
    }
    
    const result = await API.auth(tgUser);
    
    if (result.success) {
      this.app.user = result.user;
      this.authCompleted = true;
      this.showSuccess();
      setTimeout(() => {
        if (this.authCompleted) {
          this.app.navigateTo('home');
        }
      }, 1500);
    } else {
      this.showError(result.error || 'Ошибка подключения');
    }
  }
  
  showSuccess() {
    if (!this.statusCard) return;
    this.statusCard.className = 'splash__status splash__status--success';
    this.statusCard.innerHTML = `
      <div class="splash__status-content">
        <span class="splash__status-icon">✅</span>
        <span class="splash__status-text">Подключено</span>
      </div>
    `;
  }
  
  showError(message) {
    if (!this.statusCard) return;
    this.statusCard.className = 'splash__status splash__status--error';
    this.statusCard.innerHTML = `
      <div class="splash__status-content">
        <span class="splash__status-icon">❌</span>
        <span class="splash__status-text">${message}</span>
      </div>
      <button class="splash__retry">Повторить</button>
    `;
    
    const retryBtn = this.statusCard.querySelector('.splash__retry');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.statusCard.className = 'splash__status splash__status--loading';
        this.statusCard.innerHTML = `
          <div class="splash__status-content">
            <span class="splash__status-icon">🔄</span>
            <span class="splash__status-text">Подключение к серверу...</span>
          </div>
        `;
        this.authenticate();
      });
    }
  }
}
