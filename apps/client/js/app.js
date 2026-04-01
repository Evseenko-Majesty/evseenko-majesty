import { expand, ready, getTelegram } from './modules/telegram.js';
import { initTheme, setTheme } from './modules/theme.js';
import { getCurrentLanguage, updateUI as updateLanguageUI, setLanguage } from './modules/language.js';
import { authorize, updateUserUI, getUser } from './modules/auth.js';
import { startSplash } from './modules/splash.js';
import { initNavigation, goToScreen } from './modules/navigation.js';

// === РАСКРЫТИЕ НА ВЕСЬ ЭКРАН ===
expand();
ready();

// === ТЕМА ===
initTheme();

// === ЯЗЫК ===
updateLanguageUI();

// === КНОПКИ ЯЗЫКА ===
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
        updateLanguageUI();
    });
});

// === КНОПКИ ПАНЕЛИ РАЗРАБОТЧИКА (для ПК) ===
const devLight = document.getElementById('devLight');
const devDark = document.getElementById('devDark');
const devRu = document.getElementById('devRu');
const devEn = document.getElementById('devEn');

if (devLight) devLight.addEventListener('click', () => setTheme('light'));
if (devDark) devDark.addEventListener('click', () => setTheme('dark'));
if (devRu) devRu.addEventListener('click', () => setLanguage('ru'));
if (devEn) devEn.addEventListener('click', () => setLanguage('en'));

// === АВТОРИЗАЦИЯ ===
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

// === ЗАПУСК ===
startSplash(() => {
    initNavigation();
    initAuth();
});

// === ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ ОТЛАДКИ ===
window.goToScreen = goToScreen;
window.setTheme = setTheme;
window.setLanguage = setLanguage;
