import { initTelegram } from '/shared/js/telegram.js';
import { SplashScreen } from './screens/splash/controller.js';

const tg = initTelegram();

const root = document.getElementById('root');
const splash = new SplashScreen();
root.appendChild(splash.getElement());
