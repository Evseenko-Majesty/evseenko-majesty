import { render } from './view.js';

export class GrantScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render((screen) => this.app.navigateTo(screen));
  }
}
