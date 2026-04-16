import { render } from './view.js';

export class MoreScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const { div, homeItem } = render();
    
    homeItem.addEventListener('click', () => {
      this.app.navigateTo('home');
    });
    
    return div;
  }
}