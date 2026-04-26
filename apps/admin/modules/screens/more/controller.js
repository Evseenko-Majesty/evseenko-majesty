import { render } from './view.js';
import { API } from '/shared/js/api.js';

export class MoreScreen {
  constructor(app) {
    this.app = app;
  }
  
  async getElement() {
    const res = await API.checkPermission(this.app.user?.telegram_id, 'grant');
    const showGrant = res.hasAccess;
    
    return render(this.app.user, (screen) => this.app.navigateTo(screen), showGrant);
  }
}
