import { render } from './view.js';

export class CitySelectScreen {
  constructor(app) { this.app = app; }
  getElement() { return render(); }
}
