// ============================================
// ГЛАВНЫЙ ФАЙЛ ПРИЛОЖЕНИЯ
// ============================================

import { initTelegram, showBackButton, hideBackButton } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';
import { BottomNav } from '/shared/components/BottomNav.js';

class App {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.currentScreen = null;
    this.backHandler = null;
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this),
      profile: new ProfileScreen(this)
    };
    
    this.navItems = [
      { id: 'home', label: 'Главная' },
      { id: 'more', label: 'Ещё' }
    ];
  }
  
  navigateTo(screenName) {
    console.log('➡️ navigateTo:', screenName, '| current before:', this.currentScreen);
    this.currentScreen = screenName;
    console.log('   current after:', this.currentScreen);
    
    const screen = this.screens[screenName];
    
    this.container.innerHTML = '';
    this.container.appendChild(screen.getElement());
    
    // Кнопка "Назад"
    if (screenName === 'more' || screenName === 'profile') {
      // Удаляем старый обработчик если был
      if (this.backHandler) {
        this.tg.BackButton.offClick(this.backHandler);
      }
      
      this.backHandler = () => {
        console.log('⬅️ Back pressed. currentScreen:', this.currentScreen);
        if (this.currentScreen === 'profile') {
          console.log('   → going to more');
          this.navigateTo('more');
        } else if (this.currentScreen === 'more') {
          console.log('   → going to home');
          this.navigateTo('home');
        }
      };
      
      showBackButton(this.tg, this.backHandler);
    } else {
      hideBackButton(this.tg);
      this.backHandler = null;
    }
    
    // Нижняя навигация
    if (screenName === 'home' || screenName === 'more') {
      const nav = BottomNav(this.navItems, screenName, (id) => {
        console.log('📍 BottomNav click:', id);
        this.navigateTo(id);
      });
      this.container.appendChild(nav);
    }
    
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
