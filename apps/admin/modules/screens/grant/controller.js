import { render } from './view.js';
import { PermissionsAPI } from '/shared/js/api/permissions.js';

export class GrantScreen {
  constructor(app) { this.app = app; }
  
  async getElement() {
    let showGrantRole = false;
    if (this.app.user?.telegram_id) {
      const res = await PermissionsAPI.check(this.app.user.telegram_id, 'grantForm');
      showGrantRole = res.hasAccess;
    }
    return render((screen) => this.app.navigateTo(screen), showGrantRole);
  }
}
