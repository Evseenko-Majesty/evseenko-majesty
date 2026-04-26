import { render } from './view.js';

export class MoreScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render(this.app.user, (screen) => this.app.navigateTo(screen));
  }
}
