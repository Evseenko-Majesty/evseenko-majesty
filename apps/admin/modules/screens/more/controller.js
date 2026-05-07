import { render } from './view.js';
import { PermissionsAPI } from '/shared/js/api/permissions.js';

export class MoreScreen {
  constructor(app) { this.app = app; }
  
  async getElement() {
    let showGrant = false;
    if (this.app.user?.telegram_id) {
      const res = await PermissionsAPI.check(this.app.user.telegram_id, 'grant');
      showGrant = res.hasAccess;
    }
    return render((screen) => this.app.navigateTo(screen), showGrant);
  }
}
