import { render } from './view.js';

export class ProfileScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render(this.app.user);
  }
}
