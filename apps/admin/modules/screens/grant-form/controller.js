import { render } from './view.js';

export class GrantFormScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
}
