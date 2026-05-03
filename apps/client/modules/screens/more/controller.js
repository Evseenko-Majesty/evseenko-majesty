import { render } from './view.js';

export class MoreScreen {
  constructor(app) { this.app = app; }
  getElement() { return render((screen) => this.app.navigateTo(screen)); }
}
