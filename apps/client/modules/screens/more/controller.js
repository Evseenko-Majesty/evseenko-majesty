import { render } from './view.js';

export class MoreScreen {
  constructor(app) { this.app = app; }
  
  getElement() {
    const saved = localStorage.getItem('selectedCity');
    const city = saved ? JSON.parse(saved) : null;
    const cityName = city?.name || 'Город';
    
    return render(
      (screen) => this.app.navigateTo(screen),
      () => this.app.navigateTo('cityselect'),
      cityName
    );
  }
}
