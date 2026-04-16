import { initTelegram, setupBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.root = document.getElementById('root');
    this.user = null;
    this.history = [];
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this)
    };
  }
  
  navigateTo(screenName) {
    const screen = this.screens[screenName];
    this.root.innerHTML = '';
    this.root.appendChild(screen.getElement());
    
    this.history.push(screenName);
    
    if (screenName === 'home' || screenName === 'splash') {
      hideBackButton(this.tg);
    } else {
      setupBackButton(this.tg, () => this.goBack());
    }
    
    if (screen.onMount) {
      screen.onMount();
    }
  }
  
  goBack() {
  if (this.history.length > 1) {
    this.history.pop();
    const previousScreen = this.history.pop();
    
    const screen = this.screens[previousScreen];
    this.root.innerHTML = '';
    this.root.appendChild(screen.getElement());
    
    this.history.push(previousScreen);
    
    if (previousScreen === 'home' || previousScreen === 'splash') {
      hideBackButton(this.tg);
    }
  }
}
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();
