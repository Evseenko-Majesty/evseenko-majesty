import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

const tg = initTelegram();
const container = document.getElementById('app');
const splash = new SplashScreen();
container.appendChild(splash.getElement());
