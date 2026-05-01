import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

const tg = initTelegram();
const container = document.getElementById('app');

// Пока передаём null вместо app
const splash = new SplashScreen(null);
container.appendChild(splash.getElement());
