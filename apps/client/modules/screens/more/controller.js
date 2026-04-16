import { render } from './view.js';

export class MoreScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const { div, homeItem, menuItem } = render();
    
    homeItem.addEventListener('click', () => {
      this.app.navigateTo('home');
    });
    
    menuItem.addEventListener('click', () => {
      this.app.navigateTo('profile');
    });
    
    return div;
  }
}