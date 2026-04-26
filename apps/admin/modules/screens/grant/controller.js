import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class GrantScreen {
  constructor(app) {
    this.app = app;
  }
  
  async getElement() {
    const res = await API.checkPermission(this.app.user?.telegram_id, 'grantForm');
    const showGrantForm = res.hasAccess;
    
    return render((screen) => this.app.navigateTo(screen), showGrantForm);
  }
}
