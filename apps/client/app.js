import { startSplash } from './modules/splash.js';
import { applyTheme } from './modules/theme.js';
import { getCurrentLanguage, updateLanguageTexts, setLanguage, detectLanguage } from './modules/language.js';
import { authorize, updateUI } from './modules/auth.js';
import { initNavigation, goToScreen } from './modules/navigation.js';

const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// === ТЕМА ===
applyTheme();
tg.onEvent('themeChanged', applyTheme);

// === ЯЗЫК ===
const currentLang = getCurrentLanguage();
updateLanguageTexts();

// === КНОПКИ ЯЗЫКА ===
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        updateLanguageTexts();
    });
});

// === НАВИГАЦИЯ ===
window.goToScreen = goToScreen;

// === АВТОРИЗАЦИЯ ===
async function initApp() {
    const user = tg.initDataUnsafe?.user;
    if (user) {
        const success = await authorize({
            telegram_id: user.id,
            first_name: user.first_name,
            username: user.username
        });
        if (success) updateUI();
    }
}

// === ЗАПУСК ===
startSplash(() => {
    initNavigation();
    initApp();
});
