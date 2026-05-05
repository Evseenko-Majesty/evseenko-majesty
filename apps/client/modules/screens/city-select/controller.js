import { render } from './view.js';
import { Modal } from '/shared/components/Modal.js';

export class CitySelectScreen {
  constructor(app) { this.app = app; }
  
  async getElement() {
    return await render((city) => {
      localStorage.setItem('selectedCity', JSON.stringify(city));
      document.body.appendChild(Modal('Готово', `Город "${city.name}" сохранён`, 'Ок', () => {
        this.app.navigateTo('profile');
      }));
    });
  }
}
