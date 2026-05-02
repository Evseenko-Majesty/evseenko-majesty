import { render } from './view.js';
import { AuthAPI } from '/shared/js/api/auth.js';
import { Modal } from '/shared/components/Modal.js';

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
        'Приложение доступно только через Telegram Mini App',
        'Перейти в Telegram',
        () => window.open('https://t.me/Evseenko_Majesty_Bot', '_blank')
      ));
      return;
    }
    
    const result = await AuthAPI.login(tgUser);
    if (result.success) this.app.user = result.user;
    
    setTimeout(() => this.app.navigateTo('home'), 500);
  }
}
