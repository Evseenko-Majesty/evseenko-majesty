import { render } from './view.js';
import { hideBackButton } from '/shared/js/telegram.js';

export class HomeScreen {
  constructor(app) {
    this.app = app;
    this.currentTab = 'home';
  }
  
  getElement() {
    return render(this.app.user, this.currentTab, (tab) => this.switchTab(tab));
  }
  
  switchTab(tab) {
    this.currentTab = tab;
    const root = document.getElementById('root');
    root.innerHTML = '';
    root.appendChild(this.getElement());
    hideBackButton(this.app.tg);
  }
  
  onMount() {
    hideBackButton(this.app.tg);
  }
}
