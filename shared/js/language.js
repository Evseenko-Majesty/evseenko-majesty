import { getUser } from './telegram.js';

let currentLang = localStorage.getItem('app_lang') || detectLanguage();

export const detectLanguage = () => {
    const user = getUser();
    const tgLang = user?.language_code || 'ru';
    return tgLang === 'ru' ? 'ru' : 'en';
};

export const getCurrentLanguage = () => currentLang;

export const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('app_lang', lang);
    // Вызываем обновление текста у всех подписанных компонентов
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
};

// Тексты для всех приложений
export const getTexts = () => ({
    ru: {
        loading: 'Загрузка...',
        connecting: 'Подключение к серверу...',
        systemReady: 'Система готова',
        noConnection: 'Нет соединения с сервером',
        retry: 'Повторить',
        welcome: (name) => `Добро пожаловать, ${name}`,
        balance: (amount) => `💰 Баланс: ${amount} ₽`,
        bonus: (points) => `🎁 Бонусы: ${points}`,
        settings: 'Настройки',
        language: '🌐 Язык / Language'
    },
    en: {
        loading: 'Loading...',
        connecting: 'Connecting to server...',
        systemReady: 'System ready',
        noConnection: 'No connection to server',
        retry: 'Retry',
        welcome: (name) => `Welcome, ${name}`,
        balance: (amount) => `💰 Balance: ${amount} ₽`,
        bonus: (points) => `🎁 Bonuses: ${points}`,
        settings: 'Settings',
        language: '🌐 Language / Язык'
    }
});
