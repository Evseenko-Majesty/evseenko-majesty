import { initTelegram, setupBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.root = document.getElementById('root');
    this.user = null;
    this.currentScreen = 'splash';
    this.previousScreen = null;
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this),
      profile: new ProfileScreen(this)
    };
  }
  
  navigateTo(screenName) {
    // Не обновляем previousScreen если переходим на ту же страницу
    if (this.currentScreen !== screenName) {
      this.previousScreen = this.currentScreen;
    }
    this.currentScreen = screenName;
    
    const screen = this.screens[screenName];
    this.root.innerHTML = '';
    this.root.appendChild(screen.getElement());
    
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
    if (this.currentScreen === 'more') {
      this.navigateTo('home');
    } else if (this.currentScreen === 'profile') {
      if (this.previousScreen === 'more') {
        this.navigateTo('more');
      } else if (this.previousScreen === 'home') {
        this.navigateTo('home');
      } else {
        this.navigateTo('home');
      }
    }
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new App();
app.start();