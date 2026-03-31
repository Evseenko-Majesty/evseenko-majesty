import { expand, ready, getUser } from './modules/telegram.js';
import { initTheme, setTheme } from './modules/theme.js';
import { getCurrentLanguage, updateUI as updateLanguageUI, setLanguage } from './modules/language.js';
import { authorize, updateUserUI } from './modules/auth.js';
import { startSplash } from './modules/splash.js';
import { initNavigation, goToScreen } from './modules/navigation.js';

// Telegram
expand();
ready();

// Тема
initTheme();

// Язык
updateLanguageUI();

// Кнопки языка в интерфейсе
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        updateLanguageUI();
    });
});

// Кнопки для панели разработчика (для ПК)
const devButtons = document.querySelectorAll('#devLight, #devDark, #devRu, #devEn');
if (devButtons.length) {
    document.getElementById('devLight')?.addEventListener('click', () => setTheme('light'));
    document.getElementById('devDark')?.addEventListener('click', () => setTheme('dark'));
    document.getElementById('devRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('devEn')?.addEventListener('click', () => setLanguage('en'));
}

// Авторизация
const initAuth = async () => {
    const user = getUser();
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

// Делаем функции глобальными для консоли (для отладки)
window.goToScreen = goToScreen;
window.setTheme = setTheme;
window.setLanguage = setLanguage;
