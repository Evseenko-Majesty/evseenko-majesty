import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    
    this.screens = {
      splash: new SplashScreen(this)
    };
  }
  
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    if (screen.onMount) screen.onMount();
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
