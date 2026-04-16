import { render } from './view.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const { div, moreItem, profile } = render(this.app.user);
    
    moreItem.addEventListener('click', () => {
      this.app.navigateTo('more');
    });
    
    profile.style.cursor = 'pointer';
    profile.addEventListener('click', () => {
      this.app.navigateTo('profile');
    });
    
    return div;
  }
}