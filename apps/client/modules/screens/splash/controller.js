import { render } from './view.js';
import { API } from '/shared/js/api/auth.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    setTimeout(() => this.authenticate(), 2000);
  }
  
  async authenticate() {
    const tgUser = this.app.tg.initDataUnsafe?.user;
    
    if (tgUser) {
      const result = await AuthAPI.login(tgUser);
      if (result.success) {
        this.app.user = result.user;
      }
    }
    
    setTimeout(() => this.app.navigateTo('home'), 500);
  }
}
