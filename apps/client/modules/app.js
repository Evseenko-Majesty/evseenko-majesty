import { SplashScreen } from './screens/splash/controller.js';

const root = document.getElementById('root');
const splash = new SplashScreen();
root.appendChild(splash.getElement());
