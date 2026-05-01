// ============================================
// EMajesty Core — ГЛАВНЫЙ ФАЙЛ АДМИН-ПАНЕЛИ
// ============================================

import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';
import { HomeScreen } from './screens/home/controller.js';
import { MoreScreen } from './screens/more/controller.js';
import { ProfileScreen } from './screens/profile/controller.js';
import { GrantScreen } from './screens/grant/controller.js';
import { GrantFormScreen } from './screens/grant-form/controller.js';
import { GrantUserScreen } from './screens/grant-user/controller.js';
import { GrantPermissionsScreen } from './screens/grant-permissions/controller.js';
import { MediaScreen } from './screens/media/controller.js';
import { BottomNav } from '/shared/components/BottomNav.js';
import { API } from '/shared/js/api.js';

class AdminApp {
  constructor() {
    this.tg = initTelegram();
    this.container = document.getElementById('app');
    this.user = null;
    this.screenHistory = [];
    
    this.screens = {
      splash: new SplashScreen(this),
      home: new HomeScreen(this),
      more: new MoreScreen(this),
      profile: new ProfileScreen(this),
      grant: new GrantScreen(this),
      grantForm: new GrantFormScreen(this),
      media: new MediaScreen(this)
    };
    
    this.allNavItems = [
      { 
        id: 'home', 
        label: 'Главная', 
        permission: null,
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 21h14M5 21v-13M19 21v-13M9 21v-8h6v8M2 10l10-8 10 8"/></svg>'
      },
      { 
        id: 'media', 
        label: 'Медиа', 
        permission: 'media',
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>'
      },
      { 
        id: 'more', 
        label: 'Ещё', 
        permission: null,
        icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5h14M5 12h14M5 19h14"/></svg>'
      }
    ];
    
    this.tg.BackButton.onClick(() => {
      if (this.screenHistory.length > 1) {
        this.screenHistory.pop();
        const prev = this.screenHistory[this.screenHistory.length - 1];
        this.navigateTo(prev, true);
      }
    });
  }
  
  async navigateTo(screenName, fromBack = false, data = null) {
    // Динамические экраны
    if (screenName === 'grant-user' && data) {
      this.screens['grant-user'] = new GrantUserScreen(this, data);
    }
    if (screenName === 'grant-permissions' && data) {
      this.screens['grant-permissions'] = new GrantPermissionsScreen(this, data);
    }
    
    if (!fromBack) this.screenHistory.push(screenName);
    
    const screen = this.screens[screenName];
    if (!screen) return;
    
    const element = await screen.getElement();
    
    this.container.innerHTML = '';
    this.container.appendChild(element);
    
    // Кнопка "Назад"
    if (screenName === 'home' || screenName === 'splash') {
      this.tg.BackButton.hide();
    } else {
      this.tg.BackButton.show();
    }
    
    // Нижняя навигация
    if (screenName === 'home' || screenName === 'more' || screenName === 'media') {
      const availableItems = [];
      for (const item of this.allNavItems) {
        if (item.permission) {
          const res = await API.checkPermission(this.user?.telegram_id, item.permission);
          if (res.hasAccess) availableItems.push(item);
        } else {
          availableItems.push(item);
        }
      }
      this.container.appendChild(BottomNav(availableItems, screenName, (id) => this.navigateTo(id)));
    }
    
    if (screen.onMount) screen.onMount();
  }
  
  start() {
    this.navigateTo('splash');
  }
}

const app = new AdminApp();
app.start();
