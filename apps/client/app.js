import { initTelegram } from '/shared/js/telegram.js';
import { authorize, getCurrentUser } from '/shared/js/auth.js';
import { initTheme } from '/shared/js/theme.js';
import { showSplash } from './modules/splash.js';
import { initNavigation } from './modules/navigation.js';
import { initSettings } from './modules/settings.js';

initTelegram();
initTheme();

showSplash(async () => {
    const user = await authorize();
    if (user) {
        initNavigation();
        initSettings(user);
        document.getElementById('main').style.display = 'block';
    } else {
        document.getElementById('splashStatus').textContent = 'ошибка авторизации';
    }
});
