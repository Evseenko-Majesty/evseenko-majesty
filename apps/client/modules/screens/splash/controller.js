import { render } from './view.js';

export class SplashScreen {
  constructor(app) {
    this.app = app;
  }
  
  getElement() {
    return render();
  }
  
  onMount() {
    setTimeout(() => {
      this.app.navigateTo('home');
    }, 3000);
  }
}
