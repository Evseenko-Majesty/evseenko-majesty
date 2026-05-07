import { render } from './view.js';

export class HomeScreen {
  constructor(app) { this.app = app; }
  
  getElement() {
    const saved = localStorage.getItem('selectedCity');
    const city = saved ? JSON.parse(saved) : null;
    const cityName = city?.name || 'Город';
    
    return render(
      this.app.user,
      () => this.app.navigateTo('profile'),
      () => this.app.navigateTo('cityselect'),
      cityName
    );
  }
}
