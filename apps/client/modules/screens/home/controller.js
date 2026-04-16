import { render } from './view.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    const div = render(this.app.user);
    
    const moreBtn = div.querySelector('.bottom-nav__item:last-child');
    moreBtn.addEventListener('click', () => {
      this.app.navigateTo('more');
    });
    
    return div;
  }
}
