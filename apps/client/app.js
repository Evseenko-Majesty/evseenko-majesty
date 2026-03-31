import { expand, ready } from './modules/telegram.js';
import { initTheme } from './modules/theme.js';
import { getCurrentLanguage, updateUI as updateLanguageUI, setLanguage } from './modules/language.js';
import { authorize, updateUserUI } from './modules/auth.js';
import { startSplash } from './modules/splash.js';
import { initNavigation } from './modules/navigation.js';

// Telegram
expand();
ready();

// Тема
initTheme();

// Язык
updateLanguageUI();
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        updateLanguageUI();
    });
});

// Авторизация
const initAuth = async () => {
    const user = window.Telegram.WebApp.initDataUnsafe?.user;
    if (user) {
        const success = await authorize({
            telegram_id: user.id,
            first_name: user.first_name,
            username: user.username
        });
        if (success) updateUserUI();
    }
};

// Запуск
startSplash(() => {
    initNavigation();
    initAuth();
});
