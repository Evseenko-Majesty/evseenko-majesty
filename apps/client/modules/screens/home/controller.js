import { render } from './view.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const { div, moreItem } = render(this.app.user);
    
    moreItem.addEventListener('click', () => {
      this.app.navigateTo('more');
    });
    
    return div;
  }
}
