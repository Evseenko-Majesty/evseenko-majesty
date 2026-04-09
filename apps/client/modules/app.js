import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.root = document.getElementById('root');
    this.user = null;
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this)
    };
  }
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.root.innerHTML = '';
    this.root.appendChild(screen.getElement());
    if (screen.onMount) {
      screen.onMount();
    }
  }
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
